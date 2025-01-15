<template>
<link href="https://fonts.googleapis.com/css2?family=Russo+One&display=swap" rel="stylesheet">
<div class="HomePage">

    <!-- 面試專案跳出提示 -->
    <div v-if="showPopup" class="popup-overlay" @click="closePopup">
      <div class="popup" @click.stop>
        <h1>光潔購物網站 - 面試專案</h1>
        <p>這是我為前端面試設計的網站，展示了我在 Vue.js、後端 API 整合、CSS 設計等方面的技能。</p>
        <ul>
          <li>主要功能 :商品搜尋、購物車、會員系統等。</li>
          <li>使用技術 :Vue 3、Axios、Node.js、SCSS。</li>
          <li>專案目標 :模擬一個電商平台，體現完整的前端開發流程。</li>
        </ul>
      </div>
    </div>

    <!-- Header section with image -->
    <div class="header-banner">
      <img src="/image/AboutUs/work/AboutUs05.jpg" alt="關於光潔">
      <div  :class="{ 'show': isOverlayVisible }" class="text-overlay">
        <h1>光潔。值得信賴的清潔團隊</h1>
        <h2>值得信賴的清潔團隊</h2> 
        <h3>我們秉持著專業、誠信與效率的服務理念，確保每個細節都達到最高標準，讓您的空間光亮如新。選擇我們，就是選擇安心與信賴，讓我們為您打造煥然一新的生活與工作環境。</h3>
      </div>
    </div>

    <!-- Introduction Section -->
    <div class="introduction">
      <div class="intro-container">

        <!-- 左邊標題與簡介 -->
        <div class="intro-left">
          <h1>光潔</h1>
          <h1>值得信賴的清潔團隊</h1>
          <p>居家清潔 / 裝潢細清 / 玻璃鍍膜 / 沙發清潔</p>
        </div>

        <!-- 右邊詳細介紹 -->
        <div class="intro-right">
          <p>Trusted professionals, ensuring your home is pristine and refreshed.</p>
          <p>我們致力於打造最受客戶青睞的清潔服務品牌，以高效和專業的清潔技術，為每一位客戶提供全方位的裝潢後清潔服務，確保您的新居乾淨整潔。無論是去除建築殘留物還是深度清潔，我們的團隊都擁有豐富的經驗與專業設備，能滿足您的清潔需求。</p>
        </div>

      </div>
    </div>

    <div class="process-section">
      <h3 class="process-section-title">服務流程</h3>
      <div class="process-container">
        <div class="process-item" v-for="(stepCard, index) in stepCards" :key="index">
          <div class="process-icon">
            <img :src="stepCard.image" alt="stepCard Image" />
          </div>
          <div class="process-content">
            <h3>{{ stepCard.title }}</h3>
            <p>{{ stepCard.description }}</p>
            <a v-if="stepCard.link" :href="stepCard.link" class="link-text">>>點擊前往客人估價調查表</a>
          </div>
        </div>
      </div>
    </div>

    <div class="services-process-section">
      <!-- 左側服務列表 -->
      <div class="service-title">
        <h2>Our Services</h2>
      </div>
      <div class="service-content">
        <ul>
          <li>居家清潔 / Home cleaning </li>
          <li>裝潢細清 / Detailed post-renovation cleaning</li>
          <li>玻璃鍍膜 / Glass coating</li>
          <li>沙發清潔 / Sofa cleaning</li>
        </ul>
      </div>

      <!-- 右側服務列表 -->
      <div class="process-title">
        <h2>Work Process</h2>
      </div>
      <div class="process-content">
        <ul>
          <li>STEP1.  / 預約與諮詢 </li>
          <li>STEP2.  / 免費現場估價</li>
          <li>STEP3.  / 安排清潔時間</li>
          <li>STEP4.  / 指定到府清潔 </li>
          <li>STEP5.  / 完工驗收付款</li>
        </ul>
      </div>
    </div>
  

    <div class="service-areas">
      <div class="service-areas-intro">
        <h1>服務區域</h1>
        <p>光潔致力於提供高品質的清潔服務，服務區域涵蓋台南、高雄、屏東。我們專注於滿足客戶的需求，無論是居家清潔、裝潢後細清，還是其他服務，都以專業和細心的服務讓每一個空間煥然一新。讓您的家園與工作環境始終保持清潔、舒適。</p>
      </div>
      <div class="area-container">
        <div class="area-card" v-for="(area, index) in areas" :key="index">
          <img :src="area.image" :alt="area.name">
          <h3>{{ area.name }}</h3>
        </div>
      </div>
    </div>

 
    <div class="contact-section">
      <img src="/image/AboutUs/AboutUs01.jpg" alt="關於光潔">
      <div class="contact-overlay">
        <h2>Contact Us</h2>
        <p>我們的團隊隨時準備好幫助您。無論您有任何問題或需求，我們都會提供專業的服務。</p>
        <router-link to="/contact">
          <button>聯絡我們</button>
        </router-link>
      </div>
    </div>
</div>
</template>

<script>
export default {
  emits: ['userUpdated'],
  name: 'HomePage',
  data() {
    return {
      showPopup: true, // 控制彈跳訊息是否顯示
      isOverlayVisible: false,  // 控制是否顯示動畫
      images: [
        { src: "/image/CleaningCase/Cleaning01.jpg", alt: "圖片1" },
        { src: "/image/CleaningCase/Cleaning02.jpg", alt: "圖片2" },
        { src: "/image/CleaningCase/Cleaning03.jpg", alt: "圖片3" },
        { src: "/image/CleaningCase/Cleaning04.jpg", alt: "圖片4" },
        { src: "/image/CleaningCase/Cleaning05.jpg", alt: "圖片5" },
        { src: "/image/CleaningCase/Cleaning05.jpg", alt: "圖片6" },
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
      areas: [
        { name: '台南', image: '/image/AboutUs/areas/Tainan.png' },
        { name: '高雄', image: '/image/AboutUs/areas/Kaohsiung.png' },
        { name: '屏東', image: '/image/AboutUs/areas/Pingtung.png' }
      ],
    };
  },
  methods: {
    closePopup() {
      this.showPopup = false; // 關閉彈跳提示框
    },
  },
  mounted() {
    // 動畫效果延遲 1 秒後觸發
    setTimeout(() => {
      this.isOverlayVisible = true;
    }, 1000);
  }
};
</script>

<style scoped>

.HomePage {
  width: 100%;
}

</style>
