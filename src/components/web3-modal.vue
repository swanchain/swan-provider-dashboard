<script setup lang="ts">
import { createWeb3Modal, defaultWagmiConfig, useWeb3Modal } from '@web3modal/wagmi/vue'
import { reconnect, disconnect, getChainId, connect } from '@wagmi/core'
import { injected } from '@wagmi/connectors'
import { getAccount, watchAccount } from '@wagmi/core'
import configJS from './../utils/config'
import { Init, login } from '@/utils/login';
import { addCollateral, clearMetaAddress, metaAddress, setMetaAddress, signature, token } from '@/utils/storage';
import { signOutFun, throttleLast, timeout } from '@/utils/common';

const projectId = configJS.projectId
const config = configJS.config
reconnect(config)
// 3. Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  themeMode: 'light',
  themeVariables: {
    '--w3m-accent': '#88acff',
    '--w3m-color-mix': '#ffffff',
    // '--w3m-color-mix': '#447dff',
    '--w3m-color-mix-strength': 50,
    // '--w3m-font-family': 'HELVETICA-ROMAN'
    // '--w3m-font-size-master': '17',
    // '--wcm-text-small-regular-weight': 'normal',
    // '--wcm-text-small-regular-letter-spacing': '3px',
  }
})

let account = reactive(getAccount(config))

// const chainId = reactive(getChainId(config))
// console.log(chainId)

async function login2 () {
  // console.log('here')
  // console.log(account)
  const time = await throttleLast()
  if (!time) return false
  Init(async (addr:string) => {
    if(addr) setMetaAddress(addr)
    await timeout(500)
    login()
  })
}

async function signout2() {
  // clearMetaAddress()
  await signOutFun('disconnect')
  // console.log("in signout function")
  // window.location.reload()
}

watchAccount(config, {
  onChange (account, prevAccount) {
    // account = getAccount(config)
    try {
      // console.log('watch', account)
      // console.log('prev', prevAccount)
      // console.log("changed", account ?.isConnected)
      if (account?.isConnected && token.value === '' && metaAddress.value === '') {
        console.log("prompted")
        if(account?.address) setMetaAddress(account?.address)
        login2()
      } else if (!account?.isConnected && prevAccount?.isConnected) {
        console.log('watchAccount:', account, prevAccount)
        console.log('clear')
        signout2()
      }
    } catch{ console.error }
  },
})

let beginTime = 0; 

window.onbeforeunload = function () {
  beginTime = new Date().getTime();
}

window.onunload = function () {
  let differTime = new Date().getTime() - beginTime;
  if (differTime <= 5) {
    disconnect(config)
    console.log("close")
  } else {
    console.log("Refresh")
  }
}

async function test () {
  // console.log("here")
}

onMounted(() => {
  // console.log(metaAddress.value)
  // console.log(token.value)
})
watch(() => addCollateral.value, () => connect(config, { connector: injected() }))
</script>

<template>
  <div class="flex flex-ai-center">
    <w3m-button balance="hide" size="sm" @click="test" />
    <div @click="login2" v-if="metaAddress !== '' && token === ''" class="button ml-10">Login</div>
  </div>
</template>

<style lang="less" scoped>
.button {
  display: inline-block;
  padding: 0.1rem 0.16rem;
  background-color: var(--color-light);
  cursor: pointer;
  border-radius: 0.08rem;
  line-height: 18px;
  transition: all 0.2s;
  color: var(--color-primary);
}
</style>