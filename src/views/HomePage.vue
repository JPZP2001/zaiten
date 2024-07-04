<template>
  <BackgroundVideo />
    <div class="home">
      <ButtonToHome />
    </div>
</template>
  
  <script>
  import BackgroundVideo from '../components/bgVideo.vue'
  import ButtonToHome from '../components/startButton.vue'
  
  export default {
    name: 'HomePage',
    components: {
      ButtonToHome,
      BackgroundVideo
    }
  }
  </script>
  
  <style scoped>
  .home {
    text-align: center;
    width: 100%;
    margin-top: 400px;

  }
  </style>
  