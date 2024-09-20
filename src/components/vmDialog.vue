<template>
  <div class="flex flex-ai-center flex-jc-center">
    <el-dialog v-model="props.centerDrawerVisible" :show-close="true" :close-on-click-modal="true" :close-on-press-escape="false" @before-close="closeHandle()" @close="closeHandle()" align-center class="dialog-body">
      <template #header>
        <div class="flex flex-ai-center font-20 header-title color-dark">
          <span v-if="props.list.type === 'claimAccount'">Claim Account</span>
          <span v-else-if="props.list.type === 'Sequencer'">Add Sequencer</span>
          <span v-else>{{`${props.list.type} Deposit`}}</span>
        </div>
      </template>

      <div :class="`dialog-content font-14 ${props.list.type === 'claimAccount'?'border':''}`">
        <div v-if="props.list.type === 'claimAccount'">
          <el-form v-loading="ruleForm.cpsLoad" ref="ruleAddRef" :model="ruleForm" :rules="rules" :label-position="bodyLabel" class="demo-ruleForm font-14" status-icon @submit.native.prevent>
            <el-form-item prop="owner_address">
              <template #label>
                <div class="flex flex-ai-center font-16 text-capitalize">
                  <span class="red opacity">*</span>
                  Owner Address:
                </div>
              </template>
              <label class="label">
                <div class="flex flex-ai-center">
                  {{props.list.owner_addr || '-'}}
                </div>
              </label>
            </el-form-item>
            <el-form-item prop="owner_address">
              <template #label>
                <div class="flex flex-ai-center font-16 text-capitalize">
                  <span class="red opacity">*</span>
                  CP Account:
                </div>
              </template>
              <label class="label">
                <div class="flex flex-ai-center">
                  {{ route.params.cp_addr }}
                </div>
              </label>
            </el-form-item>
            <el-form-item prop="name">
              <template #label>
                <div class="flex flex-ai-center font-16 text-capitalize">
                  <span class="red">*</span>
                  Account Name:
                </div>
              </template>
              <label class="label" for="name">
                <div class="flex flex-ai-center">
                  <el-input v-model="ruleForm.name" placeholder=" " show-word-limit maxlength="20" />
                </div>
              </label>
            </el-form-item>
            <div class="flex nowrap divider">
              <el-divider content-position="left">
                <div class="flex">
                  <div class="font-18">Personal Info</div> 
                  <el-popover placement="right" :width="300" effect="dark" popper-style="word-break: break-word; text-align: left;font-size:12px;" trigger="hover" content="If you don't want to show your personal information to public, please click Pritivate buttom.">
                    <template #reference>
                      <div class="flex flex-ai-center ml-8">
                        <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7201" width="14" height="14">
                          <path d="M512 64a448 448 0 1 1 0 896A448 448 0 0 1 512 64z m0 71.972571a375.954286 375.954286 0 1 0 0 752.054858A375.954286 375.954286 0 0 0 512 135.972571z m35.181714 266.020572c12.361143 0 21.796571 2.486857 28.672 8.045714 7.314286 5.997714 11.044571 14.043429 11.044572 23.917714 0 10.971429-11.190857 52.589714-33.060572 123.172572l-4.096 13.677714C517.778286 676.498286 512.731429 698.514286 512.731429 720.384c0 3.510857 0.731429 6.070857 2.194285 7.68 1.462857 1.755429 2.340571 2.340571 2.706286 2.340571 8.265143 0 35.766857-20.333714 78.262857-59.245714l8.777143 0.146286 19.456 18.944-0.146286 9.289143-2.779428 2.56c-45.568 41.691429-77.677714 67.584-98.889143 79.213714l-1.682286 0.877714c-21.357714 11.702857-39.058286 17.773714-53.248 17.773715a44.324571 44.324571 0 0 1-32.914286-12.726858 49.371429 49.371429 0 0 1-11.922285-34.596571c0-42.130286 13.531429-97.645714 64.219428-257.243429a57.197714 57.197714 0 0 0 3.291429-17.92V476.891429c0-2.56-0.438857-2.706286-2.852572-2.706286a41.179429 41.179429 0 0 0-19.748571 6.802286l-0.512 0.219428c-7.972571 4.900571-25.380571 20.260571-55.808 49.005714l-8.265143 0.438858-22.089143-16.822858-0.731428-9.508571 2.048-2.194286c33.572571-35.84 63.634286-61.001143 91.209143-76.288 28.525714-15.872 53.174857-23.844571 73.874285-23.844571z m51.565715-157.988572c11.776 0 22.162286 4.169143 30.134857 12.141715 8.045714 7.972571 12.141714 18.285714 12.141714 30.866285a64.658286 64.658286 0 0 1-17.554286 41.910858 51.2 51.2 0 0 1-39.131428 18.505142 40.448 40.448 0 0 1-29.622857-12.141714 43.373714 43.373714 0 0 1-12.141715-31.670857c0-16.676571 5.339429-30.427429 16.603429-42.276571a53.101714 53.101714 0 0 1 39.497143-17.334858z"
                            fill="#333333" p-id="7202"></path>
                        </svg>
                      </div>
                    </template>
                  </el-popover>
                </div>
              </el-divider>
              <el-divider content-position="right">
                <el-checkbox v-model="ruleForm.checked">Private</el-checkbox>
              </el-divider>
            </div>
            <el-form-item prop="email">
              <template #label>
                <div class="flex flex-ai-center font-16 text-capitalize">
                  <span class="red">*</span>
                  Email Address:
                </div>
              </template>
              <label class="label" for="email">
                <div class="flex flex-ai-center">
                  <el-input v-model="ruleForm.email" placeholder=" " maxlength="40" />
                </div>
              </label>
            </el-form-item>
            <el-form-item prop="telegram_account">
              <template #label>
                <div class="flex flex-ai-center font-16 text-capitalize">
                  <span class="red opacity">*</span>
                  Telegram Account:
                </div>
              </template>
              <label class="label" for="telegram_account">
                <div class="flex flex-ai-center">
                  <el-input v-model="ruleForm.telegram_account" placeholder=" " maxlength="40" />
                </div>
              </label>
            </el-form-item>
            <el-form-item prop="twitter_account">
              <template #label>
                <div class="flex flex-ai-center font-16 text-capitalize">
                  <span class="red opacity">*</span>
                  Twitter Account:
                </div>
              </template>
              <label class="label" for="twitter_account">
                <div class="flex flex-ai-center">
                  <el-input v-model="ruleForm.twitter_account" placeholder=" " maxlength="40" />
                </div>
              </label>
            </el-form-item>
            <el-form-item prop="self_description">
              <template #label>
                <div class="flex flex-ai-center font-16 text-capitalize">
                  <span class="red opacity">*</span>
                  Description:
                </div>
              </template>
              <label class="label" for="self_description">
                <div class="flex flex-ai-center">
                  <el-input type="textarea" :rows="3" v-model="ruleForm.self_description" placeholder="Write something about you…" show-word-limit maxlength="300" />
                </div>
              </label>
            </el-form-item>
            <div class="flex nowrap divider">
              <el-divider content-position="left">
                <div class="font-18">Signature verification</div>
              </el-divider>
            </div>
            <el-form-item prop="message">
              <div class="flex flex-ai-center font-16 text-capitalize w-100 mb-16">
                  <span class="red opacity">*</span>
                  message:
              </div>
              <div class="server font-14">
                <!--  {{sortanow}} -->
                <p class="flex flex-ai-center flex-jc-center">Signing message for {{route.params.cp_addr}} on Swan Provider Dashboard at {{sortanow}}</p>
              </div>
            </el-form-item>
            <el-form-item prop="sign_code">
              <div class="flex flex-ai-center font-16 text-capitalize w-100 mb-16">
                  <span class="red opacity">*</span>
                  Sign code:
              </div>
              <div class="flex flex-ai-center nowrap copy-style copy-style-server width">
                <div class="server sign-code font-14">{{'computing-provider wallet sign '}}{{props.list.owner_addr}} {{ stringToHex(`Signing message for ${route.params.cp_addr} on Swan Provider Dashboard at ${sortanow}`) }}</div>
                <svg @click="copyContent(`computing-provider wallet sign ${props.list.owner_addr} ${stringToHex(`Signing message for ${route.params.cp_addr} on Swan Provider Dashboard at ${sortanow}`)}`, 'Copied')" t="1717142367802" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6467" width="16"
                  height="16">
                  <path d="M809.19 310.68H398.37a87.79 87.79 0 0 0-87.69 87.69v410.82a87.79 87.79 0 0 0 87.69 87.69h410.82a87.79 87.79 0 0 0 87.69-87.69V398.37a87.79 87.79 0 0 0-87.69-87.69z m29.69 498.51a29.73 29.73 0 0 1-29.69 29.69H398.37a29.73 29.73 0 0 1-29.69-29.69V398.37a29.73 29.73 0 0 1 29.69-29.69h410.82a29.73 29.73 0 0 1 29.69 29.69z"
                    fill="#3d3d3d" p-id="6468"></path>
                  <path d="M251.65 662.81h-29.34a29.73 29.73 0 0 1-29.69-29.69V222.31a29.73 29.73 0 0 1 29.69-29.69h410.81a29.73 29.73 0 0 1 29.69 29.69v29.34a29 29 0 0 0 58 0v-29.34a87.79 87.79 0 0 0-87.69-87.69H222.31a87.79 87.79 0 0 0-87.69 87.69v410.81a87.79 87.79 0 0 0 87.69 87.69h29.34a29 29 0 0 0 0-58z"
                    fill="#3d3d3d" p-id="6469"></path>
                </svg>
              </div>
            </el-form-item>
            <el-form-item prop="signature">
              <template #label>
                <div class="flex flex-ai-center font-16 text-capitalize">
                  <span class="red">*</span>
                  signature:
                </div>
              </template>
              <label class="label" for="signature">
                <div class="flex flex-ai-center">
                  <el-input v-model="ruleForm.signature" placeholder="Copy the above sign code, sign it and enter the signature" />
                </div>
              </label>
            </el-form-item>
          </el-form>
        </div>

        <el-row class="font-14 note" v-else-if="props.list.type === 'Sequencer'" v-loading="ruleForm.show">
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex flex-ai-center baseline">
            <p>Available Balance:</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex flex-ai-center baseline">
            <p class="color"><span class="blue">0.9984</span> SWANC</p> 
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex flex-ai-center baseline">
            <p>Sequencer Balance:</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex flex-ai-center baseline">
            <p class="color"><span class="blue">0.9984</span> SWANC</p> 
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex flex-ai-center baseline">
            <p>Add Amount:</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex flex-ai-center baseline">
            <div class="flex flex-ai-center nowrap">
              <el-input-number v-model="ruleForm.amount" :min="0" :step="0.25" controls-position="right" />
              <span class="text-white">&nbsp;&nbsp;SWANC</span>
            </div>
          </el-col>
        </el-row>

        <el-row class="font-14 note" v-else v-loading="ruleForm.show">
          <el-col>
            <div class="font-14 mb-8">Contract Address:</div>
            <div class="font-14">{{ route.params.cp_addr }}</div>
            <!-- <div class="font-14" v-if="props.list.type === 'FCP'">{{ fcpDeposit }}</div>
            <div class="font-14" v-else>{{ ecpDeposit }}</div> -->
          </el-col>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex flex-ai-center baseline">
            <p v-if="props.list.type === 'FCP'">For each FCP job, you need to have at least 5 SWANC in an escrow account.</p>
            <p v-if="props.list.type === 'ECP'">To receive ZK tasks, you need to have at least 100 SWANC in an escrow account.</p>
            <p v-if="props.list.type === 'ECP'" class="mt-8">150 SWANC is recommended.</p> 
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex flex-ai-center baseline">
            <p>Amount:</p>
          </el-col>
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex flex-ai-center baseline">
            <div class="flex flex-ai-center nowrap">
              <el-input-number v-model="ruleForm.amount" :min="0" controls-position="right" />
              <span class="text-white">&nbsp;&nbsp;SWANC</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <template #footer>
        <div class="dialog-footer flex flex-ai-center flex-jc-right font-14">
          <el-button @click="closeHandle()">Cancel</el-button>
          <!-- !ruleForm.amount ||  -->
          <el-button @click="claimMethod(ruleAddRef)" v-if="props.list.type === 'claimAccount'" type="primary">Submit</el-button>
          <el-button @click="cpCollateral" v-else :disabled="ruleForm.chainError" type="primary">Submit</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts"
