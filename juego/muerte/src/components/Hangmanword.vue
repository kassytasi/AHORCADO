<template>
  <div class="flex">
    <div
      v-for="(char, index) in word"
      :key="index"
      class="q-mx-sm text-h4"
    >
      <span v-if="correctLetters.includes(char)">{{ char }}</span>
      <span v-else> _ </span>
    </div>
  </div>
</template>

<script setup>
defineProps(["word", "correctLetters"]);
</script>
