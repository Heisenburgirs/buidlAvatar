<template>
  <div class="flex lg:h-[100vh] sm:px-4 lg:md-0 sm:py-8 lg:py-0 justify-center items-center">
    <div class="flex flex-col gap-8 border border-primary border-opacity-30 rounded-10 p-6">
      <div class="flex w-full justify-between items-center">
        <div class="flex flex-col gap-2">
          <div class="text-20 font-bold text-white">Generate Buidl Avatar🚀</div>
          <div class="text-14 text-blue">This avatar will represent your Buidl profile on Hackathons</div>
        </div>
      </div>

      <div class="flex sm:flex-col lg:flex-row gap-8 w-full">
        <div class="flex flex-col gap-8 bg-surface py-4 px-6 rounded-10">
          <div class="flex justify-between items-center gap-16">
            <div class="text-[24px] font-bold text-white">Traits</div>
            <div
              @click="resetTraits"
              class="w-[90px] px-2 py-1 text-14 border border-green rounded-10 text-green hover:bg-green hover:text-black transition hover:cursor-pointer">
              Reset Traits
            </div>  
          </div>
          <div class="flex flex-col gap-4">
            <div
              class="flex w-full justify-between items-center pb-2 py-2 px-4 rounded-10 hover:cursor-pointer"
              style="border-color: rgba(255, 255, 255, 0.25)"
              @click="selectedFilter = 'Ears'"
              :class="{ 'active-filter': selectedFilter === 'Ears' }"
            >
              <div class="text-16 text-white font-bold">Ears</div>
            </div>

            <div
              class="flex w-full justify-between items-center pb-2 py-2 px-4 rounded-10 hover:cursor-pointer"
              style="border-color: rgba(255, 255, 255, 0.25)"
              @click="selectedFilter = 'Eyes'"
              :class="{ 'active-filter': selectedFilter === 'Eyes' }"
            >
              <div class="text-16 text-white font-bold">Eyes</div>
            </div>

            <div
              class="flex w-full justify-between items-center pb-2 py-2 px-4 rounded-10 hover:cursor-pointer"
              style="border-color: rgba(255, 255, 255, 0.25)"
              @click="selectedFilter = 'Face'"
              :class="{ 'active-filter': selectedFilter === 'Face' }"
            >
              <div class="text-16 text-white font-bold">Face</div>
            </div>

            <div
              class="flex w-full justify-between items-center pb-2 py-2 px-4 rounded-10 hover:cursor-pointer"
              style="border-color: rgba(255, 255, 255, 0.25)"
              @click="selectedFilter = 'Head'"
              :class="{ 'active-filter': selectedFilter === 'Head' }"
            >
              <div class="text-16 text-white font-bold">Head</div>
            </div>

            <div
              class="flex w-full justify-between items-center pb-2 py-2 px-4 rounded-10 hover:cursor-pointer"
              style="border-color: rgba(255, 255, 255, 0.25)"
              @click="selectedFilter = 'Clothes'"
              :class="{ 'active-filter': selectedFilter === 'Clothes' }"
            >
              <div class="text-16 text-white font-bold">Clothes</div>
            </div>  
          </div>
        </div>
        <div class="md:w-[400px] h-[324px] grid sm:grid-cols-2 base:grid-cols-3 lg:grid-cols-4 sm:gap-8 lg:gap-6 overflow-auto p-4">
          <div v-for="image in images[selectedFilter]" :key="image" class="relative">
            <img 
              :src="require('@/assets/' + selectedFilter + '/' + image)"
              :alt="selectedFilter + ' image'" 
              :class="['w-full', 'h-auto', 'border', 'border-opacity-25', 'rounded-10', getImageClass(selectedFilter, image)]"
              @click="selectImage(selectedFilter, image)"
            >
            <div class="text-center text-white mt-2">{{ formatImageName(image) }}</div>
          </div>
        </div>

        <div class="flex flex-col gap-2 justify-between">
          <pre class="text-white border border-positive border-opacity-25 rounded-10 p-12 ">{{ JSON.stringify(selectedNFTs, null, 2) }}</pre>
          
          <div class="text-center py-2 px-4 text-14 border border-tertiary rounded-10 text-tertiary hover:bg-tertiary hover:border-tertiary hover:text-black transition hover:cursor-pointer">
            + Create
          </div>
        </div>
      </div>
    </div>
  </div>  
</template>

<script>
import { ref, reactive } from 'vue';
import arrow from '@/assets/arrow.png';

export default {
  name: 'BuidlAvatar',
  setup() {
    // State
    const selectedFilter = ref('Ears'); // Default to 'Ears'
    const traits = ['Ears', 'Eyes', 'Face', 'Head', 'Clothes',]

    const selectedNFTs = reactive({
      Ears: '',
      Eyes: '',
      Face: '',
      Head: '',
      Clothes: '',
    });

    function selectImage(category, imageName) {
      selectedNFTs[category] = imageName.replace('.png', '');
    }

    function getImageClass(category, imageName) {
      return selectedNFTs[category] === imageName.replace('.png', '') ? 'border-primary' : '';
    }

    function resetTraits() {
      for (const trait in selectedNFTs) {
        selectedNFTs[trait] = '';
      }
    }

    const contexts = {
      Ears: require.context('@/assets/Ears', false, /\.(png|jpe?g|svg)$/),
      Eyes: require.context('@/assets/Eyes', false, /\.(png|jpe?g|svg)$/),
      Face: require.context('@/assets/Face', false, /\.(png|jpe?g|svg)$/),
      Head: require.context('@/assets/Head', false, /\.(png|jpe?g|svg)$/),
      Clothes: require.context('@/assets/Clothes', false, /\.(png|jpe?g|svg)$/),
    };

    const images = reactive({
      Ears: contexts.Ears.keys().map(key => key.split('/').pop()),
      Eyes: contexts.Eyes.keys().map(key => key.split('/').pop()),
      Face: contexts.Face.keys().map(key => key.split('/').pop()),
      Head: contexts.Head.keys().map(key => key.split('/').pop()),
      Clothes: contexts.Clothes.keys().map(key => key.split('/').pop()),
    });

    return {
      arrow,
      selectedFilter,
      traits,
      images,
      selectedNFTs,
      selectImage,
      getImageClass,
      resetTraits,
    };
  },
  methods: {
  formatImageName(imageName) {
    const nameWithoutExtension = imageName.split('.')[0];
    return nameWithoutExtension.length > 10 ? `${nameWithoutExtension.slice(0, 10)}...` : nameWithoutExtension;
  },
}
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.active-filter {
  /* Add styles for the active state, e.g., a different background color */
  background-color: #0e1a23;
}

</style>
