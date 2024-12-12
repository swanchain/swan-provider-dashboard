<template>
  <section class="font-14">
    <template v-if="tableData && tableData.length > 0">
      <el-table :data="tableData" style="width: 100%" v-loading="dataLoad">
        <el-table-column type="index" width="70">
          <template #header>
            <div class="font-14 weight-4"></div>
          </template>
          <template #default="scope">
            {{ scope.$index === 0 ? 'ECP' : 'FCP' }}
          </template>
        </el-table-column>
        <el-table-column prop="collateral" label="Collaterals (SWAN)" min-width="120">
          <template #default="scope">
            <div class="font-14">{{ replaceFormat(scope.row.collateral) }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="Price ($)" min-width="100">
          <template #default="scope">
            <div class="font-14">{{ replaceFormat(scope.row.price) }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="cu" label="Computing Unit" min-width="120">
          <template #default="scope">
            <div class="font-14">{{ replaceFormat(scope.row.cu) }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="profit" label="Profit 24h (SWAN)" min-width="120">
          <template #default="scope">
            <div class="font-14">{{ scope.$index === 0 ? replaceFormat(scope.row.profit) : replaceFormat(scope.row.profit*scope.row.fcp_rate) }}</div>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </section>
</template>

<script setup lang="ts">
import { replaceFormat } from '@/utils/common';

const props = withDefaults(
  defineProps<{
    data?: any
  }>(),
  {
    data: {}
  }
)

const dataLoad = ref(false)
const tableData = ref<any>([])


function isObjectNotEmpty(obj: any) {
    return typeof obj === 'object' && obj !== null && Object.keys(obj).length > 0;
}
async function getAllData() {
  dataLoad.value = true
  try {
    const isObject = await isObjectNotEmpty(props.data)
    if (isObject) {
      tableData.value = [
          {...props.data},
          {...props.data}
      ]
      //   .map((obj: any, o: number) => {
      //   const rate = obj?.fcp_rate || 1.2
      //   return Object.fromEntries(
      //       Object.entries(obj).map(
      //           ([key, value]:[key:any, value: any]) => o === 0 ? [key, value] : [key, value * rate]
      //       )
      //   );
      // })
    }
  } finally { dataLoad.value = false }
  
}
watch(() => props.data, () => getAllData())
</script>

<style scoped lang="less">
.child {
  height: 100%;
  span {
    white-space: nowrap;
  }
}
:deep(.el-input) {
  width: 100%;
  // max-width: 250px;
  // min-width: 150px;
  margin: 0 0.16rem 0 0.1rem;
  font-size: inherit;
  .el-input__wrapper {
    background-color: var(--color-light);
    border: 1px solid var(--color-border);
    border-radius: 0.08rem;
    box-shadow: none;
    .el-input__inner {
      width: 100%;
      height: 0.3rem;
      line-height: 0.3rem;
      color: #333;
      @media screen and (max-width: 768px) {
        width: 100%;
      }
      &:hover,
      &:active,
      &:focus {
        border-color: var(--color-primary);
      }
    }
  }
}
.el-button {
  height: 0.3rem;
  padding: 0 0.1rem;
  font-family: inherit;
  font-size: inherit;
  border: 0;
  line-height: 0.3rem;
  .el-icon {
    width: 0.2rem;
    height: 0.2rem;
    margin: 0 0.08rem 0 0;
    svg {
      width: 100%;
      height: 100%;
    }
  }
  &.el-button--info {
    background-color: #d0dcf9;
    border-color: #d0dcf9;
    color: var(--color-primary);
  }
  &:hover,
  &.is-disabled {
    opacity: 0.9;
  }
}
</style>
