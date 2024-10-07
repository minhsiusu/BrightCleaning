<template>
  <div class="register-container">
    <h2>會員註冊</h2>
    <div class="form-group">
      <label for="emailOrPhone">電子郵件或手機</label>
      <input type="text" v-model="emailOrPhone" id="emailOrPhone" placeholder="請輸入電子郵件或手機" />
      <button class="send-code-button" @click="sendVerificationCode">發送驗證碼</button>
    </div>
    <div class="form-group">
      <label for="verificationCode">輸入驗證碼</label>
      <input type="text" v-model="verificationCode" id="verificationCode" placeholder="請輸入驗證碼" />
    </div>
    <div class="form-group">
      <label for="password">密碼</label>
      <input type="password" v-model="password" id="password" placeholder="請輸入密碼" />
    </div>
    <div class="form-group">
      <label for="confirmPassword">確認密碼</label>
      <input type="password" v-model="confirmPassword" id="confirmPassword" placeholder="請再次輸入密碼" />
    </div>
    <div class="form-group">
      <label for="firstName">姓名</label>
      <input type="text" v-model="firstName" id="firstName" placeholder="請輸入姓名" />
    </div>
    <div class="form-group">
      <label for="address">地址</label>
      <input type="text" v-model="address" id="address" placeholder="請輸入地址" />
    </div>
    <button class="submit-button" @click="submitForm">送出</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "Register",
  data() {
    return {
      emailOrPhone: '', // 用戶輸入電子郵件或手機
      verificationCode: '', // 用戶輸入驗證碼
      password: '',         // 用戶輸入密碼
      confirmPassword: '',  // 用戶輸入確認密碼
      firstName: '',        // 用戶輸入姓名
      address: ''           // 用戶輸入住址
    };
  },
  methods: {
    sendVerificationCode() {
      // 發送驗證碼的請求，將 emailOrPhone 傳遞給後端
      axios.post('/api/send-verification-code', {
        emailOrPhone: this.emailOrPhone
      })
      .then(response => {
        console.log('驗證碼發送成功:', response.data);
      })
      .catch(error => {
        console.error('發送驗證碼失敗:', error);
        alert('驗證碼發送失敗，請檢查電子郵件或手機號碼');
      });
    },
    submitForm() {
      // 前端確認密碼和檢查輸入是否為空
      if (!this.emailOrPhone || !this.verificationCode || !this.password || !this.firstName || !this.address) {
        alert('所有欄位都必須填寫');
        return;
      }

      // 發送資料給後端，不再傳送 confirmPassword
      axios.post('/api/register', {
        emailOrPhone: this.emailOrPhone,
        verificationCode: this.verificationCode,
        password: this.password,
        firstName: this.firstName,
        address: this.address
      })
      .then(response => {
        console.log('註冊成功:', response.data);
        alert('註冊成功');
      })
      .catch(error => {
        console.error('註冊失敗:', error);
        alert('註冊失敗，請檢查表單資料');
      });
    }
  }
};
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 50px auto;
  margin-top: 130px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
}

.register-container h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.form-group label {
  flex: 1;
  font-weight: bold;
  font-size: 14px; /* 字體變小 */
}

.form-group input {
  flex: 2;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-group input:focus {
  border-color: #ff6600; /* 聚焦時邊框顯示橘色 */
  outline: none;
}

.send-code-button {
  flex: 1;
  margin-left: 10px;
  padding: 10px;
  background-color: #494949;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.send-code-button:hover {
  background-color: #888a88;
}

.submit-button {
  width: 100%;
  padding: 10px;
  background-color: #494949;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.submit-button:hover {
  background-color: #888a88;
}
</style>