import CollateralABI from '@/utils/abi/CollateralContract.json'
import fcpABI from '@/utils/abi/FCP-Collateral.json'
import ecpABI from '@/utils/abi/ECPCollateral.json'
import tokenABI from '@/utils/abi/SwanToken.json'
import { ecpDeposit, fcpDeposit, metaAddress, tokenSwan } from '@/utils/storage';
import { copyContent, getDateTime, messageTip, stringToHex } from '@/utils/common';
import web3Init, { getChain } from '@/utils/login';
import { getCPsClaimData } from "@/api/cp-profile"
import { watchContractEvent } from '@wagmi/core'
import config from '@/utils/config.js'

const props = withDefaults(
  defineProps<{
    list?: any
    centerDrawerVisible?: boolean
  }>(),
  {
    list: {
      type: Object,
      default: {
        type: 'FCP'
      }
    },
    centerDrawerVisible: false
  }
)

const bodyLabel = ref(document.body.clientWidth >= 768 ? 'left' : 'top')
const route = useRoute()
const ruleAddRef = ref()
const sortanow = ref('')
const ruleForm = reactive({
  name: '',
  email: '',
  telegram_account: '',
  twitter_account: '',
  self_description: '',
  sign_code: '',
  signature: '',
  amount: props.list.type === 'FCP' ? 5 : 150,
  show: false,
  tx_hash: '',
  chainError: false,
  cpsLoad: false,
  checked: false
})
const rules = reactive({
  name: [
    { required: true, message: 'This field is required.', trigger: 'blur' },
  ],
  email: [
    { required: true, message: 'This field is required.', trigger: 'blur' },
    {
      type: 'email',
      message: 'Please input correct email address',
      trigger: ['blur', 'change'],
    }
  ],
  signature: [
    { required: true, message: 'This field is required.', trigger: 'blur' },
  ]
})
// const collateralAddress = import.meta.env.VITE_COLLATERAL_CONTACT
// const collateralContract = new web3Init.eth.Contract(CollateralABI, collateralAddress)

