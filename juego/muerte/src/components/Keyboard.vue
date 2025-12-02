<template>
  <div class="keyboard">
    <button
      v-for="letter in letters"
      :key="letter"
      class="key"
      :disabled="disabledKeys.includes(letter)"
      @click="$emit('press', letter)"
    >
      {{ letter }}
    </button>
  </div>
</template>

<script>
export default {
  name: "Keyboard",
  props: ["disabledKeys"],
  data() {
    return {
      letters: "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split(""),
    };
  },
};
</script>

<style scoped>
.keyboard {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 500px;
  margin: 0 auto;
}

.key {
  width: 45px;
  margin: 5px;
  padding: 12px;
  border: none;
  border-radius: 10px;
  background: #7d00ff;
  color: white;
  font-size: 1rem;
  cursor: pointer;
}

.key:disabled {
  background: #3d0066;
  cursor: not-allowed;
  opacity: 0.5;
}
</style>
