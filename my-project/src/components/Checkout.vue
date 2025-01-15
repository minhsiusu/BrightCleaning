<template>
  <div class="checkout-page">
    <!-- 成功提示框 -->
    <div v-if="isPaymentSuccess" class="success-message">
      <h2>交易成功</h2>
      <div class="icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#4CAF50" width="64px" height="64px">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15-5-5 1.41-1.41L11 14.17l7.59-7.59L20 8l-9 9z" />
        </svg>
      </div>
      <p>您的訂單已成功建立！<br>訂單編號：{{ $route.query.orderId }}</p>
      <button @click="goToHome">返回首頁</button>
    </div>
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
            <!-- 顯示使用者帳號名稱 -->
            <a href="#" class="account-name">使用者名稱</a>
          </div>

          <h2>配送方式</h2>

          <div
            v-for="(field, index) in fields"
            :key="field.id || index"
            :class="field.class"
          >
            <!-- 單欄輸入框 -->
            <div v-if="field.type === 'text' || field.type === 'email'">
              <input
                :type="field.type"
                :id="field.id"
                :placeholder="field.placeholder"
                v-model="form[field.id]"
              />
            </div>
            <!-- 下拉選單 -->
            <div v-else-if="field.type === 'select'">
              <label :for="field.id">{{ field.placeholder }}</label>
              <select :id="field.id" v-model="form[field.id]">
                <option v-for="option in field.options" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </div>

            <!-- 雙欄輸入框 -->
            <div v-else-if="field.isDoubleField" class="form-group double-field">
              <div v-for="(subField, subIndex) in field.subFields" :key="subField.id || subIndex">
                <input
                  :type="subField.type"
                  :id="subField.id"
                  :placeholder="subField.placeholder"
                  v-model="form[subField.id]"
                />
              </div>
            </div>
          </div>
          <button class="pay-now-btn" @click="createOrder">馬上付款</button>
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
            <div class="summary-item" v-for="(item, index) in orderItems" :key="index">
              <img :src="`/image/Product/${item.product.type}/${item.product.picture}`" alt="商品圖片" class="product-image" />
              <div class="product-info">
                <span>{{ item.product.name }}</span>
                <span>數量:{{ item.quantity }} 價格:{{ item.price }}</span>
                <span>總計:{{ item.price }} 元</span>
              </div>
            </div>
          </div>
          <div class="total-summary" v-for="field in summaryFields" :key="field.id">
              <span>{{ field.label }}</span>
              <span>{{ field.value() }} 元</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../service/axios';

