package br.com.azi.projeto.domain.commons.date;

import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

public class DateUtils {

    public static String formatarData(LocalDateTime date) {
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ");
        return formatter.format(localDateTimeToDate(date));
    }

    private static Date localDateTimeToDate(LocalDateTime startOfDay) {
        return Date.from(startOfDay.atZone(ZoneId.systemDefault()).toInstant());
    }
}
