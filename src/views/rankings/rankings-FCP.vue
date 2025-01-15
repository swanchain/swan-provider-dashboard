<template>
  <section id="rankingFCP-container">
    <div class="flex flex-ai-end header-title">
      <h1 class="font-20 font-bold">Fog Computing Provider List</h1>
      <a :href="ELINK.FCPLEARNMORELINK" target="_blank" class="font-14 n">Learn more</a>
    </div>

    <div class="providers-network font-14">
      <div class="module-container">
        <el-row class="search-body flex flex-ai-center font-14">
          <el-col :xs="24" :sm="12" :md="12" :lg="7" :xl="7">
            <div class="flex flex-ai-center nowrap child">
              <span class="font-14">Contract Address: </span>
              <el-input class="zk-input" v-model="networkInput.contract_address" @input="clearChangeProvider()" @change="searchProvider" placeholder="please enter Contract Address" />
            </div>
          </el-col>
          <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <div class="flex flex-ai-center nowrap child">
              <span class="font-14">Name: </span>
              <el-input class="zk-input" v-model="networkInput.owner_addr" @input="clearChangeProvider()" @change="searchProvider" placeholder="please enter CP name" />
            </div>
          </el-col>
          <!-- <el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <div class="flex flex-ai-center nowrap child">
              <span class="font-14">NodeID: </span>
              <el-input class="zk-input" v-model="networkInput.node_id" @input="clearChangeProvider()" @change="searchProvider" placeholder="please enter NodeID" />
            </div>
          </el-col> -->
          <el-col :xs="24" :sm="12" :md="12" :lg="5" :xl="5">
            <div class="flex flex-ai-center nowrap child">
              <el-checkbox v-model="activeChecked" label="Inactive" @change="init" /> &nbsp;&nbsp;
              <el-button type="info" :disabled="!networkInput.contract_address && !networkInput.owner_addr && !networkInput.node_id  ? true:false" round @click="clearProvider">Clear</el-button>
              <el-button type="primary" round @click="searchProvider">
                <el-icon>
                  <Search />
                </el-icon>
                Search
              </el-button>
            </div>
          </el-col>
        </el-row>
        <el-table ref="singleTableRef" :data="providersData" empty-text="No Data" v-loading="providersTableLoad" @sort-change="handleSortChange" @filter-change="handleFilterChange">
          <el-table-column type="index" min-width="40">
            <template #header>
              <div class="font-14 weight-4">Rank</div>
            </template>
            <template #default="scope">
              {{ pagin.pageNo > 0 ? (pagin.pageNo - 1) * pagin.pageSize + scope.$index + 1 : scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column prop="addr" min-width="140">
            <template #header>
              <div class="font-14 weight-4">Contract Address</div>
            </template>
            <template #default="scope">
              <div class="flex flex-ai-center flex-jc-center nowrap copy-style">
                <span class="name-style w" @click="handleSelect(scope.row.addr)">{{hiddAddress(scope.row.addr)}}</span>
                <svg class="icon" @click="copyContent(scope.row.addr, 'Copied')" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6467" width="16" height="16">
                  <path d="M809.19 310.68H398.37a87.79 87.79 0 0 0-87.69 87.69v410.82a87.79 87.79 0 0 0 87.69 87.69h410.82a87.79 87.79 0 0 0 87.69-87.69V398.37a87.79 87.79 0 0 0-87.69-87.69z m29.69 498.51a29.73 29.73 0 0 1-29.69 29.69H398.37a29.73 29.73 0 0 1-29.69-29.69V398.37a29.73 29.73 0 0 1 29.69-29.69h410.82a29.73 29.73 0 0 1 29.69 29.69z"
                    fill="#3d3d3d" p-id="6468"></path>
                  <path d="M251.65 662.81h-29.34a29.73 29.73 0 0 1-29.69-29.69V222.31a29.73 29.73 0 0 1 29.69-29.69h410.81a29.73 29.73 0 0 1 29.69 29.69v29.34a29 29 0 0 0 58 0v-29.34a87.79 87.79 0 0 0-87.69-87.69H222.31a87.79 87.79 0 0 0-87.69 87.69v410.81a87.79 87.79 0 0 0 87.69 87.69h29.34a29 29 0 0 0 0-58z"
                    fill="#3d3d3d" p-id="6469"></path>
                </svg>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="name" min-width="180">
            <template #header>
              <div class="font-14 weight-4">Name</div>
            </template>
            <template #default="scope">
              <div class="auth-container flex flex-ai-center flex-jc-center" v-if="scope.row.account_name">
                <div class="bg flex flex-ai-center flex-jc-center">
                  <div class="font-14 font-bold text-style">{{ scope.row.account_name }}</div>
                  <svg class="icon ml-4" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7319" width="20" height="20"><path d="M512 48.761905a463.238095 463.238095 0 1 1 0 926.47619 463.238095 463.238095 0 0 1 0-926.47619zM451.291429 341.333333H294.863238v40.96h44.665905L416.768 828.952381l388.388571-487.619048h-149.016381l-178.468571 243.809524-26.38019-243.809524z" fill="#077CFF" p-id="7320"></path></svg>
                </div>
              </div>
              <div class="flex flex-ai-center flex-jc-center copy-style" v-else-if="scope.row.name" @click="copyContent(scope.row.name, 'Copied')">                
                <el-popover placement="top" effect="dark" popper-class="popup-content" popper-style="word-break: break-word; text-align: center;font-size:12px;" trigger="hover" :content="scope.row.name">
                  <template #reference>
                    <div>{{hiddAddress(scope.row.name)}}</div>
                  </template>
                </el-popover>
                <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6467" width="16" height="16">
                  <path d="M809.19 310.68H398.37a87.79 87.79 0 0 0-87.69 87.69v410.82a87.79 87.79 0 0 0 87.69 87.69h410.82a87.79 87.79 0 0 0 87.69-87.69V398.37a87.79 87.79 0 0 0-87.69-87.69z m29.69 498.51a29.73 29.73 0 0 1-29.69 29.69H398.37a29.73 29.73 0 0 1-29.69-29.69V398.37a29.73 29.73 0 0 1 29.69-29.69h410.82a29.73 29.73 0 0 1 29.69 29.69z"
                    fill="#3d3d3d" p-id="6468"></path>
                  <path d="M251.65 662.81h-29.34a29.73 29.73 0 0 1-29.69-29.69V222.31a29.73 29.73 0 0 1 29.69-29.69h410.81a29.73 29.73 0 0 1 29.69 29.69v29.34a29 29 0 0 0 58 0v-29.34a87.79 87.79 0 0 0-87.69-87.69H222.31a87.79 87.79 0 0 0-87.69 87.69v410.81a87.79 87.79 0 0 0 87.69 87.69h29.34a29 29 0 0 0 0-58z"
                    fill="#3d3d3d" p-id="6469"></path>
                </svg>
              </div>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="node_id" min-width="130">
            <template #header>
              <div class="font-14 weight-4">NodeID</div>
            </template>
            <template #default="scope">
              <div class="flex flex-ai-center flex-jc-center copy-style" v-if="scope.row.node_id" @click="copyContent(scope.row.node_id, 'Copied')">
                {{hiddAddress(scope.row.node_id)}}
                <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6467" width="16" height="16">
                  <path d="M809.19 310.68H398.37a87.79 87.79 0 0 0-87.69 87.69v410.82a87.79 87.79 0 0 0 87.69 87.69h410.82a87.79 87.79 0 0 0 87.69-87.69V398.37a87.79 87.79 0 0 0-87.69-87.69z m29.69 498.51a29.73 29.73 0 0 1-29.69 29.69H398.37a29.73 29.73 0 0 1-29.69-29.69V398.37a29.73 29.73 0 0 1 29.69-29.69h410.82a29.73 29.73 0 0 1 29.69 29.69z"
                    fill="#3d3d3d" p-id="6468"></path>
                  <path d="M251.65 662.81h-29.34a29.73 29.73 0 0 1-29.69-29.69V222.31a29.73 29.73 0 0 1 29.69-29.69h410.81a29.73 29.73 0 0 1 29.69 29.69v29.34a29 29 0 0 0 58 0v-29.34a87.79 87.79 0 0 0-87.69-87.69H222.31a87.79 87.79 0 0 0-87.69 87.69v410.81a87.79 87.79 0 0 0 87.69 87.69h29.34a29 29 0 0 0 0-58z"
                    fill="#3d3d3d" p-id="6469"></path>
                </svg>
              </div>
              <span v-else>-</span>
            </template>
          </el-table-column> -->
          <el-table-column prop="cu" sortable="custom" min-width="80">
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
              <div>
                {{replaceFormat(scope.row.cu/100)}}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="deployments" sortable="custom" min-width="110">
            <template #header>
              <div class="font-14 weight-4">Deployments</div>
            </template>
            <template #default="scope">
              <div>{{ replaceFormat(scope.row.active_deployments) }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="score" sortable="custom" min-width="80">
            <template #header>
              <div class="font-14 weight-4">Score</div>
            </template>
            <template #default="scope">
              <div>{{ replaceFormat(scope.row.score) }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="gpu_list" min-width="140">
            <template #header>
              <div class="font-14 weight-4">GPU</div>
            </template>
            <template #default="scope">
              <div class="badge flex flex-ai-center flex-jc-center">
                <div class="flex flex-ai-center flex-jc-center machines-style font-13">
                  <span v-for="(gpu, g) in scope.row.gpus" :key="g">
                    {{gpu}}
                  </span>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="region" label="Region" column-key="region" filterable :filters="regionFilters" filter-placement="bottom-end" :filter-multiple="false" min-width="110" />
          <el-table-column prop="uptime" min-width="130">
            <template #header>
              <div class="font-14 weight-4">Uptime</div>
            </template>
            <template #default="scope">
              <div class="flex flex-ai-center flex-jc-center nowrap uptime-container">
                <el-progress :percentage="Number(unifyNumber(scope.row.uptime/10000))" color="#1890ff" :stroke-width="8" />
                <span class="uptime-text text-right">{{unifyNumber(scope.row.uptime/10000)}}%</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="flex flex-ai-center flex-jc-center pagination-style">
          <span class="showing">Showing {{pagin.pageNo > 0 ? (pagin.pageNo - 1) * pagin.pageSize+1 : 0 }}-{{pagin.pageNo > 0 ? (pagin.pageNo - 1) * pagin.pageSize + providersData.length : 0 + providersData.length }} /&nbsp;</span>
          <!-- hide-on-single-page -->
          <el-pagination :page-size="pagin.pageSize" :page-sizes="[10, 20, 50, 100]" :current-page="pagin.pageNo" :pager-count="5" :small="small" :background="background" :layout="paginationWidth ? 'total, prev, pager, next, sizes, jumper' : 'total, prev, pager, next'"
            :total="pagin.total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { getCPsFCPListData, statsOverviewData } from "@/api/overview";
import { ELINK } from "@/constant/envLink";
import { copyContent, debounce, hiddAddress, paginationWidth, replaceFormat, unifyNumber } from "@/utils/common";
import { getLocation, setLocation } from "@/utils/storage";
import {
  Search
} from '@element-plus/icons-vue'

const router = useRouter()
const providersTableLoad = ref(false)
const providersData = ref([])
const pagin = reactive({
  pageSize: 20,
  pageNo: 1,
  total: 0,
  total_deployments: 0,
  active_applications: 0
})
const small = ref(false)
const background = ref(false)
const networkInput = reactive({
  contract_address: '',
  owner_addr: '',
  node_id: '',
  order: '',
  desc: false,
  region: '',
  searchFor: false
})
const regionFilters = ref<any>([])
const activeChecked = ref(false)
const singleTableRef = ref()

const handleFilterChange = (filters: any) => {
  for (const key in filters) {
    if (key === 'region') {
      const result = filters.region[0] ?? ''
      networkInput.region = result
    }
  }
  handleCurrentChange(1)
}
function handleSortChange({ prop, order }) {
  // const sortOrder = { prop, order };
  networkInput.order = prop
  networkInput.desc = order === 'descending' ? true : false
  init()
}
function handleSizeChange(val: number) {
  pagin.pageSize = val
  pagin.pageNo = 1
  init()
}
async function handleCurrentChange (currentPage: number) {
  pagin.pageNo = currentPage
  init()
}
async function init() {
  providersTableLoad.value = true
  try{
    const page = pagin.pageNo > 0 ? pagin.pageNo - 1 : 0
    let paramsCont = {
      "page_no": page,
      "page_size": pagin.pageSize,
      "addr": networkInput.contract_address,
      "name": networkInput.owner_addr,
      "node_id": networkInput.node_id,
      "order": networkInput.order,
      "desc": networkInput.desc,
      "region": networkInput.region,
      "status": activeChecked.value ? 'inactive' : 'active'
    }
    const providerFCPRes = await getCPsFCPListData(paramsCont)
    providersData.value = providerFCPRes?.data?.list ?? []
    pagin.total = providerFCPRes?.data?.total ?? 0
  }catch{console.error}
  providersTableLoad.value = false
}
const searchProvider = async function () {
  networkInput.searchFor = !networkInput.contract_address && !networkInput.owner_addr && !networkInput.node_id ? false : true
  handleCurrentChange(1)
}
const clearChangeProvider = debounce(async function () {
  if(!networkInput.searchFor) return
  if (!networkInput.contract_address && !networkInput.owner_addr && !networkInput.node_id) {
    handleCurrentChange(1)
    networkInput.searchFor = false
  }
}, 700)
function clearProvider () {
  networkInput.contract_address = ''
  networkInput.owner_addr = ''
  networkInput.node_id = ''
  if (networkInput.searchFor) handleCurrentChange(1)
  networkInput.searchFor = false
}
async function handleSelect (type: string) {
  router.push({ name: 'accountInfo', params: { cp_addr: type } })
}
async function getLocationList () {
  try{
    providersTableLoad.value = true
    const overviewRes = await statsOverviewData()
    const location = overviewRes?.data?.location ?? []
    setLocation(location)
    regionList(JSON.stringify(location))
  }catch{providersTableLoad.value = false}
}
function regionList(data: any) {
  const location = JSON.parse(data)
  location.map((item: any) => {
    regionFilters.value.push({
      text: item.name ?? '',
      value: item.name ?? ''
    })
  })
  init()
}
async function getData() {
  let l = await getLocation()
  if (l.toString() === '[]' || l.toString() === '') getLocationList()
  else regionList(l)
}
onMounted(() => getData())
</script>

<style lang="less" scoped>
#rankingFCP-container {
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
        margin: 0 0 0.17rem;
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
