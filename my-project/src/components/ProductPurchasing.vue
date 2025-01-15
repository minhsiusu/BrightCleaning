<template>
  <div class="product-purchasing-wrapper">
    <div class="product-purchasing">
      <!-- 加入購物車成功通知彈窗 -->
      <transition name="fade" mode="out-in">
        <div v-if="showSuccessPopup" class="success-popup">
          <img :src="'/image/Icon/Cart/check-circle.png'" alt="check-circle" />
          <p>商品已成功加入購物車！</p>
        </div>
      </transition>
      <!-- 加入購物車失敗通知彈窗 -->
      <transition name="fade" mode="out-in">
        <div v-if="showFailPopup" class="fail-popup">
          <p>目前購物車中已有 {{ findCartItems.quantity }} 件該商品，數量已超過庫存上限，請調整後再試。</p>
          <button @click="hideError">返回</button>
        </div>
      </transition>

      <div class="product-image" v-if="product.type && product.picture">
        <img :src="`/image/Product/${product.type}/${product.picture}`" :alt="product.name" />
      
      </div>

      <div class="product-info">
        <h1>{{ product.name }}</h1>
        <p class="stock-info">庫存：{{ product.count }} 件</p>
        <p class="price">{{ product.price }} 元</p>

        <!-- 商品數量購買控制 -->
        <div class="quantity-control">
          <button @click="decreaseQuantity">-</button>
          <input type="number" v-model.number="product.quantity" :min="1" :max="product.count" @input="checkQuantity" @change="checkQuantity" />
          <button @click="increaseQuantity">+</button>
        </div>

        <!-- 加入購物車按鈕 -->
        <div class="buttons">
          <button class="add-to-cart" @click="addToCart(product.id)">加入購物車</button>
        </div>

        <p class="category-info">
          分類：{{typeTitle}}
          
        </p>

        <div class="product-description">
          <h2>商品資訊</h2>
          <p>{{ product.detail }}</p>
          <Breadcrumb />
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import axios from '../service/axios';
import Breadcrumb from '@/components/Breadcrumb.vue';
import eventBus from '../eventBus.js';//使用事件總線監聽各個事件
export default {
  name: 'ProductPurchasing',
  data() {
    return {
      //顯示加入購物車方法成功變數 預設false用於隱藏
      showSuccessPopup: false,
      //顯示加入購物車方法失敗變數 預設false用於隱藏
      showFailPopup: false,
      // 用於保存 setTimeout 返回的定時器 ID
      timer: null,
      //初始化購物車內容，用於儲存使用者選擇的商品資訊
      cartItems: [],
      //初始化進來商品資訊變數用於儲存後端進來的商品資訊
      product: {
        id: null,
        name: '',
        image: '',
        quantity: 1,
        price: 0,
        count: 0,
      },
      //用來儲存中文分類文字
      typeTitle:''
    };
  },
  components: {
    Breadcrumb,
  },
  mounted(){
    this.loadProductData();
  },
  computed: {
    //動態獲取購物車內容，用於失敗視窗顯示，告訴使用者還能購買多少商品
    findCartItems() {
      return this.cartItems.find(item => item.product.id === this.product.id);
    }
  },
  methods: {
    //讀取後端進來的商品資訊(使用者選擇)
    loadProductData() {
      const productId = this.$route.params.productId;
      axios.get(`product/get?id=${productId}`)
      .then(response => {
        this.product = { ...response.data, quantity: 1 };
        const typeMapping = {
        Descaling: '除水垢',
        Polishing: '浴廁拋光',
        FloorCleaning: '地板清潔'
      };
      this.typeTitle = typeMapping[response.data.type] || '';
      })
      .catch(error => {
        console.error('無法加載商品數據:', error);
        alert('商品數據加載失敗，請稍後再試');
      });
    },
    //控制購買數量方法
    decreaseQuantity() {
      if (this.product.quantity > 1) {
        this.product.quantity--;
      }
    },
    increaseQuantity() {
      if (this.product.quantity < this.product.count) {
        this.product.quantity++;
      }
    },
    checkQuantity() {
      // 確保輸入的數量在庫存範圍內 當數量大於庫存 就會等於庫存反之庫存數量小於1就會等於1
      if (this.product.quantity > this.product.count) {
        this.product.quantity = this.product.count;
      } else if (this.product.quantity < 1) {
        this.product.quantity = 1;
      }
    },
    // 顯示成功彈窗並啟動定時器
    showSuccess() {
      this.clearTimer(); // 清除現有的定時器
      this.showSuccessPopup = true;
      this.timer = setTimeout(() => {
        this.showSuccessPopup = false;
      }, 2000); // 2秒後自動關閉
    },
    // 顯示失敗彈窗
    showError() {
      this.clearTimer(); // 確保沒有其他定時器
      this.showFailPopup = true; // 顯示失敗彈窗
      //確保其他視窗在初始狀態
      this.showSuccessPopup = false;
    },

    // 隱藏彈窗
    hideError() {
      this.showFailPopup = false;
    },
    // 清除定時器
    clearTimer() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
    },
    addToCart(productId) {
      axios.get('/cart/')
      .then((response)=>{
        this.cartItems = response.data.cartItems;
        //查找是否已購買該商品
        const findProduct = this.cartItems.find(item => item.product.id === productId);
        //宣告一個變數 用來儲存檢索過的商品的數量 沒有就是0
        const existingQuantity = findProduct ? findProduct.quantity : 0;

        //確認總數量是否超出庫存 totalQuantity = 現存 + 新增
        const totalQuantity = existingQuantity + this.product.quantity;
        //當大於就是超過顯示警告視窗
        if (totalQuantity > this.product.count) {
          //加入購物車失敗顯示彈跳視窗
          this.showError();
          return;
        }
        // 沒有超過庫存上限，執行加入購物車的 API
        this.callCartApi();

      })
      .catch(error => {
        console.error('無法加載購物車數據:', error);
        this.$router.push('/login');
      });
    },
    //呼叫購物車API
    callCartApi() {
      this.isSubmitting = true; // 禁用按鈕
      axios.put('http://localhost:8070/cart/add', {
        productId: this.product.id,
        quantity: this.product.quantity,
        price: this.product.price,
      })
      .then(() => {
        // 加入購物車成功，顯示彈跳視窗
        this.showSuccess();
        // 觸發購物車數量更新事件
        eventBus.emit('updateCartCount');
      })
      .catch(error => {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              alert('登入過期，請重新登入');
              break;
            case 400:
              alert(error.response.data.message || '請求無效');
              break;
            default:
              alert('伺服器錯誤，請稍後再試');
          }
        } else {
          console.error('無法連接伺服器:', error.message);
          alert('無法連接伺服器，請檢查網路連接');
        }
      })
      .finally(() => {
        this.isSubmitting = false; // 恢復按鈕狀態
      });
    }
  }
};
</script>

<style scoped>

.product-purchasing-wrapper {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  height: 100vh; /* 父容器高度等於視窗高度 */
}

</style>