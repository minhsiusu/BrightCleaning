<template>
    <div class="wrapper">
        <div class="reset-container">
            <!-- 返回按鈕 -->
            <button class="back-button" @click="goBack">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z" />
                </svg>
            </button>
            <!-- 提示狀態 -->
            <div v-if="isEmailSent" >
                <h2>重新設定密碼</h2>
                <div class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ff5722" width="64px" height="64px">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15-5-5 1.41-1.41L11 14.17l7.59-7.59L20 8l-9 9z" />
                    </svg>
                </div>
                <p>驗證信已發送至 <span class="highlight">{{ email }}</span><br>請檢查您的信箱。</p>
                <button class="ok-button" @click="goBack">好</button>
            </div>
            <!-- 輸入電子郵件表單 -->
            <div v-else>
                <h2>重新設定密碼</h2>
                <div class="form-group">
                    <input type="text" id="email" v-model="email" placeholder="請輸入電子郵件" />
                    <button @click="sendResetEmail">傳送信件</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "../service/axios";

export default {
name: "Reset",
    data() {
        return {
            email: "",
            isEmailSent: false,
        };
    },
    methods: {
        // 返回登入畫面
        goBack() {
            this.$router.push("/login");
        },
        // 傳送信件
        async sendResetEmail() {
            try {
                const response = await axios.post("/user/forget", {
                    email: this.email,
                });
                console.log("",response.data.jwt);
                this.isEmailSent = true;
            } catch (error) {
                console.error(error.response?.data || error.message);
                alert("信箱不存在或伺服器錯誤。");
            }
        },
    },
};
</script>

