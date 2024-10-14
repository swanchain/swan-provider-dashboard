<template>
  <section id="aarECP-container">
    <div class="flex flex-ai-end header-title">
      <h1 class="font-20 font-bold">Edge Computing Provider Leaderboard</h1>
      <a :href="ELINK.ECPLEARNMORELINK" target="_blank" class="font-14 n">Learn more</a>
    </div>

    <div class="providers-network font-14">
      <div class="module-container">
        <el-row class="search-body flex flex-ai-center font-14">
          <el-col :xs="24" :sm="12" :md="12" :lg="9" :xl="9">
            <div class="flex flex-ai-center nowrap child">
              <span class="font-14">Contract Address: </span>
              <el-input class="zk-input" v-model="networkZK.cp_addr" @input="clearChangeProvider()" @change="searchZKProvider" placeholder="please enter CP Account Address" />
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="5" :xl="5">
            <div class="flex flex-ai-center nowrap child">
              <el-button type="info" :disabled="!networkZK.cp_addr ? true:false" round @click="clearProvider">Clear</el-button>
              <el-button type="primary" round @click="searchZKProvider">
                <el-icon>
                  <Search />
                </el-icon>
                Search
              </el-button>
            </div>
          </el-col>
        </el-row>

        <el-table :data="providerBody.ubiTableData" @filter-change="handleFilterECPChange" @expand-change="expandChange" :row-key="getRowKeys" :expand-row-keys="expands" style="width: 100%" empty-text="No Data" v-loading="providersECPLoad">
          <el-table-column type="index" min-width="50">
            <template #header>
              <div class="font-14 weight-4">Rank</div>
            </template>
            <template #default="scope">
              <div class="badge flex flex-ai-center flex-jc-center">
                <img v-if="scope.$index === 0 && paginZK.pageNo <= 1 && !(networkZK.cp_addr && networkZK.searchFor)" :src="badgeIcon01" alt="">
                <img v-else-if="scope.$index === 1 && paginZK.pageNo <= 1 && !(networkZK.cp_addr && networkZK.searchFor)" :src="badgeIcon02" alt="">
                <img v-else-if="scope.$index === 2 && paginZK.pageNo <= 1 && !(networkZK.cp_addr && networkZK.searchFor)" :src="badgeIcon03" alt="">
                <span v-else>{{ paginZK.pageNo > 0 ? (paginZK.pageNo - 1) * paginZK.pageSize + scope.$index + 1 : scope.$index + 1 }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="addr" label="CP Account Address" min-width="140">
            <template #default="scope">
              <div class="badge flex flex-ai-center flex-jc-center">
                <div class="flex flex-ai-center flex-jc-center copy-style" v-if="scope.row.addr">
                  <router-link :to="{ name: 'accountInfo', params: {cp_addr: scope.row.addr} }">{{hiddAddress(scope.row.addr)}}</router-link>
                  <svg @click="copyContent(scope.row.addr, 'Copied')" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2309" width="18" height="18">
                    <path d="M720 192h-544A80.096 80.096 0 0 0 96 272v608C96 924.128 131.904 960 176 960h544c44.128 0 80-35.872 80-80v-608C800 227.904 764.128 192 720 192z m16 688c0 8.8-7.2 16-16 16h-544a16 16 0 0 1-16-16v-608a16 16 0 0 1 16-16h544a16 16 0 0 1 16 16v608z"
                      p-id="2310" fill="#b5b7c8"></path>
                    <path d="M848 64h-544a32 32 0 0 0 0 64h544a16 16 0 0 1 16 16v608a32 32 0 1 0 64 0v-608C928 99.904 892.128 64 848 64z" p-id="2311" fill="#b5b7c8"></path>
                    <path d="M608 360H288a32 32 0 0 0 0 64h320a32 32 0 1 0 0-64zM608 520H288a32 32 0 1 0 0 64h320a32 32 0 1 0 0-64zM480 678.656H288a32 32 0 1 0 0 64h192a32 32 0 1 0 0-64z" p-id="2312" fill="#b5b7c8"></path>
                  </svg>
                </div>
                <span v-else>-</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="Name" min-width="180">
            <template #default="scope">
              <div class="auth-container flex flex-ai-center flex-jc-center" v-if="scope.row.account_name">
                <div class="bg flex flex-ai-center flex-jc-center">
                  <div class="font-14 font-bold text-style">{{ scope.row.account_name }}</div>
                  <svg class="icon ml-4" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7319" width="20" height="20"><path d="M512 48.761905a463.238095 463.238095 0 1 1 0 926.47619 463.238095 463.238095 0 0 1 0-926.47619zM451.291429 341.333333H294.863238v40.96h44.665905L416.768 828.952381l388.388571-487.619048h-149.016381l-178.468571 243.809524-26.38019-243.809524z" fill="#077CFF" p-id="7320"></path></svg>
                </div>
              </div>
              <div v-else-if="scope.row.name" class="badge flex flex-ai-center flex-jc-center">
                {{scope.row.name}}
              </div>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column prop="gpus" label="GPU" min-width="140">
            <template #default="scope">
              <div class="badge flex-jc-center">
                <div class="flex flex-ai-center flex-jc-center machines-style text-center font-13">
                  <span v-for="(gpu, g) in scope.row.gpus" :key="g">
                    {{gpu}}
                  </span>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="region" column-key="region" filterable :filters="regionFilters" filter-placement="bottom-end" :filter-multiple="false" min-width="100">
            <template #header>
              <div class="font-14 weight-4">Region</div>
            </template>
            <template #default="scope">
              <el-popover placement="top" effect="dark" popper-class="popup-content" popper-style="word-break: break-word; text-align: center;font-size:12px;" trigger="hover" :content="scope.row.region">
                <template #reference>
                  <div class="name-style black">{{scope.row.region ?? '-'}}</div>
                </template>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="Status" min-width="90"
            column-key="status" filterable :filters="[
              { text: 'Inactive', value: 'Inactive' },
              { text: 'Offline', value: 'Offline' },
              { text: 'Online', value: 'Online' },
              { text: 'Inconsistent', value: 'Inconsistent' },
              { text: 'NSC', value: 'NSC' },
              { text: 'NSR', value: 'NSR' },
              { text: 'Declined', value: 'Declined' },
              { text: 'Suspended', value: 'Suspended' }
            ]" filter-placement="bottom-end" :filter-multiple="false">
            <template #default="scope">
              <div>
                {{scope.row.status || '-'}}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="tasks" label="Total Task">
            <template #default="scope">
              <div>
                {{ replaceFormat(scope.row.tasks) || ''}}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="complete_rate" label="Completed(%)" min-width="110">
            <template #default="scope">
              <div>
                {{ fixedformat(scope.row.complete_rate,10000) }}%
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="score" min-width="130">
            <template #header>
              <div class="font-14 weight-4 flex flex-ai-center">
                UBI
                <el-popover placement="top-end" effect="dark" popper-style="width:auto; max-width:300px;word-break: break-word; text-align: left;font-size:12px;" trigger="hover">
                  <template #reference>
                    <div class="flex flex-ai-center ml-8">
                      <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7201" width="14" height="14">
                        <path d="M512 64a448 448 0 1 1 0 896A448 448 0 0 1 512 64z m0 71.972571a375.954286 375.954286 0 1 0 0 752.054858A375.954286 375.954286 0 0 0 512 135.972571z m35.181714 266.020572c12.361143 0 21.796571 2.486857 28.672 8.045714 7.314286 5.997714 11.044571 14.043429 11.044572 23.917714 0 10.971429-11.190857 52.589714-33.060572 123.172572l-4.096 13.677714C517.778286 676.498286 512.731429 698.514286 512.731429 720.384c0 3.510857 0.731429 6.070857 2.194285 7.68 1.462857 1.755429 2.340571 2.340571 2.706286 2.340571 8.265143 0 35.766857-20.333714 78.262857-59.245714l8.777143 0.146286 19.456 18.944-0.146286 9.289143-2.779428 2.56c-45.568 41.691429-77.677714 67.584-98.889143 79.213714l-1.682286 0.877714c-21.357714 11.702857-39.058286 17.773714-53.248 17.773715a44.324571 44.324571 0 0 1-32.914286-12.726858 49.371429 49.371429 0 0 1-11.922285-34.596571c0-42.130286 13.531429-97.645714 64.219428-257.243429a57.197714 57.197714 0 0 0 3.291429-17.92V476.891429c0-2.56-0.438857-2.706286-2.852572-2.706286a41.179429 41.179429 0 0 0-19.748571 6.802286l-0.512 0.219428c-7.972571 4.900571-25.380571 20.260571-55.808 49.005714l-8.265143 0.438858-22.089143-16.822858-0.731428-9.508571 2.048-2.194286c33.572571-35.84 63.634286-61.001143 91.209143-76.288 28.525714-15.872 53.174857-23.844571 73.874285-23.844571z m51.565715-157.988572c11.776 0 22.162286 4.169143 30.134857 12.141715 8.045714 7.972571 12.141714 18.285714 12.141714 30.866285a64.658286 64.658286 0 0 1-17.554286 41.910858 51.2 51.2 0 0 1-39.131428 18.505142 40.448 40.448 0 0 1-29.622857-12.141714 43.373714 43.373714 0 0 1-12.141715-31.670857c0-16.676571 5.339429-30.427429 16.603429-42.276571a53.101714 53.101714 0 0 1 39.497143-17.334858z"
                          fill="#ffffff" p-id="7202"></path>
                      </svg>
                    </div>
                  </template>
                  Universal Basic Income. See details <span class="underline pointer" @click="openPage('https://docs.swanchain.io/core-concepts/token/swan-universal-basic-income-ubi')">here</span>.
                </el-popover>
              </div>
            </template>
            <template #default="scope">
              <div>
                {{replaceFormat(scope.row.score)}}
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="flex flex-ai-center flex-jc-center pagination-style">
          <span class="showing">Showing {{paginZK.pageNo > 0 ? (paginZK.pageNo - 1) * paginZK.pageSize + 1 : 0 }}-{{paginZK.pageNo > 0 ? (paginZK.pageNo - 1) * paginZK.pageSize + providerBody.ubiTableData.length : 0 + providerBody.ubiTableData.length }} /&nbsp;</span>
          <!-- hide-on-single-page -->
          <el-pagination :page-size="paginZK.pageSize" :page-sizes="[10, 20]" :current-page="paginZK.pageNo" :pager-count="5" :small="small" :background="background" :layout="paginationWidth ? 'total, prev, pager, next, sizes, jumper' : 'total, prev, pager, next'"
            :total="paginZK.total" @size-change="handleSizeChange" @current-change="handleZKCurrentChange" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  Search
} from '@element-plus/icons-vue'
import badgeIcon01 from "@/assets/images/icons/badge-1.png"
import badgeIcon02 from "@/assets/images/icons/badge-2.png"
import badgeIcon03 from "@/assets/images/icons/badge-3.png"
import { copyContent, debounce, fixedformat, hiddAddress, paginationWidth, replaceFormat, sizeChange } from "@/utils/common";
import { getUBI0ECPData, getOverviewECPData, statsOverviewData } from "@/api/overview";
import { ELINK } from '@/constant/envLink';
import { getLocation, setLocation } from '@/utils/storage';
import { openPage } from '@/hooks/router';

