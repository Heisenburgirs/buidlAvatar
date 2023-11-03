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
        <div class="md:w-[450px] h-[324px] grid sm:grid-cols-2 base:grid-cols-3 lg:grid-cols-4 sm:gap-8 lg:gap-6 overflow-auto p-4">
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
          <div class="relative md:w-[400px] h-[324px] border border-positive border-opacity-25 rounded-10">
  <template v-if="isAnyTraitSelected">
    <img 
      v-for="trait in selectedTraits" 
      :key="trait" 
      :src="getTraitImage(trait)" 
      alt="" 
      class="absolute top-0 left-0 w-full h-full"
    >
  </template>
  <div v-else class="flex items-center justify-center h-full text-white font-bold">
    No traits selected
  </div>
</div>


          
          <div 
            @click="randomizeTraits" 
            class="text-center py-2 px-4 text-14 border border-secondary rounded-10 text-secondary hover:bg-secondary hover:border-secondary hover:text-black transition hover:cursor-pointer"
          >
            Randomize
          </div>
          <div class="text-center text-white">{{ copyMessage }}</div>
          <div class="text-center py-2 px-4 text-14 border border-tertiary rounded-10 text-tertiary hover:bg-tertiary hover:border-tertiary hover:text-black transition hover:cursor-pointer">
            + Create
          </div>
        </div>
      </div>
    </div>
  </div>  
</template>

<script>
import { ref, reactive, computed } from 'vue';
import arrow from '@/assets/arrow.png';

export default {
      name: 'BuidlAvatar',
      setup() {
        // State
        const selectedFilter = ref('Ears'); // Default to 'Ears'
        const traits = ['Ears', 'Eyes', 'Face', 'Head', 'Clothes',]
        const copyMessage = ref(''); 

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

        // When initializing selectedNFTs, assign random traits
        const selectedNFTs = reactive({
          Ears: getRandomTrait('Ears'),
          Eyes: getRandomTrait('Eyes'),
          Face: getRandomTrait('Face'),
          Head: getRandomTrait('Head'),
          Clothes: getRandomTrait('Clothes'),
        });
        
        function getRandomTrait(category) {
          const allImagesForCategory = images[category];
          if (allImagesForCategory && allImagesForCategory.length) {
              const randomIndex = Math.floor(Math.random() * allImagesForCategory.length);
              return allImagesForCategory[randomIndex].replace('.png', '');
          }
          return '';
        }

        function randomizeTraits() {
          for (const category of traits) {
            selectedNFTs[category] = getRandomTrait(category);
          }
          showToast('Traits randomized successfully!', 'success');
        }

        function showToast(message, type) {
          const toast = document.createElement('div');
          toast.className = `toast fixed bottom-[-100px] left-1/2 transform -translate-x-1/2 bg-opacity-70 text-white px-5 py-3 rounded-lg z-50 text-sm transition-all duration-500 ease-in-out ${type === 'success' ? 'bg-green' : 'bg-red'}`;
          toast.textContent = message;

          document.body.appendChild(toast);

          // Let the browser paint the initial state, then move toast upwards
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              toast.style.bottom = '5rem';  // roughly equivalent to Tailwind's `bottom-20` class
            });
          });

          setTimeout(() => {
            toast.style.bottom = '-100px';
            setTimeout(() => {
              document.body.removeChild(toast);
            }, 500); // 500ms matches the transition duration, ensure the toast is fully out of view before removing from DOM
          }, 2500); // keep the toast visible for 2500ms
        }

        const isAnyTraitSelected = computed(() => {
          return Object.values(selectedNFTs).some(value => value !== '');
        });

        const selectedTraits = computed(() => {
          return traits.filter(trait => selectedNFTs[trait] !== '');
        });

        return {
          arrow,
          selectedFilter,
          traits,
          images,
          selectedNFTs,
          copyMessage,
          isAnyTraitSelected,
          selectedTraits,
          selectImage,
          getImageClass,
          resetTraits,
          randomizeTraits,
          showToast,
          getRandomTrait,
        };
      },
      methods: {
      formatImageName(imageName) {
        const nameWithoutExtension = imageName.split('.')[0];
        return nameWithoutExtension.length > 10 ? `${nameWithoutExtension.slice(0, 10)}...` : nameWithoutExtension;
      },
      
      getTraitImage(trait) {
          const selectedImage = this.selectedNFTs[trait];
          if (selectedImage) {
              return require('@/assets/' + trait + '/' + selectedImage + '.png');
          }
          return ''; // Return a placeholder or default image if needed
      },
    }
  }

</script>

<style scoped>
.active-filter {
  background-color: #0e1a23;
}

/* Entire Scrollbar */
::-webkit-scrollbar {
    width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #1b374a;
    border-radius: 2px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #555;
}


</style>
