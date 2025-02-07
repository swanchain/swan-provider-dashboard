<template>
  <section class="mycps-container">
    <el-row :gutter="bodyWidth">
      <el-col :span="24" class="m">
        <div class="module-container font-14">
          <el-tabs
            v-model="activeName"
            type="card"
            class="demo-tabs"
            @tab-click="handleClick"
          >
            <el-tab-pane label="Online" name="online"></el-tab-pane>
            <el-tab-pane label="Offline" name="offline"></el-tab-pane>
          </el-tabs>

          <el-table :data="providersData" empty-text="No Data" v-loading="providersFCPLoad">
            <el-table-column prop="addr" min-width="130">
              <template #header>
                <div class="font-14 weight-4">CP Account</div>
              </template>
              <template #default="scope">
                <div class="flex flex-ai-center flex-jc-center nowrap copy-style">
                  <span class="name-style w t" @click="handleCP(scope.row.addr)">{{hiddAddress(scope.row.addr)}}</span>
                  <svg @click="copyContent(scope.row.addr, 'Copied')" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2309" width="18" height="18">
                    <path d="M720 192h-544A80.096 80.096 0 0 0 96 272v608C96 924.128 131.904 960 176 960h544c44.128 0 80-35.872 80-80v-608C800 227.904 764.128 192 720 192z m16 688c0 8.8-7.2 16-16 16h-544a16 16 0 0 1-16-16v-608a16 16 0 0 1 16-16h544a16 16 0 0 1 16 16v608z"
                      p-id="2310" fill="#b5b7c8"></path>
                    <path d="M848 64h-544a32 32 0 0 0 0 64h544a16 16 0 0 1 16 16v608a32 32 0 1 0 64 0v-608C928 99.904 892.128 64 848 64z" p-id="2311" fill="#b5b7c8"></path>
                    <path d="M608 360H288a32 32 0 0 0 0 64h320a32 32 0 1 0 0-64zM608 520H288a32 32 0 1 0 0 64h320a32 32 0 1 0 0-64zM480 678.656H288a32 32 0 1 0 0 64h192a32 32 0 1 0 0-64z" p-id="2312" fill="#b5b7c8"></path>
                  </svg>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="type" min-width="120">
              <template #header>
                <div class="font-14 weight-4 ">Account Type</div>
              </template>
              <template #default="scope">
                <span v-if="scope.row.type === 1">FCP</span>
                <span v-else-if="scope.row.type === 2">ECP</span>
                <span v-else>ECP & FCP</span>
              </template>
            </el-table-column>
            <el-table-column prop="cu" min-width="60">
              <template #header>
                <div class="font-14 weight-4">CU</div>
              </template>
              <template #default="scope">
                <div>{{ replaceFormat(scope.row.cu/100) }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="status" min-width="60">
              <template #header>
                <div class="font-14 weight-4">Status</div>
              </template>
              <template #default="scope">
                <div>{{ scope.row.status }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="created_at" min-width="60">
              <template #header>
                <div class="font-14 weight-4">Create Time</div>
              </template>
              <template #default="scope">
                <div>{{ momentFun(scope.row.created_at) }}</div>
              </template>
            </el-table-column>
            <el-table-column width="80">
              <template #default="scope">
                <div>
                  <!-- @command="handleSelect" -->
                  <el-dropdown popper-class="menu-style" placement="bottom-end">
                    <div class="el-dropdown-link setting-style loginImg flex flex-ai-center pointer">
                      <xy-icon class="icon" :nameProps="'Right-Icon'" :width="'0.24rem'" :height="'0.24rem'"></xy-icon>
                    </div>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item command="UBI-Tasks">
                          <div class="pointer pt-6 pb-6 w-100" @click="handleSelect('UBI-Tasks', scope.row.addr, scope.row.type)">UBI Tasks</div>
                        </el-dropdown-item>
                        <el-dropdown-item command="Application-Tasks">
                          <div class="pointer pt-6 pb-6 w-100" @click="handleSelect('Application-Tasks', scope.row.addr, scope.row.type)">Application Tasks</div>
                        </el-dropdown-item>
                        <el-dropdown-item command="Health">
                          <div class="pointer pt-6 pb-6 w-100" @click="handleSelect('Health', scope.row.addr, scope.row.type)">Health</div>
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                </div>
              </template>
            </el-table-column>
          </el-table>

          <div class="flex flex-ai-center flex-jc-center pagination-style mt-32">
            <span class="showing">Showing {{pagin.pageNo > 0 ? (pagin.pageNo - 1) * pagin.pageSize + 1 : 0 }}-{{pagin.pageNo > 0 ? (pagin.pageNo - 1) * pagin.pageSize + providersData.length : 0 + providersData.length }} /&nbsp;</span>
            <!-- hide-on-single-page -->
            <el-pagination :page-size="pagin.pageSize" :page-sizes="[10, 20, 50, 100]" :current-page="pagin.pageNo" :pager-count="5" :small="small" :background="background" :layout="paginationWidth ? 'total, prev, pager, next, sizes, jumper' : 'total, prev, pager, next'"
              :total="pagin.total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
          </div>
        </div>
      </el-col>
    </el-row>
  </section>
</template>

<script setup lang="ts">
import XyIcon from '@/base-ui/xy-icon.vue'
import { copyContent, hiddAddress, momentFun, paginationWidth, replaceFormat } from '@/utils/common';
import { getOwnerCPsData } from '@/api/cp-profile';

const router = useRouter()
const bodyWidth = ref(document.body.clientWidth > 1440 ? 24 : 10)
const providersFCPLoad = ref(false)
const providersData = ref([])
const pagin = reactive({
  pageSize: 10,
  pageNo: 1,
  total: 0
})
const small = ref(false)
const background = ref(false)
const activeName = ref('online')

const handleClick = (tab: any) => {
  activeName.value = tab.props.name ?? 'online'
  handleCurrentChange(1)
}
function handleSizeChange (val: number) {
  pagin.pageSize = val
  pagin.pageNo = 1
  initList()
}
async function handleCurrentChange (currentPage: number) {
  pagin.pageNo = currentPage
  initList()
}

async function initList () {
  providersFCPLoad.value = true
  try{
    const page = pagin.pageNo > 0 ? pagin.pageNo - 1 : 0
    const paramsCont = {
      "page_no": page,
      "page_size": pagin.pageSize,
      "status": activeName.value
    }
    const providerRes = await getOwnerCPsData(paramsCont)
    providersData.value = providerRes?.data?.list ?? []
  }catch{console.error}
  providersFCPLoad.value = false
}

function handleCP (row:string) {
  router.push({ name: 'accountInfo', params: { cp_addr: row }, query: { type: 'mycps'} })
}

async function handleSelect(key: string, addr: string, type: number) {
  // console.log(key, keyPath) //  
  if (key === 'UBI-Tasks') {
    router.push({ name: 'myCPsUBITasksPage', params: { cp_addr: addr, type: type || 1 } })
  } else if (key === 'Application-Tasks') {
    router.push({ name: 'myCPsApplicationTasksPage', params: { cp_addr: addr, type: type || 1 } })
  } else if (key === 'Health') {
    router.push({ name: 'myCPsHealthPage', params: { cp_addr: addr } })
  } 
}
onMounted(async () => {
  initList()
})
</script>

<style lang="less" scoped>
.mycps-container {
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
        .el-table {
          margin: 0;
          border-top-left-radius: 0;
        }
        .el-tabs {
          --el-tabs-header-height: auto;
          .el-tabs__header {
            margin: 0;
            border-color: #e3e7ee;
            border: 0;
          }
          .el-tabs__nav {
            border-color: #e3e7ee;
            border-radius: 0.1rem 0.1rem 0 0;
            overflow: hidden;
            .el-tabs__item {
              height: auto;
              padding: 0.1rem 0.2rem;
              border: 0;
              transition: all 0.2s;
              &.is-active, &:hover {
                font-weight: 600;
                background-color: var(--color-primary);
                color: var(--color-light);
              }
            }
          }
        }
      }
    }
  }
}
</style>
