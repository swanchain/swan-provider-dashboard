<template>
  <section class="mycps-ubiTask">
    <div class="mtb-20">
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ name: 'myCPsPage' }">My CPs</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name: 'accountInfo', params: { cp_addr: route.params.cp_addr }, query: { type: 'mycps'} }">{{ route.params.cp_addr }}</el-breadcrumb-item>
        <el-breadcrumb-item>UBI Task</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="ubi-task-history container-landing font-14">
      <el-row class="search-container font-14">
        <el-col :xs="24" :sm="12" :md="24" :lg="8" :xl="8">
          <div class="flex flex-ai-center nowrap child mb-16">
            <span class="font-14">Task UUID: </span>
            <el-input class="zk-input" v-model="paramsContent.owner_addr" @input="clearChangeProvider" @change="searchProvider" placeholder="please enter Task UUID" />
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="24" :lg="14" :xl="14">
          <div class="flex flex-ai-center nowrap child mb-16">
            <span class="font-14 mr-8">Account Type: </span>
            <el-select v-model="paramsContent.type.value" placeholder="Select" size="small" @change="handleZKCurrentChange(1)">
              <el-option v-for="item in paramsContent.type.options" :key="item.value" :label="item.label" :value="item.value">
                <div class="flex flex-ai-center font-12">{{ item.value }}</div>
              </el-option>
            </el-select>
            <el-button type="info" :disabled="!paramsContent.owner_addr ? true:false" round @click="clearProvider">Clear</el-button>
            <el-button type="primary" round @click="searchProvider">
              <el-icon>
                <Search />
              </el-icon>
              Search
            </el-button>
          </div>
        </el-col>
      </el-row>

      <!-- @filter-change="handleFilterChange" -->
      <el-table v-loading="paymentLoad" element-loading-text="Please do not refresh the page" :data="paymentData" stripe style="width: 100%">
        <el-table-column prop="uuid" min-width="120">
          <template #header>
            <div class="font-14 weight-4">task UUID</div>
          </template>
          <template #default="scope">
            <div class="flex flex-ai-center flex-jc-center copy-style" @click="copyContent(scope.row.uuid, 'Copied')">
              {{ hiddAddress(scope.row.uuid) || '-' }}
              <svg t="1717142367802" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6467" width="16" height="16">
                <path d="M809.19 310.68H398.37a87.79 87.79 0 0 0-87.69 87.69v410.82a87.79 87.79 0 0 0 87.69 87.69h410.82a87.79 87.79 0 0 0 87.69-87.69V398.37a87.79 87.79 0 0 0-87.69-87.69z m29.69 498.51a29.73 29.73 0 0 1-29.69 29.69H398.37a29.73 29.73 0 0 1-29.69-29.69V398.37a29.73 29.73 0 0 1 29.69-29.69h410.82a29.73 29.73 0 0 1 29.69 29.69z"
                  fill="#3d3d3d" p-id="6468"></path>
                <path d="M251.65 662.81h-29.34a29.73 29.73 0 0 1-29.69-29.69V222.31a29.73 29.73 0 0 1 29.69-29.69h410.81a29.73 29.73 0 0 1 29.69 29.69v29.34a29 29 0 0 0 58 0v-29.34a87.79 87.79 0 0 0-87.69-87.69H222.31a87.79 87.79 0 0 0-87.69 87.69v410.81a87.79 87.79 0 0 0 87.69 87.69h29.34a29 29 0 0 0 0-58z"
                  fill="#3d3d3d" p-id="6469"></path>
              </svg>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="tx_hash" min-width="120">
          <template #header>
            <div class="font-14 weight-4">TxHash</div>
          </template>
          <template #default="scope">
            <a v-if="scope.row.tx_hash" :href="`${explorerLink}tx/${scope.row.tx_hash}`" target="_blank" class="name-style font-14">{{hiddAddress(scope.row.tx_hash)}}</a>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column prop="slash_tx_hash" min-width="120">
          <template #header>
            <div class="font-14 weight-4">SlashHash</div>
          </template>
          <template #default="scope">
            <a v-if="scope.row.slash_tx_hash" :href="`${explorerLink}tx/${scope.row.slash_tx_hash}`" target="_blank" class="name-style font-14">{{hiddAddress(scope.row.slash_tx_hash)}}</a>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column prop="started_at" min-width="120">
          <template #header>
            <div class="font-14 weight-4">Create Time</div>
          </template>
          <template #default="scope">
            <span>
              {{ momentFun(scope.row.started_at) }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="type" min-width="80">
          <template #header>
            <div class="font-14 weight-4">Type</div>
          </template>
          <template #default="scope">
            <div :class="`${scope.row.type?'method-style':''}`" v-if="paramsContent.type.value === 'ECP'">
              <span v-if="scope.row.type === 1">Fil-C2-512M</span>
              <span v-else-if="scope.row.type === 2">Mining</span>
              <span v-else-if="scope.row.type === 3">AI</span>
              <span v-else-if="scope.row.type === 4">Fil-C2-32G</span>
              <span v-else>-</span>
            </div>
            <div v-else>
              <el-popover placement="top" effect="dark" popper-style="width:auto; max-width:300px;word-break: break-word; text-align: left;font-size:12px;" :content="scope.row.name" trigger="hover">
                <template #reference>
                  <div class="line-2">
                    {{ scope.row.name }}
                  </div>
                </template>
              </el-popover>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="status" min-width="90">
          <template #header>
            <div class="font-14 weight-4">Status</div>
          </template>
          <template #default="scope">
            <div class="capitalize" style="color: var(--color-danger)" :style="taskColor(scope.row.status)">
              {{scope.row.status || '-'}}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="msg" min-width="160">
          <template #header>
            <div class="font-14 weight-4">Note</div>
          </template>
          <template #default="scope">
            <el-popover placement="top" effect="dark" popper-style="width:auto; max-width:300px;word-break: break-word; text-align: left;font-size:12px;" :content="scope.row.msg" trigger="hover">
              <template #reference>
                <div class="line-1">
                  {{ scope.row.msg }}
                </div>
              </template>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
      <div class="flex flex-ai-center flex-jc-center pagination-style">
        <span class="showing">Showing {{pagin.pageNo > 0 ? (pagin.pageNo - 1) * pagin.pageSize + 1 : 0 }}-{{pagin.pageNo > 0 ? (pagin.pageNo - 1) * pagin.pageSize + paymentData.length : 0 + paymentData.length }} /&nbsp;</span>
        <!-- hide-on-single-page -->
        <el-pagination :page-size="pagin.pageSize" :page-sizes="[10, 20, 50, 100]" :current-page="pagin.pageNo" :pager-count="5" :small="small" :background="background" :layout="paginationWidth ? 'total, prev, pager, next, sizes, jumper' : 'total, prev, pager, next'"
          :total="pagin.total" @size-change="handleSizeChange" @current-change="handleZKCurrentChange" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { getOwnerUBIEcpData, getOwnerUBIFcpData } from '@/api/cp-profile';
import { copyContent, debounce, hiddAddress, momentFun, paginationWidth, replaceFormat, taskColor } from '@/utils/common';
import { explorerLink } from '@/utils/storage';
import { Search, ArrowRight } from '@element-plus/icons-vue'

const route = useRoute()
const paymentData = ref([])
const paymentLoad = ref(false)
const pagin = reactive({
  pageSize: 20,
  pageNo: 1,
  total: 0
})
const paramsContent = reactive({
  owner_addr: '',
  type: {
    value: 'FCP',
    options: [{
      label: 'FCP',
      value: 'FCP'
    },{
      label: 'ECP',
      value: 'ECP'
    }]
  },
  searchFor: false
})
const small = ref(false)
const background = ref(false)
const paramsFilter = reactive({
  data: {
    total: 1,
    online: 0
  }
})

const handleFilterChange = (filters: any) => {
  for (const key in filters) {
    if (key === 'status') {
      const result = filters.status[0] ?? ''
      if (result === '') paramsFilter.data.total = 1
      else {
        paramsFilter.data.online = result
        paramsFilter.data.total = 0
      }
    }
  }
  handleZKCurrentChange(1)
}
function handleSizeChange(val: number) {
  pagin.pageSize = val
  pagin.pageNo = 1
  getAllData()
}
async function handleZKCurrentChange (currentPage: number) {
  pagin.pageNo = currentPage
  getAllData()
}
async function getAllData() {
  paymentLoad.value = true
  try {
    const page = pagin.pageNo > 0 ? pagin.pageNo - 1 : 0
    let params = {
      page_size: pagin.pageSize,
      page_no: page,
      uuid: paramsContent.owner_addr
    }
    const dataRes = paramsContent.type.value === 'ECP' ? await getOwnerUBIEcpData(params, route.params.cp_addr) : await getOwnerUBIFcpData(params, route.params.cp_addr)
    paymentData.value = dataRes?.data?.list ?? []
    pagin.total = dataRes?.data?.total ?? 0
  } catch{console.error}
  paymentLoad.value = false
}
const searchProvider = async function () {
  paramsContent.searchFor = !paramsContent.owner_addr ? false : true
  handleZKCurrentChange(1)
}
const clearChangeProvider = debounce(async function () {
  if(!paramsContent.searchFor) return
  if (!paramsContent.owner_addr) {
    handleZKCurrentChange(1)
    paramsContent.searchFor = false
  }
}, 700)
function clearProvider() {
  paramsContent.owner_addr = ''
  if(paramsContent.searchFor) handleZKCurrentChange(1)
  paramsContent.searchFor = false
}
onMounted(() => {
  paramsContent.type.value = String(route.params.type) === '2' ? 'ECP' : 'FCP'
  getAllData()
})
</script>

<style lang="less" scoped>
.mycps-ubiTask {
  :deep(.el-row) {
    .el-col {
      margin: 0.1rem 0;
      .module-container {
        position: relative;
        width: calc(100% - 0.64rem);
        height: calc(100% - 0.5rem);
        padding: 0.25rem 0.32rem;
        background-color: var(--color-light);
        border-radius: 0.14rem;
        @media screen and (max-width: 768px) {
        }
      }
    }
  }
  :deep(.ubi-task-history) {
    margin: 0 auto;
    padding: 0.25rem 0.32rem;
    background-color: var(--color-light);
    border-radius: 0.14rem;
    box-sizing: border-box;
    word-break: break-word;
    text-align: left;

    .search-container {
      justify-content: flex-start;
      flex-wrap: wrap;
      min-height: 30px;
      margin: 0;
      .el-select {
        width: auto;
        margin: 0 0.3rem 0 0;
        font-size: inherit;
        .el-tooltip__trigger {
          margin: 0;
          width: auto;
          height: auto;
          padding: 0.06rem 0.22rem;
          font-size: inherit;
          font-family: inherit;
          border: 1px solid #b6c0d1;
          border-radius: 0.07rem;
          box-shadow: none;
          .el-select__selected-item {
            position: relative;
            top: auto;
            margin: 0 0.16rem 0 0;
            transform: translateY(0px);
            line-height: 1.2;
            color: var(--color-primary);
            &.is-hidden {
              display: none;
            }
          }
          .el-select__suffix {
            .el-select__icon {
              background: url(../../../assets/images/icons/icon-03.png) no-repeat
                center;
              background-size: 100%;
              svg {
                display: none;
              }
            }
          }
        }
      }
      .child {
        height: 100%;
        span {
          white-space: nowrap;
        }
      }
      .el-input {
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
    }
    .el-table {
      tr {
        th {
          .cell {
            .el-tooltip__trigger {
              margin: 0 0 0 4px;
            }
          }
        }
        td {
          .cell {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: normal;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            a {
              width: 100%;
              display: block;
              font-size: inherit;
              &:hover {
                // text-decoration: underline;
              }
            }
          }
        }
      }
    }
    .el-select {
      max-width: 2.4rem;
    }
  }
}
</style>
