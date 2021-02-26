<template>
  <div class="wrapper" id="modal_wrapper">
    <div class="modal-window">
      <img
        class="modal-img"
        v-bind:src="require(`@/assets/img/${imageInformation.name}`)"
        v-bind:alt="imageInformation.alt"
      />
      <button
        type="button"
        class="btn-close"
        v-on:click="handleBtnCloseClick"
        v-cloak
      ></button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppModalWindow",

  props: {
    images: {
      type: Array,
      required: true,
      default: () => []
    },

    clickedImageId: {
      type: Number,
      required: true,
      default: 0
    }
  },

  computed: {
    imageInformation() {
      return this.images.find(item => item.id === this.clickedImageId);
    }
  },

  methods: {
    handleBtnCloseClick() {
      this.$emit("modal-close");
    }
  }
};
</script>

<style scoped>
.wrapper {
  position: absolute;
  width: 100%;
  height: 100vh;
  background-color: rgba(19, 17, 17, 0.8);
  z-index: 999;
  left: 0;
}

.modal-window {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
}

.modal-img {
  width: 100%;
  height: 100%;
}

.btn-close {
  width: 30px;
  height: 30px;
  position: absolute;
  right: -30px;
  top: -30px;
  border: none;
  background-color: transparent;
  outline: none;
  cursor: pointer;
}

.btn-close::before,
.btn-close::after {
  content: "";
  display: block;
  position: absolute;
  left: 0;
  top: 12.5px;
  width: 100%;
  height: 4px;
  background-color: #fff;
  transition: 0.3s ease;
}

.btn-close::before {
  transform: rotate(45deg);
}

.btn-close::after {
  transform: rotate(-45deg);
}

.btn-close:hover::before,
.btn-close:hover::after {
  background-color: dodgerblue;
}
</style>
