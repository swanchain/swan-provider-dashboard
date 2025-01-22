<template>
  <section>
    <el-row :gutter="bodyWidth">
      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mt-10">
        <div class="module-container">
          <div class="m w-100 flex flex-ai-start flex-jc-between">
            <div class='chart-pie' id='chart-pie-fcp' v-loading="providersLoad" element-loading-background="rgba(255, 255, 255, 0.8)"></div>
            <div class="chart-pie-balance flex flex-ai-start baseline">
              <el-row class="m w-100">
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex flex-ai-center baseline">
                  <div class="flex flex-ai-center flex-jc-between width border">
                    <span class="font-18">FCP</span>
                    <div v-if="!metaAddress" :class="`collateral m blue pointer`" @click="addCollateral=!addCollateral">Add Collateral</div>
                    <div v-else :class="`collateral m blue ${metaAddress?'pointer':'is-disabled'}`" @click="handleSelect('cpProfile', {}, 'FCP')">Add Collateral</div>
                  </div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex flex-ai-center baseline">
                  <div class="flex flex-ai-center flex-jc-between width">
                    <span>Collateral:</span>
                    <span class="text-right">{{ replaceDecimalsFormat(collateralCPData.fcp.Collateral) }} SWAN</span>
                  </div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex flex-ai-center baseline">
                  <div class="flex flex-ai-center flex-jc-between width">
                    <span>Escrow: </span>
                    <span>{{ replaceDecimalsFormat(collateralCPData.fcp.Escrow) }} SWAN</span>
                  </div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex flex-ai-center baseline">
                  <div class="flex flex-ai-center flex-jc-between width">
                    <div class="flex flex-ai-center">
                      <el-popover placement="top" effect="dark" popper-style="width:auto; max-width:300px;word-break: break-word; text-align: left;font-size:12px;" trigger="hover">
                        <template #reference>
                          <div class="flex flex-ai-center">
                            UBI
                            <xy-icon class="icon ml-4 mb-2" :nameProps="'Info-Icon'" :width="'0.18rem'" :height="'0.18rem'"></xy-icon>
                          </div>
                        </template>
                        Universal Basic Income. See details <span class="underline pointer" @click="openPage('https://docs.swanchain.io/core-concepts/token/swan-universal-basic-income-ubi')">here</span>.
                      </el-popover>:
                    </div>
                    <span>{{ balanceData?.fcp_ubi ? replaceDecimalsFormat(balanceData?.fcp_ubi) : 0 }} SWAN</span>
                  </div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex flex-ai-center baseline">
                  <div class="flex flex-ai-center flex-jc-between width">
                    <span>Application Reward: </span>
                    <span>{{ balanceData?.fcp_reward ? replaceDecimalsFormat(balanceData?.fcp_reward) : 0 }} SWAN</span>
                  </div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex flex-ai-center baseline">
                  <div class="flex flex-ai-center flex-jc-between width">
                    <div class="flex flex-ai-center">
                      <el-popover placement="top" effect="dark" popper-style="width:auto; max-width:300px;word-break: break-word; text-align: left;font-size:12px;" trigger="hover">
                        <template #reference>
                          <div class="flex flex-ai-center">
                            CU
                            <xy-icon class="icon ml-4 mb-2" :nameProps="'Info-Icon'" :width="'0.18rem'" :height="'0.18rem'"></xy-icon>
                          </div>
                        </template>
                        Computing units indicate the computing power in the swan network.
                      </el-popover>:
                    </div>
                    <span>{{ props.cpsData.type !== 2 ? replaceDecimalsFormat(balanceData?.cu/100) : 0 }}</span>
                  </div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex flex-ai-center baseline">
                  <div class="flex flex-ai-center flex-jc-between width nowrap">
                    <div class="flex flex-ai-center nowrap mr-16">
                      <el-popover placement="top" effect="dark" popper-style="width:auto; max-width:300px;word-break: break-word; text-align: left;font-size:12px;" trigger="hover">
                        <template #reference>
                          <div class="flex flex-ai-center nowrap">
                            Collateral Status
                            <xy-icon class="icon ml-4 mb-2" :nameProps="'Info-Icon'" :width="'0.18rem'" :height="'0.18rem'"></xy-icon>
                          </div>
                        </template>
                        "insufficient" indicates the collaterals that needs to be recharged.
                      </el-popover>:
                    </div>
                    <div class="flex flex-ai-center flex-jc-right flex-wrap">
                      <span>{{ props.cpsData.type !== 2 ? replaceNumberFormat(balanceData?.requried, 2) : 0 }} required,</span>
                      <span class="color-success">&nbsp;{{ replaceNumberFormat(collateralCPData.fcp.Current, 2) }} current,</span>
                      <span class="color-danger">&nbsp;{{ props.cpsData.type !== 2 ? replaceNumberFormat(Math.max(0, (balanceData?.requried - collateralCPData.fcp.Current)), 2) : 0 }} insufficient</span>
                    </div>
                  </div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex flex-ai-center baseline">
                  <div class="flex flex-ai-center flex-jc-between width">
                    <span>Status:</span>
                    <span class="font-bold" :style="taskColor(props.cpsData?.fcp_status)">{{ props.cpsData?.fcp_status ?? '-' }}</span>
                  </div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex flex-ai-center baseline">
                  <div class="flex flex-ai-center flex-jc-between width" style="opacity:0">CU</div>
                </el-col>
              </el-row>
            </div>
          </div>

          <div class="module-echarts mt-16 mb-32">
            <div class='chart-trends' id='chart-job-fcp-task' v-loading="providersLoad" element-loading-background="rgba(255, 255, 255, 0.8)"></div>
          </div>
          <div class="module-echarts mt-16 mb-32">
            <div class="title flex flex-ai-center flex-jc-between mb-16">
              <p class="font-16 weight-4 mr-16">Job Stats</p>
              <p class="font-14 subtitle">Total Jobs: {{ replaceFormat(totalJob) }}</p>
            </div>
            <div class='chart-trends' id='chart-job-fcp' v-loading="providersLoad" element-loading-background="rgba(255, 255, 255, 0.8)"></div>
          </div>
          <div class="module-echarts">
            <div class="title mb-16">
              <p class="font-16 weight-4">Collateral</p>
            </div>
            <div class='chart-trends' id='chart-collateral-fcp' v-loading="providersLoad" element-loading-background="rgba(255, 255, 255, 0.8)"></div>
          </div>
        </div>
      </el-col>

      <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="mt-10">
        <div class="module-container">
          <div class="m w-100 flex flex-ai-start flex-jc-between">
            <div class='chart-pie' id='chart-pie-ecp' v-loading="providersLoad" element-loading-background="rgba(255, 255, 255, 0.8)"></div>
            <div class="chart-pie-balance flex flex-ai-start baseline">
              <el-row class="m w-100">
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex flex-ai-center baseline">
                  <div class="flex flex-ai-center flex-jc-between width border">
                    <span class="font-18">ECP</span>
                    <div v-if="!metaAddress" :class="`collateral m blue pointer`" @click="addCollateral=!addCollateral">Add Collateral</div>
                    <div v-else :class="`collateral m blue ${metaAddress?'pointer':'is-disabled'}`" @click="handleSelect('cpProfile', {}, 'ECP')">Add Collateral</div>
                  </div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex flex-ai-center baseline">
                  <div class="flex flex-ai-center flex-jc-between width">
                    <span>Collateral:</span>
                    <span class="text-right">{{ replaceDecimalsFormat(collateralCPData.ecp.Collateral) }} SWAN</span>
                  </div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex flex-ai-center baseline">
                  <div class="flex flex-ai-center flex-jc-between width">
                    <span>Escrow: </span>
                    <span>{{ replaceDecimalsFormat(collateralCPData.ecp.Escrow) }} SWAN</span>
                  </div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex flex-ai-center baseline">
                  <div class="flex flex-ai-center flex-jc-between width">
                    <div class="flex flex-ai-center">
                      <el-popover placement="top" :width="300" effect="dark" popper-style="word-break: break-word; text-align: left;font-size:12px;" trigger="hover">
                        <template #reference>
                          <div class="flex flex-ai-center">
                            Sequencer
                            <xy-icon class="icon ml-4 mb-2" :nameProps="'Info-Icon'" :width="'0.18rem'" :height="'0.18rem'"></xy-icon>
                          </div>
                        </template>
                        Every ZK task consumes 0.00001 ETH and you shall get 48 task per day. 1 week consumption( 0.00336 ETH) is recommended.
                      </el-popover>:
                    </div>
                    <span>{{ replaceDecimalsFormat(collateralCPData.ecp.Sequencer) }} ETH</span>
                  </div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex flex-ai-center baseline">
                  <div class="flex flex-ai-center flex-jc-between width">
                    <div class="flex flex-ai-center">
                      <el-popover placement="top" effect="dark" popper-style="width:auto; max-width:300px;word-break: break-word; text-align: left;font-size:12px;" trigger="hover">
                        <template #reference>
                          <div class="flex flex-ai-center">
                            UBI
                            <xy-icon class="icon ml-4 mb-2" :nameProps="'Info-Icon'" :width="'0.18rem'" :height="'0.18rem'"></xy-icon>
                          </div>
                        </template>
                        Universal Basic Income. See details <span class="underline pointer" @click="openPage('https://docs.swanchain.io/core-concepts/token/swan-universal-basic-income-ubi')">here</span>.
                      </el-popover>:
                    </div>
                    <span>{{ balanceData?.ecp_ubi ? replaceDecimalsFormat(balanceData?.ecp_ubi) : 0 }} SWAN</span>
                  </div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex flex-ai-center baseline">
                  <div class="flex flex-ai-center flex-jc-between width">
                    <span>Application Reward: </span>
                    <span>{{ balanceData?.ecp_reward ? replaceDecimalsFormat(balanceData?.ecp_reward) : 0 }} SWAN</span>
                  </div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex flex-ai-center baseline">
                  <div class="flex flex-ai-center flex-jc-between width">
                    <div class="flex flex-ai-center">
                      <el-popover placement="top" effect="dark" popper-style="width:auto; max-width:300px;word-break: break-word; text-align: left;font-size:12px;" trigger="hover">
                        <template #reference>
                          <div class="flex flex-ai-center">
                            CU
                            <xy-icon class="icon ml-4 mb-2" :nameProps="'Info-Icon'" :width="'0.18rem'" :height="'0.18rem'"></xy-icon>
                          </div>
                        </template>
                        Computing units indicate the computing power in the swan network.
                      </el-popover>:
                    </div>
                    <span>{{ props.cpsData.type !== 1 ? replaceDecimalsFormat(balanceData?.cu/100) : 0 }}</span>
                  </div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex flex-ai-center baseline">
                  <div class="flex flex-ai-center flex-jc-between width nowrap">
                    <div class="flex flex-ai-center nowrap mr-16">
                      <el-popover placement="top" effect="dark" popper-style="width:auto; max-width:300px;word-break: break-word; text-align: left;font-size:12px;" trigger="hover">
                        <template #reference>
                          <div class="flex flex-ai-center nowrap">
                            <span>Collateral Status</span>
                            <xy-icon class="icon ml-4 mb-2" :nameProps="'Info-Icon'" :width="'0.18rem'" :height="'0.18rem'"></xy-icon>
                          </div>
                        </template>
                        "insufficient" indicates the collaterals that needs to be recharged.
                      </el-popover>:
                    </div>
                    <div class="flex flex-ai-center flex-jc-right flex-wrap">
                      <span>{{ props.cpsData.type !== 1 ? replaceNumberFormat(balanceData?.requried, 2) : 0 }} required,</span>
                      <span class="color-success">&nbsp;{{ replaceNumberFormat(collateralCPData.ecp.Current, 2) }} current,</span>
                      <span class="color-danger">&nbsp;{{ props.cpsData.type !== 1 ? replaceNumberFormat(Math.max(0, (balanceData?.requried - collateralCPData.ecp.Current)), 2) : 0 }} insufficient</span>
                    </div>
                  </div>
                </el-col>
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex flex-ai-center baseline">
                  <div class="flex flex-ai-center flex-jc-between width">
                    <span>Status:</span>
                    <span class="font-bold" :style="taskColor(props.cpsData?.ecp_status)">{{ props.cpsData?.ecp_status ?? '-' }}</span>
                  </div>
                </el-col>
                <!-- <el-col :xs="24" :sm="24" :md="10" :lg="6" :xl="6" class="flex flex-ai-center flex-jc-right">
                  <div :class="`collateral m blue ${metaAddress?'pointer':'is-disabled'}`" @click="handleSelect('cpProfile', {}, 'Sequencer')">Add</div>
                </el-col> -->
              </el-row>
            </div>
          </div>

          <div class="module-echarts mt-16 mb-32">
            <div class='chart-trends' id='chart-job-ecp-task' v-loading="providersLoad" element-loading-background="rgba(255, 255, 255, 0.8)"></div>
          </div>
          <div class="module-echarts mt-16 mb-32">
            <div class="title flex flex-ai-center flex-jc-between mb-16">
              <p class="font-16 weight-4 mr-16">Job Stats</p>
              <p class="font-14 subtitle">Total Jobs: {{ replaceFormat(totalReward) }}</p>
            </div>
            <div class='chart-trends' id='chart-job-ecp' v-loading="providersLoad" element-loading-background="rgba(255, 255, 255, 0.8)"></div>
          </div>
          <div class="module-echarts">
            <div class="title mb-16">
              <p class="font-16 weight-4">Collateral</p>
            </div>
            <div class='chart-trends' id='chart-collateral-ecp' v-loading="providersLoad" element-loading-background="rgba(255, 255, 255, 0.8)"></div>
          </div>
        </div>
      </el-col>
    </el-row>
 
    <vm-dialog v-if="vmOperate.centerDrawerVisible" :centerDrawerVisible="vmOperate.centerDrawerVisible" :list="vmOperate.row" @hardClose="hardClose"></vm-dialog>   
  </section>
