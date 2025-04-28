<script>
export default {
  data() {
    return {
      search: '',
    };
  },
  methods: {
    performSearch() {
      if (this.search.trim()) {
        alert(`Searching for: ${this.search}`);
      } else {
        alert("Please enter a search term.");
      }
    },
  },
};
</script>


<template>
  <v-app>
    <v-container fluid class="background" fill-height>
      <v-row class="justify-center align-center pt-2">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          class="search-bar"
          single-line
          hide-details
          outlined
          @click:append="performSearch"
        />
      </v-row>
    </v-container>
  </v-app>
</template>


<style scoped>
.background {
  background-color: #f5c042; /* Yellow background */
  height: 100vh; /* Full height */
}

.search-bar {
  background-color: white !important; /* White background for the search bar */
  border-radius: 24px; /* Rounded corners */
  max-width: 800px; /* Width of the search bar */
  width: 100%; /* Full width on smaller screens */
}
</style>
