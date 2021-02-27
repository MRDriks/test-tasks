<template>
  <div id="app">
    <AppForm
      v-on:send-query="handleSearchQuery"
      v-on:table-reset="handleTableReset"
    />
    <div class="counter" v-if="universities.length">
      <p>
        Saved universities from all countries:
        <span class="number">{{ savedUniversitiesCounter }}</span>
      </p>
    </div>
    <AppTable
      v-bind:universities="universities"
      v-bind:saved-universities="savedUniversities"
      v-if="universities.length"
      v-on:update-counter="updateCounter"
      v-on:save-university="saveUniversityToList"
      v-on:remove-university="removeUniversityFromList"
      v-on:update-web-storage="updateWebStorage"
    />
  </div>
</template>

<script>
import AppForm from "./components/AppForm";
import AppTable from "./components/AppTable";
import { getUniversitiesByCountry } from "./api/universities";

export default {
  name: "App",

  components: {
    AppForm,
    AppTable
  },

  data() {
    return {
      universities: [],
      savedUniversities: []
    };
  },

  computed: {
    savedUniversitiesCounter() {
      return this.savedUniversities.length;
    }
  },

  created() {
    const universitiesFromStorage = this.getDataFromWebStorage(
      "savedUniversities"
    );
    const countryFromStorage = this.getDataFromWebStorage("searchCountry");
    this.savedUniversities = universitiesFromStorage || [];
    this.handleSearchQuery(countryFromStorage);
  },

  methods: {
    async handleSearchQuery(country) {
      const data = await getUniversitiesByCountry(country);
      this.universities = [...data];
      this.saveDataToWebStorage("searchCountry", country);
    },

    handleTableReset() {
      this.universities = [];
      this.savedUniversities = [];
      this.saveDataToWebStorage("searchCountry", null);
      this.updateWebStorage();
    },

    updateCounter(newCounter) {
      this.counter = newCounter;
    },

    saveUniversityToList(universityName) {
      this.savedUniversities = [
        ...this.savedUniversities,
        { name: universityName }
      ];
    },

    removeUniversityFromList(universityName) {
      const updatedList = this.savedUniversities.filter(
        university => university.name !== universityName
      );
      this.savedUniversities = [...updatedList];
    },

    saveDataToWebStorage(key, data) {
      const dataString = JSON.stringify(data);
      localStorage.setItem(key, dataString);
    },

    getDataFromWebStorage(key) {
      const dataFromStorage = localStorage.getItem(key);
      const universitiesList = JSON.parse(dataFromStorage);
      return universitiesList;
    },

    updateWebStorage() {
      this.saveDataToWebStorage("savedUniversities", this.savedUniversities);
    }
  }
};
</script>

<style scoped>
.counter {
  font-family: "Arial";
  font-size: 18px;
}

.number {
  color: red;
}
</style>