const route = useRoute()
const router = useRouter()
const providersLoad = ref(false)
const providersECPLoad = ref(false)
const providerBody = reactive({
  ubiTableData: []
})
const paginZK = reactive({
  pageSize: 20,
  pageNo: 1,
  total: 0,
  total_deployments: 0,
  active_applications: 0
})
const small = ref(false)
const background = ref(false)
const cpLoad = ref(false)
const networkZK = reactive({
  cp_addr: '',
  name: '',
  node_id: '',
  searchFor: false
})
const paramsECPFilter = reactive({
  data: {
    status: '',
    region: ''
  }
})
const regionFilters = ref<any>([])
const expands = ref([])

function handleSizeChange(val:number) {
  paginZK.pageSize = val
  paginZK.pageNo = 1
  getUBITable()
}
async function handleZKCurrentChange (currentPage:number) {
  paginZK.pageNo = currentPage
  getUBITable()
}
async function getUBITable () {
  providersECPLoad.value = true
  try{
    const page = paginZK.pageNo > 0 ? paginZK.pageNo - 1 : 0
    let params = {
      page_size: paginZK.pageSize,
      page_no: page,
      addr: networkZK.cp_addr,
      node_id: networkZK.node_id
    }
    params = Object.assign({}, params, paramsECPFilter.data)
    const providerRes = await getUBI0ECPData(params)
    paginZK.total = providerRes?.data?.total ?? 0
    providerBody.ubiTableData = await getList(providerRes.data.list)
  } catch { console.error }
  providersECPLoad.value = false
}
const handleFilterECPChange = (filters:any) => {
  for (const key in filters) {
    if (key === 'status') {
      const result = filters.status[0] ?? ''
      paramsECPFilter.data.status = result
    } else if (key === 'region') {
      const result = filters.region[0] ?? ''
      paramsECPFilter.data.region = result
    }
  }
  handleZKCurrentChange(1)
}
let getRowKeys = (row:any) => {
  return row.addr;
}
function expandChange (row:any, expandedRows:any) {
  // console.log(row, expandedRows)
  if (expandedRows.length) {
    expands.value = [];
    if (row) expands.value.push(row.addr);
  } else expands.value = [];
}
async function getList (list:any) {
  let l = list || []
  l.forEach((element:any) => {
    element.gpu_list = []
    try {
      if (element.computer_provider.machines && element.computer_provider.machines.length > 0) {
        element.computer_provider.machines.forEach((machines:any) => {
          if (machines.specs.gpu.details && machines.specs.gpu.details.length > 0) {
            machines.specs.gpu.details.forEach((gpu:any) => {
              if (element.gpu_list.indexOf(gpu.product_name) < 0) element.gpu_list.push(gpu.product_name)
            })
          }
        })
      }
    } catch{console.error}
  })
  return l
}
const searchZKProvider = async function () {
  networkZK.searchFor = !networkZK.cp_addr ? false : true
  handleZKCurrentChange(1)
}
const clearChangeProvider = debounce(async function () {
  if(!networkZK.searchFor) return
  if (!networkZK.cp_addr) {
    handleZKCurrentChange(1)
    networkZK.searchFor = false
  }
}, 700)
function clearProvider () {
  networkZK.cp_addr = ''
  networkZK.node_id = ''
  if(networkZK.searchFor) handleZKCurrentChange(1)
  networkZK.searchFor = false
}
function reset () {
  paginZK.total = 0
  paginZK.total_deployments = 0
  paginZK.active_applications = 0
  paginZK.pageSize = 20
  paginZK.pageNo = 1
  providersLoad.value = false
  providersECPLoad.value = false
  networkZK.cp_addr = ''
  networkZK.node_id = ''
  // getUBITable()
}
async function getLocationList () {
  try{
    providersECPLoad.value = true
    const overviewRes = await statsOverviewData()
    const location = overviewRes?.data?.location ?? []
    setLocation(location)
    regionList(JSON.stringify(location))
  }catch{providersECPLoad.value = false}
}
function regionList(data: any) {
  const location = JSON.parse(data)
  location.map((item: any) => {
    regionFilters.value.push({
      text: item.name ?? '',
      value: item.name ?? ''
    })
  })
  getUBITable()
}
async function init() {
  let l = await getLocation()
  if (l.toString() === '[]' || l.toString() === '') getLocationList()
  else regionList(l)
}
onMounted(async () => {
  init()
  reset()
})
</script>

