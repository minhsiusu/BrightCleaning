<template>
  <div class="cart-wrapper">
    <div class="cart-container">
      <!-- 加入購物車成功通知彈窗 -->
      <transition name="fade">
        <div v-if="showDeleteSuccessPopup" class="deleteSuccess-popup">
          <img :src="'/image/Icon/Cart/check-circle.png'" alt="check-circle" />
          <p>商品已成功刪除！</p>
        </div>
      </transition>
      <!-- 確認刪除提示彈窗 -->
      <div v-if="showDeleteAllPopup" class="deleteAll-popup">
        <p>確定要刪除所有商品嗎？</p>
        <div class="popup-actions">
          <button @click="clearCart">確定</button>
          <button @click="cancelClearCart">取消</button>
        </div>
      </div>

      <div v-if="emptyCartWarning" class="empty-cart-warning">
        <p>購物車沒有商品！</p>
      </div>

      <h2>購物車</h2>

      <!-- 提示購物車為空 -->
      <div v-if="cartItems.length === 0" class="empty-cart-message">
        <p>目前購物車中沒有商品。</p>
      </div>

      <div class="cart-item" v-for="item in cartItems" :key="item.id">
        <button class="delete-button" @click="removeItem(item.id)">刪除</button>
        <div class="item-image">
          <img :src="`/image/Product/${item.product.type}/${item.product.picture}`" :alt=" item.product.name" />
        </div>
        <div class="item-name">商品名稱:{{ item.product.name }}</div>
        <div class="item-quantity">數量：{{ item.quantity }}</div>
        <div class="item-price">價格：{{ item.price }} 元</div>
      </div>

      <div class="cart-actions">
        <button class="clear-cart-button" @click="showDeleteAllCartPopup">清空購物車</button>
        <button class="checkout-button" @click="goToCheckout">前往結帳</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../service/axios';
import eventBus from '../eventBus.js';//使用事件總線監聽各個事件

export default {
  name:'Cart',
  props: {
    isLoggedIn: {
        type: Boolean,
        default: false,
    },
  },
  data() {
    return {
      //  初始化並獲取購物車內容
      cartItems: [],
      timer: null,
      showDeleteSuccessPopup: false,
      showDeleteAllPopup: false,
      emptyCartWarning: false,
    };
  },

  mounted() {
    this.loadCartData();
  },
  beforeUnmount() {
    this.clearTimer();
  },
  methods: {
    // 顯示成功彈窗並啟動定時器
    showDeleteSuccess() {
      this.clearTimer(); // 清除現有的定時器
      this.showDeleteSuccessPopup = true;
      this.timer = setTimeout(() => {
        this.showDeleteSuccessPopup = false;
      }, 2000); // 2秒後自動關閉
    },
    // 清除定時器
    clearTimer() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
    },
    loadCartData(){
      axios.get('/cart/')
        .then(response => {
          this.cartItems = response.data.cartItems || [];
      })
        .catch(error => {
          console.error('無法加載購物車數據:', error);
      });
    },
    //前往結帳頁面
    goToCheckout() {

      // 檢查購物車是否為空
      if (this.cartItems.length === 0) {
        this.emptyCartWarning = true; // 顯示提示信息
      setTimeout(() => {
        this.emptyCartWarning = false; // 2 秒後隱藏提示
      }, 2000);
        return; // 停止執行，不跳轉
      }
      //檢查登入狀態
      if(!this.isLoggedIn){
          this.$router.push({ path: '/login' });
        }else{
          this.$router.push({ path: '/checkout'});
      }
    },
      // 移除商品
    removeItem(cartItemId) {
      axios.delete(`/cartItem/${cartItemId}`)
      .then(() => {
        this.cartItems = this.cartItems.filter(item => item.id !== cartItemId);
        this.showDeleteSuccess();
        eventBus.emit('updateCartCount');
      })
      .catch(error => {
        console.error('刪除商品失敗:', error);
        alert('無法刪除商品，請稍後重試');
      });
    },
    showDeleteAllCartPopup() {
      if (this.cartItems.length === 0) {
        this.emptyCartWarning = true;
        setTimeout(() => {
          this.emptyCartWarning = false;
        }, 2000);
        return;
      }else
        this.showDeleteAllPopup = true;
    },
    // 取消刪除操作
    cancelClearCart() {
      this.showDeleteAllPopup = false;
    },
      // 清空購物車
    clearCart() {
      axios.delete('/cartItem/deleteall')
        .then(() => {
          this.cartItems = [];
          eventBus.emit('updateCartCount');
          console.log('購物車已清空');
        })
        .catch(error => {
          console.error('清空購物車失敗:', error);
          alert('無法清空購物車，請稍後再試');
        })
        .finally(() => {
          this.showDeleteAllPopup = false; // 隱藏彈窗
        });
    },
  }
};
</script>

<style lang="scss">

.cart-wrapper {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  min-height: 100vh; /* 父容器高度等於視窗高度 */
}

.cart-container {
  width: 90%;
  max-width: 800px; /* 限制最大寬度 */
  margin: 120px auto; /* 保持上下間距 */
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;

  @media (max-width: 768px) {
    width: 95%;
    padding: 15px;
  }

  @media (max-width: 480px) {
    margin-top:120px;
    width: 94%;
    padding: 10px;
  }
    h2 {
    text-align: center;
    margin-bottom: 10px;
    @media (max-width: 480px) {
      font-size: 18px;
    }
  }
}

</style>
