<template>
  <div class="background-video">
    <video autoplay muted loop>
      <source :src="videoSrc" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </div>
</template>

<script>
export default {
  name: 'BackgroundVideo',
  data() {
    return {
      desktopVideoSrc: '/zaiten/bg.mp4', // Path to the desktop video
      mobileVideoSrc: '/zaiten/bgMobile.mp4', // Path to the mobile video
      videoSrc: '', // Active video source
    };
  },
  mounted() {
    this.updateVideoSource();
    window.addEventListener('resize', this.updateVideoSource);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateVideoSource);
  },
  methods: {
    updateVideoSource() {
      // Check the screen width
      const isMobile = window.innerWidth <= 768;
      this.videoSrc = isMobile ? this.mobileVideoSrc : this.desktopVideoSrc;
    }
  }
};
</script>

<style scoped>
.background-video {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
}

.background-video video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