</template>

<script setup lang="ts">
import vmDialog from "@/components/vmDialog.vue"
import { getCPsBalancesData, getCPsEchartsData } from "@/api/cp-profile";
import { addCollateral, ecpDeposit, ecpSequencer, fcpDeposit, metaAddress, rpcLink } from "@/utils/storage"
import { cutArraysToShortestLength, dataCpData, dataCpRateData, dataDelta, dataGPU, getDateRange, replaceDecimalsFormat, replaceFormat, replaceNumberFormat, sumArrays, taskColor } from "@/utils/common";
import * as echarts from "echarts"
import { openPage } from "@/hooks/router";
import XyIcon from '@/base-ui/xy-icon.vue'
import fcpABI from '@/utils/abi/SwanCreditCollateral.json'
import ecpABI from '@/utils/abi/ECPCollateral.json'
import sequencerABI from '@/utils/abi/Sequencer.json'

const route = useRoute()
const bodyWidth = ref(document.body.clientWidth > 1440 ? 24 : 10)
const providersLoad = ref(false)
const weekList = reactive({
  value: 'Week',
  options: [
    {
      value: 'Week',
      label: '1 Week'
    },
    {
      value: 'Month',
      label: '1 Month'
    },
    {
      value: 'Year',
      label: '1 Year'
    }]
})
const totalJob = ref(0)
const totalReward = ref(0)
const balanceLoad = ref(false)
const balanceData = ref<any>({})
const vmOperate = reactive({
  centerDrawerVisible: false,
  row: {},
  type: 'dialog'
})
const collateralCPData = reactive<any>({
  ecp: {
    Collateral: '0',
    Escrow: '0',
    Sequencer: '0',
    Current: 0
  },
  fcp: {
    Collateral: '0',
    Escrow: '0',
    Current: 0
  }
})
  
