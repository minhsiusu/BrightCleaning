<template>
  <div class="page-container">
    <div class="register-container">
      <h2 v-if="!isTokenInvalid">會員註冊</h2>
      <h2 v-else>連結無效或已過期</h2>
      <div v-if="!isTokenInvalid">
        <div class="form-group" v-for="(field, key) in fields" :key="key">
          <label :for="key">{{ field.label }}</label>
          <input
            :type="field.type"
            v-model="form[key]"
            :id="key"
            :placeholder="field.placeholder"
            @input="validateField(key)"
          />
          <p class="error-message" v-if="errors[key]">{{ errors[key] }}</p>
        </div>
        <button class="submit-button" @click="submitForm">送出</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../service/axios';

export default {
  name: "Register",
  data() {
    return {
      form: {
        account: '',
        password: '',
        name: '',
        cellPhone: '',
        address: ''
      },
      errors: {},
      isTokenInvalid: false, // 預設為有效
      fields: {
        account: {
          label: '會員名稱',
          type: 'text',
          placeholder: '請輸入會員名稱',
          rules: value => (value && value.length >= 3 ? '' : '帳號需至少 3 個字元')
        },
        password: {
          label: '密碼',
          type: 'password',
          placeholder: '請輸入密碼',
          rules: value => (value && value.length >= 8 ? '' : '密碼需至少 8 個字元')
        },
        name: {
          label: '姓名',
          type: 'text',
          placeholder: '請輸入姓名',
          rules: value => (value ? '' : '姓名不能為空')
        },
        cellPhone: {
          label: '手機',
          type: 'text',
          placeholder: '請輸入手機',
          rules: value => (/^09\d{8}$/.test(value) ? '' : '手機格式不正確')
        },
        address: {
          label: '地址',
          type: 'text',
          placeholder: '請輸入地址',
          rules: value => (value ? '' : '地址不能為空')
        }
      }
    };
  },
  async created() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const email = urlParams.get("email");
    if (!token || !email ) {
      this.isTokenInvalid = true;
      this.$router.push("/register-comfirm");
      return;
    }

    await this.verifyToken(token, email);
  },
  methods: {
    async verifyToken(registerToken, email) {
      try {
        // 將 token 傳遞給後端進行驗證
        await  axios.get(`/user/register/confirm?token=${registerToken}`); 
        console.log("Token 驗證成功");
        this.isTokenInvalid = false;
        this.form.email = email;
      } catch (error) {
        console.error("Token 驗證失敗:", error.response ? error.response.data : error);
        this.isTokenInvalid = true;
      } finally {
        this.loading = false;
      }
    },
    validateField(key) {
      const rule = this.fields[key].rules;
      this.errors[key] = rule ? rule(this.form[key]) : '';
    },
    // 提交註冊表單
    async submitForm() {
      Object.keys(this.fields).forEach(this.validateField);

      // 檢查表單是否有錯誤
      if (Object.values(this.errors).some(error => error)) {
        alert("請修正所有欄位錯誤後再提交");
        return;
      }
      this.loading = true; // 設置為加載狀態

      try {
        // 提交表單資料和 token 進行註冊
        await axios.post('/user/register/complete', {
          email: this.form.email,
          ...this.form, // 表單資料
        });
        alert('註冊成功！');
        // 註冊成功後跳轉到登入頁
        this.$router.push('/login');
      } catch (error) {
        console.error("註冊失敗:", error);
        alert("註冊失敗，請檢查表單資料");
      } finally {
        // 無論成功與否，解除加載狀態
        this.loading = false;
      }
    },
  }
};
</script>


