<template>
  <section id="resource-container">
    <div class="flex flex-ai-center header-title">
      <h1 class="font-20 font-bold">Calculator</h1>
    </div>

    <div class="providers-container">
      <div class="providers-overview">
        <gpu-list :echartData="echartData" @handProfit="handProfit"></gpu-list>
      </div>
    </div>
    
    <div class="providers-container" v-if="profitData && profitData.length > 0">
      <div class="providers-overview">
        <echart-line :profitData="profitData" :priceDefault="priceDefault"></echart-line>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import gpuList from './pages/gpu-list.vue'
import echartLine from './pages/echart-line.vue'
import { getGPUsData } from '@/api/resource'

const echartData = ref<any>([])
const profitData = ref<any>([])
const providersLoad = ref(false)
const priceDefault = ref(0)

async function initResource () {
  try{
    providersLoad.value = true
    const echartsRes = await getGPUsData()
    echartData.value = echartsRes?.data?.list ?? []
  }catch{providersLoad.value = false}
}

function handProfit(row: any, price: number) {
  if (row) {
    priceDefault.value = price
    profitData.value = row
  }
}
onMounted(() => initResource())
</script>

<style lang="less" scoped>
#resource-container {
  padding: 0 0 0.2rem;
  font-size: 16px;
  line-height: 1.6;
  @media screen and (max-width: 1200px) {
    font-size: 14px;
  }
  .providers-container {
    position: relative;
    width: calc(100% - 0.64rem);
    padding: 0.25rem 0.32rem;
    margin: 0.16rem 0;
    background-color: var(--color-light);
    border-radius: 0.14rem;
    .el-col {
      margin: 0 !important;
    }
  }
  :deep(.providers-overview),
  :deep(.providers-network) {
    padding: 0;
    .el-row {
      .el-col {
        &.flex {
          display: flex;
        }
        .usage-style {
          width: 100%;
          margin: 0 0 0.08rem;
          color: #000000;
          label {
            width: 3.1rem;
            margin: 0 0.1rem 0 0;
            line-height: 1.1;
          }
          .progress {
            width: calc(85% - 3.2rem);
            .el-progress {
              width: 100%;
              .el-progress__text {
                display: none;
              }
              .el-progress-bar__outer {
                background-color: #d7d7d7;
              }
            }
            .text {
              margin: 0 0 0 0.2rem;
              white-space: nowrap;
              line-height: 1;
              span {
                color: #76b900;
              }
            }
          }
        }
      }
    }
  }
}
</style>
