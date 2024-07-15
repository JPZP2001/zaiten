<template>
  <button class="button" @click="goToSearch"><span>START</span></button>
</template>
  
<script>
  export default {
    name: 'StartButton',
    methods: {
      goToSearch() {
        const paramsList = ['pop', 80, 0.7, 0.8];
        const paramsString = encodeURIComponent(JSON.stringify(paramsList));
        this.$router.push(`/search/${paramsString}`);
      }
    }
  }
</script>
  
  <style scoped>
  button {
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    width: 8em;
    
  }

@keyframes ripple {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.2;
    transform: scale(1.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.button {
  display: inline-block;    
  position: relative;
  padding: 10px 20px;
  background-color: transparent;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  overflow: hidden;
  font-size: 25px;
  font-weight: bolder;
  font-family: "Jersey 10", sans-serif;
  margin-top: 200px;
}

.button span {
  font-family: "Jersey 10", sans-serif;
  display: inline-block;
  animation: ripple 3s infinite;
  opacity: 80%;
}

.button span:nth-child(2) {
  animation-delay: 0.1s;
}

.button span:nth-child(3) {
  animation-delay: 0.2s;
}

.button span:nth-child(4) {
  animation-delay: 0.3s;
}

.button span:nth-child(5) {
  animation-delay: 0.4s;
}

</style>
  