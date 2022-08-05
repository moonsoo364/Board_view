<template>
  <div>
    <h1>Child Component</h1>
    <slot :message="message"></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'Hello'
    }
  },
}
</script>