import { ELINK } from '@/constant/envLink'
import { EStorage } from '@/constant/storage'
import { EStorageTestnet } from '@/constant/storage-testnet'

export const token = ref(getToken())
export const isLogin = computed(() => !!token.value)
export const currentNetwork = ref(window.location.hostname.indexOf('testnet') > -1 ? 'Proxima' : 'Mainnet')
export const metaAddress = ref('')
export const signature = ref('')
export const locationAll = ref([])
export const explorerLink = ref(currentNetwork.value === 'Proxima' ? ELINK.PROXIMAEXPLORER : ELINK.MAINNETEXPLORER)
export const baseurl = currentNetwork.value === 'Mainnet' ? import.meta.env.VITE_BASEAPI : import.meta.env.VITE_BASEAPI_PROXIMA
export const fcpDeposit = import.meta.env.VITE_FCP_DEPOSIT_ADDRESS // _PROXIMA
export const ecpDeposit = import.meta.env.VITE_ECP_DEPOSIT_ADDRESS // _PROXIMA
export const tokenSwan = import.meta.env.VITE_MAINNET_SWANTOKEN_ADDRESS // _PROXIMA
export const addCollateral = ref(false)

export function removeStorage(key: string) {
  localStorage.removeItem(key)
}

export function clearStorage() {
  token.value = ''
  localStorage.clear()
}

export function clearLoginInfo() {
  token.value = ''
  const storageEnv = window.location.hostname.indexOf('testnet') > -1 ? EStorageTestnet : EStorage
  removeStorage(storageEnv.TOKEN)
}

export function setToken(tok: string) {
  token.value = tok
  const storageEnv = window.location.hostname.indexOf('testnet') > -1 ? EStorageTestnet : EStorage
  localStorage.setItem(storageEnv.TOKEN, tok)
}

export function clearMetaAddress() {
  metaAddress.value = ''
  const storageEnv = window.location.hostname.indexOf('testnet') > -1 ? EStorageTestnet : EStorage
  removeStorage(storageEnv.METAADDRESS)
}

export function setMetaAddress(tok: string) {
  metaAddress.value = tok
  const storageEnv = window.location.hostname.indexOf('testnet') > -1 ? EStorageTestnet : EStorage
  localStorage.setItem(storageEnv.METAADDRESS, tok)
}

export function clearSignature() {
  signature.value = ''
  const storageEnv = window.location.hostname.indexOf('testnet') > -1 ? EStorageTestnet : EStorage
  removeStorage(storageEnv.Signature)
}

export function setSignature(tok: string) {
  signature.value = tok
  const storageEnv = window.location.hostname.indexOf('testnet') > -1 ? EStorageTestnet : EStorage
  localStorage.setItem(storageEnv.Signature, tok)
}

export function setLocation(tok: any) {
  locationAll.value = tok
  const storageEnv = window.location.hostname.indexOf('testnet') > -1 ? EStorageTestnet : EStorage
  localStorage.setItem(storageEnv.locationAll, JSON.stringify(tok))
}

export function getLocation() {
  const storageEnv = window.location.hostname.indexOf('testnet') > -1 ? EStorageTestnet : EStorage
  return JSON.parse(JSON.stringify(localStorage.getItem(storageEnv.locationAll))) ?? []
}

export function getToken() {
  const storageEnv = window.location.hostname.indexOf('testnet') > -1 ? EStorageTestnet : EStorage
  return localStorage.getItem(storageEnv.TOKEN) ?? ''
}

export function setAccountInfo(accountInfo: { account: string; password: string }) {
  const storageEnv = window.location.hostname.indexOf('testnet') > -1 ? EStorageTestnet : EStorage
  localStorage.setItem(storageEnv.ACCOUNT_INFO, JSON.stringify(accountInfo))
}

export function getAccountInfo() {
  const storageEnv = window.location.hostname.indexOf('testnet') > -1 ? EStorageTestnet : EStorage
  const accountInfo = localStorage.getItem(storageEnv.ACCOUNT_INFO)
  return accountInfo ? JSON.parse(accountInfo) : { account: '', password: '' }
}
