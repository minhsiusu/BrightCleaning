<template>
    <header>
      <nav>
        <div class="hamburger" @click="toggleMenu">
      <!-- 漢堡圖標 -->
          <div class="bar"></div>
          <div class="bar"></div>
          <div class="bar"></div>
        </div>
       <!-- 側邊菜單 -->
       <div :class="{'nav-menu': true, 'show': isMenuOpen}">
          <div class="close-btn" @click="toggleMenu">✖</div> <!-- 關閉按鈕 -->
          <span v-for="link in links" :key="link.path" href="#" @click.prevent="navigateTo(link.path)">
            {{ link.name }}
          </span>
          <div class="search-bar">
           <input type="text" placeholder="搜尋商品" />
          </div>
        </div>

        <a href="/" class="logo">
          <img src="/image/Logo/光潔.png" alt="光潔">
        </a>
        <div class="nav-links">
         
        </div>
 

        <div class="nav-icons">
          <div class="user-icons" @click="toggleAccountMenu" ref="accountIcon">
            <img src="/image/Icon/Header/login.png" alt="登入" />

            <!-- 帳戶選單 -->
            <transition name="fade-slide">
              <div v-if="showAccountMenu" class="account-menu">
              
                <div class="menu-options">
                  <!-- 未登入顯示登入按鈕 -->
                  <router-link v-if="!account" to="/login">登入</router-link>
                  <router-link v-if="!account" to="/register">註冊</router-link>
                  <div v-else >
                    <!-- 登入顯示帳號 -->
                    <div class="user-info">{{ account }}</div>
                    <!-- 登入出現登出 -->
                    <div @click="logout" class="logout">登出</div>
                  </div>
                </div>

              </div>
            </transition>

          </div>
          <div class="store-icon" @click="toggleStore" ref="storeIcon">
            <img src="/image/Icon/Header/store.png" alt="商店" />

             <!-- 商品選單 -->
             <transition name="fade-slide">
              <div v-if="showStoreMenu" class="store-menu">
              
                <div class="menu-options">
                  <router-link  to="/product-introduction/descaling">除水垢商品</router-link>
                  <router-link  to="/product-introduction/polishing">浴廁拋光商品</router-link>
                  <router-link  to="/product-introduction/floor-cleaning">地板清潔商品</router-link>
                </div>

              </div>
            </transition>

          </div>

          <div class="cart-icon" @click="goToCart">
            <img src="/image/Icon/Header/ShoppingCart.png" alt="購物車" />
            <span v-if="cartItemCount > 0" class="cart-badge">{{ cartItemCount }}</span>
          </div>
          
        </div>
      </nav>
    </header>
   
</template>

