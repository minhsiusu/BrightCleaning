<template>
  <header>
    <nav>
      <!-- 漢堡圖標 -->
      <div class="hamburger" @click="toggleMenu">
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
      </div>

      <!-- 側邊菜單 -->
      <div :class="{'nav-menu': true, 'show': isMenuOpen}">
        <div class="close-btn" @click="toggleMenu">✖</div>
        <span v-for="link in links" :key="link.path" @click.prevent="navigateTo(link.path)">
          {{ link.name }}
        </span>
        <div class="search-bar">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="搜尋商品"
            @input="handleSearch"
            @focus="showSuggestions = true"
            @blur="hideSuggestions"
            @keydown.enter="navigateToSelectedProduct"
          />
          <ul v-if="showSuggestions && searchResults.length" class="suggestions-list">
            <li
              v-for="result in searchResults"
              :key="result.id"
              @mousedown.prevent="selectSuggestion(result)"
            >
              {{ result.name }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Logo -->
      <a href="/" class="logo">
        <img src="/image/Logo/光潔.png" alt="光潔">
      </a>

      <!-- 導航圖標 -->
      <div class="nav-icons">
        <!-- 帳戶圖標 -->
        <div class="user-icons" @click="toggleAccountMenu" ref="accountIcon">
          <img src="/image/Icon/Header/login.png" alt="登入" />
          <transition name="fade-slide">
            <div v-if="showAccountMenu" class="account-menu">
              <div class="menu-options">
                <router-link v-if="!isLoggedIn" to="/login">登入</router-link>
                <router-link v-if="!isLoggedIn" to="/register">註冊</router-link>
                <div v-else>
                  <div @click="goToMyAccount" class="user-info"  v-if="isLoggedIn">{{ userAccount }}</div>
                  <div @click="logout" class="logout">登出</div>
                </div>
              </div>
            </div>
          </transition>
        </div>

        <!-- 商店圖標 -->
        <div class="store-icon" @click="toggleStore" ref="storeIcon">
          <img src="/image/Icon/Header/store.png" alt="商店" />
          <transition name="fade-slide">
            <div v-if="showStoreMenu" class="store-menu">
              <div class="menu-options">
                <router-link to="/product-introduction/descaling">除水垢商品</router-link>
                <router-link to="/product-introduction/polishing">浴廁拋光商品</router-link>
                <router-link to="/product-introduction/floorcleaning">地板清潔商品</router-link>
              </div>
            </div>
          </transition>
        </div>

        <!-- 購物車圖標 -->
        <div class="cart-icon" @click="goToCart">
          <img src="/image/Icon/Header/ShoppingCart.png" alt="購物車" />
          <span v-if="cartItemCount > 0" class="cart-badge">{{ cartItemCount }}</span>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import axios from '../service/axios';
  export default {
    name: 'AppHeader',
    props: {
      isLoggedIn: {
        type: Boolean,
        default: false,
      },
      cartItemCount: {
        type: Number,
        default: 0
      },
      userAccount: {  // 用戶的帳號
        type: String,
        default: ''
      },
      email: {  // 用戶的郵箱
        type: String,
        default: ''
      }
    },
    data() {
      return {
        searchQuery: '', // 搜尋欄中的文字
        searchResults: [], // 搜尋建議結果
        selectedProduct: null, // 使用者選擇的商品
        showSuggestions: false, // 是否顯示建議清單
        isMenuOpen: false,
        showAccountMenu: false,
        showStoreMenu: false,
        links: [
          { name: '我們的成果', path: '/Portfolio' },
          { name: '客人估價調查表', path: '/Questionnaire' },
          { name: '除水垢商品', path: '/product-introduction/descaling' },
          { name: '浴廁拋光商品', path: '/product-introduction/polishing' },
          { name: '地板清潔商品', path: '/product-introduction/floorcleaning' },
        ],
        
      };
    },
    mounted() {
      document.addEventListener('click', this.closeMenusOnClickOutside);
    },
    beforeUnmount() {
      document.removeEventListener('click', this.closeMenusOnClickOutside);
    },
    methods: {
      async handleSearch() {
        if (this.searchQuery.trim() === '') {
          this.searchResults = [];
          return;
        }

        try {
          const response = await axios.get('/product/search', {
            params: { keyword: this.searchQuery }
          });
          this.searchResults = response.data;
          console.log('搜尋到的商品：', this.searchResults);
        } catch (error) {
          console.error('搜尋商品失敗：', error);
        }
      },
      selectSuggestion(result) {
      // 將選中的商品名稱顯示在搜尋欄中，並保存選中商品
      this.searchQuery = result.name;
      this.selectedProduct = result;
      this.showSuggestions = false; // 隱藏建議清單
      },
      navigateToSelectedProduct() {
        if (this.selectedProduct) {
          // 使用者按下 Enter 後跳轉到選中的商品頁面
          this.$router.push(
            `/product-purchasing/${this.selectedProduct.type}/${this.selectedProduct.id}`
          );
          this.clearSearch();
        } else {
          alert('請選擇一個商品再按下 Enter');
        }
      },
      hideSuggestions() {
        // 略微延遲清除建議，避免點擊時無法觸發選擇
        setTimeout(() => {
          this.showSuggestions = false;
        }, 100);
      },
      clearSearch() {
        this.searchQuery = '';
        this.searchResults = [];
        this.showSuggestions = false;
      },
      toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen; // 切換菜單的開關狀態
      },
      navigateTo(path) {
        this.$router.push(path);  // 使用 Vue Router 進行導航
      },
      toggleStore() {
        this.showStoreMenu = !this.showStoreMenu;
        if (this.showStoreMenu) {
          this.showAccountMenu = false; // 如果打開 store-menu 關閉 account-menu
        }
      },
      toggleAccountMenu() {
        this.showAccountMenu = !this.showAccountMenu;
        if(this.showAccountMenu) {
          this.showStoreMenu = false;
        }
      },
      goToCart() {
        //檢查登入狀態
        if(!this.isLoggedIn){
          this.$router.push({ path: '/login' });
        }else{
          this.$router.push({ path: '/cart' });
        }
      },
      goToMyAccount() {
        //檢查登入狀態
        if(!this.isLoggedIn){
          this.$router.push({ path: '/login' });
        }else{
          this.$router.push({ path: '/MyAccount' });
        }
      },
      logout() {
        this.$emit('logout');  // 向父組件傳送 logout 事件
        this.showAccountMenu = false;
        this.isMenuOpen = false;
        this.$nextTick(() => {
          this.$router.push({ path: '/login' });
        });
      },
      closeMenusOnClickOutside(event) {
        const clickedInsideStore = this.$refs.storeIcon?.contains(event.target);
        const clickedInsideAccount = this.$refs.accountIcon?.contains(event.target);

        if (!clickedInsideStore) {
          this.showStoreMenu = false;
        }

        if (!clickedInsideAccount) {
          this.showAccountMenu = false;
        }
      }
    }
  };
</script>
