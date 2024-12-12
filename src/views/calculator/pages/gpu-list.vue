<template>
  <div class="calculator-content text-center font-20">
    <div class="title flex flex-ai-center pb-16 mb-24">
      <i class="icon icon-gpu"></i>
      <span class="font-18 font-bold">NVIDIA</span>
    </div>
    
    <div v-loading="gpuBarLoad" class="w-100">
      <div class="no-result flex-row center" v-if="gpuData && gpuData.length === 0">No Data</div>
      <el-row :gutter="24" v-else>
        <template v-for="(chip, c) in gpuData" :key="c">
          <el-col :xs="24" :sm="12" :md="8" :lg="6">
            <div class="items-cont flex flex-ai-center flex-jc-between nowrap font-16">
              <div :class="`items-cont-label flex flex-ai-center flex-jc-right ${chip.show?'color-dark':'color-info'} text-right mr-16`">{{chip.name}}</div>
              <div class="items-cont-number flex flex-ai-center">
                <el-input-number v-model="chip.num" placeholder="0"
                  :min="1" :step="1" :step-strictly="true" :controls="false" 
                  @focus="handleFocus(c)" @blur="handleBlur(c)" />
              </div>
            </div>
          </el-col>
        </template>
        <el-col :span="24">
          <div class="flex flex-jc-center mt-40">
            <div class="button font-18 pointer" @click="calculateMethod()">Calculate</div>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="table mt-40">
      <table-list :data="tableData"></table-list>
    </div>
  </div>
</template>

<script setup lang="ts">
import { submitGPUEstimate } from '@/api/resource';
import tableList from './table-list.vue'

const props = withDefaults(
  defineProps<{
    echartData?: any
  }>(),
  {
    echartData: []
  }
)

const gpuBarLoad = ref(true)
const gpuData = ref<any>([])
const tableData = ref<any>({})

function removeValueIfPresent(str: string, value: string) {
  return str.includes(value) ? str.replace(value, '') : str;
}

async function initGPU () {
  try {
    gpuBarLoad.value = true
    const list = props.echartData ?? []
    gpuData.value = await list.map((item: any, i: number) => {
      // const name = removeValueIfPresent(item, 'NVIDIA ')
      return {
        id: i,
        num: null,
        name: item,
        show: false,
        // ...item,
      }
    })
    gpuBarLoad.value = false
  } catch {
    gpuData.value = []
    gpuBarLoad.value = false
  }
}
const emit = defineEmits(['handProfit'])
async function calculateMethod() {
  try {
    gpuBarLoad.value = true
    // const filteredArray = await gpuData.value.filter((item: any) => item['num'] !== 0 && item['num'] !== null);
    // console.log(filteredArray);
    const envsObject: any = {}
    const keyValuePairs = await gpuData.value.map((item: any) => {
      if(item.num) envsObject[item.name] = item.num
    })
    const parmas = {
      gpus: envsObject
    }
    const res = await submitGPUEstimate(parmas)
    tableData.value = res.data
    const list = res?.data?.profit_lines || []
    emit('handProfit', list)
  } finally { 
    gpuBarLoad.value = false
  }
}

function handleFocus(index: number) {
  try {
    gpuData.value[index].show = true
  } catch { console.error }
}

function handleBlur(index: number) {
  try {
    gpuData.value[index].show = gpuData.value[index].num ? true : false
  } catch { console.error }
}

watch(() => props.echartData, () => {
  initGPU()
})
</script>

<style lang="less" scoped>
.calculator-content {
  .title {
    border-bottom: 2px solid var(--color-light-grey);
    color: #76b900;
    .icon {
      width: 0.35rem;
      height: 0.35rem;
      margin: 0 0.07rem 0 0;
      &.icon-gpu {
        background: url(../../../assets/images/icons/icon-gpu.png)
          no-repeat center;
        background-size: 100%;
      }
    }
  }
  :deep(.el-row) {
    .el-col {
      margin: 0.1rem 0 0;
      .items-cont {
        position: relative;
        padding: 0;
        &-label {
          width: 60%;
          min-height: 0.44rem;
          line-height: 0.22rem;
        }
        &-number {
          width: 40%;
          .el-input-number {
            .el-input {
              .el-input__wrapper {
                height: 0.44rem;
                padding: 0;
                box-shadow: none;
                border-bottom: 2px solid var(--color-info);
                border-radius: 0;
                .el-input__inner {
                  height: 0.44rem;
                  font-family: 'HELVETICA-ROMAN';
                  font-size: var(--font-16);
                  font-weight: bold;
                  line-height: 0.44rem;
                  text-align: left;
                }
              }
            }
          }
        }
      }
      .button {
        min-width: 1.2rem;
        padding: 0.12rem 0.24rem;
        background-color: var(--color-primary);
        border-radius: 0.1rem;
        color: var(--color-light);
        opacity: .9;
        transition: all 0.2s;
        &:hover {
          opacity: 1;
        }
      }
    }
  }
}
</style>
