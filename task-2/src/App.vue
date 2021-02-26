<template>
  <div id="app">
    <div class="container">
      <AppInfoPanel v-bind:images="images" />
      <AppModalWindow
        v-if="modalWindowIsVisible"
        v-bind:images="images"
        v-bind:clicked-image-id="clickedImageId"
        v-on:modal-close="handleModalWindowCloses"
      />
      <AppGallery
        v-bind:images="images"
        v-on:image-clicked="handleImageClick"
        v-on:remove-btn-clicked="handleBtnRemoveClick"
      />
      <div class="row">
        <button
          type="button"
          class="btn-recover"
          v-on:click="handleBtnRecoverClick"
        >
          Восстановить
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import AppGallery from "./components/AppGallery";
import AppModalWindow from "./components/AppModalWindow";
import AppInfoPanel from "./components/AppInfoPanel";

export default {
  name: "App",

  components: {
    AppGallery,
    AppModalWindow,
    AppInfoPanel
  },

  data() {
    return {
      initialImages: [
        { id: 1, name: "1.jpg", alt: "Some alt text" },
        { id: 2, name: "2.jpg", alt: "Some alt text" },
        { id: 3, name: "3.jpg", alt: "Some alt text" },
        { id: 4, name: "4.jpg", alt: "Some alt text" },
        { id: 5, name: "5.jpg", alt: "Some alt text" },
        { id: 6, name: "6.jpg", alt: "Some alt text" },
        { id: 7, name: "7.jpg", alt: "Some alt text" },
        { id: 8, name: "8.jpg", alt: "Some alt text" },
        { id: 9, name: "9.jpg", alt: "Some alt text" },
        { id: 10, name: "10.jpg", alt: "Some alt text" },
        { id: 11, name: "11.jpg", alt: "Some alt text" },
        { id: 12, name: "12.jpg", alt: "Some alt text" }
      ],
      images: [],
      clickedImageId: 0,
      modalWindowIsVisible: false
    };
  },

  created() {
    const webStorageImages = this.getImagesFromWebStorage();
    this.images = webStorageImages || [...this.initialImages];
  },

  methods: {
    handleImageClick(imageId) {
      this.clickedImageId = imageId;
      this.modalWindowIsVisible = true;
      this.$nextTick(() => {
        document.querySelector("body").style.overflow = "hidden";
        document.querySelector(
          "#modal_wrapper"
        ).style.top = `${window.pageYOffset}px`;
      });
    },

    handleModalWindowCloses() {
      this.modalWindowIsVisible = false;
      document.querySelector("body").style.overflow = "scroll";
    },

    handleBtnRemoveClick(imageId) {
      const updatedImages = this.images.filter(image => image.id !== imageId);
      this.images = [...updatedImages];
      this.saveImagesToWebStorage([...updatedImages]);
    },

    handleBtnRecoverClick() {
      this.images = [...this.initialImages];
      this.saveImagesToWebStorage([...this.initialImages]);
    },

    saveImagesToWebStorage(images) {
      const data = JSON.stringify(images);
      localStorage.setItem("images", data);
    },

    getImagesFromWebStorage() {
      const data = localStorage.getItem("images");
      const images = JSON.parse(data);
      return images;
    }
  }
};
</script>

<style scoped>
#app {
  padding: 50px 0;
}

.container {
  width: 80%;
  margin: 0 auto;
}

.row {
  display: flex;
  justify-content: center;
}

.btn-recover {
  cursor: pointer;
  outline: none;
  border: 2px solid dodgerblue;
  background-color: dodgerblue;
  color: #fff;
  font-size: 20px;
  font-family: "Arial";
  padding: 10px 25px;
  text-transform: uppercase;
  border-radius: 5px;
  letter-spacing: 2px;
  transition: all 0.3s ease-in-out;
  margin-top: 75px;
}

.btn-recover:hover {
  background-color: transparent;
  color: dodgerblue;
}

.btn-recover:active {
  background-color: dodgerblue;
  color: #fff;
}
</style>