function hardClose (dialog:boolean) {
  vmOperate.centerDrawerVisible = dialog
}
async function handleSelect (key:string, row:any, type:string) {
  switch (key) {
    case 'cpProfile':
      vmOperate.row = row
      vmOperate.row.type = type
      vmOperate.type = 'dialog'
      vmOperate.centerDrawerVisible = metaAddress.value === '' ? false : true
      break;
  }
}
const changetype = async (data: any) => {
  const machart_job_fcp = echarts.init(document.getElementById("chart-job-fcp"));
  const machart_job_fcp_task = echarts.init(document.getElementById("chart-job-fcp-task"));
  const machart_job_ecp = echarts.init(document.getElementById("chart-job-ecp"));
  const machart_job_ecp_task = echarts.init(document.getElementById("chart-job-ecp-task"));
  const machart_collateral_fcp = echarts.init(document.getElementById("chart-collateral-fcp"));
  const machart_collateral_ecp = echarts.init(document.getElementById("chart-collateral-ecp"));
  
  const fcpCountsData = await dataCpData(data.fcp_job, 'total')
  const fcpRunningData = await dataDelta(data.fcp_job, 'delta', 'total')
  const fcpCountsNumberMax = Math.max(...fcpCountsData.datum) >= 0 ? 1.1 : 0.9
  const fcpCountsMax = Math.ceil(Math.max(...fcpCountsData.datum)*fcpCountsNumberMax)
  const fcpCountsNumber = Math.min(...fcpCountsData.datum) >= 0 ? 0.9 : 1.1
  const fcpCountsMin = Math.floor(Math.min(...fcpCountsData.datum)*fcpCountsNumber)
  const fcpCountsInterval = Math.ceil((fcpCountsMax-fcpCountsMin)/(fcpCountsMin===0?4:5))
  const fcpRunningNumberMax = Math.max(...fcpRunningData.datum) >= 0 ? 1.1 : 0.9
  const fcpRunningMax = Math.ceil(Math.max(...fcpRunningData.datum)*fcpRunningNumberMax)
  const fcpRunningNumber = Math.min(...fcpRunningData.datum) >= 0 ? 0.9 : 1.1
  const fcpRunningMin = Math.floor(Math.min(...fcpRunningData.datum)*fcpRunningNumber)
  const fcpRunningInterval = Math.ceil((fcpRunningMax-fcpRunningMin)/(fcpRunningMin===0?4:5))
  totalJob.value = data.fcp_job && data.fcp_job.length > 0 ? data.fcp_job.slice(-1)[0].total : 0

  const fcpSamplingData = await dataCpData(data.fcp_sampling_task, 'total')
  const fcpSuccessData = await dataCpRateData(data.fcp_sampling_task, 'active')
  const fcpSamplingNumber = Math.min(...fcpSamplingData.datum) >= 0 ? 0.9 : 1.1
  const fcpSamplingMin = Math.floor(Math.min(...fcpSamplingData.datum)*fcpSamplingNumber)
  const fcpSamplingNumberMax = Math.max(...fcpSamplingData.datum) >= 0 ? 1.1 : 0.9
  const fcpSamplingMax = Math.ceil(Math.max(...fcpSamplingData.datum)*fcpSamplingNumberMax)
  const fcpSamplingInterval = Math.ceil((fcpSamplingMax-fcpSamplingMin)/(fcpSamplingMin===0?4:5))

  const ecpZKTaskData = await dataCpData(data.ecp_zk_task, 'total')
  const ecpSuccessData = await dataCpRateData(data.ecp_zk_task, 'active')
  const ecpZKTaskNumber = Math.min(...ecpZKTaskData.datum) >= 0 ? 0.9 : 1.1
  const ecpZKTaskMin = Math.floor(Math.min(...ecpZKTaskData.datum)*ecpZKTaskNumber)
  const ecpZKTaskNumberMax = Math.max(...ecpZKTaskData.datum) >= 0 ? 1.1 : 0.9
  const ecpZKTaskMax = Math.ceil(Math.max(...ecpZKTaskData.datum)*ecpZKTaskNumberMax)
  const ecpZKTaskInterval = Math.ceil((ecpZKTaskMax-ecpZKTaskMin)/(ecpZKTaskMin===0?4:5))

  const fcpCollateralData = await dataCpData(data.fcp_collateral, 'total')
  const fcpEscrowData = await dataCpData(data.fcp_collateral, 'active')
  const fcpCollaMax = Math.max(Math.max(...fcpCollateralData.datum), Math.max(...fcpEscrowData.datum))
  const fcpCollaNumberMax = fcpCollaMax >= 0 ? 1.1 : 0.9
  const fcpCollateralMax = Math.ceil(fcpCollaMax*fcpCollaNumberMax)
  const fcpCollaMin = Math.min(Math.min(...fcpCollateralData.datum), Math.min(...fcpEscrowData.datum))
  const fcpEscrowNumber = fcpCollaMin >= 0 ? 0.9 : 1.1
  const fcpCollateralMin = Math.floor(fcpCollaMin*fcpEscrowNumber)

  const ecpCountsData = await dataCpData(data.ecp_task, 'total')
  const ecpGrowthData = await dataDelta(data.ecp_task, 'delta', 'total')
  const ecpCountNumberMax = Math.max(...ecpCountsData.datum) >= 0 ? 1.1 : 0.9
  const ecpCountMax = Math.ceil(Math.max(...ecpCountsData.datum)*ecpCountNumberMax)
  const ecpCountNumber = Math.min(...ecpCountsData.datum) >= 0 ? 0.9 : 1.1
  const ecpCountMin = Math.floor(Math.min(...ecpCountsData.datum)*ecpCountNumber)
  const ecpGrowthNumberMax = Math.max(...ecpGrowthData.datum) >= 0 ? 1.1 : 0.9
  const ecpGrowthMax = Math.ceil(Math.max(...ecpGrowthData.datum)*ecpGrowthNumberMax)
  const ecpGrowthNumber = Math.min(...ecpGrowthData.datum) >= 0 ? 0.9 : 1.1
  const ecpGrowthMin = Math.floor(Math.min(...ecpGrowthData.datum)*ecpGrowthNumber)
  const ecpCountsInterval = Math.ceil((ecpCountMax-ecpCountMin)/(ecpCountMin===0?4:5))
  const ecpGrowthInterval = Math.ceil((ecpGrowthMax-ecpGrowthMin)/(ecpGrowthMin===0?4:5))
  // totalReward.value = sumArrays(ecpCountsData.datum, [])
  totalReward.value = data.ecp_task && data.ecp_task.length > 0 ? data.ecp_task.slice(-1)[0].total : 0

  const [ecpCollateralAllData, sequencerData] = cutArraysToShortestLength(data.ecp_collateral, data.sequencer);
  const ecpCollateralData = await dataCpData(ecpCollateralAllData, 'total')
  const ecpEscrowData = await dataCpData(ecpCollateralAllData, 'active')
  const ecpCollaMax = Math.max(Math.max(...ecpCollateralData.datum), Math.max(...ecpEscrowData.datum))
  const ecpCollateralMax = Math.ceil(ecpCollaMax*(ecpCollaMax>=0?1.1:0.9))
  const ecpCollaMin = Math.min(Math.min(...ecpEscrowData.datum), Math.min(...ecpCollateralData.datum))
  const ecpEscrowNumber = ecpCollaMin >= 0 ? 0.9 : 1.1
  const ecpCollateralMin = Math.floor(ecpCollaMin*ecpEscrowNumber)
  const ecpSequencerData = await dataCpData(sequencerData, 'total')
  const ecpSequenceNumberMax = Math.max(...ecpSequencerData.datum) >= 0 ? 1.05 : 0.9
  const ecpSequencerMax = (Math.max(...ecpSequencerData.datum)*ecpSequenceNumberMax).toFixed(5)
  const ecpSequenceNumber = Math.min(...ecpSequencerData.datum) >= 0 ? 0.95 : 1.05
  const ecpSequencerMin = (Math.min(...ecpSequencerData.datum)*ecpSequenceNumber).toFixed(5);

  const option1 = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0, 0, 0, 1)',
      color: '#fff',
      borderWidth: 0,
      borderRadius: 9,
      textStyle: {
        color: '#fff',
        fontSize: document.documentElement.clientWidth >= 1920 ? 17 : 12,
        fontFamily: 'HELVETICA-ROMAN'
      },
      icon: 'roundRect',
      formatter: function (params) {
        var result = params[0].name + '<br/>'; 
        params.forEach(function (item) {
          // var color = item.color.colorStops ? item.color.colorStops[0].color : item.color; 
          // let colorDot = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + color + ';"></span>';
          // result += colorDot + item.seriesName + ' ' + item.value + 'Used 26Free' + '<br/>';
          var color = item.color.colorStops ? item.color.colorStops[0].color : item.color; 
          let colorDot = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + color + ';"></span>';
          result += colorDot + item.seriesName + ': ' + replaceFormat(item.value) + '<br/>'; 
        });
        return result;
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      top: '10%',
      bottom: '13%',
      containLabel: true
    },
    legend: {
      data: ['Job Counts', 'Job Running'],
      right: 'auto',
      bottom: '0',
      // icon: 'circle',
      // itemWidth: 10,
      // itemHeight: 10,
      itemGap: 20,
      textStyle: {
        color: '#95a3bd',
        fontSize: document.documentElement.clientWidth >= 1920 ? 17 : 12,
        fontFamily: 'HELVETICA-ROMAN',
        // lineHeight: 14,
        rich: {
          a: {
            verticalAlign: 'middle',
          },
        },
        padding: [0, 0, -2, 2]
      }
    },
    xAxis: [
      {
        type: 'category',
        axisTick: {
          show: false
        },
        axisLabel: {
          fontSize: document.documentElement.clientWidth >= 1920 ? 17 : 12,
          color: '#7c889b',
          interval: function (index, value) {
            var count = 7;
            var step = Math.ceil(fcpCountsData.timeArr.length / count); 
            return index % step === 0 ? value : false;
          },
          //   formatter: '{value}'
        },
        // prettier-ignore
        data: fcpCountsData.timeArr
      }
    ],
    yAxis: [
      {
        type: 'value',
        // name: 'Job Success'
        axisLabel: {
          fontSize: document.documentElement.clientWidth >= 1920 ? 17 : 12,
          color: '#7c889b',
          //   formatter: '{value}'
        },
        // splitNumber: 5,
        min: fcpCountsMin,
        max: fcpCountsMax,
        interval: fcpCountsInterval
      },
      {
        type: 'value',
        // name: 'Job Success'
        axisLabel: {
          fontSize: document.documentElement.clientWidth >= 1920 ? 17 : 12,
          color: '#7c889b',
          //   formatter: '{value}'
        },
        // splitNumber: 5,
        min: fcpRunningMin,
        max: fcpRunningMax,
        interval: fcpRunningInterval,
        splitLine: {
          show: false 
        },
      }
    ],
    series: [
      {
        name: 'Job Counts',
        type: 'line',
        smooth: false,
        showSymbol: true,
        yAxisIndex: 0,
        tooltip: {
          valueFormatter: function (value: any) {
            return value;
          }
        },
        data: fcpCountsData.datum,
        color: '#597cee'
      },
      {
        name: 'Job Running',
        type: 'bar',
        // barCategoryGap: '0%',
        barGap: '0%',
        barWidth: '10',
        yAxisIndex: 1,
        data: fcpRunningData.datum,
        color: '#0000bf'
      }
    ]
  }
  const option1_task = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0, 0, 0, 1)',
      color: '#fff',
      borderWidth: 0,
      borderRadius: 9,
      textStyle: {
        color: '#fff',
        fontSize: document.documentElement.clientWidth >= 1920 ? 17 : 12,
        fontFamily: 'HELVETICA-ROMAN'
      },
      icon: 'roundRect',
      formatter: function (params) {
        var result = params[0].name + '<br/>'; 
        params.forEach(function (item) {
          // var color = item.color.colorStops ? item.color.colorStops[0].color : item.color; 
          // let colorDot = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + color + ';"></span>';
          // result += colorDot + item.seriesName + ' ' + item.value + 'Used 26Free' + '<br/>';
          var color = item.color.colorStops ? item.color.colorStops[0].color : item.color; 
          let colorDot = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + color + ';"></span>';
          result += colorDot + item.seriesName + ': ' + replaceFormat(item.value) + '<br/>'; 
        });
        return result;
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      top: '10%',
      bottom: '13%',
      containLabel: true
    },
    legend: {
      data: ['Success Rate', 'Sampling Tasks Counts'],
      right: 'auto',
      bottom: '0',
      // icon: 'circle',
      // itemWidth: 10,
      // itemHeight: 10,
      itemGap: 20,
      textStyle: {
        color: '#95a3bd',
        fontSize: document.documentElement.clientWidth >= 1920 ? 17 : 12,
        fontFamily: 'HELVETICA-ROMAN',
        // lineHeight: 14,
        rich: {
          a: {
            verticalAlign: 'middle',
          },
        },
        padding: [0, 0, -2, 2]
      }
    },
    xAxis: [
      {
        type: 'category',
        axisTick: {
          show: false
        },
        axisLabel: {
          fontSize: document.documentElement.clientWidth >= 1920 ? 17 : 12,
          color: '#7c889b',
          interval: function (index, value) {
            var count = 7;
            var step = Math.ceil(fcpSamplingData.timeArr.length / count); 
            return index % step === 0 ? value : false;
          },
          //   formatter: '{value}'
        },
        // prettier-ignore
        data: fcpSamplingData.timeArr
      }
    ],
    yAxis: [
      {
        type: 'value',
        // name: 'Job Success'
        axisLabel: {
          fontSize: document.documentElement.clientWidth >= 1920 ? 17 : 12,
          color: '#7c889b',
          //   formatter: '{value}'
        },
        // splitNumber: 5,
        min: 0,
        max: 1
      },
      {
        type: 'value',
        // name: 'Job Success'
        axisLabel: {
          fontSize: document.documentElement.clientWidth >= 1920 ? 17 : 12,
          color: '#7c889b',
          //   formatter: '{value}'
        },
        // splitNumber: 5,
        min: fcpSamplingMin,
        max: fcpSamplingMax,
        interval: fcpSamplingInterval,
        splitLine: {
          show: false 
        },
      }
    ],
    series: [
      {
        name: 'Success Rate',
        type: 'line',
        smooth: false,
        showSymbol: true,
        yAxisIndex: 0,
        tooltip: {
          valueFormatter: function (value: any) {
            return value;
          }
        },
        data: fcpSuccessData.datum,
        color: '#597cee'
      },
      {
        name: 'Sampling Tasks Counts',
        type: 'bar',
        // barCategoryGap: '0%',
        barGap: '0%',
        barWidth: '10',
        yAxisIndex: 1,
        data: fcpSamplingData.datum,
        color: '#0000bf'
      }
    ]
  }
  const option2 = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0, 0, 0, 1)',
      color: '#fff',
      borderWidth: 0,
      borderRadius: 9,
      textStyle: {
        color: '#fff',
        fontSize: document.documentElement.clientWidth >= 1920 ? 17 : 12,
        fontFamily: 'HELVETICA-ROMAN'
      },
      icon: 'roundRect',
      formatter: function (params) {
        var result = params[0].name + '<br/>'; 
        params.forEach(function (item) {
          // var color = item.color.colorStops ? item.color.colorStops[0].color : item.color; 
          // let colorDot = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + color + ';"></span>';
          // result += colorDot + item.seriesName + ' ' + item.value + 'Used 26Free' + '<br/>';
          var color = item.color.colorStops ? item.color.colorStops[0].color : item.color; 
          let colorDot = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + color + ';"></span>';
          result += colorDot + item.seriesName + ': ' + replaceFormat(item.value) + '<br/>'; 
        });
        return result;
      }
    },
    legend: {
      data: ['Collateral (SWAN)', 'Escrow (SWAN)'],
      right: 'auto',
      bottom: '0',
      // icon: 'circle',
      // itemWidth: 10,
      // itemHeight: 10,
      itemGap: 20,
      textStyle: {
        color: '#95a3bd',
        fontSize: document.documentElement.clientWidth >= 1920 ? 17 : 12,
        fontFamily: 'HELVETICA-ROMAN',
        // lineHeight: 14,
        rich: {
          a: {
            verticalAlign: 'middle',
          },
        },
        padding: [0, 0, -2, 2]
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      top: '10%',
      bottom: '13%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: true,
      axisTick: {
        show: false
      },
      axisLabel: {
        fontSize: document.documentElement.clientWidth >= 1920 ? 17 : 12,
        color: '#7c889b',
        interval: function (index, value) {
          var count = 7;
          var step = Math.ceil(fcpCollateralData.timeArr.length / count); 
          return index % step === 0 ? value : false;
        },
        //   formatter: '{value}'
      },
      data: fcpCollateralData.timeArr
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        fontSize: document.documentElement.clientWidth >= 1920 ? 17 : 12,
        color: '#7c889b',
        //   formatter: '{value}'
      },
      max: fcpCollateralMax,
      min: fcpCollateralMin
    },
    series: [
      {
        name: 'Collateral (SWAN)',
        type: 'line',
        smooth: false,
        showSymbol: true,
        data: fcpCollateralData.datum,
        color: '#7092b4'
      },
      {
        name: 'Escrow (SWAN)',
        type: 'line',
        smooth: false,
        showSymbol: true,
        data: fcpEscrowData.datum,
        color: '#0000ff'
      }
    ]
  }
  const option3 = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0, 0, 0, 1)',
      color: '#fff',
      borderWidth: 0,
      borderRadius: 9,
      textStyle: {
        color: '#fff',
        fontSize: document.documentElement.clientWidth >= 1920 ? 17 : 12,
        fontFamily: 'HELVETICA-ROMAN'
      },
      icon: 'roundRect',
      formatter: function (params) {
        var result = params[0].name + '<br/>'; 
        params.forEach(function (item) {
          // var color = item.color.colorStops ? item.color.colorStops[0].color : item.color; 
          // let colorDot = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + color + ';"></span>';
          // result += colorDot + item.seriesName + ' ' + item.value + 'Used 26Free' + '<br/>';
          var color = item.color.colorStops ? item.color.colorStops[0].color : item.color; 
          let colorDot = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + color + ';"></span>';
          result += colorDot + item.seriesName + ': ' + replaceFormat(item.value) + '<br/>'; 
        });
        return result;
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      top: '10%',
      bottom: '13%',
      containLabel: true
    },
    legend: {
      data: ['Job Counts', 'Job Growth'],
      right: 'auto',
      bottom: '0',
      // icon: 'circle',
      // itemWidth: 10,
      // itemHeight: 10,
      itemGap: 20,
      textStyle: {
        color: '#95a3bd',
        fontSize: document.documentElement.clientWidth >= 1920 ? 17 : 12,
        fontFamily: 'HELVETICA-ROMAN',
        // lineHeight: 14,
        rich: {
          a: {
            verticalAlign: 'middle',
          },
        },
        padding: [0, 0, -2, 2]
      }
    },
    xAxis: [
      {
        type: 'category',
        axisTick: {
          show: false
        },
        axisLabel: {
          fontSize: document.documentElement.clientWidth >= 1920 ? 17 : 12,
          color: '#7c889b',
          interval: function (index, value) {
            var count = 7;
            var step = Math.ceil(ecpCountsData.timeArr.length / count); 
            return index % step === 0 ? value : false;
          },
          //   formatter: '{value}'
        },
        // prettier-ignore
        data: ecpCountsData.timeArr
      }
    ],
    yAxis: [
      {
        type: 'value',
        // name: 'Job Success'
        axisLabel: {
          fontSize: document.documentElement.clientWidth >= 1920 ? 17 : 12,
          color: '#7c889b',
          //   formatter: '{value}'
        },
        interval: ecpCountsInterval,
        min: ecpCountMin,
        max: ecpCountMax,
        // splitNumber: 5,
      },
      {
        type: 'value',
        // name: 'Job Success'
        axisLabel: {
          fontSize: document.documentElement.clientWidth >= 1920 ? 17 : 12,
          color: '#7c889b',
          //   formatter: '{value}'
        },
        min: ecpGrowthMin,
        max: ecpGrowthMax,
        // splitNumber: 5,
        interval: ecpGrowthInterval,
        splitLine: {
          show: false 
        },
      }
    ],
    series: [
      {
        name: 'Job Counts',
        type: 'line',
        smooth: false,
        showSymbol: true,
        yAxisIndex: 0,
        tooltip: {
          valueFormatter: function (value: any) {
            return value;
          }
        },
        data: ecpCountsData.datum,
        color: '#03a7f0'
      },
      {
        name: 'Job Growth',
        type: 'bar',
        // barCategoryGap: '0%',
        barGap: '0%',
        barWidth: '10',
        yAxisIndex: 1,
        data: ecpGrowthData.datum,
        color: '#56cfb2'
      }
    ]
  }
  const option3_task = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0, 0, 0, 1)',
      color: '#fff',
      borderWidth: 0,
      borderRadius: 9,
      textStyle: {
        color: '#fff',
        fontSize: document.documentElement.clientWidth >= 1920 ? 17 : 12,
        fontFamily: 'HELVETICA-ROMAN'
      },
      icon: 'roundRect',
      formatter: function (params) {
        var result = params[0].name + '<br/>'; 
        params.forEach(function (item) {
          // var color = item.color.colorStops ? item.color.colorStops[0].color : item.color; 
          // let colorDot = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + color + ';"></span>';
          // result += colorDot + item.seriesName + ' ' + item.value + 'Used 26Free' + '<br/>';
          var color = item.color.colorStops ? item.color.colorStops[0].color : item.color; 
          let colorDot = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + color + ';"></span>';
          result += colorDot + item.seriesName + ': ' + replaceFormat(item.value) + '<br/>'; 
        });
        return result;
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      top: '10%',
      bottom: '13%',
      containLabel: true
    },
    legend: {
      data: ['Success Rate', 'ZK Tasks Counts'],
      right: 'auto',
      bottom: '0',
      // icon: 'circle',
      // itemWidth: 10,
      // itemHeight: 10,
      itemGap: 20,
      textStyle: {
        color: '#95a3bd',
        fontSize: document.documentElement.clientWidth >= 1920 ? 17 : 12,
        fontFamily: 'HELVETICA-ROMAN',
        // lineHeight: 14,
        rich: {
          a: {
            verticalAlign: 'middle',
          },
        },
        padding: [0, 0, -2, 2]
      }
    },
    xAxis: [
      {
        type: 'category',
        axisTick: {
          show: false
        },
        axisLabel: {
          fontSize: document.documentElement.clientWidth >= 1920 ? 17 : 12,
          color: '#7c889b',
          interval: function (index, value) {
            var count = 7;
            var step = Math.ceil(ecpZKTaskData.timeArr.length / count); 
            return index % step === 0 ? value : false;
          },
          //   formatter: '{value}'
        },
        // prettier-ignore
        data: ecpZKTaskData.timeArr
      }
    ],
    yAxis: [
      {
        type: 'value',
        // name: 'Job Success'
        axisLabel: {
          fontSize: document.documentElement.clientWidth >= 1920 ? 17 : 12,
          color: '#7c889b',
          //   formatter: '{value}'
        },
        min: 0,
        max: 1,
        // splitNumber: 5,
      },
      {
        type: 'value',
        // name: 'Job Success'
        axisLabel: {
          fontSize: document.documentElement.clientWidth >= 1920 ? 17 : 12,
          color: '#7c889b',
          //   formatter: '{value}'
        },
        min: ecpZKTaskMin,
        max: ecpZKTaskMax,
        // splitNumber: 5,
        interval: ecpZKTaskInterval,
        splitLine: {
          show: false 
        },
      }
    ],
    series: [
      {
        name: 'Success Rate',
        type: 'line',
        smooth: false,
        showSymbol: true,
        yAxisIndex: 0,
        tooltip: {
          valueFormatter: function (value: any) {
            return value;
          }
        },
        data: ecpSuccessData.datum,
        color: '#03a7f0'
      },
      {
        name: 'ZK Tasks Counts',
        type: 'bar',
        // barCategoryGap: '0%',
        barGap: '0%',
        barWidth: '10',
        yAxisIndex: 1,
        data: ecpZKTaskData.datum,
        color: '#56cfb2'
      }
    ]
  }
  const option4 = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0, 0, 0, 1)',
      color: '#fff',
      borderWidth: 0,
      borderRadius: 9,
      textStyle: {
        color: '#fff',
        fontSize: document.documentElement.clientWidth >= 1920 ? 17 : 12,
        fontFamily: 'HELVETICA-ROMAN'
      },
      icon: 'roundRect',
      formatter: function (params:any) {
        var result = params[0].name + '<br/>'; 
        params.forEach(function (item:any) {
          const v = item.seriesName.indexOf('Sequencer') > -1 ? replaceDecimalsFormat(item.value) : replaceFormat(item.value)
          var color = item.color.colorStops ? item.color.colorStops[0].color : item.color;
          let colorDot = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:' + color + ';"></span>';
          result += colorDot + item.seriesName + ': ' + v + '<br/>'; 
        });
        return result;
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      top: '15%',
      bottom: document.documentElement.clientWidth > 768 ? '13%' : '20%',
      containLabel: true
    },
    legend: {
      data: ['Collateral (SWAN)', 'Escrow (SWAN)', 'Sequencer (ETH)'],
      right: 'auto',
      bottom: '0',
      // icon: 'circle',
      // itemWidth: 10,
      // itemHeight: 10,
      itemGap: document.documentElement.clientWidth > 768 ? 20 : 5,
      textStyle: {
        color: '#95a3bd',
        fontSize: document.documentElement.clientWidth >= 1920 ? 17 : 12,
        fontFamily: 'HELVETICA-ROMAN',
        // lineHeight: 14,
        rich: {
          a: {
            verticalAlign: 'middle',
          },
        },
        padding: [0, 0, -2, 2]
      }
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: true,
        axisTick: {
          show: false
        },
        axisLabel: {
          fontSize: document.documentElement.clientWidth >= 1920 ? 17 : 12,
          color: '#7c889b',
          interval: function (index, value) {
            var count = 7;
            var step = Math.ceil(ecpCollateralData.timeArr.length / count); 
            return index % step === 0 ? value : false;
          },
          //   formatter: '{value}'
        },
        // prettier-ignore
        data: ecpCollateralData.timeArr
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: 'SWAN',
        axisLabel: {
          fontSize: document.documentElement.clientWidth >= 1920 ? 17 : 12,
          color: '#7c889b',
          //   formatter: '{value} SWAN'
        },
        nameTextStyle: {
          fontSize: document.documentElement.clientWidth >= 1920 ? 16 : 11,
          color: '#7c889b',
        },
        min: ecpCollateralMax,
        max: ecpCollateralMin,
        splitNumber: 4,
      },
      {
        type: 'value',
        name: 'ETH',
        axisLabel: {
          fontSize: document.documentElement.clientWidth >= 1920 ? 17 : 12,
          color: '#7c889b',
          formatter: function(value:any) {
            return value.toFixed(5); 
          }
        },
        nameTextStyle: {
          fontSize: document.documentElement.clientWidth >= 1920 ? 16 : 11,
          color: '#7c889b',
        },
        min: ecpSequencerMin,
        max: ecpSequencerMax,
        splitNumber: 4,
        splitLine: {
          show: false 
        },
      }
    ],
    series: [
      {
        name: 'Collateral (SWAN)',
        type: 'line',
        smooth: false,
        yAxisIndex: 0,
        showSymbol: true,
        data: ecpCollateralData.datum,
        tooltip: {
          valueFormatter: function (value: any) {
            return value;
          }
        },
        color: '#02a7f0'
      },
      {
        name: 'Escrow (SWAN)',
        type: 'line',
        smooth: false,
        showSymbol: true,
        yAxisIndex: 0,
        data: ecpEscrowData.datum,
        color: '#56cfb2'
      },
      {
        name: 'Sequencer (ETH)',
        type: 'line',
        smooth: false,
        showSymbol: true,
        yAxisIndex: 1,
        data: ecpSequencerData.datum,
        color: '#333333'
      }
    ]
  }
  machart_job_fcp.setOption(option1);
  machart_job_fcp_task.setOption(option1_task);
  machart_collateral_fcp.setOption(option2);
  machart_job_ecp.setOption(option3);
  machart_job_ecp_task.setOption(option3_task);
  machart_collateral_ecp.setOption(option4);
  if (typeof ResizeObserver !== 'undefined') {
    let observer = new ResizeObserver(entries => {
      for (let entry of entries) {
        machart_job_fcp.resize();
        machart_job_fcp_task.resize();
        machart_job_ecp.resize();
        machart_job_ecp_task.resize();
        machart_collateral_fcp.resize();
        machart_collateral_ecp.resize();
      }
    });

    let element = document.getElementById('cp-container');
    observer.observe(element);
  } else {
    console.log('ResizeObserver is not supported in this browser.');
  }
  window.addEventListener("resize", function () {
    machart_job_fcp_task.resize();
    machart_job_fcp.resize();
    machart_job_ecp_task.resize();
    machart_job_ecp.resize();
    machart_collateral_fcp.resize();
    machart_collateral_ecp.resize();
  })
}
const changePietype = async (data: any) => {
  const machart_pie_fcp = echarts.init(document.getElementById("chart-pie-fcp"));
  const machart_pie_ecp = echarts.init(document.getElementById("chart-pie-ecp"));

  const fcpBalance = String(balanceData.value?.fcp_collateral?.balance) ?? '0'
  const fcpLocked = String(balanceData.value?.fcp_collateral?.locked) ?? '0'
  const ecpBalance = String(balanceData.value?.ecp_collateral?.balance) ?? '0'
  const ecpLocked = String(balanceData.value?.ecp_collateral?.locked) ?? '0'

  const option1 = {
    tooltip: {
      trigger: 'item',
      position: function (point: any) {
        return [point[0] + 10, point[1] - 10]; 
      },
      formatter: function (params: any) {
          return `${params.seriesName}<br/><div class="flex flex-ai-center">${params.marker}${params.data.name}: ${replaceDecimalsFormat(params.data.value)}</div>`;
      },
      backgroundColor: 'rgba(0, 0, 0, 1)',
      color: '#fff',
      borderWidth: 0,
      borderRadius: 9,
      textStyle: {
        color: '#fff',
        fontSize: document.documentElement.clientWidth >= 1920 ? 17 : 12,
        fontFamily: 'HELVETICA-ROMAN'
      },
    },
    legend: {
      top: '0%',
      left: 'center',
      show: false
    },
    color: [fcpBalance === '0'?'#727272':'#0000bf', fcpLocked === '0'?'#989898':'#5579ee'],
    series: [
      {
        name: 'FCP',
        type: 'pie',
        // center: ['50%', '50%'],
        radius: ['60%', '90%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: false,
            fontSize: document.documentElement.clientWidth >= 1920 ? 29 : 24,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: fcpBalance, name: 'Collateral' },
          { value: fcpLocked, name: 'Escrow' }
        ]
      }
    ]
  }
  const option2 = {
    tooltip: {
      trigger: 'item',
      position: function (point: any) {
        return [point[0] + 10, point[1] - 10]; 
      },
      formatter: function (params: any) {
          return `${params.seriesName}<br/><div class="flex flex-ai-center">${params.marker}${params.data.name}: ${replaceDecimalsFormat(params.data.value)}</div>`;
      },
      backgroundColor: 'rgba(0, 0, 0, 1)',
      color: '#fff',
      borderWidth: 0,
      borderRadius: 9,
      textStyle: {
        color: '#fff',
        fontSize: document.documentElement.clientWidth >= 1920 ? 17 : 12,
        fontFamily: 'HELVETICA-ROMAN'
      },
    },
    legend: {
      top: '0%',
      left: 'center',
      show: false
    },
    color: [ecpBalance === '0'?'#727272':'#02a7f0', ecpLocked === '0'?'#989898':'#56cfb2'],
    series: [
      {
        name: 'ECP',
        type: 'pie',
        radius: ['60%', '90%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: false,
            fontSize: document.documentElement.clientWidth >= 1920 ? 29 : 24,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: ecpBalance, name: 'Collateral' },
          { value: ecpLocked, name: 'Escrow' }
        ]
      }
    ]
  }
  machart_pie_fcp.setOption(option1);
  machart_pie_ecp.setOption(option2);
  if (typeof ResizeObserver !== 'undefined') {
    let observer = new ResizeObserver(entries => {
      for (let entry of entries) {
        machart_pie_fcp.resize();
        machart_pie_ecp.resize();
      }
    });

    let element = document.getElementById('cp-container');
    observer.observe(element);
  } else {
    console.log('ResizeObserver is not supported in this browser.');
  }
  window.addEventListener("resize", function () {
    machart_pie_fcp.resize();
    machart_pie_ecp.resize();
  })
}
async function initEcharts () {
  try{
    providersLoad.value = true

    const weekRange = getDateRange(weekList.value);
    const params = {
      from: '',
      to: ''
      // from: weekRange.start,
      // to: weekRange.end
    }
    const echartsRes = await getCPsEchartsData(params, route.params.cp_addr)
    const data = echartsRes?.data ?? {}
    changetype(data)
    changePietype(data)
  }catch{ providersLoad.value = false}
}
async function getCPsBalanceData() {
  balanceLoad.value = true
  try{
    const balanceRes = await getCPsBalancesData(route.params.cp_addr)
    let list = balanceRes?.data ?? {}
    list.requried = Number(list?.base_collateral * (list?.cu / 100)) ?? 0
    balanceData.value = list
    changePietype(balanceData.value)
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
    collateralCPData.ecp.Escrow =  web3.utils.fromWei(String(escrow), 'ether')
    collateralCPData.ecp.Current = Number(collateralCPData.ecp.Collateral) + Number(collateralCPData.ecp.Escrow)
    // console.log('ecp:', ecpCpInfoData, collateralCPData.ecp)
  } catch { console.error }
}
async function getECPSequencerData() {
  try {
    let web3 = new Web3(new Web3.providers.HttpProvider(rpcLink.value));
    const sequencerContract = new web3.eth.Contract(sequencerABI, ecpSequencer)
    const sequencerData = await sequencerContract.methods.getCPBalance(route.params.cp_addr).call()
    const sequencer = sequencerData ?? '0'
    collateralCPData.ecp.Sequencer = web3.utils.fromWei(String(sequencer), 'ether')
    // console.log('sequencer:', sequencerData, collateralCPData.ecp)
  } catch { console.error }
}
onMounted(async () => {
  getFCPColleralData()
  getECPColleralData()
  getECPSequencerData()
  getCPsBalanceData()
  initEcharts()
})
watch(route, (to:any) => {
  if (to.name === "accountInfo") {
    getCPsBalanceData()
    initEcharts()
  }
})