const emits = defineEmits(['hardClose'])
function closeHandle () {
  emits('hardClose', false)
}

async function claimMethod(formEl: any) {
  if (!formEl) return
  await formEl.validate(async (valid: any, fields: any) => {
    if (valid) {
      ruleForm.cpsLoad = true
      try {
        const params = {
          "name": ruleForm.name,
          "email": ruleForm.email,
          "msg": stringToHex(`Signing message for ${route.params.cp_addr} on Swan Provider Dashboard at ${sortanow.value}`),
          "sign": ruleForm.signature,
          "public": !ruleForm.checked,
          "telegram": ruleForm.telegram_account,
          "twitter":ruleForm.twitter_account,
          "desc": ruleForm.self_description
        }
        const cpsRes = await getCPsClaimData(params, route.params.cp_addr)
        if (cpsRes?.msg) messageTip('success', cpsRes.msg)
        emits('hardClose', false, true)
      }catch{console.error}
      ruleForm.cpsLoad = false
    } else {
      console.log('error submit!', fields)
    }
  })
}
async function cpCollateral() {
  if (props.list.type === 'claimAccount') return false
  ruleForm.show = true
  try {
    if (Number(ruleForm.amount) >= 0) cpDeposit()
    else ruleForm.show = false
  } catch{
    ruleForm.show = false
  }
}
async function cpDeposit () {
  try {
    // watchContractEvent(config.config, {
    //   tokenABI,
    //   address: tokenSwan,
    //   eventName: 'allowance',
    //   args: { 
    //     owner: metaAddress.value,
    //     spender: props.list.type === 'FCP' ? fcpDeposit : ecpDeposit
    //   }, 
    //   onLogs(logs) {
    //     console.log('Logs changed!', logs)
    //   },
    //   onError(error) { 
    //     console.error('Logs error', error) 
    //   }, 
    // })
    const fcpContract = new web3Init.eth.Contract(fcpABI, fcpDeposit)
    const ecpContract = new web3Init.eth.Contract(ecpABI, ecpDeposit)
    const tokenContract = new web3Init.eth.Contract(tokenABI, tokenSwan)

    const amount = web3Init.utils.toWei(String(ruleForm.amount), 'ether')

    // find the user's allowance
    let allowanceMethod = tokenContract.methods.allowance(metaAddress.value, props.list.type === 'FCP' ? fcpDeposit : ecpDeposit)
    let allowance = await allowanceMethod.call()
    console.log('allowance:', allowance, amount)

    // approve spending token if neccessary
    if (allowance < amount) {
      let approveMethod = tokenContract.methods.approve(props.list.type === 'FCP' ? fcpDeposit : ecpDeposit, amount)
      const approve_tx = await approveMethod.send({ from: metaAddress.value })
      .on('transactionHash', async (transactionHash: any) => {
        console.log('approve transactionHash:', transactionHash)
      })
    }
      
    let payMethod = props.list.type === 'FCP' ?
      fcpContract.methods.deposit(route.params.cp_addr, amount) :
      ecpContract.methods.deposit(route.params.cp_addr, amount)

    let payGasLimit = await payMethod.estimateGas({ from: metaAddress.value })
    const tx = await payMethod.send({ from: metaAddress.value, gasLimit: Math.floor(payGasLimit * 1.5) })
      .on('transactionHash', async (transactionHash: any) => {
        console.log('transactionHash:', transactionHash)
        ruleForm.tx_hash = transactionHash
      })
      .on('receipt', (receipt: any) => {
        console.log('receipt:', receipt)
        messageTip('success', 'Deposit success. Please refresh page to view account balance.')
        ruleForm.show = false
        closeHandle()
      })
      .on('error', () => ruleForm.show = false)
  } catch (err: any) {
    console.log('err', err)
    if (err && err.message) messageTip('error', err.message)
    ruleForm.show = false
  }
}
onMounted(async () => {
  try {
    const chain_id = await getChain()
    ruleForm.chainError = chain_id
  } catch {
    ruleForm.chainError = false
  }
  // const rightnow = (Date.now() / 1000).toFixed(0)
  // sortanow.value = rightnow - (rightnow % 600)
  sortanow.value = getDateTime()
})
</script>

