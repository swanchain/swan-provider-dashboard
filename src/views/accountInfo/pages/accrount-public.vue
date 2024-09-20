<template>
  <el-row :gutter="bodyWidth" class="mt-24">
    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
      <div class="account-public font-14">
        <div class="note b">
          <el-row :gutter="bodyWidth" v-loading="props.cpsLoad">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex flex-ai-center baseline">
              <div class="text-capitalize label flex flex-ai-center">
                <!-- <svg class="icon mr-8" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="18862" width="24" height="24"><path d="M432.56 527.168a150.192 150.192 0 0 1-73.6-129.248V342.24a150.256 150.256 0 0 1 300.512 0v55.664a150.176 150.176 0 0 1-72.048 128.32A344.432 344.432 0 0 1 824.736 718.4c2.56 5.552 7.232 11.2 7.232 16.928v4.784H832V829.92a16 16 0 0 1-16 16H208a16 16 0 0 1-16-16V749.904l0.32-0.032c0-5.28-0.032-10.656 0.336-16.096 0.368-5.408 4.416-10.608 6.8-15.792a344.432 344.432 0 0 1 233.104-190.816zM240 744.928v52.992h544v-53.008a296.16 296.16 0 0 0-544 0zM509.216 240a102.256 102.256 0 0 0-102.256 102.256v55.664a102.256 102.256 0 0 0 204.512 0V342.24A102.256 102.256 0 0 0 509.232 240z" fill="#666666" p-id="18863"></path></svg> -->
                Account Name:
              </div>
              <div>{{ props.cpsData.account_name || '-' }}</div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex flex-ai-center baseline">
              <div class="text-capitalize label flex flex-ai-center">
                <!-- <svg class="icon mr-8" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="17496" width="24" height="24"><path d="M741.12 305.737143H276.114286L511.817143 528.457143z" fill="#666666" p-id="17497"></path><path d="M524.8 566.857143a18.651429 18.651429 0 0 1-25.417143 0.182857l-62.72-59.245714L256 668.525714v49.737143h512v-49.737143l-181.577143-161.645714L524.8 566.857143zM256 337.005714v282.514286l153.965714-136.96zM768 619.52V330.788571l-155.245714 150.491429z" fill="#666666" p-id="17498"></path><path d="M512 9.142857C234.24 9.142857 9.142857 234.24 9.142857 512S234.24 1014.857143 512 1014.857143 1014.857143 789.76 1014.857143 512 789.76 9.142857 512 9.142857z m292.571429 727.405714c0 10.057143-8.228571 18.285714-18.285715 18.285715H237.714286c-10.057143 0-18.285714-8.228571-18.285715-18.285715V287.451429c0-10.057143 8.228571-18.285714 18.285715-18.285715h548.571428c10.057143 0 18.285714 8.228571 18.285715 18.285715v449.097142z" fill="#666666" p-id="17499"></path></svg> -->
                <svg class="icon mr-8" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="20037" width="20" height="20"><path d="M891.521 169.794H132.468c-36.144 0-49.696 9.041-49.696 49.696v528.625c0 40.657 13.558 49.696 49.696 49.696H887c36.144 0 49.696-9.04 49.696-49.696V219.49c4.518-40.657-9.04-49.696-45.187-49.696z m-67.77 49.704C710.8 323.417 539.101 499.625 521.033 513.177c-4.518 4.517-9.042 4.517-18.072 0-22.586-18.072-207.836-194.281-311.751-293.68h632.536zM132.48 748.126V237.578l271.087 257.531c27.108 27.109 45.187 40.657 58.732 54.218 18.071 9.041 31.63 13.557 49.696 13.557s31.63-4.517 49.696-13.557v-4.517c27.108-18.072 112.951-108.432 329.82-307.232v510.548H132.456z m0 0z" p-id="20038" fill="#666666"></path></svg>
                Email Address:
              </div>
              <div>{{props.cpsData.privacy?.email || '-'}}</div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex flex-ai-center baseline">
              <div class="text-capitalize label flex flex-ai-center">
                <svg class="icon mr-8" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4339" width="20" height="20"><path d="M679.428571 746.857143l84-396q5.142857-25.142857-6-36t-29.428571-4L234.285714 501.142857q-16.571429 6.285714-22.571428 14.285714t-1.428572 15.142858 18.285715 11.142857l126.285714 39.428571 293.142857-184.571428q12-8 18.285714-3.428572 4 2.857143-2.285714 8.571429l-237.142857 214.285714-9.142857 130.285714q13.142857 0 25.714285-12.571428l61.714286-59.428572 128 94.285715q36.571429 20.571429 46.285714-21.714286z m344.571429-234.857143q0 104-40.571429 198.857143t-109.142857 163.428571-163.428571 109.142857-198.857143 40.571429-198.857143-40.571429-163.428571-109.142857-109.142857-163.428571T0 512t40.571429-198.857143 109.142857-163.428571T313.142857 40.571429 512 0t198.857143 40.571429 163.428571 109.142857 109.142857 163.428571 40.571429 198.857143z" p-id="4340" fill="#666666"></path></svg>
                Telegram Account:
              </div>
              <div>{{props.cpsData.privacy?.telegram || '-'}}</div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex flex-ai-center baseline">
              <div class="text-capitalize label flex flex-ai-center">
                <svg class="icon mr-8" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5471" width="20" height="20"><path d="M1024 512c0-282.763636-229.236364-512-512-512C229.236364 0 0 229.236364 0 512s229.236364 512 512 512C794.763636 1024 1024 794.763636 1024 512zM236.311273 693.946182c8.843636 1.117091 17.873455 1.722182 26.996364 1.722182 53.015273 0.093091 101.794909-19.037091 140.474182-51.153455-49.524364-1.163636-91.275636-36.165818-105.658182-84.200727 6.888727 1.442909 14.010182 2.280727 21.271273 2.327273 10.333091 0.046545 20.293818-1.349818 29.789091-4.049455-51.758545-11.450182-90.763636-60.555636-90.763636-119.063273 0-0.512 0-1.024 0-1.536 15.266909 9.216 32.674909 14.801455 51.246545 15.639273C279.365818 431.709091 259.397818 394.472727 259.397818 352.581818c0-22.155636 5.585455-42.821818 15.313455-60.509091 55.808 73.774545 139.170909 122.740364 233.146182 128.837818-1.954909-8.797091-2.932364-17.966545-2.932364-27.322182 0-66.141091 50.641455-118.923636 113.105455-117.899636 32.535273 0.558545 61.952 15.499636 82.571636 38.958545 25.786182-4.933818 49.989818-14.429091 71.819636-27.694545-8.424727 27.601455-26.391273 50.594909-49.757091 64.977455 22.900364-2.56 44.683636-8.610909 64.977455-17.780364-15.173818 23.598545-34.350545 44.218182-56.459636 60.695273 0.232727 5.12 0.325818 10.24 0.325818 15.36 0 157.044364-113.803636 338.152727-321.861818 338.059636C345.832727 748.311273 286.347636 728.296727 236.311273 693.946182z" p-id="5472" fill="#666666"></path></svg>
                Twitter Account:
              </div>
              <div>{{props.cpsData.privacy?.twitter || '-'}}</div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" class="flex flex-ai-center baseline">
              <p class="text-capitalize label">Self Description:</p>
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
</script>

<style lang="less" scoped>
.account-public {
  height: calc(100% - 0.2rem);
  padding: 0.1rem 0.35rem;
  margin: 0;
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
        margin: 8px 0;
        .label {
          min-width: 2.5rem;
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
