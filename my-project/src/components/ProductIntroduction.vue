<template>
    <div class="product-introduction">
      <h2>{{ pageTitle }}</h2>
      <div class="container">
        <div class="sidebar">
          <h3>商品分類</h3>
          <ul>
            <li v-for="category in categories" :key="category.name">
              <router-link :to="category.path">{{ category.name }}</router-link>
            </li>
          </ul>
        </div>
        <div class="main-content">
          <div class="product-hot-zone">
            <h3>商品熱銷區（不分種類）</h3>
            <!-- 這裡可以放置一些熱銷商品的展示內容 -->
          </div>
          <div class="product-gif">
            <h3>{{ pageTitle }}專區</h3>
            <!-- 這裡可以放置一些商品展示的GIF內容 -->
          </div>
          <div class="product-items">
            <div v-for="item in paginatedProducts" :key="item.id" class="product-item">
              <div class="product-image-container">
                <img :src="item.image" :alt="item.name" />
              </div>
              <div class="product-information">
                <p>{{ item.name }}</p>
                <p>數量：{{ item.quantity }}</p>
                <p class="price">價格：{{ item.price }} 元</p>
                <button class="add-to-cart-button" @click="goToProductPage(item.id)">
                  加入購物車
                </button>
              </div>
            </div>
          </div>
                  <!-- 分頁按鈕 -->
          <div class="pagination">
            <button @click="currentPage--" :disabled="currentPage === 1">上一頁</button>
            <button v-for="page in totalPages" :key="page" :class="{'active': page === currentPage}" @click="currentPage = page">{{ page }}</button>
            <button @click="currentPage++" :disabled="currentPage === totalPages">下一頁</button>
          </div>
        </div>

      </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  name: 'ProductIntroduction',
  setup() {
    const router = useRouter();

    const goToProductPage = (productId) => {
      router.push({ name: 'ProductPurchasing', params: { productId } });
    };
    return {
      goToProductPage,
    };
  },
  data() {
    return {
      categories: [
        { name: '除水垢', path: '/product-introduction/descaling' },
        { name: '浴廁拋光', path: '/product-introduction/polishing' },
        { name: '地板清潔', path: '/product-introduction/floor-cleaning' },
      ],
      productItems: [], // 存儲所有商品的數據
      pageTitle: '',
      currentPage: 1, // 當前頁數
      itemsPerPage: 3, // 每頁顯示的商品數量
    };
  },
  watch: {
    '$route.params.category': 'loadCategoryData',
  },
  mounted() {
    this.loadCategoryData();
  },
  computed: {
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.productItems.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.productItems.length / this.itemsPerPage);
    }
  },
  methods: {
    loadCategoryData() {
      const category = this.$route.params.category;
      if (category === 'descaling') {
        this.pageTitle = '除水垢商品';
        this.productItems = [
          { id: 1, name: '除水垢商品1', image: '/image/Product/Descaling/Sample.jpg', quantity: 10, price: 100 },
          { id: 2, name: '除水垢商品2', image: '/image/Product/Descaling/Sample02.jpg', quantity: 20, price: 150 },
          { id: 3, name: '除水垢商品3', image: '/image/Product/Descaling/Sample.jpg', quantity: 15, price: 200 },
          { id: 4, name: '除水垢商品4', image: '/image/Product/Descaling/Sample.jpg', quantity: 10, price: 100 },
          { id: 5, name: '除水垢商品5', image: '/image/Product/Descaling/Sample02.jpg', quantity: 20, price: 150 },
          { id: 6, name: '除水垢商品6', image: '/image/Product/Descaling/Sample.jpg', quantity: 15, price: 200 },
        ];
      } else if (category === 'polishing') {
        this.pageTitle = '浴廁拋光商品';
        this.productItems = [
          { id: 4, name: '浴廁拋光商品1', image: '/image/Product/Polishing/Sample.jpg', quantity: 10, price: 100 },
          { id: 5, name: '浴廁拋光商品2', image: '/image/Product/Polishing/Sample.jpg', quantity: 20, price: 150 },
          { id: 6, name: '浴廁拋光商品3', image: '/image/Product/Polishing/Sample.jpg', quantity: 15, price: 200 },
        ];
      } else if (category === 'floor-cleaning') {
        this.pageTitle = '地板清潔商品';
        this.productItems = [
          { id: 7, name: '地板清潔商品1', image: '/image/Product/FloorCleaning/Sample.jpg', quantity: 10, price: 100 },
          { id: 8, name: '地板清潔商品2', image: '/image/Product/FloorCleaning/Sample.jpg', quantity: 20, price: 150 },
          { id: 9, name: '地板清潔商品3', image: '/image/Product/FloorCleaning/Sample.jpg', quantity: 15, price: 200 },
        ];
      }
    },
  },
};
</script>

<style scoped>
.product-introduction {
  font-family: Arial, sans-serif;
  padding: 20px;
  margin-top: 100px;
}

.product-introduction h2 {
  text-align: center;
  margin-bottom: 20px;
}

.container {
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 20px;
}

.sidebar {
  width: 200px;
  padding: 20px;
}

.sidebar h3 {
  margin-bottom: 10px;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar ul li {
  margin-bottom: 20px;
}

.sidebar ul li a {
  text-decoration: none;
  color: black;
}

.main-content {
  flex: 1;
  padding: 20px;
}

.product-hot-zone,
.product-gif {
  margin-bottom: 20px;
}

.product-items {
  display: flex;
  flex-wrap: wrap;
}

.product-item {
  width: 500px;
  margin: 10px;
  text-align: center;
  position: relative;
}

.product-item img {
  max-width: 300px;
  height: auto;
}

.product-item:hover {
  cursor: pointer;
}
.product-information{
  padding: 15px;
}
.price {
  font-weight: bold;
  margin-bottom: 10px;
}

.add-to-cart-button {
  padding: 10px 20px;
  background-color: #ff5722;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 14px;
  margin-bottom: 10px;
}

.add-to-cart-button:hover {
  background-color: #e64a19;
}
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  padding-right: 150px;
}

.pagination button {
  background-color: #f1f1f1;
  color: #333;
  border: 1px solid #ddd;
  padding: 10px 15px;
  margin: 0 5px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;
}

.pagination button.active {
  background-color: #007bff;
  color: white;
}

.pagination button:hover:not(.active) {
  background-color: #e2e6ea;
}

.pagination button:disabled {
  background-color: #dcdcdc;
  cursor: not-allowed;
}
</style>
