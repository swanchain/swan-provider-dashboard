<template>
  <section class="mycps-health">
    <div class="mtb-20">
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ name: 'myCPsPage' }">My CPs</el-breadcrumb-item>
        <el-breadcrumb-item>{{ route.params.cp_addr }}</el-breadcrumb-item>
        <el-breadcrumb-item>Health</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="health-container font-14">
      <div class="progress-container mt-16 mb-32 flex flex-ai-center w-100">
        <div class="piece flex flex-ai-center flex-jc-center">Collaterals</div>
        <div class="piece flex flex-ai-center flex-jc-center">Status</div>
        <div class="piece flex flex-ai-center flex-jc-center">Last Task Info</div>
        <div :class="`piece ${true?'danger' : ''} flex flex-ai-center flex-jc-center`">Last Update</div>
      </div>

      <!-- 1 : FCP, 2 : ECP, else : ECP & FCP -->
      <div class="fcp-list" v-if="cpsData.type !== 2">
        <div class="font-20 font-bold mb-32 m">FCP</div>
        
        <div class="flex flex-wrap flex-ai-center flex-jc-between">
          <div class="font-16 font-medium">Collaterals</div>
          <div class="flex flex-wrap flex-ai-center">
            <span>{{ replaceNumberFormat(balanceData?.requried, 2) }} required,</span>
            <span class="color-success">&nbsp;{{ replaceNumberFormat(collateralCPData.fcp.Current, 2) }} current,</span>
            <span class="color-danger">&nbsp;{{ replaceNumberFormat(Math.max(0, (balanceData?.requried - collateralCPData.fcp.Current)), 2) }} insufficient</span>
          </div>
        </div>
        <div class="w-100 mt-24" v-if="collateralCPData.fcp.collaterals">
          <el-progress :stroke-width="16" :percentage="collateralCPData.fcp.collaterals" :color="collateralCPData.fcp.collaterals >= 100 ? '#67c23a':'#f56c6c'" />
        </div>
        <el-divider />
        <div class="flex flex-wrap flex-ai-center flex-jc-between">
          <div class="font-16 font-medium">Status</div>
          <div class="flex flex-ai-center flex-wrap">
            CP status:
            <span class="font-bold ml-8 mr-8" :style="taskColor(cpsData?.fcp_status)">{{ cpsData?.fcp_status ?? '-' }}</span>
            / GPU status: 
            <span class="ml-8">1 available, 5 total</span>
          </div>
        </div>
        <el-divider />
        <div class="flex flex-wrap flex-ai-center flex-jc-between">
          <div class="font-16 font-medium">Last Task Info</div>
        </div>
        <el-divider />
        <div class="flex flex-wrap flex-ai-center flex-jc-between">
          <div class="font-16 font-medium">Last Update</div>
          <span>yy-mm-dd hh:mm:ss</span>
        </div>
      </div>
      <div class="ecp-list" v-if="cpsData.type !== 1">
        <div class="font-20 font-bold mb-32 m">ECP</div>
        
        <div class="flex flex-wrap flex-ai-center flex-jc-between">
          <div class="font-16 font-medium">Collaterals</div>
          <div class="flex flex-ai-center flex-jc-right flex-wrap">
            <span>{{ replaceNumberFormat(balanceData?.requried, 2) }} required,</span>
            <span class="color-success">&nbsp;{{ replaceNumberFormat(collateralCPData.ecp.Current, 2) }} current,</span>
            <span class="color-danger">&nbsp;{{ replaceNumberFormat(Math.max(0, (balanceData?.requried - collateralCPData.ecp.Current)), 2) }} insufficient</span>
          </div>
        </div>
        <div class="w-100 mt-24" v-if="collateralCPData.ecp.collaterals">
          <el-progress :stroke-width="16" :percentage="collateralCPData.ecp.collaterals" :color="collateralCPData.ecp.collaterals >= 100 ? '#67c23a':'#f56c6c'" />
        </div>
        <el-divider />
        <div class="flex flex-wrap flex-ai-center flex-jc-between">
          <div class="font-16 font-medium">Status</div>
          <div class="flex flex-ai-center flex-wrap">
            CP status:
            <span class="font-bold ml-8 mr-8" :style="taskColor(cpsData?.ecp_status)">{{ cpsData?.ecp_status ?? '-' }}</span>
            / GPU status: 
            <span class="ml-8">1 available, 5 total</span>
          </div>
        </div>
        <el-divider />
        <div class="flex flex-wrap flex-ai-center flex-jc-between">
          <div class="font-16 font-medium">Last Task Info</div>
        </div>
        <el-divider />
        <div class="flex flex-wrap flex-ai-center flex-jc-between">
          <div class="font-16 font-medium">Last Update</div>
          <span>yy-mm-dd hh:mm:ss</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { getCPsBalancesData, getCPsData } from '@/api/cp-profile'
