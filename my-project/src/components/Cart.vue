<template>
  <div class="cart-container">
    <h2>購物車</h2>
    <div class="cart-item" v-for="n in 2" :key="n">
      <button class="delete-button">刪除</button>
      <div class="item-image">商品圖</div>
      <div class="item-name">商品名稱</div>
      <div class="item-quantity">數量</div>
      <div class="item-price">價格</div>
    </div>

    <div class="cart-actions">
      <button class="clear-cart-button">清空購物車</button>
      <button class="checkout-button" @click="goToCheckout">前往結帳</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToCheckout() {
      this.$router.push({ path: '/checkout' });
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