<style lang="less">
.el-overlay {
  .dialog-body {
    width: 40%;
    max-width: 900px;
    min-width: 520px;
    padding-top: 5px;
    border-radius: 6px;
    word-break: break-word;
    color: #6c6f72;
    @media screen and (max-width: 600px) {
      min-width: 340px;
    }
    .el-dialog__header {
      padding: 0;
    }
    .el-dialog__body {
      .dialog-content {
        padding: 0.12rem 0;
        line-height: 1.4;
        cursor: text;
        &.border {
          border-top: 1px solid var(--color-light-grey);
        }
        .note {
          padding: 0.12rem 0.25rem;
          margin: 0.16rem 0;
          border: 1px solid var(--color-border);
          border-radius: 0.1rem;
          &.b {
            border-radius: 0.2rem;
          }
          .el-col {
            margin: 0.08rem 0;
            p {
              color: #000;
              &.color {
                .green {
                  color: #8dd565;
                }
                .orange {
                  color: #ff9413;
                }
                .blue {
                  color: #6067f5;
                }
              }
            }
            .badge {
              display: flex;
              align-items: center;
              white-space: normal;
              word-break: break-word;
              img {
                width: 30px;
                height: 30px;
                margin-right: 5px;
                @media screen and (max-width: 1260px) {
                  width: 25px;
                  height: 25px;
                }
              }
            }
            .chart-trends {
              width: 100%;
              margin: 0 auto 0.24rem;
              height: 2.3rem;
              @media screen and (max-width: 768px) {
                height: 250px;
              }
              @media screen and (max-width: 600px) {
                height: 200px;
              }
            }
            .el-input-number {
              .el-input{
                font-size: inherit;
              }
            }
          }
        }
        .el-divider__text {
          font-family: inherit;
          font-size: var(--font-18);
          .el-checkbox {
            * {
              font-family: inherit;
              font-size: var(--font-16);
              color: var(--color-info);
            }
          }
          &.is-left {
            left: 0;
            padding: 0 0.2rem 0 0;
          }
          &.is-right {
            right: 0;
            padding: 0 0 0 0.2rem;
          }
        }
        .divider {
          margin-top: -0.15rem;
        }
        .el-form {
          width: 100%;
          padding: 0;
          .el-form-item {
            margin: 0 0 0.15rem;
            --font-size: inherit;
            &:last-child {
              margin-bottom: 0.1rem;
            }
            .red {
              padding: 0 0.1rem 0 0;
              color: #f56c6c;
              &.opacity {
                opacity: 0;
              }
            }
            .el-form-item__label {
              width: 165px;
              margin: 0 0 0.04rem;
              color: var(--color-info);
              @media screen and (min-width: 2000px) {
                width: 215px;
              }
              @media screen and (max-width: 768px) {
                height: 26px;
                line-height: 26px;
              }
              @media screen and (max-width: 600px) {
                width: 100%;
              }
              &:before {
                display: none;
              }
              .text-capitalize {
                min-height: 100%;
              }
            }
            .el-form-item__content {
              line-height: 1.2;
              @media screen and (max-width: 768px) {
                width: 100%;
              }
              @media screen and (max-width: 600px) {
                width: 100%;
                flex: auto;
              }
              .spacing {
                width: 25px;
              }
              .label {
                width: 100%;
                text-align: left;
                color: #606060;
                .unit {
                  margin: 0 0 0 8px;
                  white-space: nowrap;
                }
              }
              .el-input,
              .el-textarea,
              .el-select {
                width: 100%;
                margin: 0;
                font-family: inherit;
                font-size: inherit;
                &.is-disabled {
                  background-color: #e5e7ed;
                  border-radius: 5px;
                  .el-input__wrapper,
                  .el-textarea__inner,
                  .el-select__wrapper {
                    border-color: #e5e7ed;
                  }
                }
                .el-input__wrapper,
                .el-textarea__inner,
                .el-select__wrapper {
                  width: 100%;
                  height: auto;
                  padding: 8px 12px;
                  background-color: transparent !important;
                  font-family: inherit;
                  font-size: inherit !important;
                  line-height: 1.2;
                  border-radius: 5px;
                  border: 1px solid var(--color-primary);
                  box-shadow: none;
                  &.el-select__wrapper {
                    padding: 11px 12px;
                  }
                  @media screen and (max-width: 768px) {
                    width: 100%;
                  }
                  .el-input__inner {
                    height: auto;
                    color: var(--color-dark);
                    line-height: 1.2;
                  }
                }
              }
              .el-form-item__error {
                font-size: 12px;
              }
            }
          }
        }
        .copy-style {
          cursor: pointer;
          flex-wrap: wrap;
          &.copy-style-server {
            background-color: #e5e7ed;
            border-radius: 6px;
          }
          svg {
            margin: 0 0 0 0.05rem;
          }
        }
        .server {
          width: 100%;
          padding: 13px 10px;
          margin: 0;
          background-color: #e5e7ed;
          border-radius: 6px;
          color: #7f828c;
          &.sign-code {
            width: calc(100% - 50px);
            white-space: nowrap;
            overflow-x: auto;
            // overflow: hidden;
            // text-overflow: ellipsis;
            // cursor: text;
          }
          b {
            padding: 0 0 0 6px;
          }
        }
      }
    }
    .el-dialog__footer {
      padding: 0;
      .dialog-footer {
        .el-button {
          font-family: inherit;
          font-size: inherit;
          &.is-disabled {
            opacity: .7;
          }
        }
      }
    }
  }
}
</style>
