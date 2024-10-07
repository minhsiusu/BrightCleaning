<template>
  <div class="cart-container">
    <h2>購物車</h2>
    <div class="cart-item" v-for="item in cartItems" :key="item.id">
      <button class="delete-button" @click="removeItem(item.id)">刪除</button>
      <div class="item-image">
        <img :src="item.image" alt="商品圖">
      </div>
      <div class="item-name">{{ item.name }}</div>
      <div class="item-quantity">數量：{{ item.quantity }}</div>
      <div class="item-price">價格：{{ item.price }} 元</div>
    </div>

    <div class="cart-actions">
      <button class="clear-cart-button" @click="clearCart">清空購物車</button>
      <button class="checkout-button" @click="goToCheckout">前往結帳</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      //  初始化購物車內容
      cartItems: []
    };
  },
  mounted() {
    // 當頁面載入時，從後端獲取購物車數據
    axios.get('/api/cart') // 請求後端來獲取用戶的購物車內容
      .then(response => {
        this.cartItems = response.data.cartItems; // 假設後端返回一個購物車商品的數組
    })
      .catch(error => {
        console.error('無法加載購物車數據:', error);
    });
  },
  methods: {
    // 發送購物車數據給後端
    goToCheckout() {
      axios.post('/api/checkout', {
        cartItems: this.cartItems // 傳遞購物車的數據給後端
      })
      .then(response => {
        console.log('結帳成功', response.data);
        // 跳轉到訂單確認頁面
        this.$router.push({ path: '/order-confirmation' });
      })
      .catch(error => {
        console.error('結帳失敗', error);
      });
    },
      // 移除商品
      removeItem(itemId) {
        this.cartItems = this.cartItems.filter(item => item.id !== itemId);
    },
      // 清空購物車
      clearCart() {
        this.cartItems = [];
    }
  }
};
</script>

<style scoped>
.cart-container {
  max-width: 800px;
  margin: 200px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
}

.delete-button {
  padding: 5px 10px;
  background-color: #ff5722;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.delete-button:hover {
  background-color: #e64a19;
}

.item-image {
  flex: 1;
  text-align: center;
  padding: 10px;
  background-color: #f5f5f5;
}

.item-name, .item-quantity, .item-price {
  flex: 2;
  text-align: center;
  padding: 10px;
}

.cart-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.clear-cart-button, .checkout-button {
  padding: 10px 20px;
  background-color: #494949;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.clear-cart-button:hover, .checkout-button:hover {
  background-color: #888a88;
}

.clear-cart-button {
  background-color: #ff5722;
}

.clear-cart-button:hover {
  background-color: #e64a19;
}
</style>
