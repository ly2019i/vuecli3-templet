<template>
  <div id="app">
    <Index />
  </div>
</template>

<script>
import Index from "./page/Index";

export default {
  name: "App",
  components: {
    Index,
  },
};
</script>

<style>
@import url("./assets/css/common.css");
#app {
  width: 1080px;
  margin: auto;
}
#toast {
  position: fixed;
  top: 44%;
  left: 50%;
  transform: translateX(-50%);
  max-width: 680px;
  padding: 20px;
  line-height: 60px;
  text-align: center;
  font-size: 40px;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  display: none;
  z-index: 999;
}
</style>
