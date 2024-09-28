<template>
 <link href="https://fonts.googleapis.com/css2?family=Russo+One&display=swap" rel="stylesheet">
  <div class="HomePage">
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
          <P1>Trusted professionals, ensuring your home is pristine and refreshed.</P1>
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
  name: 'HomePage',
  data() {
    return {
      isOverlayVisible: false, // 控制是否顯示
      areas: [
        { name: '台南', image: '/image/AboutUs/areas/Tainan.png' },
        { name: '高雄', image: '/image/AboutUs/areas/Kaohsiung.png' },
        { name: '屏東', image: '/image/AboutUs/areas/Pingtung.png' }
      ],
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
    };
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
/* 定義動畫：由暗變亮 */
@keyframes fadeIn {
  0% {
    background-color: rgba(0, 0, 0, 1); /* 完全不透明的黑色 */
  }
  100% {
    background-color: rgba(0, 0, 0, 0); /* 完全透明 */
  }
}
.HomePage {
  width: 100%;
}

.header-banner {
  position: relative;
  width: 100%;
  height: 800px;
  overflow: hidden;
}

.header-banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
/*overlay stytle*/
.text-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding-top: 10%;
  padding-left: 100px;
  animation: fadeIn 3s forwards; /* 設置動畫效果，持續 5 秒 */
}

.text-overlay h1 {
  position: relative;
  font-family: 'MantouSans-Regular', sans-serif;
  font-weight: 25; /* 粗體 */
  font-size: 70px; /* 字體大小 */
  color: white; /* 白色字體 */
  letter-spacing: 2px; /* 字母間距 */
  opacity: 0; /* 起始時不可見 */
  transform: translateY(100px); /* 初始位置在下方 */
  transition: transform 2s ease, opacity 1.5s ease; /* 過渡效果 */
}

.text-overlay h2 {
  position: relative;
  font-family: 'Montserrat', sans-serif;
  font-size: 40px;
  font-weight: bold;
  white-space: nowrap;
  color: white;
  opacity: 0; /* 起始時不可見 */
  transform: translateY(100px); /* 初始位置在下方 */
  transition: transform 2s ease, opacity 1.5s ease; /* 過渡效果 */
}


.text-overlay h3 {
  position: relative;
  font-size: 24px;
  font-weight: bold;
  white-space: normal; /* 允許文字換行 */
  color: white;
  max-width: 40%; /* 控制文字寬度 */
  line-height: 1.5;
  padding-top: 120px;
  opacity: 0; /* 起始時不可見 */
  transform: translateY(100px); /* 初始位置在下方 */
  transition: transform 2s ease, opacity 1.5s ease; /* 過渡效果 */
}

.text-overlay.show h3, 
.text-overlay.show h2, 
.text-overlay.show h1 {
  transform: translateY(0); /* 移動到原本位置 */
  opacity: 1; /* 變得可見 */

}
/* Introduction Section */
.introduction {
  padding: 50px 10%;
  font-family: Arial, sans-serif;
  margin: 100px;
}

.intro-container {
  display: flex;
  align-items: flex-start; /* 讓內容在容器內靠上對齊 */
  justify-content: flex-start; /* 讓內容在容器內靠左對齊 */
  gap:10px;
}

.intro-left {
  flex: 1;
  margin-top: -20px;
  justify-content: center;
  padding-right: 25px;
}

.intro-right {
  flex: 1;
  padding-left: 25px;
}

.intro-left h1 {
  font-weight: 25; /* 粗體 */
  font-size: 70px; /* 字體大小 */

  color: #333;
  font-family: 'MantouSans-Regular', sans-serif;
}

.intro-left p {
  font-size: 24px;
  font-weight: bold;
  color: #414141;
}

.intro-right p {
  font-size: 24px;
  color: #555;
  line-height: 1.6;
}
.intro-right p1 {
  font-size: 24px;
  font-weight: bold;
  color: #000000;
  line-height: 1.6;
}
/* Process section styling */
.process-section {
  background-color: #f8f8f2; 
  padding: 10px;
  text-align: center;
  position: relative;
  width: auto;
  text-align: center;
  color: #333;
 
}

