import buscarProdutoListener from '@/application/listeners/BuscarProdutoListener'
import keycloakListener from '@/application/listeners/KeycloakListener'
import buscarUsuarioLogadoListener from '@/application/listeners/BuscarUsuarioLogadoListener'
import interceptadorHttp from '@/application/listeners/InterceptadorHttp'
import registerGlobalComponentsListener from '@/application/listeners/RegisterGlobalComponentsListener'
import setApiArquivoListener from '@/application/listeners/SetApiArquivoListener'
import setFusoHorarioListener from '@/application/listeners/SetFusoHorarioListener'
import setMensagemLoadingListener from '@/application/listeners/SetMensagemLoadingListener'
import setMenuAvatarListener from '@/application/listeners/SetMenuAvatarListener'

export default {
	buscarProdutoListener,
	keycloakListener,
	buscarUsuarioLogadoListener,
	interceptadorHttp,
	registerGlobalComponentsListener,
	setApiArquivoListener,
	setFusoHorarioListener,
	setMensagemLoadingListener,
	setMenuAvatarListener,
}
