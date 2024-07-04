<template>
    <a class="logo" @click="goToHome">zaiten.</a>
</template>
<script>
  export default {
    name: 'logoText',
    methods: {
      goToHome() {
        this.$router.push('/');
      }
    }
  }
</script>
<style>
.logo {
  position: absolute;
  top: 10px;
  right: 20px;
  color: #dbdbdb;
  z-index: 1;
  font-weight: 900;
  cursor: pointer;
}
</style>