import { replaceNumberFormat, taskColor } from '@/utils/common'
import { ecpDeposit, ecpSequencer, fcpDeposit, rpcLink } from '@/utils/storage'
import { ArrowRight } from '@element-plus/icons-vue'
import fcpABI from '@/utils/abi/SwanCreditCollateral.json'
import ecpABI from '@/utils/abi/ECPCollateral.json'
import sequencerABI from '@/utils/abi/Sequencer.json'

const route = useRoute()
const cpsLoad = ref(false)
const cpsData = ref<any>({})
const balanceLoad = ref(false)
const balanceData = ref<any>({})
const collateralCPData = reactive<any>({
  ecp: {
    Collateral: '0',
    Escrow: '0',
    Sequencer: '0',
    Current: 0,
    collaterals: 0
  },
  fcp: {
    Collateral: '0',
    Escrow: '0',
    Current: 0,
    collaterals: 0
  }
})

async function getAllCPsData() {
  cpsLoad.value = true
  try{
    const cpsRes = await getCPsData(route.params.cp_addr)
    cpsData.value = cpsRes?.data ?? {}
  }catch{console.error}
  cpsLoad.value = false
}
async function getCPsBalanceData() {
  balanceLoad.value = true
  try{
    const balanceRes = await getCPsBalancesData(route.params.cp_addr)
    let list = balanceRes?.data ?? {}
    list.requried = Number(list?.base_collateral * (list?.cu / 100)) ?? 0
    balanceData.value = list
    fcpCollateral()
    ecpCollateral()
  }catch{console.error}
  balanceLoad.value = false
}
async function getFCPColleralData() {
  try {
    let web3 = new Web3(new Web3.providers.HttpProvider(rpcLink.value));
    const fcpContract = new web3.eth.Contract(fcpABI, fcpDeposit)
    const fcpCpInfoData = await fcpContract.methods.cpInfo(route.params.cp_addr).call()
    const available = fcpCpInfoData.availableBalance ?? '0'
    const escrow = fcpCpInfoData.lockedBalance ?? '0'
    collateralCPData.fcp.Collateral = web3.utils.fromWei(String(available), 'ether')
    collateralCPData.fcp.Escrow = web3.utils.fromWei(String(escrow), 'ether')
    collateralCPData.fcp.Current = Number(collateralCPData.fcp.Collateral) + Number(collateralCPData.fcp.Escrow)
    // console.log('fcp:', fcpCpInfoData, collateralCPData.fcp)
    fcpCollateral()
  } catch { console.error }
}
async function getECPColleralData() {
  try {
    let web3 = new Web3(new Web3.providers.HttpProvider(rpcLink.value));
    const ecpContract = new web3.eth.Contract(ecpABI, ecpDeposit)
    const ecpCpInfoData = await ecpContract.methods.cpInfo(route.params.cp_addr).call()
    const collateral = ecpCpInfoData?.balance ?? '0'
    const escrow = ecpCpInfoData?.frozenBalance ?? '0'
    collateralCPData.ecp.Collateral = web3.utils.fromWei(String(collateral), 'ether')
    // console.log(collateralCPData.ecp.Collateral)
    collateralCPData.ecp.Escrow =  web3.utils.fromWei(String(escrow), 'ether')
    collateralCPData.ecp.Current = Number(collateralCPData.ecp.Collateral) + Number(collateralCPData.ecp.Escrow)
    // console.log('ecp:', ecpCpInfoData, collateralCPData.ecp)
    ecpCollateral()
  } catch { console.error }
}
onMounted(async () => {
  getAllCPsData()
  getCPsBalanceData()
  getFCPColleralData()
  getECPColleralData()
})

function fcpCollateral() {
  try {
    collateralCPData.fcp.collaterals = Math.floor((Number(collateralCPData.fcp.Current) / Number(balanceData.value?.requried)) * 100) 
    console.log('fcp:', collateralCPData.fcp.collaterals)
  } catch { console.error }
}

function ecpCollateral() {
  try {
    collateralCPData.ecp.collaterals = Math.floor((Number(collateralCPData.ecp.Current) / Number(balanceData.value?.requried)) * 100)
    console.log('ecp:', collateralCPData.ecp.collaterals)
  } catch { console.error }
}
</script>

<style lang="less" scoped>
.mycps-health {
  .progress-container {
    .piece {
      width: 25%;
      height: 0.65rem;
      background-color: var(--color-success);
      color: var(--color-light-opacity-80);
      &.danger {
        background-color: var(--color-danger);
      }
    }
  }
  .health-container {
    position: relative;
    width: calc(100% - 0.64rem);
    height: calc(100% - 0.5rem);
    padding: 0.25rem 0.32rem 0.4rem;
    background-color: var(--color-light);
    border-radius: 0.14rem;
    @media screen and (max-width: 768px) {
    }
    .m {
      padding: 0.1rem 0;
      border-bottom: 1px solid #eee;
    }
    .title-status {
      padding: 0.12rem 0.2rem;
      background-color: var(--color-success);
      border-radius: 0.1rem;
      color: var(--color-light);
      &.danger {
        background-color: var(--color-danger);
      }
    }
    :deep(.el-progress) {
      .el-progress__text {
        font-size: var(--font-14) !important;
      }
    }
  }
}
</style>
