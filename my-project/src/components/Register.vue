<template>
  <div class="register-container">
    <h2>會員註冊</h2>
    <div class="form-group">
      <label for="emailOrPhone">電子郵件或手機</label>
      <input type="text" id="emailOrPhone" placeholder="請輸入電子郵件或手機" />
      <button class="send-code-button">發送驗證碼</button>
    </div>
    <div class="form-group">
      <label for="verificationCode">輸入驗證碼</label>
      <input type="text" id="verificationCode" placeholder="請輸入驗證碼" />
    </div>
    <div class="form-group">
      <label for="password">密碼</label>
      <input type="password" id="password" placeholder="請輸入密碼" />
    </div>
    <div class="form-group">
      <label for="confirmPassword">確認密碼</label>
      <input type="password" id="confirmPassword" placeholder="請再次輸入密碼" />
    </div>
    <div class="form-group">
      <label for="Name">姓名</label>
      <input type="text" id="firstName" placeholder="請輸入姓名" />
    </div>
    <div class="form-group">
      <label for="address">地址</label>
      <input type="text" id="address" placeholder="請輸入地址" />
    </div>
    <button class="submit-button">送出</button>
  </div>
</template>

<script>
export default {
  name: "Register",
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
