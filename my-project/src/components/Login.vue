<template>
  <div class="login-container">
    <h2>會員登入</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="account">帳號</label>
        <input type="text" id="account" v-model="account" placeholder="請輸入帳號">
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
        <router-link class="forgot-password-link" to="/forgot-password">忘記密碼?</router-link>
        <router-link class="register-link" to="/register">會員註冊</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Login',
  data() {
    return {
      account: '',
      password: '',
      errorMessage: ''
    };
  },
  methods: {
    handleLogin() {
      axios.post('http://localhost:3000/api/login', {
        account: this.account,
        password: this.password
      })
      .then(response => {
        if (response.data.success) {
          localStorage.setItem('account', response.data.user.account);
          localStorage.setItem('email', response.data.user.email);
          // 發送 account 和 email 更新事件
          this.$emit('user-updated', { account: response.data.user.account, email: response.data.user.email });
          this.$router.push({ name: 'HomePage' });
        } else {
          this.errorMessage = response.data.message;
        }
      })
      .catch(error => {
        console.error('Error during login:', error);
        this.errorMessage = '登入失敗，請稍後再試。';
      });
    }
  }
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  margin-top: 200px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #ffffff;
}

.login-container h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  flex-direction: column; /* 垂直排列 */
  margin-bottom: 20px;
}

.form-group label {
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 14px; /* 字體大小稍微調小 */
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.login-button {
  width: 100%;
  padding: 10px;
  background-color: #494949;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
}

.login-button:hover {
  background-color: #888a88;
}

.links {
  display: flex;
  justify-content: space-between; /* 左右分佈 */
  margin-top: 20px;
}

.forgot-password-link {
  color: #ff5722;
  margin-right: auto; /* 自動分配右邊距離 */
}

.register-link {
  color: #007bff;
  margin-left: auto; /* 自動分配左邊距離 */
}

.forgot-password-link:hover,
.register-link:hover {
  text-decoration: underline;
}

</style>
