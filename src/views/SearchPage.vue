<template>
  <div class="search">
    <LogoText />
    <div>
    <PopupMessage ref="popupMessage"/>
  </div>
    <div v-if="track && track.external_urls && track.external_urls.spotify" class="container">
      <div class="header">
        <span class="trackName"> {{ track.name }} </span>
        <br>
        <span class="artistName"> {{ track?.artists?.[0]?.name || 'Loading...' }} </span>
      </div>
      <div>
        <a :href="track.external_urls.spotify" target="_blank">
          <img :src="track.album.images[0].url" height="200" width="200" />
        </a>
        <div v-if="track.preview_url">
          <audio controls>
            <source :src="track.preview_url" type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
        <div v-else>
          <p class="previewError">No preview available.</p>
        </div>
      </div>
    </div>
    <div v-else>
      Loading recommendations...
    </div>

    <searchSliders :categories="categories"/>
  </div>
</template>

<script>
import searchSliders from '../components/searchSliders.vue'
import LogoText from '../components/logoText.vue'
import PopupMessage from '../components/instructionsPopup.vue';

import { getToken, getRecomendations, getCategories } from "../functions/spotifySetup";

export default {
  name: "SearchPage",
  components: {
    searchSliders,
    LogoText,
    PopupMessage
  },
  data() {
    return {
      categories: this.categories,
      recommendations: [],
      track: [],
      params: [],
    };
  },
  async created() {
    if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
      this.$router.push('/');
    } else {
      console.log('This page is not reloaded');
    }

    let navigationEntries = performance.getEntriesByType('navigation');
    if (navigationEntries.length > 0 && navigationEntries[0].type === 'reload') {
      this.$router.push('/');
    } else {
      console.log('This page is not reloaded');
    }
    const clientId = process.env.VUE_APP_CLIENT_ID;
    const clientSecret = process.env.VUE_APP_CLIENT_SECRET;
    const paramsString = decodeURIComponent(this.$route.params.params);
    const paramsL = JSON.parse(paramsString);

    const params = {
      seed_genres: paramsL[0],
      target_popularity: paramsL[1],
      target_danceability: paramsL[2],
      target_energy: paramsL[3]
    };
  
    try {
      const token = await getToken(clientId, clientSecret);
      this.tracks = await getRecomendations(token, params);
      this.categories = await getCategories(token);
      const randomIndex = Math.floor(Math.random() * this.tracks.length);
      this.track = this.tracks[randomIndex]
    } catch (error) {
      console.error('Error fetching from API:', error);
    }
  },
  methods: {
    triggerPopup() {
      this.$refs.popupMessage.showPopup("Customize the fields below to search for a random song that matches your preferences!");
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.name === 'HomePage') {
        vm.triggerPopup();
      }
    });
  }
};
</script>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 5px;
}

.flex {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
}

.container {
  display: block;
  width: 100%;
  align-items: center;
  justify-content: center;
}

.search {
  color: #dbdbdb;
}

.trackName{
  font-size: 1.7rem;
  font-weight: 600;
  color: #00B473;
}

.artistName{
  font-size: 1rem;
  margin-bottom: 10px;
}

.header{
  margin-bottom: 15px;
}

.previewError{
  color: #dbdbdb84;
  opacity: 50%;
  margin-top: 4px;
}
</style>
