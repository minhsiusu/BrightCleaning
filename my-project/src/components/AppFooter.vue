<template>
  <footer>
    <div class="footer-wrapper">
      <!-- 左側 Logo 區塊 -->
      <div class="footer-logo">
        <img :src="logoSrc" :alt="logoAlt" />
      </div>

      <!-- 右側資訊欄區塊 -->
      <div class="footer-content">
        <div class="footer-column">
          <h3>{{ contactInfo.title }}</h3>
          <p>手機: {{ contactInfo.phone }}</p>
          <p>電郵: {{ contactInfo.email }}</p>
          <p>地址: {{ contactInfo.address }}</p>
          <p>營業時間: {{ contactInfo.businessHours }}</p>
          <p>
            <router-link v-for="link in links" :key="link.path" :to="link.path">{{ link.text }}</router-link>
          </p>
          <p>{{ services.join(', ') }}</p>
        </div>
      </div>
      
    </div>
    <div class="orange-bar">
        預約時間：星期一至五 9:00am-8:30pm · 假日休息
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
  data() {
    return {
      logoSrc: '/image/Logo/光潔.png',
      logoAlt: '公司Logo',
      contactInfo: {
        title: '聯絡我們',
        phone: '0930546164',
        email: 'great7879@icloud.com',
        address: '台南市新營區太子宮305之237號1樓',
        businessHours: '週一至週日 08:00 - 18:00',
      },
      links: [
        { text: '回首頁| ', path: '/' },
        { text: '關於我們| ', path: '/AboutUs' },
        { text: '客人估價調查表| ', path: '/Questionnaire' },
        { text: '除水垢商品| ', path: '/product-introduction/descaling' },
        { text: '浴廁拋光商品| ', path:'/product-introduction/polishing' },
        { text: '地板清潔商品| ', path: '/product-introduction/floor-cleaning' },
      ],
      services: ['居家清潔', '裝潢細清', '玻璃鍍膜', '沙發清潔'],
    };
  },
};
</script>

<style >
footer {
  position: relative;
  bottom: 0;
  width: 100%;
  background-color: white;
  color: #000;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  margin-top: auto;
}

.footer-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: center; /* 兩個區塊整體置中 */
  align-items: center; /* 垂直居中對齊 */
}

.footer-logo {
  transform: scale(1.2); /* 將 logo 放大 */
  transform-origin: center;
  margin-right: 10px;
}

.footer-logo img {
  height: 80px;
}

.footer-content {
  text-align: left;
}

.footer-column {
  padding: 10px;
  color: #000;
}

.footer-column h3 {
  margin-bottom: 8px;
  font-size: 16px;
  color: #000;
}

.footer-column p {
  margin: 5px 0;
  font-size: 12px;
  color: #000;
  white-space: nowrap;
}
.orange-bar {
  font-size: 14px;
  background-color: #ff6600;
  color: #fff;
  padding: 10px;
  text-align: center;
}
</style>
