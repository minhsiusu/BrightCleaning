<template>
  <div class="checkout-page">
    <!-- Header -->
    <div class="checkout-header">
      <a href="/" class="logo">
        <img src="/image/Logo/光潔.jpg" alt="光潔" />
      </a>
      <div class="cart-icon" @click="goToCart">
        <img src="/image/Icon/ShoppingCart.png" alt="購物車" />
      </div>
    </div>

    <!-- Separator Line (Connected with the Vertical Line) -->
    <div class="separator-line"></div>

    <!-- Main Content -->
    <div class="checkout-content">
      <!-- Left Section: Customer Info -->
      <div class="left-section">
        <div class="left-customer-data">
          <div class="contact-header">
            <h2>聯絡方式</h2>
            <a href="#" class="login-link">登入</a>
          </div>
          <div class="form-group">
            <label for="email">電子郵件</label>
            <input type="email" id="email" placeholder="電子郵件" />
          </div>
          <h2>配送方式</h2>
          <div class="form-group">
            <div>
              <input type="text" id="first-name" placeholder="姓名" />
            </div>
          </div>
          <div class="form-group">
            <input type="text" id="address" placeholder="地址" />
          </div>
          <div class="form-group double-field">
            <div>
              <input type="text" id="city" placeholder="城市" />
            </div>
            <div>
              <input type="text" id="postal-code" placeholder="郵遞區號" />
            </div>
          </div>
          <div class="form-group">
            <input type="text" id="phone" placeholder="您的電話" />
          </div>
          <button class="pay-now-btn">馬上付款</button>

          <!-- 區隔線 -->
          <div class="divider-line"></div>

          <!-- 新增政策連結 -->
          <div class="policy-links">
            <a href="#">退貨政策</a>
            <a href="#">運送政策</a>
            <a href="#">隱私政策</a>
            <a href="#">服務條款</a>
          </div>
        </div>
      </div>

      <!-- Vertical Line for Separation -->
      <div class="vertical-line"></div>

      <!-- Right Section: Product Info -->
      <div class="right-section">
        <div class="right-item-data">
          <h2>訂單摘要</h2>
          <!-- Add your product summary content here -->
          <div class="order-summary">
            <div class="summary-item">
              <img src="https://via.placeholder.com/50" alt="商品圖片" class="product-image"/>
              <div class="product-info">
                <span>商品名稱</span>
                <span>商品價格</span>
              </div>
            </div>
            <div class="summary-item">
              <span>小計</span>
              <span>$1200.00</span>
            </div>
            <div class="summary-item">
              <span>運費</span>
              <span>$50.00</span>
            </div>
            <div class="summary-item">
              <span>總計</span>
              <span>$1250.00</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CheckoutPage',
  methods: {
    goToCart() {
      this.$router.push({ path: '/cart' });
    },
  },
};
</script>

<style scoped>
.checkout-page {
  width: 100%;
  min-height: 100vh;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  margin: auto;
}

.checkout-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  box-sizing: border-box;
}

.logo {
  margin-left: 480px; /* 向右移動 */
}

.cart-icon {
  margin-right: 500px; /* 向左移動 */
}

.logo img {
  height: 50px;
}

.cart-icon img {
  height: 40px;
  cursor: pointer;
}

/* Separator Line */
.separator-line {
  width: calc(100% - 40px);
  height: 2px;
  background-color: #BEBEBE;
}

/* Vertical Line */
.vertical-line {
  width: 2px;
  background-color: #BEBEBE;
  height: auto;
  align-self: stretch;
}

.checkout-content {
  display: flex;
  justify-content: space-between; /* 兩邊區塊保持距離並對齊 */
  width: 100%; /* 寬度隨屏幕大小動態調整 */
  margin: 0 auto;
  box-sizing: border-box;
  flex-grow: 1;
}
.left-customer-data, .pay-now-btn, .form-group input {
  width: 100%; /* 統一寬度，取消 max-width 限制 */
  max-width: 380px;
  padding: 10px;
  box-sizing: border-box; /* 確保 padding 和 border 在寬度計算內 */
}

.left-section {
  display: flex;
  justify-content: flex-end; /* 水平對齊到右側 */
  align-items: flex-start; /* 垂直對齊到頂部 */
  width: 50%; /* 使其占據一半的寬度 */
  padding: 50px;
}

.contact-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.login-link {
  margin-left: 10px;
  color: #ff6600;
  text-decoration: none;
  font-size: 14px; /* 縮小字體 */
}

.form-group {
  margin-bottom: 20px;
}

.double-field {
  display: flex;
  gap: 20px;
}

.double-field input {
  flex: 1;
}

.form-group input:focus {
  border-color: #ff6600; /* 當輸入框被選中時的橘色邊框 */
  outline: none;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  max-width: 380px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.pay-now-btn {
  background-color: #ff6600;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  cursor: pointer;
}

/* 區隔線 */
.divider-line {
  width: 100%;
  height: 2px;
  background-color: #ccc;
  margin: 20px 0; /* 與上下元素保持距離 */
}

.policy-links {
  display: flex;
  justify-content: space-between; /* 水平排列 */
}

.policy-links a {
  color: #ff6600;
  text-decoration: none;
  font-size: 14px;
  padding: 0 10px; /* 每個連結之間的距離 */
}

.right-section {
  display: flex;
  justify-content: flex-start; /* 水平對齊到左側 */
  align-items: flex-start; /* 垂直對齊到頂部 */
  width: 50%; /* 使其占據另一半的寬度 */
  background-color: #E0E0E0;
  padding: 40px;
}

.right-item-data {
  margin-top: -20px;
  width: 100%;
  max-width: 380px;
  padding: 40px;
  background-color: #fff;
}

.order-summary {
  margin-top: 20px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.product-image {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.product-info {
  display: flex;
  flex-direction: column;
}

.summary-item span:last-child {
  font-weight: bold;
}
</style>
