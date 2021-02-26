<template>
  <div class="gallery">
    <div class="frame" v-for="image in images" v-bind:key="image.id">
      <img
        class="image"
        v-bind:src="require(`@/assets/img/${image.name}`)"
        v-bind:alt="image.alt"
        v-on:click="handleImageClick(image.id)"
      />
      <button
        type="button"
        class="btn-remove"
        v-on:click="handleBtnRemoveClick(image.id)"
      ></button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppGallery",

  props: {
    images: {
      type: Array,
      required: true,
      default: () => []
    }
  },

  methods: {
    handleImageClick(imageId) {
      this.$emit("image-clicked", imageId);
    },

    handleBtnRemoveClick(imageId) {
      this.$emit("remove-btn-clicked", imageId);
    }
  }
};
</script>

<style scoped>
.gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 20px;
}

.frame {
  width: 24%;
  margin: 40px 0;
  border: 5px solid rgb(66, 65, 65);
  border-radius: 50%;
  transition: border 0.5s ease;
  cursor: pointer;
  position: relative;
}

.image {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transition: transform 0.5s ease;
}

.frame:nth-child(4n + 1) {
  border: 5px solid red;
}

.frame:hover {
  border: 5px solid yellow;
}

.frame:hover .image {
  transform: rotate(45deg);
}

.btn-remove {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -45px;
  width: 15px;
  height: 15px;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: transparent;
}

.btn-remove::before,
.btn-remove::after {
  content: "";
  display: block;
  width: 100%;
  height: 2px;
  background-color: #000;
  position: absolute;
}

.btn-remove::before {
  transform: rotate(45deg);
}

.btn-remove::after {
  transform: rotate(-45deg);
}

.btn-remove:hover::before,
.btn-remove:hover::after {
  background-color: red;
}

@media (max-width: 900px) {
  .frame {
    width: 48%;
  }

  .frame:nth-child(2n + 1) {
    border: 5px solid red;
  }

  .frame:hover {
    border: 5px solid yellow;
  }
}

@media (max-width: 500px) {
  .frame {
    width: 100%;
  }

  .frame:nth-child(1n) {
    border: 5px solid red;
  }

  .frame:hover {
    border: 5px solid yellow;
  }
}
</style>
