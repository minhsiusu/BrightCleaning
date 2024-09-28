<template>
 <div id="app">
    <div class="content-wrapper">
      <AppHeader :cartItemCount="cartItemCount" :account="userAccount" :email="userEmail" @logout="handleLogout" />
      <router-view @update-cart-item-count="updateCartItemCount" @user-updated="handleUserUpdated" />
    </div>
    <AppFooter />
  </div>
</template>

// App.vue
<script> 
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
  },
  data() {
    return {
      cartItemCount: 0,
      userAccount: '',  // 儲存用戶帳號
      userEmail: ''  // 儲存用戶郵箱
    };
  },
  methods: {
    updateCartItemCount(count) {
      this.cartItemCount = count;
    },
    handleUserUpdated(userData) {
      this.userAccount = userData.account;  // 更新帳號
      this.userEmail = userData.email;
    },
    handleLogout() {
      this.userAccount = '';  // 清空帳號
      this.userEmail = '';
      localStorage.removeItem('account');
      localStorage.removeItem('email');
      this.$router.push('/login');  // 跳轉到登入頁面
    }
  }
};
</script>



<style>

html, body {
  height: 100%;
  margin: 0;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* 保證容器至少等於視窗高度 */
}

.content-wrapper {
  flex: 1; /* 讓 content-wrapper 佔據剩餘空間 */
}

</style>
