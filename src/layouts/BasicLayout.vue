<template>
  <div id="basicLayout">
    <a-layout class="layout">
      <a-layout-header class="header">
        <GlobelHeader />
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer"> <GlobelFooter /> </a-layout-footer
    ></a-layout>
  </div>
</template>

<script setup lang="ts">
import GlobelFooter from '@/components/GlobelFooter.vue'
import GlobelHeader from '@/components/GlobelHeader.vue'
</script>

<style scoped>
.layout {
  height: 100vh; /* 占满整个视口高度 */
  display: flex;
  flex-direction: column;
}
#basicLayout .header {
  padding-inline: 20px;
  margin-bottom: 16px;
  color: unset;
  background: white;
}
#basicLayout .content {
  /* display: flex; */
  /* flex-direction: column; */
  margin-bottom: 28px;
  padding: 20px;
}
#basicLayout .footer {
  background: #efefef;
  padding: 16px;
  text-align: center;
}
</style>
