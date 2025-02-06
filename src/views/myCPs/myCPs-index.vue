<template>
  <section id="main-container">
    <div class="flex flex-ai-center header-title">
      <h1 class="font-20 font-bold">My CPs</h1>
    </div>

    <div class="providers-overview">
      <table-list></table-list>
    </div>
  </section>
</template>

<script setup lang="ts">
import { metaAddress, token } from '@/utils/storage';
import tableList from './pages/table-list.vue'
import { toHome } from '@/hooks/router';

watch(() => token.value, () => {
  if (!token.value) {
    toHome()
  }
})
</script>

<style lang="less" scoped>
#main-container {
  padding: 0 0 0.2rem;
  font-size: 16px;
  line-height: 1.6;
  @media screen and (max-width: 1200px) {
    font-size: 14px;
  }
  .header-title {
    padding: 0.1rem 0 0.15rem;
    .search{
      white-space: nowrap;
    }
  }
  .color {
    color: #3c85ff;
  }
  :deep(.providers-overview) {
    padding: 0;
    .title {
      width: 100%;
      // margin: 0 0 0.1rem;
      a {
        margin: 0 0 0 0.1rem;
        color: var(--color-primary);
        i {
          width: 0.2rem;
          height: 0.2rem;
          margin: 0 0 0 0.07rem;
          background: url(../../assets/images/icons/icon-01.png) no-repeat;
          background-size: 100%;
        }
      }
    }
  }
}
</style>
