<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
    <Card
      v-for="item in items"
      :key="item.label"
      class="shadow-sm"
    >
      <template #content>
        <p class="text-sm text-gray-500">
          {{ item.label }}
        </p>

        <h3
          class="text-3xl font-bold mt-2"
          :class="item.valueClass"
        >
          {{ item.value }}
        </h3>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Card from 'primevue/card'

interface StatItem {
  label: string
  value: number | string
  valueClass?: string
}

defineProps<{
  items: StatItem[]
}>()
</script>
