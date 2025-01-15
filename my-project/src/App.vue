<template>
  <div id="app">
    <div class="content-wrapper">
      <!-- 使用 Vuex 提供的狀態和方法 -->
      <AppHeader
        v-if="showHeader"
        :cartItemCount="cartItemCount"
        :userAccount="userAccount"
        :email="userEmail"
        :isLoggedIn="isLoggedIn"
        @logout="handleLogout"
      />
      <router-view
        :isLoggedIn="isLoggedIn"
        :userId ="userId"
        :userName ="userName"
        :userAccount="userAccount"
        :email="userEmail"
        :address="userAddress"
        :cellphone="userCellphone"
        @user-updated="handleUserUpdated"
      />
    </div>
    <AppFooter v-if="showFooter" />
  </div>
</template>

<script>
import axios from './service/axios';
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import eventBus from './eventBus.js';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
  },
  data() {
    return {
      // 使用者的購物車數量預設為0
      cartItemCount: 0,
      //使用者資訊
      userId: '',
      userAccount: '',
      userName:'',
      userEmail: '',
      userAddress:'',
      userCellphone: 0,
      //監測登入狀態 預設為false
      isLoggedIn: false,
    };
  },
  computed: {
    showHeader() {
      return this.$route.meta.layout !== 'none';
    },
    showFooter() {
      return this.$route.meta.layout !== 'none';
    },
  },
  mounted() {
    //購物車數量 使用eventBus事件和updateCartItemCount方法 更新updateCartCount
    eventBus.on('updateCartCount', this.updateCartItemCount);
    //更新使用者狀態方法
    this.checkUserSession();
    //更新使用者購物車方法
    this.updateCartItemCount();
  },
  unmounted() {
    //購物車數量 使用eventBus事件和updateCartItemCount方法 更新updateCartCount
    eventBus.off('updateCartCount', this.updateCartItemCount);
  },
  methods: {
    checkUserSession() {
      axios.get('/user/session')
        .then(response => {
          if (response.data.isLoggedIn) {
            this.isLoggedIn = true;
            this.userId = response.data.id;
            this.userAccount = response.data.account;
            this.userName = response.data.name;
            this.userEmail = response.data.email;
            this.userAddress = response.data.address;
            this.userCellphone = response.data.cellphone;
            this.updateCartItemCount();
            console.log('無法確認登入狀態:', response.data);
          }
        })
        .catch(error => {
          console.error('無法確認登入狀態:', error);
        });
    },
    updateCartItemCount() {
      axios.get('/cart/')
        .then(response => {
          const count = response.data.cartItems.length;
          this.cartItemCount = count > 99 ? 99 : count;
        })
        .catch(error => {
          console.error('無法讀取購物車數量:', error);
        });
    },
    handleUserUpdated(userData) {
      this.updateCartItemCount();
      this.userAccount = userData.userAccount;
      this.userEmail = userData.email;
      this.userName = userData.name;
      this.userAddress = userData.address;
      this.userCellphone = userData.cellphone;
      this.cartItemCount = userData.cartItemCount;
      this.isLoggedIn = true;
    },
    handleLogout() {
      axios.post('/user/logout')
        .then(() => {
          this.userId = '';
          this.userAccount = '';
          this.userEmail = '';
          this.userName = '';
          this.userAddress = '';
          this.userCellphone = 0;
          this.cartItemCount = 0;
          this.isLoggedIn = false;
          localStorage.removeItem('jwt');
          this.$router.push('/login');
        })
        .catch(error => {
          console.error('登出失敗:', error);
        });
    },
  },
};
</script>

<style lang="scss">
html, body {
  margin: 0;
  height: 100%;
}

.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* 確保頁面總高度為視窗高度 */
}

.main-content {
  flex: 1; /* 主內容填滿剩餘空間 */
}
</style>
