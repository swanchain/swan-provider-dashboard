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
        <el-table-column prop="price" label="Hardware Cost($)" min-width="120">
          <template #default="scope">
            <div class="font-14">{{ replaceFormat(1050 * scope.row.cu) }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="Price ($)" min-width="100">
          <template #default="scope">
            <div class="font-14">{{ replaceNumberFormat(scope.row.price, 3) }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="total_cus" min-width="100">
          <template #header>
            <div class="font-14 weight-4 flex flex-ai-center">
              Total CU
              <el-popover placement="top" effect="dark" popper-style="width:auto; max-width:300px;word-break: break-word; text-align: left;font-size:12px;" trigger="hover">
                <template #reference>
                  <div class="flex flex-ai-center ml-8">
                    <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7201" width="14" height="14">
                      <path d="M512 64a448 448 0 1 1 0 896A448 448 0 0 1 512 64z m0 71.972571a375.954286 375.954286 0 1 0 0 752.054858A375.954286 375.954286 0 0 0 512 135.972571z m35.181714 266.020572c12.361143 0 21.796571 2.486857 28.672 8.045714 7.314286 5.997714 11.044571 14.043429 11.044572 23.917714 0 10.971429-11.190857 52.589714-33.060572 123.172572l-4.096 13.677714C517.778286 676.498286 512.731429 698.514286 512.731429 720.384c0 3.510857 0.731429 6.070857 2.194285 7.68 1.462857 1.755429 2.340571 2.340571 2.706286 2.340571 8.265143 0 35.766857-20.333714 78.262857-59.245714l8.777143 0.146286 19.456 18.944-0.146286 9.289143-2.779428 2.56c-45.568 41.691429-77.677714 67.584-98.889143 79.213714l-1.682286 0.877714c-21.357714 11.702857-39.058286 17.773714-53.248 17.773715a44.324571 44.324571 0 0 1-32.914286-12.726858 49.371429 49.371429 0 0 1-11.922285-34.596571c0-42.130286 13.531429-97.645714 64.219428-257.243429a57.197714 57.197714 0 0 0 3.291429-17.92V476.891429c0-2.56-0.438857-2.706286-2.852572-2.706286a41.179429 41.179429 0 0 0-19.748571 6.802286l-0.512 0.219428c-7.972571 4.900571-25.380571 20.260571-55.808 49.005714l-8.265143 0.438858-22.089143-16.822858-0.731428-9.508571 2.048-2.194286c33.572571-35.84 63.634286-61.001143 91.209143-76.288 28.525714-15.872 53.174857-23.844571 73.874285-23.844571z m51.565715-157.988572c11.776 0 22.162286 4.169143 30.134857 12.141715 8.045714 7.972571 12.141714 18.285714 12.141714 30.866285a64.658286 64.658286 0 0 1-17.554286 41.910858 51.2 51.2 0 0 1-39.131428 18.505142 40.448 40.448 0 0 1-29.622857-12.141714 43.373714 43.373714 0 0 1-12.141715-31.670857c0-16.676571 5.339429-30.427429 16.603429-42.276571a53.101714 53.101714 0 0 1 39.497143-17.334858z"
                        fill="#ffffff" p-id="7202"></path>
                    </svg>
                  </div>
                </template>
                Total computing units show the total computing power on the Swan Chain network.
              </el-popover>
            </div>
          </template>
          <template #default="scope">
            <div class="font-14">{{ replaceFormat(scope.row.total_cus) }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="cu" min-width="120">
          <template #header>
            <div class="font-14 weight-4 flex flex-ai-center">
              CU
              <el-popover placement="top" effect="dark" popper-style="width:auto; max-width:300px;word-break: break-word; text-align: left;font-size:12px;" trigger="hover">
                <template #reference>
                  <div class="flex flex-ai-center ml-8">
                    <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7201" width="14" height="14">
                      <path d="M512 64a448 448 0 1 1 0 896A448 448 0 0 1 512 64z m0 71.972571a375.954286 375.954286 0 1 0 0 752.054858A375.954286 375.954286 0 0 0 512 135.972571z m35.181714 266.020572c12.361143 0 21.796571 2.486857 28.672 8.045714 7.314286 5.997714 11.044571 14.043429 11.044572 23.917714 0 10.971429-11.190857 52.589714-33.060572 123.172572l-4.096 13.677714C517.778286 676.498286 512.731429 698.514286 512.731429 720.384c0 3.510857 0.731429 6.070857 2.194285 7.68 1.462857 1.755429 2.340571 2.340571 2.706286 2.340571 8.265143 0 35.766857-20.333714 78.262857-59.245714l8.777143 0.146286 19.456 18.944-0.146286 9.289143-2.779428 2.56c-45.568 41.691429-77.677714 67.584-98.889143 79.213714l-1.682286 0.877714c-21.357714 11.702857-39.058286 17.773714-53.248 17.773715a44.324571 44.324571 0 0 1-32.914286-12.726858 49.371429 49.371429 0 0 1-11.922285-34.596571c0-42.130286 13.531429-97.645714 64.219428-257.243429a57.197714 57.197714 0 0 0 3.291429-17.92V476.891429c0-2.56-0.438857-2.706286-2.852572-2.706286a41.179429 41.179429 0 0 0-19.748571 6.802286l-0.512 0.219428c-7.972571 4.900571-25.380571 20.260571-55.808 49.005714l-8.265143 0.438858-22.089143-16.822858-0.731428-9.508571 2.048-2.194286c33.572571-35.84 63.634286-61.001143 91.209143-76.288 28.525714-15.872 53.174857-23.844571 73.874285-23.844571z m51.565715-157.988572c11.776 0 22.162286 4.169143 30.134857 12.141715 8.045714 7.972571 12.141714 18.285714 12.141714 30.866285a64.658286 64.658286 0 0 1-17.554286 41.910858 51.2 51.2 0 0 1-39.131428 18.505142 40.448 40.448 0 0 1-29.622857-12.141714 43.373714 43.373714 0 0 1-12.141715-31.670857c0-16.676571 5.339429-30.427429 16.603429-42.276571a53.101714 53.101714 0 0 1 39.497143-17.334858z"
                        fill="#ffffff" p-id="7202"></path>
                    </svg>
                  </div>
                </template>
                Computing units indicate the computing power in the swan network.
              </el-popover>
            </div>
          </template>
          <template #default="scope">
            <div class="font-14">{{ replaceFormat(scope.row.cu) }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="profit" label="Profit 24h (SWAN)" min-width="120">
          <template #default="scope">
            <div class="font-14">{{ scope.$index === 0 ? replaceFormat(scope.row.profit) : replaceFormat(scope.row.profit*scope.row.fcp_rate) }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="profit" label="Profit 30d (SWAN)" min-width="120">
          <template #default="scope">
            <div class="font-14">{{ scope.$index === 0 ? replaceFormat(scope.row.profit*30) : replaceFormat(scope.row.profit*30*scope.row.fcp_rate) }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="profit" label="Profit 360d (SWAN)" min-width="120">
          <template #default="scope">
            <div class="font-14">{{ scope.$index === 0 ? replaceFormat(scope.row.profit*360) : replaceFormat(scope.row.profit*360*scope.row.fcp_rate) }}</div>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </section>
</template>

<script setup lang="ts">
import { replaceFormat, replaceNumberFormat } from '@/utils/common';

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
