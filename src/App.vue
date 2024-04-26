<script setup lang="ts">
import { RouterLink } from 'vue-router'

</script>

<template>
  <div class="container">
    <div class="nav">
      <RouterLink to="/grade">Grade</RouterLink> |
      <RouterLink to="/person/1001">Person</RouterLink> |
      <a href="https://github.com/moxueyi/vant-demo.git">Github</a>
    </div>
    <RouterView></RouterView>
  </div>
</template>

<style lang="less">
#app {
  width: 100dvw;
  background-color: aliceblue;

  .container {
    height: 100%;
    width: 100%;
    display: grid;
    justify-items: center;
  }

  .nav {
    margin: 3dvh 0 3dvh 0;
    height: 10dvh;
    width: 50dvw;
    // 渐变
    background: linear-gradient(to right, #e6c1c1, #1addbd);
    // 圆角
    border-radius: 10px;
    // 小阴影
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.2);

    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;

    a {

      color: #2c3e50;
      font-weight: bold;
      // 文字阴影
      text-shadow: 0 0 10px rgba(0, 0, 0, 0.2);

      &.router-link-exact-active {
        color: #ff0080;
      }
    }
  }

}
</style>