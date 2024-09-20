<template>
  <el-row :gutter="bodyWidth" class="mt-24">
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
      <div class="providers-cp s font-14">
        <div class="flex flex-ai-center name-title">
          <b class="font-16 weight-4">Account Overview</b>
        </div>
        <div class="note b">
          <el-row :gutter="bodyWidth" v-loading="props.cpsLoad">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex flex-ai-center baseline">
              <p class="text-capitalize label">Account Type:</p>
              <div class="collateral m b-ecp" :class="{'b-fcp': props.cpsData.type === 1}">
                <span v-if="props.cpsData.type === 1">FCP</span>
                <span v-else-if="props.cpsData.type === 2">ECP</span>
                <span v-else>ECP & FCP</span>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex flex-ai-center baseline">
              <p class="text-capitalize label">NodeID:</p>
              <div class="flex flex-ai-center copy-style" v-if="props.cpsData.node_id" @click="copyContent(props.cpsData.node_id, 'Copied')">
                {{ hiddLongAddress(props.cpsData.node_id) ?? '-' }}
                <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6467" width="16" height="16">
                  <path d="M809.19 310.68H398.37a87.79 87.79 0 0 0-87.69 87.69v410.82a87.79 87.79 0 0 0 87.69 87.69h410.82a87.79 87.79 0 0 0 87.69-87.69V398.37a87.79 87.79 0 0 0-87.69-87.69z m29.69 498.51a29.73 29.73 0 0 1-29.69 29.69H398.37a29.73 29.73 0 0 1-29.69-29.69V398.37a29.73 29.73 0 0 1 29.69-29.69h410.82a29.73 29.73 0 0 1 29.69 29.69z"
                    fill="#3d3d3d" p-id="6468"></path>
                  <path d="M251.65 662.81h-29.34a29.73 29.73 0 0 1-29.69-29.69V222.31a29.73 29.73 0 0 1 29.69-29.69h410.81a29.73 29.73 0 0 1 29.69 29.69v29.34a29 29 0 0 0 58 0v-29.34a87.79 87.79 0 0 0-87.69-87.69H222.31a87.79 87.79 0 0 0-87.69 87.69v410.81a87.79 87.79 0 0 0 87.69 87.69h29.34a29 29 0 0 0 0-58z"
                    fill="#3d3d3d" p-id="6469"></path>
                </svg>
              </div>
              <span v-else>-</span>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="flex flex-ai-center baseline">
              <p class="text-capitalize label">Task type:</p>
              <template v-for="t in props.cpsData.task_types" :key="t">
                <div class="mr-10">
                  <div class="collateral m b-fcp">
                    <span v-if="t === 1">fil-c2-512M</span>
                    <span v-else-if="t === 2">ALEO</span>
                    <span v-else-if="t === 3">AI</span>
                    <span v-else>fil-c2-32G</span>
                  </div>
                </div>
              </template>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex flex-ai-center baseline">
              <p class="text-capitalize label">Owner Address:</p>
              <div class="flex flex-ai-center copy-style" v-if="props.cpsData.owner_addr">
                <a class="link-to" :href="`${explorerLink}address/${props.cpsData.owner_addr}`" target="_blank">{{props.cpsData.owner_addr ?? '-'}}</a>
                <svg @click="copyContent(props.cpsData.owner_addr, 'Copied')" t="1717142367802" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6467" width="16" height="16">
                  <path d="M809.19 310.68H398.37a87.79 87.79 0 0 0-87.69 87.69v410.82a87.79 87.79 0 0 0 87.69 87.69h410.82a87.79 87.79 0 0 0 87.69-87.69V398.37a87.79 87.79 0 0 0-87.69-87.69z m29.69 498.51a29.73 29.73 0 0 1-29.69 29.69H398.37a29.73 29.73 0 0 1-29.69-29.69V398.37a29.73 29.73 0 0 1 29.69-29.69h410.82a29.73 29.73 0 0 1 29.69 29.69z"
                    fill="#3d3d3d" p-id="6468"></path>
                  <path d="M251.65 662.81h-29.34a29.73 29.73 0 0 1-29.69-29.69V222.31a29.73 29.73 0 0 1 29.69-29.69h410.81a29.73 29.73 0 0 1 29.69 29.69v29.34a29 29 0 0 0 58 0v-29.34a87.79 87.79 0 0 0-87.69-87.69H222.31a87.79 87.79 0 0 0-87.69 87.69v410.81a87.79 87.79 0 0 0 87.69 87.69h29.34a29 29 0 0 0 0-58z"
                    fill="#3d3d3d" p-id="6469"></path>
                </svg>
              </div>
              <span v-else>-</span>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex flex-ai-center baseline">
              <p class="text-capitalize label">Region:</p>
              <div>{{props.cpsData.region || '-'}}</div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex flex-ai-center baseline">
              <p class="text-capitalize label">Worker Address:</p>
              <div class="flex flex-ai-center copy-style" v-if="props.cpsData.worker_addr">
                <a class="link-to" :href="`${explorerLink}address/${props.cpsData.worker_addr}`" target="_blank">{{props.cpsData.worker_addr ?? '-'}}</a>
                <svg @click="copyContent(props.cpsData.worker_addr, 'Copied')" t="1717142367802" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6467" width="16" height="16">
                  <path d="M809.19 310.68H398.37a87.79 87.79 0 0 0-87.69 87.69v410.82a87.79 87.79 0 0 0 87.69 87.69h410.82a87.79 87.79 0 0 0 87.69-87.69V398.37a87.79 87.79 0 0 0-87.69-87.69z m29.69 498.51a29.73 29.73 0 0 1-29.69 29.69H398.37a29.73 29.73 0 0 1-29.69-29.69V398.37a29.73 29.73 0 0 1 29.69-29.69h410.82a29.73 29.73 0 0 1 29.69 29.69z"
                    fill="#3d3d3d" p-id="6468"></path>
                  <path d="M251.65 662.81h-29.34a29.73 29.73 0 0 1-29.69-29.69V222.31a29.73 29.73 0 0 1 29.69-29.69h410.81a29.73 29.73 0 0 1 29.69 29.69v29.34a29 29 0 0 0 58 0v-29.34a87.79 87.79 0 0 0-87.69-87.69H222.31a87.79 87.79 0 0 0-87.69 87.69v410.81a87.79 87.79 0 0 0 87.69 87.69h29.34a29 29 0 0 0 0-58z"
                    fill="#3d3d3d" p-id="6469"></path>
                </svg>
              </div>
              <span v-else>-</span>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="flex flex-ai-center baseline">
              <p class="text-capitalize label">Create time:</p>
              <div>{{momentFun(props.cpsData.created_at)}}</div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex flex-ai-center baseline">
              <p class="text-capitalize label">beneficiary Address:</p>
              <div class="flex flex-ai-center copy-style" v-if="props.cpsData.beneficiary_addr">
                <a class="link-to" :href="`${explorerLink}address/${props.cpsData.beneficiary_addr}`" target="_blank">{{props.cpsData.beneficiary_addr}}</a>
                <svg @click="copyContent(props.cpsData.beneficiary_addr, 'Copied')" t="1717142367802" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6467" width="16" height="16">
                  <path d="M809.19 310.68H398.37a87.79 87.79 0 0 0-87.69 87.69v410.82a87.79 87.79 0 0 0 87.69 87.69h410.82a87.79 87.79 0 0 0 87.69-87.69V398.37a87.79 87.79 0 0 0-87.69-87.69z m29.69 498.51a29.73 29.73 0 0 1-29.69 29.69H398.37a29.73 29.73 0 0 1-29.69-29.69V398.37a29.73 29.73 0 0 1 29.69-29.69h410.82a29.73 29.73 0 0 1 29.69 29.69z"
                    fill="#3d3d3d" p-id="6468"></path>
                  <path d="M251.65 662.81h-29.34a29.73 29.73 0 0 1-29.69-29.69V222.31a29.73 29.73 0 0 1 29.69-29.69h410.81a29.73 29.73 0 0 1 29.69 29.69v29.34a29 29 0 0 0 58 0v-29.34a87.79 87.79 0 0 0-87.69-87.69H222.31a87.79 87.79 0 0 0-87.69 87.69v410.81a87.79 87.79 0 0 0 87.69 87.69h29.34a29 29 0 0 0 0-58z"
                    fill="#3d3d3d" p-id="6469"></path>
                </svg>
              </div>
              <span v-else>-</span>
            </el-col>
            <el-col v-if="props.cpsData.account_name" :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex flex-ai-center baseline">
              <p class="text-capitalize label">Social:</p>
              <div class="flex flex-ai-center">
                <div v-if="props.cpsData.privacy?.email" @click="emailMethod(props.cpsData.privacy?.email)" class="pointer">
                  <svg class="icon mr-16" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="20037" width="20" height="20"><path d="M891.521 169.794H132.468c-36.144 0-49.696 9.041-49.696 49.696v528.625c0 40.657 13.558 49.696 49.696 49.696H887c36.144 0 49.696-9.04 49.696-49.696V219.49c4.518-40.657-9.04-49.696-45.187-49.696z m-67.77 49.704C710.8 323.417 539.101 499.625 521.033 513.177c-4.518 4.517-9.042 4.517-18.072 0-22.586-18.072-207.836-194.281-311.751-293.68h632.536zM132.48 748.126V237.578l271.087 257.531c27.108 27.109 45.187 40.657 58.732 54.218 18.071 9.041 31.63 13.557 49.696 13.557s31.63-4.517 49.696-13.557v-4.517c27.108-18.072 112.951-108.432 329.82-307.232v510.548H132.456z m0 0z" p-id="20038" fill="#666666"></path></svg>
                </div>
                <div v-if="props.cpsData.privacy?.telegram" @click="openPage(`https://t.me/${props.cpsData.privacy?.telegram}`)" class="pointer">
                  <svg class="icon mr-16" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4339" width="20" height="20"><path d="M679.428571 746.857143l84-396q5.142857-25.142857-6-36t-29.428571-4L234.285714 501.142857q-16.571429 6.285714-22.571428 14.285714t-1.428572 15.142858 18.285715 11.142857l126.285714 39.428571 293.142857-184.571428q12-8 18.285714-3.428572 4 2.857143-2.285714 8.571429l-237.142857 214.285714-9.142857 130.285714q13.142857 0 25.714285-12.571428l61.714286-59.428572 128 94.285715q36.571429 20.571429 46.285714-21.714286z m344.571429-234.857143q0 104-40.571429 198.857143t-109.142857 163.428571-163.428571 109.142857-198.857143 40.571429-198.857143-40.571429-163.428571-109.142857-109.142857-163.428571T0 512t40.571429-198.857143 109.142857-163.428571T313.142857 40.571429 512 0t198.857143 40.571429 163.428571 109.142857 109.142857 163.428571 40.571429 198.857143z" p-id="4340" fill="#666666"></path></svg>
                </div>
                <div v-if="props.cpsData.privacy?.twitter" @click="openPage(`https://x.com/${props.cpsData.privacy?.twitter}`)" class="pointer">
                  <svg class="icon mr-16" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5471" width="20" height="20"><path d="M1024 512c0-282.763636-229.236364-512-512-512C229.236364 0 0 229.236364 0 512s229.236364 512 512 512C794.763636 1024 1024 794.763636 1024 512zM236.311273 693.946182c8.843636 1.117091 17.873455 1.722182 26.996364 1.722182 53.015273 0.093091 101.794909-19.037091 140.474182-51.153455-49.524364-1.163636-91.275636-36.165818-105.658182-84.200727 6.888727 1.442909 14.010182 2.280727 21.271273 2.327273 10.333091 0.046545 20.293818-1.349818 29.789091-4.049455-51.758545-11.450182-90.763636-60.555636-90.763636-119.063273 0-0.512 0-1.024 0-1.536 15.266909 9.216 32.674909 14.801455 51.246545 15.639273C279.365818 431.709091 259.397818 394.472727 259.397818 352.581818c0-22.155636 5.585455-42.821818 15.313455-60.509091 55.808 73.774545 139.170909 122.740364 233.146182 128.837818-1.954909-8.797091-2.932364-17.966545-2.932364-27.322182 0-66.141091 50.641455-118.923636 113.105455-117.899636 32.535273 0.558545 61.952 15.499636 82.571636 38.958545 25.786182-4.933818 49.989818-14.429091 71.819636-27.694545-8.424727 27.601455-26.391273 50.594909-49.757091 64.977455 22.900364-2.56 44.683636-8.610909 64.977455-17.780364-15.173818 23.598545-34.350545 44.218182-56.459636 60.695273 0.232727 5.12 0.325818 10.24 0.325818 15.36 0 157.044364-113.803636 338.152727-321.861818 338.059636C345.832727 748.311273 286.347636 728.296727 236.311273 693.946182z" p-id="5472" fill="#666666"></path></svg>
                </div>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex flex-ai-center baseline">
              <p class="text-capitalize label">Description:</p>
              <div>{{props.cpsData.desc || ''}}</div>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { explorerLink, signature } from "@/utils/storage"
