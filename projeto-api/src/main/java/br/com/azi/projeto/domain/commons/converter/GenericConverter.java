package br.com.azi.projeto.domain.commons.converter;

import org.apache.commons.collections.CollectionUtils;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.function.Predicate;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public abstract class GenericConverter<L, R> {

    private static final String GET = "get";
    private static final String SET = "set";

    private final Class leftClass;
    private final Class rightClass;
    private List<String> fields;
    private FieldsMatchingMode fieldsMatchingMode;

    public GenericConverter() {
        Type[] actualTypeArguments = ((ParameterizedType) this.getClass().getGenericSuperclass()).getActualTypeArguments();
        this.leftClass = (Class) actualTypeArguments[0];
        this.rightClass = (Class) actualTypeArguments[1];
    }

    public void setFieldMatching(List<String> fields, FieldsMatchingMode fieldsMatchingMode) {
        if (CollectionUtils.isEmpty(fields) || Objects.isNull(fieldsMatchingMode))
            throw new IllegalArgumentException(
                    "Ambos os argumentos devem estar preenchidos, com a lista contendo ao menos um campo."
            );
        this.fields = fields;
        this.fieldsMatchingMode = fieldsMatchingMode;
    }

    public R to(L source) {
        if (Objects.isNull(source))
            return null;

        Object target = callConstructor(this.rightClass);
        copyProperties(source, target, getFieldPredicate());
        return (R) target;
    }

    public void toUpdate(L source, R target) {
        copyProperties(source, target, getFieldPredicate());
    }

    public void toAppend(L source, R target) {
        appendProperties(source, target, getFieldPredicate());
    }

    public L from(R source) {
        if (Objects.isNull(source))
            return null;

        Object target = callConstructor(this.leftClass);
        copyProperties(source, target, getFieldPredicate());
        return (L) target;
    }

    public void fromUpdate(R source, L target) {
        copyProperties(source, target, getFieldPredicate());
    }

    public List<R> toList(List<L> sourceList) {
        return sourceList.stream().map(this::to).collect(Collectors.toList());
    }

    public List<R> toList(Iterable<L> sourceIterable) {
        ArrayList<R> destList = new ArrayList<>();
        sourceIterable.forEach(node -> destList.add(to(node)));
        return destList;
    }

    public List<L> fromList(List<R> sourceList) {
        return sourceList.stream().map(this::from).collect(Collectors.toList());
    }

    private Predicate<Method> getFieldPredicate() {
        final int preffixSize = 3;
        if (FieldsMatchingMode.INCLUDE_ONLY.equals(fieldsMatchingMode))
            return method -> fields.contains(method.getName().substring(preffixSize).toLowerCase());
        else if (FieldsMatchingMode.EXCLUDE.equals(fieldsMatchingMode))
            return method -> !fields.contains(method.getName().substring(preffixSize).toLowerCase());

        return method -> true;
    }

    private static Object callConstructor(Class returnClass) {
        try {
            Constructor constructor = returnClass.getConstructor();
            return constructor.newInstance();
        } catch (NoSuchMethodException | IllegalAccessException | InstantiationException | InvocationTargetException e) {
            throw new NoArgsConstructorNotFoundException();
        }
    }

    private static void copyProperties(Object source, Object target,
                                       Predicate<Method> fieldsPredicate) {
        List<Method> methodsGet = findMethods(GET, source, fieldsPredicate);
        List<Method> methodsSet = findMethods(SET, target, fieldsPredicate);

        methodsSet.forEach(
                methodSet -> discoverOriginMethod(methodSet, methodsGet, source, target)
                        .ifPresent(methodGet -> forceCopy(methodGet, methodSet, source, target))
        );
    }

    private static void appendProperties(Object source, Object target,
                                         Predicate<Method> fieldPredicate) {
        List<Method> methodsGet = findMethods(GET, source, fieldPredicate);
        List<Method> methodsSet = findMethods(SET, target, fieldPredicate);

        methodsSet.forEach(
                methodSet -> discoverOriginMethod(methodSet, methodsGet, source, target)
                        .ifPresent(methodGet -> appendCopy(methodGet, methodSet, source, target))
        );
    }

    private static void appendCopy(Method methodGet, Method methodSet, Object source, Object target) {
        try {
            if (Objects.isNull(methodGet.invoke(source))) return;

            if (isTheSameType(methodGet, methodSet))
                methodSet.invoke(target, methodGet.invoke(source));
            else if (isEnumToString(methodGet, methodSet))
                methodSet.invoke(target, ((Enum) methodGet.invoke(source)).name());
            else if (isStringToEnum(methodGet, methodSet))
                copyStringToEnum(methodGet, methodSet, source, target);
        } catch (Exception e) {
            Logger.getLogger(GenericConverter.class.getName())
                    .log(Level.FINEST, String.format("%s: %s", e.getClass().toGenericString(), e.getMessage()));
        }
    }

    private static Optional<Method> discoverOriginMethod(Method methodSet, List<Method> methodsGet, Object source, Object target) {
        return methodsGet.stream()
                .filter(methodGet -> methodGet.getName().equals(inferOriginMethodName(methodSet.getName())))
                .findFirst();
    }

    private static void forceCopy(Method methodGet, Method methodSet, Object source, Object target) {
        try {
            if (isTheSameType(methodGet, methodSet))
                methodSet.invoke(target, methodGet.invoke(source));
            else if (isEnumToString(methodGet, methodSet))
                methodSet.invoke(target, ((Enum) methodGet.invoke(source)).name());
            else if (isStringToEnum(methodGet, methodSet))
                copyStringToEnum(methodGet, methodSet, source, target);
        } catch (Exception e) {
            Logger.getLogger(GenericConverter.class.getName())
                    .log(Level.FINEST, String.format("%s: %s", e.getClass().toGenericString(), e.getMessage()));
        }
    }

    private static void copyStringToEnum(Method methodGet, Method methodSet, Object source, Object target) throws InvocationTargetException, IllegalAccessException, NoSuchMethodException {
        Class<?> methodSetType = methodSet.getParameterTypes()[0];
        Object value = methodSetType
                .getMethod("valueOf", String.class)
                .invoke(methodSetType, ((String) methodGet.invoke(source)));
        methodSet.invoke(target, value);
    }

    private static boolean isEnumToString(Method methodGet, Method methodSet) {
        return methodGet.getReturnType().isEnum() && methodSet.getParameterTypes()[0].equals(String.class);
    }

    private static boolean isStringToEnum(Method methodGet, Method methodSet) {
        return methodGet.getReturnType().equals(String.class) && methodSet.getParameterTypes()[0].isEnum();
    }

    private static boolean isTheSameType(Method methodGet, Method methodSet) {
        return methodSet.getParameterTypes()[0].equals(methodGet.getReturnType());
    }

    private static List<Method> findMethods(String preffix, Object object,
                                            Predicate<Method> fieldPredicate) {
        return Stream.of(object.getClass().getMethods())
                .filter(fieldPredicate)
                .filter(method -> method.getName().startsWith(preffix))
                .collect(Collectors.toList());
    }

    private static String inferOriginMethodName(String destinationMethodName) {
        return String.format("%s%s", GET, destinationMethodName.substring(SET.length()));
    }

    public enum FieldsMatchingMode {
        INCLUDE_ONLY, EXCLUDE
    }
}