<script>

  export default {
    name: 'AppHeader',
      components: {
        
    },
    props: {
      cartItemCount: {
        type: Number,
        default: 0
      },
      account: {  // 用戶的帳號
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
        isMenuOpen: false,
        showAccountMenu: false,
        showStoreMenu: false,
        links: [
          { name: '我們的成果', path: '/Portfolio' },
          { name: '客人估價調查表', path: '/Questionnaire' },
          { name: '除水垢商品', path: '/product-introduction/descaling' },
          { name: '浴廁拋光商品', path: '/product-introduction/polishing' },
          { name: '地板清潔商品', path: '/product-introduction/floor-cleaning' },
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
      toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen; // 切換菜單的開關狀態
      },
      navigateTo(path) {
        this.$router.push(path);  // 使用 Vue Router 進行導航
      },
      toggleStore() {
        this.showStoreMenu = !this.showStoreMenu;
        if (this.showStoreMenu) {
          this.showAccountMenu = false; // 如果打開 store-menu，關閉 account-menu
        } 
      },
      toggleAccountMenu() {
        this.showAccountMenu = !this.showAccountMenu;
        if(this.showAccountMenu) {
          this.showStoreMenu = false;
        }
      },
      goToCart() {
        this.$router.push({ path: '/Cart' });
      },
      logout() {
        this.$emit('logout');  // 向父組件傳送 logout 事件
        this.$router.push({ path: '/login' });
        this.showAccountMenu = false;
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


<style >
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000; 
  background-color: white; /* header背景色 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

nav {
  display: flex;           
  justify-content: space-between;  /* 保證 nav 的內容居中 */
  align-items: center;
  width: 100%; 
  position: relative;
}
/* 漢堡圖標樣式 */
.hamburger {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 25px;
  cursor: pointer;
  margin-left: 3%;
}

.hamburger .bar {
  height: 3px;
  width: 100%;
  background-color: black;
}
/* 側邊菜單關閉樣式 */
.close-btn {
  position: absolute;
  top: 50px;
  right: 50px;
  font-size: 24px;
  color: white;
  cursor: pointer;
}
/* 側邊菜單樣式 */
.nav-menu {
  position: fixed;
  top: 0;
  left: 0;
  transform: translateX(-100%); /* 初始在視窗外 */
  transition: transform 0.3s ease; /* 平滑過渡效果 */
  height: 100%;
  width: 250px;
  background: linear-gradient(135deg, #1a1a1a, #4d4d4d);/*使用漸變色*/ 
  display: flex;
  flex-direction: column;
  padding-top: 120px;
  padding-left: 20px;
  
}
.nav-menu.show {
  transform: translateX(0px); /* 菜單滑入視窗 */
}
.nav-menu span {
  font-family: 'Arial', sans-serif; /* 菜單字體 */
  font-size: 26px; /* 字體大小 */
  font-weight: bold; /* 粗字體 */
  color: white; /* 字體顏色 */
  padding: 20px 0; /* 上下內邊距 */
  display: block;
  text-decoration: none;
  letter-spacing: 1px; /* 字母間距 */
  line-height: 1.6; 
  text-align: left; /* 文字至左 */
  cursor: pointer;
  opacity: 0; /* 初始透明 */
  transform: translateY(100px); /* 初始位置在下方 */
  transition: transform 0.8s ease, opacity 0.8s ease; /* 過渡效果 */
}
/* 當菜單打開時，菜單項目滑動到原來位置 */
.nav-menu.show span {
  transform: translateY(0); /* 移動到原本位置 */
  opacity: 1; /* 變得可見 */
}
.nav-menu span:hover {
  color: #00aaff; /* 當滑鼠懸停時變為淺藍色 */
}
.logo{
  position: absolute;
  left: 50%;
  transform: translateX(-50%); /* 保證 logo 完全在中間 */
}
.logo img {
  transform: scale(1.5); /* 將 logo 放大 1.5 倍 */
  transform-origin: center;
  height: 75px;
}

.search-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%; 
  margin: 20px 0; /* 控制上下間距 */
}

.search-bar input {
  width: 90%; 
  padding: 12px;
  border: 1px solid #ffffff;
  border-radius: 4px;
  font-size: 12px;
  background-color: #ffffff; /* 搜索欄背景色 */
}
.nav-icons {
  position: relative; /* 讓帳戶選單跟隨圖標 */
  display: flex;
  justify-content: flex-end;
  margin-right:50px;
}

.user-icons, .cart-icon , .store-icon{
  cursor: pointer;
  display: flex;
  align-items: center;
  margin: 30px;
}

.nav-icons img {
  height: 30px;
  cursor: pointer;
}



/* 下拉選單樣式 */
.account-menu {
  position: absolute;
  top: 80%; /* 在圖標下方 */
  left: 0; /* 與圖標左對齊 */
  transform: translateX(-20%);
  background-color: white;
  border: 1px solid #ddd;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-radius: 4px;
  width: 150px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
}

.store-menu{
  position: absolute;
  top: 80%; /* 在圖標下方 */
  left: 0; /* 與圖標左對齊 */
  transform: translateX(40%);
  background-color: white;
  border: 1px solid #ddd;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  border-radius: 4px;
  width: 150px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
}

.menu-options {
  display: flex;
  flex-direction: column;
}

.menu-options a {
  padding: 10px;
  text-decoration: none;
  color: #333;
  border-bottom: 1px solid #ddd;
}

.menu-options a:hover {
  background-color: #f4f4f4;
}
/* 增加分隔樣式 */
.user-info {
  padding: 10px;
  font-weight: bold;
  background-color: #f9f9f9;
  border-bottom: 1px solid #ddd;
}

.logout {
  padding: 10px;
  color: red;
  cursor: pointer;
}

.logout:hover {
  background-color: #ffdddd;
}
</style>
