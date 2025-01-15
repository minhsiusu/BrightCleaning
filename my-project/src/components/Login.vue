<template>
  <div class="wrapper">
    <div class="login-container">
      <h2>會員登入</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">帳號</label>
          <input type="text" id="email" v-model="email" placeholder="請輸入信箱">
        </div>
        <div class="form-group">
          <label for="password">密碼</label>
          <input type="password" id="password" v-model="password" placeholder="請輸入密碼">
        </div>
        <div class="form-group">
          <button type="submit" class="login-button">登入</button>
        </div>
        <div class="error-message" v-if="errorMessage">{{ errorMessage }}</div>
        <div class="links">
          <router-link class="forgot-password-link" to="/reset">忘記密碼?</router-link>
          <router-link class="register-link" to="/register-comfirm">會員註冊</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from '../service/axios';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      account: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    handleLogin() {
      axios.post('/user/login', {
        email: this.email,
        password: this.password
      })
      .then(response => {
        if (response.data) {
          console.log(response.data);
          // 從後端獲取的數據
          const userData = {
            userAccount: response.data.account,
            email: response.data.email,
            name: response.data.name,
            address: response.data.address,
            cellphone: response.data.cellphone
          };
          // 發送更新事件
          this.$emit('user-updated', userData);

          this.$router.push({ name: 'HomePage' });
        } else {
          this.errorMessage = response.data.message;
        }
      })
      .catch(error => {
        console.log({ email: this.email, password: this.password });
        console.error('Error during login:', error);
        this.errorMessage = '登入失敗，請稍後再試。';
      });
    }
  }
};
</script>

