<template>

  <!-- Swiper 輪播區塊 -->
  <swiper
      :cssMode="true"
      :navigation="true"
      :pagination="true"
      :mousewheel="true"
      :keyboard="true"
      :autoplay="{ delay: 3000, disableOnInteraction: false }"
      :modules="modules"
      class="ADSwiper"
    >
  <SwiperSlide v-for="(slide, index) in slides" :key="index">
    <div class="AD-slide-content">
      <img :src="slide.image" :alt="slide.altText" />
    </div>
  </SwiperSlide>
  </swiper>
  <div class="category-menu">
    <ul>
      <li v-for="category in categories" :key="category.name" :class="{ active: category.path === $route.path }">
        <router-link :to="category.path">{{ category.name }}</router-link>
      </li>
    </ul>
  </div>

  <div class="product-introduction">
    <div class="container">
      <div class="main-content">
        <!-- 商品列表 -->
        <div class="product-items">
          <div v-for="product in paginatedProducts" :key="product.id" class="product-item">
            <div class="product-image-container">
              <img :src="`/image/Product/${product.type}/${product.picture}`" :alt=" product.name " />
            </div>
            <div class="product-information">
              <h4>名稱: {{ product.name }}</h4>
              <p>數量：{{ product.count }}</p>
              <p>價格：{{ product.price }} 元</p>
              <p>id:{{ product.id}}</p>
              <button class="go-to-purchasing-button" @click=" goTOPurchasingPage(product.id)">
                購買商品
              </button>
            </div>
          </div>
        </div>

        <!-- 分頁按鈕 -->
        <div class="pagination">
          <button @click="currentPage > 1 ? currentPage-- : null" :disabled="currentPage === 1">上一頁</button>
          <button v-for="page in totalPages" :key="page" :class="{ 'active': page === currentPage }" @click="currentPage = page">{{ page }}</button>
          <button @click="currentPage < totalPages ? currentPage++ : null" :disabled="currentPage === totalPages">下一頁</button>
        </div>
      </div>
      <!-- 熱銷商品展示區 -->
      <div class="product-hot-zone">
        <h3>商品熱銷區（不分種類）</h3>
          <!-- Swiper 輪播區塊 -->
        <swiper
          :modules="modules"
          :slidesPerView="3"
          :centeredSlides="true"
          :spaceBetween="30"
          :pagination="{
            type: 'fraction',
          }"
          :cssMode="true"
          :navigation="true"
          :mousewheel="true"
          :keyboard="true"
          :autoplay="{ delay: 3000, disableOnInteraction: false }" 
          class=".product-hot-Swiper"
        >
        <SwiperSlide v-for=" hotProduct in hotProducts" :key="hotProduct.id">
          <div class="product-hot-slide-content">
            <img :src="`/image/Product/${hotProduct.type}/${hotProduct.picture}`" :alt="hotProduct.name" />
              <h4>{{ hotProduct.name }}</h4>
              <p>價格：{{ hotProduct.price }} 元</p>
              <p>銷量：{{ hotProduct.sales }}</p>
              <button class="go-to-purchasing-button" @click=" goTOPurchasingPage(hotProduct.id)">
                購買商品
              </button>
          </div>
        </SwiperSlide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../service/axios';
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard ,Autoplay } from 'swiper/modules';
export default {
  name: 'ProductIntroduction',
  emits: ['userUpdated'],
  data() {
    return {
      showSuccessPopup: false, // 控制彈窗顯示的狀態
      slides: [
        {
          image: '/image/Publicity/Advertise01.jpg',
        },
        {
          image: '/image/Publicity/Advertise02.jpg',
        },
        {
          image: '/image/Publicity/Advertise03.jpg',
          altText: '廣告03',
        }
      ],
      // 商品分類
      categories: [
        { name: '除水垢', path: '/product-introduction/descaling' },
        { name: '浴廁拋光', path: '/product-introduction/polishing' },
        { name: '地板清潔', path: '/product-introduction/floorcleaning' },
      ],

      filteredProducts: [], // 篩選後端所有的商品數據
      hotProducts:[],
      currentCategory: '',  // 當前的商品分類

      pageTitle: '', // 頁面標題
      currentPage: 1, // 當前頁數
      itemsPerPage: 6, // 每頁顯示的商品數量
    };
  },

  computed: {
    // 分頁計算屬性
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.filteredProducts.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.filteredProducts.length / this.itemsPerPage); //用來將數字向上取整，將一個數字四捨五入到最接近的較大整數
    }
  },

  watch: {
    // 監聽路由變化
    '$route.params.category': 'fetchAndFilterProducts',
  },

  mounted() {
    this.fetchAndFilterProducts();  // 獲取所有商品
    this.fetchHotProducts();
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
      return {
        modules: [Navigation, Pagination, Mousewheel, Keyboard, Autoplay ],
      };
  },
  methods: {
    async fetchHotProducts(){
      try{
        // 向後端發送請求，獲取熱門商品
        const response = await axios.get('/product/getsalses')
        // 假設返回的數據是數組，且按銷量從高到低排序
        const allProducts = response.data;
        // 抓取熱銷前5名
        this.hotProducts = allProducts.slice(0, 5);
      }catch (error){
        console.error('獲取商品數據失敗:', error);
        alert('無法加載商品數據，請稍後重試');
      }
    },
    async fetchAndFilterProducts() {
      try {
        // 從路由中獲取當前分類
        const category = this.$route.params.category.toLowerCase();
        this.currentCategory = category;
        this.currentPage = 1; // 重置當前頁數

        // 向後端發送請求，根據分類獲取商品
        const response = await axios.get('http://localhost:8070/product/gettype', {
          params: { type: category },
        });

        // 將後端返回的商品數據存入 filteredProducts
        this.filteredProducts = response.data;
        console.log('篩選後的商品:', this.filteredProducts);

        // 更新頁面標題
        const titles = {
          descaling: '除水垢',
          polishing: '浴廁拋光',
          floorcleaning: '地板清潔',
        };

        this.pageTitle = titles[category] || '未知分類';
      } catch (error) {
        console.error('獲取商品數據失敗:', error);
        alert('無法加載商品數據，請稍後重試');
      }
  },
    //進入購物頁面
    goTOPurchasingPage(productId) {
      const findProduct = this.filteredProducts.find(item => item.id === productId)
                        || this.hotProducts.find(item => item.id === productId);
      // 檢查是否選擇了商品
      if (!findProduct) {
        console.log('檢查', findProduct);
        alert('請選擇商品');
        return;
      }
       // 跳轉到購買頁面
      this.$router.push(`/product-purchasing/${this.currentCategory}/${findProduct.id}`);
    }
  }
};
</script>


