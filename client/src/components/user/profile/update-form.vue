<template>
  <form>
    <div>Update profile for {{ user.name }}</div>
  </form>
</template>

<script>
export default {
  name: 'UpdateForm',
  props: {
    user: {
      type: Object,
      default: null,
    },
  }
};
</script>