.process-section-title {
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 100px;
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
  text-align: left; 
  position: relative;
  margin-bottom: 70px;
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
  color: black;
  white-space: nowrap;
}

.process-content p {
  font-size: 18px;
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

/* Img Section */
.image-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* 5欄 */
  grid-auto-rows: 300px; /* 每個項目的最小高度 */
  gap: 10px; /* 圖片間距 */
  padding: 20px;
}

.grid-item {
  position: relative;
  overflow: hidden;
  border-radius: 8px; /* 圓角邊框 */
}

.grid-item img {
  width: 100%;
  height: 100%;
  object-fit: cover; 
}


/* 特定項目的不同大小 */
.grid-item:nth-child(1) {
  grid-column: span 2; 
  grid-row: span 2; 
}

.grid-item:nth-child(3) {
  grid-column: span 2;
  grid-row: span 1;
}

.grid-item:nth-child(4) {
  grid-column: span 1;
  grid-row: span 1;
}

/* services-process-section */
.services-process-section {
  display: flex;
  justify-content: space-between;
  padding: 150px 50px;
  background-color: #1a1a1a; /* 背景色 */
}


.service-section {
  display: flex;
  justify-content:center; /*內容在容器內左右對齊 */
  align-items: center; 
  background-color: #141414;
  
}
.service-content ,.process-content{
  flex: 3; /* 右側內容占據容器的 3 份 */
  color: #ffffff;
}
.service-title ,.process-title {
  flex: 1; /* 左側標題占據容器的 1 份 */
  color: #ffffff;
  font-size: 36px;
  font-weight: bold;
  margin-left:200px
}
.service-content ul ,.process-content ul{
  list-style: none;
}

.service-content li ,.process-content li{
  font-size: 20px;
  padding: 10px 0;
  color: #ffffff;
  font-weight: normal;
}




/* service-areas-section */
.service-areas  {
  text-align: center;
  margin-bottom: 40px;
  color: #333;
  padding: 50px;
}
.service-areas-intro h1 {
  font-size: 48px;
  font-weight: bold;
}

.service-areas-intro p {
  text-align: left;
  font-size: 20px;
  line-height: 1.6;
  max-width: 1100px;
  margin: 60px auto;
}
.area-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 20px;
}

.area-card {

  padding: 50px;
  text-align: center;

  border-radius: 8px;
  width: 300px;
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
}

.area-card:hover {
  background-color: #eaeaea;
  transform: scale(1.05); /* 輕微放大 */
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2); /* 添加陰影 */
}

.area-card img {
  width: 100%;
  height: 400px;
  object-fit: contain;
  transition: transform 0.3s ease;
}

.area-card:hover img {
  transform: scale(1.1); /* 圖片放大 */
}

.area-card h3 {
  font-size: 36px;
  color: #333;
  margin-bottom: 10px;
}

/* contact-section */
.contact-section {
  position: relative;
  width: 100%;
  height: 600px;
  overflow: hidden;
}

.contact-section img{
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.contact-overlay {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 40%; /* 右側遮罩寬度 */
  background: rgba(0, 0, 0, 0.6); /* 半透明遮罩 */
  color: white;
  padding: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.contact-overlay h2 {
  font-family: 'Poppins', sans-serif; /* 使用現代無襯線字體 */
  font-weight: 900; /* 粗體 */
  font-size: 70px; /* 字體大小 */
  color: white; /* 白色字體 */
  letter-spacing: 2px; /* 字母間距 */
  margin-bottom: 20px;
}

.contact-overlay p {
  font-size: 18px;
  margin-bottom: 30px;
}

.contact-overlay button {
  background-color: transparent;
  color: white;
  border: 2px solid white;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.contact-overlay button:hover {
  background-color: white;
  color: black;
}
</style>
