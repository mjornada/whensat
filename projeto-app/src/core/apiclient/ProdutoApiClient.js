import axios from 'axios'

class ProdutoApiClient {
	async buscarPorNome(produtoNome) {
		return await axios.get(`/hal/public/produtos?produtoNome=${produtoNome}`)
	}
}

export default new ProdutoApiClient()
