<template>
  <div v-if="visible" class="popup-overlay">
    <div class="popup-content">
      <p>{{ message }}</p>
      <button class="close" @click="hidePopup">Got it</button>
    </div>
  </div>
</template>
  
<script>
  export default {
    name: 'PopupMessage',
    data() {
      return {
        visible: false,
        message: ''
      };
    },
    methods: {
      showPopup(message) {
        this.message = message;
        this.visible = true;
      },
      hidePopup() {
        this.visible = false;
      }
    }
  };
</script>
  
<style scoped>
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  
  .popup-content {
    --light: hsl(220, 50%, 90%);
    --focus: #00B473;
    --border-color: hsla(0, 0%, 100%, .2);
    --background: linear-gradient(to right, hsl(210, 30%, 20%), hsl(255, 30%, 25%));
    --shadow-1: hsla(236, 50%, 50%, .3);
    background: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    color: var(--light);
    background: var(--background);
    box-shadow: var(--m-shadow, .4rem .4rem 10.2rem .2rem) var(--shadow-1);
    position: relative;
    overflow: hidden;
  }

  .close {
    border: 1px solid var(--border-color);
    border-radius: 100rem;
    color: inherit;
    background: transparent;
    font-family: inherit;
    padding: 10px;
    width: 200px;
    transition: .2s;
    cursor: pointer;
  }

  .close:hover,
  .close:focus {
    background: var(--focus);
    border-color: var(--focus);
    transform: translateY(-.2rem);
    font-weight: 700;
  }
</style>
  