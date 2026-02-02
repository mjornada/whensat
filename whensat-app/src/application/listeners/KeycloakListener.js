import Keycloak from 'keycloak-js'
import axios from 'axios'
import store from '@/core/store'

class KeycloakListener {
	async execute() {
		try {
			this.createAdapter()
			await this.startConnection()
			this.setCredentials()
			this.setRefreshToken()
			this.setDataInApplicationState()
		} catch (error) {
			throw new Error('Erro ao iniciar KeycloakAdapter' + error)
		}
	}

	createAdapter() {
		this.configuration = {
			url: '/auth',
			realm: 'az',
			clientId: 'whensat-app',
		}

		this.keycloakAdapter = Keycloak(this.configuration)
	}

	async startConnection() {
		await this.keycloakAdapter.init({ onLoad: 'login-required' })
	}

	setCredentials() {
		axios.defaults.headers.common['Authorization'] = `Bearer ${this.keycloakAdapter.token}`
	}

	setRefreshToken() {
		setInterval(async () => {
			const refreshed = await this.keycloakAdapter.updateToken(15)
			if (refreshed) {
				this.setCredentials()
			}
		}, 10000)
	}

	setDataInApplicationState() {
		store.state.loki.product.logoutUrl = this.createLogoutUrl()
		store.state.loki.product.profileUrl = this.createProfileURL()
	}

	createLogoutUrl() {
		return this.keycloakAdapter.createLogoutUrl()
	}

	createProfileURL() {
		return `${this.configuration.url}/realms/${this.configuration.realm}/account`
	}
}

export default new KeycloakListener()