const props = withDefaults(
  defineProps<{
    cpsData?: any
    cpsLoad?: boolean
  }>(),
  {
    cpsData: {},
    cpsLoad: false
  }
)
</script>

<style lang="less" scoped>
.el-row {
  .el-col {
    &.flex {
      display: flex;
    }
    &.m {
      margin: 0.22rem 0;
    }
    .module-container {
      position: relative;
      width: calc(100% - 0.64rem);
      height: calc(100% - 0.5rem);
      padding: 0.25rem 0.32rem;
      background-color: var(--color-light);
      border-radius: 0.14rem;
      &.world {
        background-color: var(--color-primary);
        .title {
          color: var(--color-light);
        }
      }
      .module-echarts {
        position: relative;
      }
      .el-col {
        margin: 0.04rem 0;
      }
      .title {
        .subtitle {
          color: #7c889b;
        }
      }
      .grid-content {
        height: calc(100% - 0.53rem);
        margin: 0.1rem 0 0;
        background: #edf2ff;
      }
    }
    .grid-content {
      position: relative;
      width: calc(100% - 0.28rem);
      height: calc(100% - 0.3rem);
      padding: 0.18rem 0.14rem 0.12rem;
      background: var(--color-light);
      border-radius: 0.18rem;
      // box-shadow: 0 0 12px #e6e7eb;
    }
    .chart-pie-balance {
      width: calc(100% - 1.8rem);
    }
    .chart-pie {
      width: 1.6rem;
      height: 1.6rem;
    }
    .chart-trends {
      width: 100%;
      margin: 0 auto;
      height: 2.8rem;
      @media screen and (min-width: 3600px) {
        height: 400px;
      }
      @media screen and (max-width: 768px) {
        height: 280px;
      }
      @media screen and (max-width: 600px) {
        height: 250px;
      }
    }
    .border {
      padding: 0 0 0.03rem;
      border-bottom: 1px solid var(--color-border);
    }
  }
}
</style>
