<template>
  <div class="wrapper">
      <div class="forgot-password-container">
      <!-- 返回按鈕 -->
      <button class="back-button" @click="goBack">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
        </svg>
      </button>
      <h2 v-if="!isTokenInvalid">重設密碼</h2>
      <h2 v-else>連結無效或已過期</h2>
      <!-- 重設密碼表單 -->
      <div v-if="!isTokenInvalid" class="form-group">
        <label for="newPassword"></label>
        <input
          type="password"
          id="newPassword"
          v-model="newPassword"
          placeholder="請輸入新密碼"
        />
        <label for="confirmPassword"></label>
        <input
          type="password"
          id="confirmPassword"
          v-model="confirmPassword"
          placeholder="請確認新密碼"
        />
        <button @click="resetPassword">確定</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../service/axios";

export default {
  name: "ForgotPassword",
  data() {
    return {
      isTokenInvalid: false, // 標記 token 是否無效
      newPassword: "",
      confirmPassword: "",
      loading: false, // 防止重複提交
    };
  },
  async created() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (!token) {
      this.isTokenInvalid = true;

      this.$router.push("/forgot-password");
      return;
    }

    await this.verifyToken(token);
  },
  methods: {
    // 返回登入畫面
    goBack() {
      this.$router.push("/login");
    },

    // 驗證 Token 是否有效
    async verifyToken(token) {
      try {
        await axios.get(`/user/reset?token=${token}`); // 將 token 傳遞給後端進行驗證
        console.log("Token 驗證成功");
        this.isTokenInvalid = false;
      } catch (error) {
        console.error("Token 驗證失敗:", error.response ? error.response.data : error);
        this.isTokenInvalid = true;
      } finally {
        this.loading = false;
      }
    },

    // 提交新密碼
    async resetPassword() {
      if (!this.newPassword || this.newPassword.length < 8) {
        alert("密碼必須至少包含 8 個字符！");
        return;
      }

      if (this.newPassword !== this.confirmPassword) {
        alert("兩次密碼輸入不一致！");
        return;
      }

      this.loading = true; // 設置為加載狀態
      try {
        const response = await axios.post("/user/reset-password", {
          password: this.newPassword,
        });
        console.log("密碼重置成功:", response.data);
        alert("密碼已成功重置！");
        this.$router.push("/login");
      } catch (error) {
        console.error("密碼重置失敗:", error);
        alert("密碼重置失敗，請重試！");
      } finally {
        this.loading = false; // 無論成功與否，解除加載狀態
      }
    },
  },
};
</script>


