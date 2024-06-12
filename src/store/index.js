import {
  createStore
} from 'vuex'

export default createStore({
  state: {
    metaAddress: sessionStorage.getItem('metaAddressSwanv2') || '',
    accessToken: sessionStorage.getItem('access_token_swanv2') || '',
    signature: sessionStorage.getItem('signature_swanv2') || '',
  },
  mutations: {
    SET_METAADDRESS: (state, metaAddress) => {
      state.metaAddress = metaAddress
      sessionStorage.setItem('metaAddressSwanv2', metaAddress)
    },
    SET_ACCESSTOKEN: (state, accessToken) => {
      state.accessToken = accessToken
      sessionStorage.setItem('access_token_swanv2', accessToken)
    },
    SET_SIGNATURE: (state, signature) => {
      state.signature = signature
      sessionStorage.setItem('signature_swanv2', signature)
    }
  },
  actions: {
    setMetaAddress ({
      commit
    }, metaAddress) {
      commit('SET_METAADDRESS', metaAddress)
    },
    setAccessToken ({
      commit
    }, accessToken) {
      commit('SET_ACCESSTOKEN', accessToken)
    },
    setSignature ({
      commit
    }, signature) {
      commit('SET_SIGNATURE', signature)
    }
  },
  modules: {}
})