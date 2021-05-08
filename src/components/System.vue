<template>
  <div id="error">
    <p>404</p>
    <p>Page Not Found</p>
  </div>
</template>

<script>
export default {
  props: ["error"],
  layout: "error",
};
</script>

<style scoped>
#error {
  width: 100%;
  text-align: center;
  line-height: 1.3;
  margin: 10% 0;
}
p {
  font-size: 25px;
}
</style>
