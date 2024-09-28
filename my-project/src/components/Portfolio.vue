<template>
  <div class="main-content">
   <!-- Swiper 輪播區塊 -->
    <swiper
      :cssMode="true"
      :navigation="true"
      :pagination="true"
      :mousewheel="true"
      :keyboard="true"
      :modules="modules"
      class="mySwiper"
    >
      <SwiperSlide v-for="(slide, index) in slides" :key="index">
        <div class="slide-content">
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

 


   <!-- 作品集區塊 -->
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
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
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
      stepCards: [
        {
          title: 'STEP1. 預約與諮詢',
          description: '透過我們的網站、電話或線上平台進行預約與諮詢，提供專業的建議和解答。',
          image: '/image/Icon/HomePage/Process/phone.png',
        },
        {
          title: 'STEP2. 免費現場估價',
          description: '進行現場評估。評估清潔範圍和難易度，提供準確的報價。事先填寫估價調查表可以讓我們更了解您的清潔需求',
          image: '/image/Icon/HomePage/Process/home-import-outline.png',
          link: '/Questionnaire' ,
        },
        {
          title: 'STEP3. 安排清潔時間',
          description: '確認報價後，確認清潔時間和其他細節。',
          image: '/image/Icon/HomePage/Process/timer-check-outline.png',
        },
        {
          title: 'STEP4. 指定到府清潔',
          description: '我們會派出專業清潔團隊，在約定的時間和地點，到府清潔。',
          image:'/image/Icon/HomePage/Process/broom.png',
        },
        {
          title: 'STEP5. 完工驗收付款',
          description: '清潔作業完成後，清潔團隊將與客戶一同進行清潔驗收和付款。',
          image: '/image/Icon/HomePage/Process/hand-coin-outline.png',
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
        modules: [Navigation, Pagination, Mousewheel, Keyboard],
      };
  },
};
</script>

<style scoped>

h2 {
  margin-bottom: 30px;
  text-align: center;
  font-size: 32px;
}

.main-content {
  width: 100%;
  height: 500px;
  position: relative;
}

.slide-content {
  position: relative;
}

.swiper-slide img {
  width: 100%;
  height: 500px;
  object-fit: cover;
}

/* Overlay with text */
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 1%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5); /* Dark overlay */
  padding-top: 50px;
}

.text-container {
  color: white;
  text-align: center;
}

.text-container h2 {
  font-size: 36px;
  font-weight: bold;
}

.text-container p {
  font-size: 18px;
}

.swiper-button-next,
.swiper-button-prev {
  color: white;
  opacity: 0.8;
}

.swiper-button-next:hover,
.swiper-button-prev:hover {
  opacity: 1;
}
/* Overlay with text */

/* Process section styling */
.process-section {
  background-color: #f8f8f2; 
  padding: 10px 0; 
  text-align: center;
  position: relative;
  margin-top: -35px; 
  width: auto;
}

.title {
  color: black;
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 2px; 
  padding: 15px 0;
}

.process-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  position: relative;
}

.process-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 220px;
  height: 300px;
  margin: 0 10px;
  text-align: left; 
  position: relative;

}

.process-icon img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
}

.process-content h3 {
  font-size: 22px;
  white-space: nowrap;
}

.process-content p {
  font-size: 16px;
  color: #000;
  text-align: left;
}
.link-text {
  color: #38393a;
  text-decoration: underline;
  font-size: 16px;
  font-weight: 600;
  transition: color 0.3s ease;
}

.link-text:hover {
  color: #000000;
  text-decoration: none;
  font-weight: bold;
}
/* Process section styling */

/* Portfolio-section styling */
.Portfolio-section {
  width: 100%;
  padding: 50px 0;
  background-color: #f8f9fa; /* 輕灰色背景 */
  
  text-align: center;
}

.Portfolio-section-title {
  font-size: 36px;
  font-weight: bold;
  justify-content: center;
  color: #333;
  margin-bottom: 40px;
}

.Portfolio-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* 自動適應列寬 */
  gap: 20px;
  max-width: 1300px;
  height: 400px;
  margin: 0 auto;
}

.Portfolio-img {
  position: relative;
  overflow: hidden;
  border-radius: 8px; /* 圓角 */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* 輕微陰影 */
  transition: transform 0.3s ease;
}

.Portfolio-img img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* 圖片自適應 */
  transition: transform 0.3s ease;
}

.Portfolio-img:hover img {
  transform: scale(1.1); /* 滑鼠懸停放大效果 */
}

.Portfolio-text {
  position: absolute;
  bottom: 0; /* 固定在圖片底部 */
  left: 0;
  width: 100%; /* 占滿整個圖片的寬度 */
  background-color: rgba(0, 0, 0, 0.6); /* 半透明黑色背景 */
  color: white; /* 白色文字 */
  text-align: center; /* 文字居中 */
  padding: 10px 0; /* 上下內距 */
  transition: background-color 0.3s ease; /* 背景過渡效果 */
}

.Portfolio-img:hover .Portfolio-text {
  background-color: rgba(0, 0, 0, 0.8); /* 滑鼠懸停時背景變得更暗 */
}

.Portfolio-text h3 {
  margin: 0; /* 移除默認的 margin */
  font-size: 18px; /* 控制字體大小 */
  font-weight: bold; /* 粗體字 */
}
</style>
