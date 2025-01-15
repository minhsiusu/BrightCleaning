<template>
  <div class="portfolio-main-content">
  <!-- Swiper 輪播區塊 -->
    <swiper
      :cssMode="true"
      :navigation="true"
      :pagination="true"
      :mousewheel="true"
      :keyboard="true"
      :autoplay="{ delay: 3000, disableOnInteraction: false }"  
      :modules="modules"
      class="mySwiper"
    >
    <SwiperSlide v-for="(slide, index) in slides" :key="index">
      <div class="portfolio-slide-content">
        <img :src="slide.image" :alt="slide.altText" />
        <div class="overlay">
          <div class="text-container">
            <h2>{{ slide.title }}</h2>
            <p>{{ slide.description }}</p>
          </div>
        </div>
      </div>
    </SwiperSlide>
    </swiper>
  </div>
  <!-- Portfolio-section -->
  <div class="Portfolio-section">
      <h2 class="Portfolio-section-title">我們的成果</h2>
      <div class="Portfolio-container">
        <div class="Portfolio-img" v-for="(img, index) in lightboxImages" :key="index">
          <img :src="img.image[0]" @click="showLightbox(index)" />
          <div class="Portfolio-text">
            <h3>{{ img.title }}</h3>
          </div>
        </div>
      </div>
      <vue-easy-lightbox
        :visible="visible"
        :imgs="lightboxImagesGroup"
        :index="currentIndex"
        @hide="hideLightbox"
      />
  </div>
  <!-- testimonials-section -->
  <div class="testimonials-section">
    <h2 class="testimonials-section-title">客戶評價</h2>
    <div class="testimonials-container">
      <div class="testimonial-card" v-for="(testimonial, index) in testimonials" :key="index">
        <h3 class="testimonial-name">{{ testimonial.name }}</h3>
        <div class="testimonial-rating">
          <span v-for="star in 5" :key="star" class="star" :class="{ filled: star <= testimonial.rating }">★</span>
        </div>
        <p class="testimonial-feedback">{{ testimonial.feedback }}</p>
        <p class="testimonial-service">{{ testimonial.service }}</p>
      </div>
    </div>
  </div>
  

</template>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard ,Autoplay } from 'swiper/modules';
// import VueEasyLightbox
import VueEasyLightbox from 'vue-easy-lightbox'

export default {
  name: 'HomePage',
  data() {
    return {
      visible: false,
      slides: [
        {
          image: '/image/Publicity/Advertise01.jpg',
          altText: '廣告01',
          title: '技術核心',
          description: '與世界頂尖設備接軌的概念'
        },
        {
          image: '/image/Publicity/Advertise02.jpg',
          altText: '廣告02',
          title: '新亞洲致力',
          description: '成為頂尖技術整合輸出企業'
        },
        {
          image: '/image/Publicity/Advertise03.jpg',
          altText: '廣告03',
          title: '全球研發',
          description: '協同創造卓越價值'
        }
      ],
      lightboxImages: [
        {
          group:  1,
          title:  '這是標題',
          image:  [
                  '/image/CleaningCase/Cleaning01.jpg',
                  '/image/CleaningCase/Cleaning02.jpg',
                  '/image/CleaningCase/Cleaning03.jpg',
                  '/image/CleaningCase/Cleaning04.jpg',
                  '/image/CleaningCase/Cleaning05.jpg'
          ]
        },
        {
          group:  2,
          title:  '這是標題',
          image:  [
                  '/image/CleaningCase/Cleaning01.jpg',
                  '/image/CleaningCase/Cleaning02.jpg',
                  '/image/CleaningCase/Cleaning03.jpg',
                  '/image/CleaningCase/Cleaning04.jpg',
                  '/image/CleaningCase/Cleaning05.jpg'
          ]
        },
        {
          group:  3,
          title:  '這是標題',
          image:  [
                  '/image/CleaningCase/Cleaning01.jpg',
                  '/image/CleaningCase/Cleaning02.jpg',
                  '/image/CleaningCase/Cleaning03.jpg',
                  '/image/CleaningCase/Cleaning04.jpg',
                  '/image/CleaningCase/Cleaning05.jpg'
          ]
        },
        {
          group:  4,
          title:  '這是標題',
          image:  [
                  '/image/CleaningCase/Cleaning01.jpg',
                  '/image/CleaningCase/Cleaning02.jpg',
                  '/image/CleaningCase/Cleaning03.jpg',
                  '/image/CleaningCase/Cleaning04.jpg',
                  '/image/CleaningCase/Cleaning05.jpg'
          ]
        },
      ],
      testimonials: [
      {
        name: '王先生',
        feedback: '清潔團隊非常專業，地板光亮如新，會再次使用！',
        rating: 5,
        service: '地板清潔服務'
      },
      {
        name: '李小姐',
        feedback: '效率很高，清潔效果非常滿意，推薦給朋友了。',
        rating: 4,
        service: '家庭日常清潔'
      },
      {
        name: '陳先生',
        feedback: '很耐心地處理廚房的頑固污漬，效果超乎預期！',
        rating: 5,
        service: '廚房清潔服務'
      },
      {
        name: '陳先生',
        feedback: '很耐心地處理廚房的頑固污漬，效果超乎預期！',
        rating: 5,
        service: '廚房清潔服務'
      },
      {
        name: '陳先生',
        feedback: '很耐心地處理廚房的頑固污漬，效果超乎預期！',
        rating: 5,
        service: '廚房清潔服務'
      },
      {
        name: '陳先生',
        feedback: '很耐心地處理廚房的頑固污漬，效果超乎預期！',
        rating: 5,
        service: '廚房清潔服務'
      },
      {
        name: '陳先生',
        feedback: '很耐心地處理廚房的頑固污漬，效果超乎預期！',
        rating: 5,
        service: '廚房清潔服務'
      },
      {
        name: '陳先生',
        feedback: '很耐心地處理廚房的頑固污漬，效果超乎預期！',
        rating: 5,
        service: '廚房清潔服務'
      },
      // 更多客戶評價
      ],
      
      currentIndex: 0

    };
  },
  components: {
    Swiper,
    SwiperSlide,
    VueEasyLightbox,
  },
  methods: {
    showLightbox(index) {
      this.currentIndex = 0; // 設置為第一張圖片
      this.lightboxImagesGroup = this.lightboxImages[index].image;
      this.visible = true;
    },
    hideLightbox() {
      this.visible = false;
    }
  },
  setup() {
      return {
        modules: [Navigation, Pagination, Mousewheel, Keyboard, Autoplay ],
      };
  },
};
</script>

<style scoped>
h2 {
  margin-bottom: 50px;
  text-align: center;
  font-size: 32px;
}
</style>
