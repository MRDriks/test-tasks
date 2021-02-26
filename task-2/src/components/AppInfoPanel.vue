<template>
  <div class="info-panel">
    <p class="counter">Quantity of images: {{ imagesCounter }}</p>
    <p class="date">{{ actualDate }} {{ actualTime }}</p>
  </div>
</template>

<script>
export default {
  name: "AppInfoPanel",

  props: {
    images: {
      type: Array,
      required: true,
      default: () => []
    }
  },

  data() {
    return {
      actualDate: "",
      actualTime: ""
    };
  },

  computed: {
    imagesCounter() {
      return this.images.length;
    }
  },

  created() {
    this.setActualDate();
    this.setActualTime();
  },

  mounted() {
    setInterval(() => {
      this.setActualTime();
    }, 1000);
  },

  methods: {
    setActualDate() {
      const date = new Date();
      const day = String(date.getDate()).padStart(2, 0);
      const month = String(date.getMonth() + 1).padStart(2, 0);
      const year = String(date.getFullYear());
      const result = `${day}.${month}.${year}`;

      this.actualDate = result;
    },

    setActualTime() {
      const date = new Date();
      const hours = String(date.getHours()).padStart(2, 0);
      const minutes = String(date.getMinutes()).padStart(2, 0);
      const result = `${hours}:${minutes}`;

      if (this.actualTime !== result) {
        this.actualTime = result;
      }
    }
  }
};
</script>

<style scoped>
.info-panel {
  background-color: #3a3535;
  color: #fff;
  position: absolute;
  top: 0;
  left: 0;
  font-family: "Arial";
  border-bottom-right-radius: 15px;
  padding: 10px;
  font-size: 18px;
  box-shadow: 0 0 30px 0 rgb(104, 102, 102);
}
</style>
