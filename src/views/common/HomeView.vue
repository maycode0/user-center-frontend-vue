<template>
  <div id="homeView">
    <div class="left-info">
      <a-card hoverable style="width: 100%; height: 100%">
        <a-card-meta title="用户名" description="个人简介">
          <template #avatar>
            <a-avatar
              src="/src/assets/logo.png"
              style="width: 100px; height: 100px"
            />
          </template>
        </a-card-meta>
      </a-card>
    </div>
    <div class="right-info">
      <div class="inner-left">个人信息页</div>
      <div class="inner-right">
        <div class="data">1</div>
        <div class="data">2</div>
        <div class="data">3</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style scoped>
#homeView {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #efefef;
  border-radius: 10px;
}

#homeView .left-info {
  flex-basis: 0;
  flex-grow: 1;
  /* background-color: skyblue; */
}
#homeView .right-info {
  flex-grow: 5;
}
.right-info {
  display: flex;
  background-color: white;
  padding: 10px;
  gap: 10px;
}
.inner-left {
  /* flex-basis: 0; */
  flex-grow: 2;
  background-color: #efefef;
  border-radius: 10px;
  transition: 0.1s;
}
.inner-right {
  /* flex-basis: 0; */
  flex-grow: 1;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.inner-right .data {
  flex-grow: 1;
  background-color: #efefef;
  border-radius: 20px;
  max-height: 100px;
  transition: 0.1s;
}
.inner-left:hover {
  box-shadow: 0 1px 6px gray;
}
.inner-right .data:hover {
  box-shadow: 0 1px 6px gray;
}
</style>