<style lang="less" scoped>
@import url('../../assets/style/table.less');

#aarECP-container {
  padding: 0 0 0.2rem;
  font-size: 16px;
  line-height: 1.6;
  @media screen and (max-width: 1200px) {
    font-size: 14px;
  }
  .color {
    color: #3c85ff;
  }
  :deep(.providers-overview),
  :deep(.providers-network) {
    padding: 0.14rem 0;
    .module-container {
      position: relative;
      width: calc(100% - 0.6rem);
      height: calc(100% - 0.4rem);
      padding: 0.1rem 0.3rem 0.3rem;
      background-color: var(--color-light);
      border-radius: 0.14rem;
      .title {
        width: 100%;
        margin: 0.22rem 0 0;
        line-height: 1;
        a {
          padding: 0.07rem 0.1rem;
          margin: 0 0 0 0.1rem;
          background-color: var(--color-light);
          border: 1px solid #c1c9d8;
          border-radius: 0.07rem;
          color: var(--color-primary);
          i {
            width: 0.25rem;
            height: 0.25rem;
            margin: 0 0 0 0.07rem;
            background: url(../../assets/images/icons/icon-01.png) no-repeat;
            background-size: 100%;
          }
        }
      }
      .el-row {
        .el-col {
          margin: 0.1rem 0 0;
          &.flex {
            display: flex;
          }
          &.m {
            margin: 0.22rem 0;
          }
          .grid-content {
            width: 100%;
            height: calc(100% - 0.3rem);
            padding: 0.18rem 0.14rem 0.12rem;
            background: var(--color-light);
            border-radius: 0.18rem;
            box-shadow: 0 0 12px #e6e7eb;
            h6 {
              width: 100%;
              line-height: 1.2;
              text-transform: capitalize;
              color: var(--color-border);
              &.t {
                width: auto;
                padding: 0 0.2rem;
              }
              small {
                margin: 0 0 0 5px;
                font-family: "Montserrat-Regular";
                font-weight: normal;
                color: #a0a0a0;
                font-size: 0.13rem;
                @media screen and (min-width: 1800px) {
                  font-size: 0.15rem;
                }
                @media screen and (max-width: 768px) {
                  font-size: 12px;
                }
              }
              .el-select {
                font-size: inherit;
                .el-tooltip__trigger {
                  margin: 0;
                  width: 80px;
                  padding: 2px 4px;
                }
              }
            }
            b {
              position: relative;
              padding: 6px 0 12px;
              margin: 0 0 2px;
              line-height: 1;
              .span {
                position: absolute;
                bottom: 0;
                right: 0.2rem;
                &.up {
                  color: #38a169;
                }
                &.down {
                  color: #e53e3e;
                }
                small {
                  margin: 0;
                  font-family: "Montserrat-Regular";
                  font-weight: normal;
                  color: #a0a0a0;
                  font-size: 0.14rem;
                  @media screen and (min-width: 1800px) {
                    font-size: 0.16rem;
                  }
                  @media screen and (max-width: 768px) {
                    font-size: 13px;
                  }
                }
              }
              small {
                margin: 0 0 0 4px;
                font-size: 0.16rem;
                @media screen and (min-width: 1800px) {
                  font-size: 0.18rem;
                }
                @media screen and (max-width: 768px) {
                  font-size: 15px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
