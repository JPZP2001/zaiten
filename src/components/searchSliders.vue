<template>
  <form @submit.prevent="submitForm" class="form">
    <div class="form-group">
      <div class="labeled item">
        <label class="genreLabel" for="genre">Genre</label><br>
        <select v-model="genre" id="genre" class="form-select">
          <option v-for="g in genres" :key="g" :value="g">{{ g }}</option>
        </select>
      </div>
      <div class="item labeled">
        <label for="popularity">Popularity</label>
        <br>
        <div class="range-input">
          <input type="range" v-model="popularity" id="input1" min="0" max="100" step="1" class="form-range" />
          <div class="value" id="value1"></div>
        </div>
        <br>
        <label for="danceability">Danceability</label>
        <br>
        <input type="range" v-model="danceability" id="danceability" min="0" max="1" step="0.05" class="form-range" />
        <div class="value2"></div>
        <br>
        <label for="energy">Energy</label>
        <br>
        <input type="range" v-model="energy" id="energy" min="0" max="1" step="0.05" class="form-range" />
        <div class="value3"></div>
      </div>
    </div>
    <div class="form-group item">
      <button type="submit" class="chunky-button">Search</button>
    </div>
  </form>
</template>

<script>
import { getToken, getGenres } from "../functions/spotifySetup";

export default {
  name: "SearchSlider",
  data() {
    return {
      genres: [],
      energy: '',
      popularity: '',
      danceability: '',
      genre: '',
    };
  },
  methods: {
    submitForm() {
      // Debug logs
      console.log('Form submitted');
      console.log('Current values:', {
        genre: this.genre,
        popularity: this.popularity,
        danceability: this.danceability,
        energy: this.energy
      });
      
      const paramsList = [this.genre, this.popularity, this.danceability, this.energy]; // Replace with your list/array of variables
      const paramsString = encodeURIComponent(JSON.stringify(paramsList)); // Serialize the list/array
      console.log('Navigating to:', `/search/${paramsString}`);
      this.$router.replace(`/search/${paramsString}`);
    },
  },
  async created() {
    const clientId = process.env.VUE_APP_CLIENT_ID;
    const clientSecret = process.env.VUE_APP_CLIENT_SECRET;
    
    // Check if params are present in the route
    if (this.$route.params.params) {
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
        this.genres = await getGenres(token);
        this.popularity = params.target_popularity;
        this.danceability = params.target_danceability;
        this.energy = params.target_energy;
        this.genre = params.seed_genres;
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    } else {
      try {
        const token = await getToken(clientId, clientSecret);
        this.genres = await getGenres(token);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
  }
};
</script>

<style>
.labeled {
  width: 100%;
  display: block;
  justify-content: center;
  align-items: center;
}

.item {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.form {

}

input {
  width: 250px;
}

.btn {
  width: 250px;
  height: 30px;
  border-radius: 8cm;
  font-weight: 700;
  background-color: #dbdbdb;
  color: black;
  margin-top: 10px;
  font-size: 0.7rem
}

.chunky-button {
  background-color: #ff6b6b; /* Bright red background */
  color: white; /* White text */
  font-size: 18px; /* Slightly larger text */
  font-weight: bold; /* Bold text */
  padding: 15px 30px; /* Padding to make the button chunky */
  border: none; /* Remove default border */
  border-radius: 10px; /* Rounded corners */
  cursor: pointer; /* Pointer cursor on hover */
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1); /* Light shadow for depth */
  transition: transform 0.2s, box-shadow 0.2s, background-color 0.2s; /* Smooth transition */
}

.chunky-button:hover {
  background-color: #fa3535; /* Darker red on hover */
  transform: translateY(-5px); /* Slight lift on hover */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); /* Deeper shadow on hover */
}

.chunky-button:active {
  transform: translateY(-2px); /* Slightly less lift on click */
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15); /* Slightly lighter shadow on click */
}


.genreLabel{
  margin-bottom: 8px;
}

select {
  margin-top: 20px;
  margin-bottom: 20px;
  width: 250px;
  appearance: none;
  border: 0;
  outline: 0;
  font: inherit;
  padding: 1rem 4rem 1rem 1rem;
  background: var(--arrow-icon) no-repeat right 0.8em center / 1.4em, linear-gradient(to left, var(--arrow-bg) 3em, var(--select-bg) 3em);
  color: #dbdbdb;
  border-radius: 0.25em;
  box-shadow: 0 0 1em 0 #515151;
  cursor: pointer;
  /* Remove focus outline */
  &:focus {
    outline: none;
  }
  /* <option> colors */
  option {
    color: inherit;
    background-color: var(--option-bg);
  }
}

select:hover {
  box-shadow: 0 0 1.5em 0 #00B473;
}
/* === range theme and appearance === */
input[type="range"] {
	font-size: 1rem;
	width: 250px;
}

input[type="range"] {
	color: #00B473;
	--thumb-height: 1.125em;
	--track-height: 0.125em;
	--track-color: rgba(0, 0, 0, 0.2);
	--brightness-hover: 180%;
	--brightness-down: 80%;
	--clip-edges: 0.125em;
}

@media (prefers-color-scheme: dark) {
	input[type="range"] {
		color: #00B473;
		--track-color: rgba(255, 255, 255, 0.1);
	}
}

/* === range commons === */
input[type="range"] {
	position: relative;
	background: #fff0;
	overflow: hidden;
}

/* === WebKit specific styles === */
input[type="range"],
input[type="range"]::-webkit-slider-runnable-track,
input[type="range"]::-webkit-slider-thumb {
	-webkit-appearance: none;
	transition: all ease 100ms;
	height: var(--thumb-height);
}

input[type="range"]::-webkit-slider-runnable-track,
input[type="range"]::-webkit-slider-thumb {
	position: relative;
}

input[type="range"]::-webkit-slider-thumb {
	--thumb-radius: calc((var(--thumb-height) * 0.5) - 1px);
	--clip-top: calc((var(--thumb-height) - var(--track-height)) * 0.5 - 0.5px);
	--clip-bottom: calc(var(--thumb-height) - var(--clip-top));
	--clip-further: calc(100% + 1px);
	--box-fill: calc(-100vmax - var(--thumb-width, var(--thumb-height))) 0 0
		100vmax currentColor;

	width: var(--thumb-width, var(--thumb-height));
	background: linear-gradient(currentColor 0 0) scroll no-repeat left center /
		50% calc(var(--track-height) + 1px);
	background-color: currentColor;
	box-shadow: var(--box-fill);
	border-radius: var(--thumb-width, var(--thumb-height));

	filter: brightness(100%);
	clip-path: polygon(
		100% -1px,
		var(--clip-edges) -1px,
		0 var(--clip-top),
		-100vmax var(--clip-top),
		-100vmax var(--clip-bottom),
		0 var(--clip-bottom),
		var(--clip-edges) 100%,
		var(--clip-further) var(--clip-further)
	);
}

input[type="range"]:hover::-webkit-slider-thumb {
	filter: brightness(var(--brightness-hover));
	cursor: grab;
}

input[type="range"]:active::-webkit-slider-thumb {
	filter: brightness(var(--brightness-down));
	cursor: grabbing;
}

input[type="range"]::-webkit-slider-runnable-track {
	background: linear-gradient(var(--track-color) 0 0) scroll no-repeat center /
		100% calc(var(--track-height) + 1px);
}

input[type="range"]:disabled::-webkit-slider-thumb {
	cursor: not-allowed;
}
</style>