export default {
  name: 'CheckoutPage',
  props: {
    isLoggedIn: {
        type: Boolean,
        default: false,
    },
    userId: {  // 用戶的Id
        type: String,
        default: ''
    },
  },
  data() {
    return {
      //成功付款提示視窗狀態
      isPaymentSuccess: false,
      //表單填寫資料
      form: {
        email: '',
        firstName: '',
        address: '',
        city: '',
        postalCode: '',
        phone: '',
        paymentMethod: 'stripe',
        subtotal: '',
      },
      // 表單欄位
      fields: [
        {
          id: 'email',
          type: 'email',
          placeholder: '電子郵件',
          isDoubleField: false,
          class: 'form-group',
          rule: '',
        },
        {
          id: 'firstName',
          type: 'text',
          placeholder: '姓名',
          isDoubleField: false,
          class: 'form-group',
          rule: ''
        },
        {
          id: 'address',
          type: 'text',
          placeholder: '地址',
          isDoubleField: false,
          class: 'form-group',
          rule: ''
        },
        {
          id: 'phone',
          type: 'text',
          placeholder: '您的電話',
          isDoubleField: false,
          class: 'form-group',
          rule: ''
        },
        {
          id: 'paymentMethod',
          type: 'select',
          placeholder: '選擇支付方式',
          isDoubleField: false,
          class: 'form-group',
          options: [
            { value: 'stripe', label: 'Stripe' },
            { value: 'credit_card', label: '信用卡' },
            { value: 'paypal', label: 'PayPal' },
          ],
        },
        {
          isDoubleField: true,
          class: 'form-group double-field',
          subFields: [
            { id: 'city', type: 'text', placeholder: '城市' },
            { id: 'postalCode', type: 'text', placeholder: '郵遞區號' },
          ],
        },

      ],
      errors: {},
      orderItems: [], // 用於存儲購物車商品數據
      summaryFields: [
        { id: 'subtotal', label: '小計', value: () => this.subtotal },
        { id: 'shippingFee', label: '運費', value: () => this.shippingFee },
        { id: 'total', label: '總計', value: () => this.total },
      ],
    };
  },
  computed: {
    subtotal() {
      return this.orderItems.reduce((total, item) => total + item.price , 0);
    },
    shippingFee() {
       // 超過 1000 元免運費
      return this.subtotal > 1000 ? 0 : 50;
    },
    total() {
      return this.subtotal + this.shippingFee;
    },
  },
  mounted() {
    // 獲取 URL 中的查詢參數
    const query = this.$route.query;
    if (query.orderId && this.$route.path.includes('success')) {
      this.isPaymentSuccess = true;
      console.log("付款成功，訂單編號：", query.orderId);
    }else {
        console.log("付款失敗或未檢測到成功的路徑參數");
    }
    this.loadCartItems();
  },
  methods: {
    goToHome() {
      this.$router.push({ path: '/' }); // 跳轉到首頁
    },
    goToCart() {
      //檢查登入狀態
      if(!this.isLoggedIn){
        this.$router.push({ path: '/login' });
      }else{
        this.$router.push({ path: '/cart' });
      }
    },
    loadCartItems() {
      axios.get('/cart/')
        .then(response => {
          this.orderItems = response.data.cartItems || [];
        })
        .catch(error => {
          console.error('無法加載購物車數據:', error);
        });
    },
    validateField(key) {
      const rule = this.fields[key].rules;
      this.errors[key] = rule ? rule(this.form[key]) : '';
    },
    
  async createOrder() {
    console.log("createOrder triggered");
      try {
        // 1. 構建訂單資料
        const orderData = {
          userId: this.userId,
          email: this.form.email,
          firstName: this.form.firstName,
          address: this.form.address,
          city: this.form.city,
          postalCode: this.form.postalCode,
          phone: this.form.phone,
          paymentMethod: this.form.paymentMethod,
          orderItems: this.orderItems.map(item => ({
            productId: item.product.id,
            productName: item.product.name,
            quantity: item.quantity,
            price: item.price,
          })),
          totalPrice: this.total,
          shippingFee: this.shippingFee,
        };
        console.log("訂單資料:", orderData);

         // 2. 發送訂單資料至後端，創建訂單
        const orderResponse = await axios.post('/orders', orderData);
        const orderId = orderResponse.data.data.id; // 假設後端返回訂單 ID
        console.log("創建的訂單 ID:", orderId);
        const orderItems = orderResponse.data.data.orderItems;

        // 迭代 orderItems 陣列
        orderItems.forEach(item => {
        console.log(`商品名稱: ${item.productName}, 數量: ${item.quantity}, 單價: ${item.price}`);
        });

        // 3. 通過訂單 ID 請求 Stripe 的 Checkout URL
        const checkoutResponse = await axios.post('/orders/checkout', { id: orderId });
        const checkoutUrl = checkoutResponse.data.checkoutUrl;
        console.log("Checkout URL:", checkoutUrl);
        // 4. 跳轉到 Stripe Checkout 頁面
        window.location.href = checkoutUrl;
      } catch (error) {
        console.error('創建訂單失敗:', error);
        alert('創建訂單失敗，請檢查填寫資料或稍後再試');
      }
    },
  },
};
</script>

