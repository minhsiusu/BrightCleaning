<template>
  <div class="forgot-password-container">
    <h2>修改密碼</h2>
    <div class="form-group">
      <label for="email">電子郵件或手機</label>
      <input type="text" id="email" v-model="email" placeholder="請輸入電子郵件或手機" />
      <button @click="sendCode">傳送驗證碼</button>
    </div>
    <div class="form-group">
      <label for="code">輸入驗證碼</label>
      <input type="text" id="code" v-model="code" placeholder="請輸入驗證碼" />
    </div>
    <div class="form-group">
      <label for="newPassword">更改密碼</label>
      <input type="password" id="newPassword" v-model="newPassword" placeholder="請輸入新密碼" />
    </div>
    <div class="form-group">
      <label for="confirmPassword">確認密碼</label>
      <input type="password" id="confirmPassword" v-model="confirmPassword" placeholder="請確認新密碼" />
    </div>
    <button class="reset-button" @click="resetPassword">確定</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ForgotPassword',
  data() {
    return {
      email: '', // 使用者輸入的電子郵件或手機
      code: '',  // 使用者輸入的驗證碼
      newPassword: '',  // 新密碼
      confirmPassword: ''  // 確認密碼
    };
  },
  methods: {
      // 發送驗證碼請求
      sendCode() {
      axios.post('/api/send-reset-code', { 
        emailOrPhone: this.email 
      })
        .then(response => {
          alert('驗證碼已發送到您的電子郵件或手機！', response.data);
        })
        .catch(error => {
          console.error('發送驗證碼失敗:', error);
          alert('驗證碼發送失敗，請檢查您輸入的電子郵件或手機號碼。');
        });
    },
    // 重置密碼
    resetPassword() {
      if (this.newPassword !== this.confirmPassword) {
        alert('兩次輸入的密碼不一致！');
        return;
      }

      axios.post('/api/reset-password', {
        emailOrPhone: this.email,
        code: this.code,
        newPassword: this.newPassword
      })
      .then(response => {
        alert('密碼已成功重置！', response.data);
      })
      .catch(error => {
        console.error('密碼重置失敗:', error);
        alert('密碼重置失敗，請檢查驗證碼或其他資料。');
      });
    }
  }
};
</script>

<style scoped>
.forgot-password-container {
  max-width: 400px;
  margin: 50px auto;
  margin-top: 130px;
  padding: 40px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #fff;
}

.forgot-password-container h2 {
  text-align: center;
  margin-bottom: 20px;
  margin-top: -10px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  font-size: 14px; /* 調整字體大小 */
}

.form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.form-group input:focus {
  border-color: #ff6600; /* 聚焦時邊框變為橘色 */
  outline: none; /* 移除默認的輸入框聚焦樣式 */
}

.form-group button {
  padding: 10px;
  margin-top: 10px;
  background-color: #494949;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.form-group button:hover {
  background-color: #888a88;
}

.reset-button {
  width: 100%; /* 使按鈕寬度和輸入框一致 */
  padding: 10px;
  background-color: #494949;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  box-sizing: border-box;
}

.reset-button:hover {
  background-color: #888a88;
}
</style>