import { copyContent, hiddAddress, hiddLongAddress, momentFun, replaceDecimalsFormat } from "@/utils/common"
import { openPage } from "@/hooks/router";

const bodyWidth = ref(document.body.clientWidth > 1440 ? 24 : 10)
const route = useRoute()

onMounted(() => {})

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

function emailMethod(email: string) {
  var mailtoUrl = 'mailto:' + email;
  window.location.href = mailtoUrl;
}
</script>

<style lang="less" scoped>
.providers-cp {
  height: calc(100% - 0.62rem);
  padding: 0.3rem 0.35rem 0.1rem;
  margin: 0.22rem 0 0;
  background-color: var(--color-light);
  border-radius: 0.2rem;
  .note {
    a.link-to {
      color: var(--color-primary);
      // text-decoration: underline;
    }
    .el-row {
      margin: 0.1rem 0;
      &.m{
        margin: 0 0 0.1rem;
      }
      .el-col {
        margin: 0.08rem 0;
        .label {
          min-width: 1.85rem;
        }
      }
    }
  }
  p {
    color: #000;
    &.color {
      color: var(--color-primary);
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
    &.tab-title{
      width: 100%;
      margin: 0 0 0.1rem;
      border-bottom: 1px solid var(--color-border);
    }
  }
  .collateral {
    padding: 0.05rem 0.12rem 0.03rem;
    margin: 0 0 0.1rem;
    background-color: var(--color-primary);
    border-radius: 0.2rem;
    color: var(--color-light);
    line-height: 1;
    cursor: pointer;
    &.m {
      margin: 0;
    }
    &.is-disabled {
      opacity: 0.8;
      cursor: no-drop;
    }
    &.b-ecp,
    &.b-fcp {
      margin: 0;
      background-color: #52ce7c;
      border-radius: 0.04rem;
      &.b-fcp {
        background-color: #699bff;
      }
    }
  }
  :deep(.el-descriptions) {
    font-size: inherit;
    .el-descriptions__body {
      .el-descriptions__table {
        .el-descriptions__cell {
          font-size: inherit;
        }
      }
    }
  }
}
</style>
