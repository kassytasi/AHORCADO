<template>
  <div class="figure">
    <div v-if="errors > 0" class="line head"></div>
    <div v-if="errors > 1" class="line body"></div>
    <div v-if="errors > 2" class="line arm1"></div>
    <div v-if="errors > 3" class="line arm2"></div>
    <div v-if="errors > 4" class="line leg1"></div>
    <div v-if="errors > 5" class="line leg2"></div>
  </div>
</template>

<script>
export default {
  name: "Mistakes",
  props: ["errors"],
};
</script>

<style scoped>
.figure {
  height: 200px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.line {
  background: black;
  margin: 4px 0;
}

.head {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 4px solid black;
  background: none;
}

.body {
  width: 6px;
  height: 60px;
}

.arm1 {
  width: 50px;
  height: 6px;
  transform: rotate(30deg);
}

.arm2 {
  width: 50px;
  height: 6px;
  transform: rotate(-30deg);
}

.leg1 {
  width: 50px;
  height: 6px;
  transform: rotate(50deg);
}

.leg2 {
  width: 50px;
  height: 6px;
  transform: rotate(-50deg);
}
</style>
