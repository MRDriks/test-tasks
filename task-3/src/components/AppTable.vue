<template>
  <table class="table">
    <thead>
      <tr>
        <td>#</td>
        <td>Web pages</td>
        <td>Name</td>
        <td>Domains</td>
        <td>Code</td>
        <td>Country</td>
        <td>State-province</td>
        <td>Save to my list</td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(university, index) in universities" v-bind:key="index">
        <td>{{ index + 1 }}</td>
        <td>
          <a
            v-for="(web, index) in university.web_pages"
            v-bind:key="index"
            v-bind:href="web"
            target="_blanck"
          >
            {{ web }}
          </a>
        </td>
        <td>{{ university.name }}</td>
        <td>
          <p v-for="(domain, index) in university.domains" v-bind:key="index">
            {{ domain }}
          </p>
        </td>
        <td>{{ university.alpha_two_code }}</td>
        <td>{{ university.country }}</td>
        <td>{{ university["state-province"] || "unknown" }}</td>
        <td>
          <input
            type="checkbox"
            v-on:change="handleCheckboxChange($event, university.name)"
            v-bind:checked="setIsChecked(university.name)"
          />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "AppTable",

  props: {
    universities: {
      type: Array,
      required: true,
      default: () => []
    },

    savedUniversities: {
      type: Array,
      required: true,
      default: () => []
    }
  },

  methods: {
    handleCheckboxChange(event, universityName) {
      if (event.target.checked) {
        this.$emit("save-university", universityName);
      } else {
        this.$emit("remove-university", universityName);
      }
      this.$emit("update-web-storage");
    },

    setIsChecked(universityName) {
      return this.savedUniversities.some(
        university => university.name === universityName
      );
    }
  }
};
</script>

<style scoped>
.table,
td,
tr {
  border: 2px solid rgb(48, 46, 46);
  border-collapse: collapse;
  text-align: center;
}

thead td {
  font-weight: bold;
}
</style>
