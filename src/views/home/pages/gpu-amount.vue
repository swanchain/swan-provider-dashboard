<template>
  <section class="module-container mtb-10 font-14">
    <div class="title flex flex-ai-center mb-10">
      <i class="icon icon-t-gpu"></i>
      <span class="font-16 weight-4">GPU Types and Amount</span>
    </div>
    <el-row :gutter="bodyWidth" class="small-row" v-if="providersData && providersData.length > 0">
      <template v-for="gpu in providersData" :key="gpu">
        <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="6">
          <div class="grid-content">
            <div class="top flex flex-ai-center flex-jc-between">
              <div class="left flex flex-ai-center font-14">
                <i class="icon icon-gpu"></i>
                {{gpu.name}}
              </div>
              <div class="right flex flex-ai-center baseline font-14 font-bold">{{gpu.value}}</div>
            </div>
          </div>
        </el-col>
      </template>
    </el-row>
    <div class="font-18 text-center mt-64 mb-64" v-else>No Data</div>
  </section>
</template>

<script setup lang="ts">
import { getStatsResourceData } from '@/api/resource';

const bodyWidth = ref(document.body.clientWidth > 1440 ? 24 : 10)
const providersLoad = ref(false)
const providersData = ref([])

async function initResource () {
  try{
    providersLoad.value = true
    const echartsRes = await getStatsResourceData()
    providersData.value = echartsRes?.data?.gpu?.models ?? []
  }catch{providersLoad.value = false}
}
onMounted(() => initResource())
</script>

<style lang="less" scoped>
.color {
  color: #3c85ff;
}
.module-container {
  position: relative;
  width: calc(100% - 0.64rem);
  height: calc(100% - 0.5rem);
  padding: 0.25rem 0.32rem;
  background-color: var(--color-light);
  border-radius: 0.14rem;
  .title {
    .icon {
      width: 0.24rem;
      height: 0.24rem;
      margin: 0 0.09rem 0 0;
      @media screen and (max-width: 1024px) {
        width: 16px;
        height: 16px;
      }
      &.icon-t-gpu {
        background: url(../../../assets/images/icons/icon-08.png)
          no-repeat;
        background-size: 100%;
      }
    }
  }
  :deep(.el-row) {
    .el-col {
      margin: 0.2rem 0 0;
      &.flex {
        display: flex;
      }
      .grid-content {
        position: relative;
        width: calc(100% - 0.24rem);
        height: calc(100% - 0.16rem);
        padding: 0.08rem 0.12rem;
        background: var(--color-primary-opacity-10);
        border-radius: 0.08rem;
        .el-col {
          margin: 0.1rem 0 0;
        }
        .top {
          margin: 0;
          .left {
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
          .right {
            .text {
              margin: 0 0 0 0.2rem;
              white-space: nowrap;
              line-height: 1;
              span {
                color: #76b900;
              }
            }
            .small-text {
              margin: 0 0 0 0.14rem;
              color: var(--color-border);
            }
          }
        }
        .content {
          a {
            width: 100%;
            padding: 0.08rem 0;
            background-color: #edf2ff;
            border: 1px solid #a8c2ff;
            border-radius: 0.5rem;
            color: var(--color-primary);
            line-height: 1;
            cursor: pointer;
            text-decoration: none;
            @media screen and (max-width: 1200px) {
              margin: 0.2rem 0 0.1rem;
            }
            &.is-disabled {
              background-color: #f3f4f8;
              border-color: #c6cedc;
              color: #ababab;
              cursor: no-drop;
              pointer-events: none;
            }
          }
        }
        .desc {
          color: #7c889b;
        }
        .color-gpu {
          color: #93c605;
        }
        .color-cpu {
          color: #699bff;
        }
        .color-memory {
          color: #52ce7c;
        }
        .color-storage {
          color: #0046b7;
        }
      }
      .date {
        top: 0;
      }
    }
  }
}
</style>
