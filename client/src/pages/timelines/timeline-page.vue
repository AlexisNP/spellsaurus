<template>
  <div
    id="spell-container"
    class="container-fluid p-4"
  >
    <h1 class="display-3 font-display mb-3">
      Chronologie
    </h1>
    <timeline />
  </div>
</template>

<script>
import Timeline from "@/components/timeline/timeline";

export default {
  name: 'TimelinePage',
  metaInfo: {
    titleTemplate: '%s - Âges'
  },
  components: {
    'timeline': Timeline
  }
};
</script>

<style>

</style>