<template>
  <form class="form" v-on:submit.prevent="handleFormSubmit">
    <input
      type="text"
      class="input-search"
      placeholder="Enter country"
      required
    />
    <div class="row">
      <button type="submit" class="btn btn-send">Отправить</button>
      <button
        type="button"
        class="btn btn-reset"
        v-on:click="handleBtnResetClick"
      >
        Сброс
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: "AppForm",

  methods: {
    handleFormSubmit() {
      const searchCountry =
        document.querySelector(".input-search").value.trim() || "unknown";
      this.$emit("send-query", searchCountry);
    },

    handleBtnResetClick() {
      const inputElement = document.querySelector(".input-search");
      inputElement.value = "";
      this.$emit("table-reset");
    }
  }
};
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 20px 30px;
}

.row {
  display: flex;
  justify-content: space-between;
}

.btn {
  margin: 10px 0;
  font-family: "Arial";
  padding: 10px 20px;
  background-color: transparent;
  cursor: pointer;
  border-radius: 5px;
  color: #fff;
  font-size: 16px;
  outline: none;
  border: none;
}

.btn-send {
  background-color: rgb(59, 204, 59);
}

.btn-send:hover {
  background-color: rgb(50, 226, 50);
}

.btn-send:active {
  background-color: rgb(36, 247, 36);
}

.btn-reset {
  background-color: rgb(218, 59, 59);
}

.btn-reset:hover {
  background-color: rgb(230, 41, 41);
}

.btn-reset:active {
  background-color: rgb(241, 25, 25);
}

.input-search {
  padding: 10px;
  font-size: 18px;
  font-family: "Arial";
  border-radius: 5px;
  border: 2px solid rgb(29, 28, 28);
  outline: none;
}

.input-search:focus {
  border: 2px solid dodgerblue;
}
</style>
