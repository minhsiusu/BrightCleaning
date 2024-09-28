<template>
  <div class="product-purchasing">
    <div class="product-image">
      <img :src="product.image" :alt="product.name" />
    </div>
    <div class="product-info">
      <h1>{{ product.name }}</h1>
      <p class="stock-info">庫存：{{ product.stock }} 件</p>
      <p class="price">{{ product.price }} 元</p>
      <div class="quantity-control">
        <button @click="decreaseQuantity">-</button>
        <input type="number" v-model.number="product.quantity" :min="1" :max="product.stock" @input="checkQuantity" />
        <button @click="increaseQuantity">+</button>
      </div>
      <div class="buttons">
        <button class="add-to-cart" @click="addToCart">加入購物車</button>
      </div>
      <p class="category-info">分類：{{ product.category }}</p>
      <div class="product-description">
        <h2>商品資訊</h2>
        <p>這是產品的描述信息...</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductPurchasing',
  data() {
    return {
      product: {
        name: '',
        image: '',
        quantity: 1,
        price: 0,
        stock: 0,
        category: ''
      }
    };
  },
  mounted() {
    this.loadProductData();
  },
  methods: {
    loadProductData() {
      const productId = this.$route.params.productId;
      const products = [
        {
          id: 1,
          name: '除水垢商品1',
          image: '/image/Product/Descaling/Sample.jpg',
          quantity: 1,
          stock: 10,
          price: 100,
          category: '除水垢'
        },
        {
          id: 2,
          name: '除水垢商品2',
          image: '/image/Product/Descaling/Sample02.jpg',
          quantity: 1,
          stock: 20,
          price: 200,
          category: '除水垢'
        },
        {
          id: 3,
          name: '除水垢商品3',
          image: '/image/Product/Descaling/Sample.jpg',
          quantity: 1,
          stock: 15,
          price: 150,
          category: '除水垢'
        },
        {
          id: 4,
          name: '浴廁拋光商品1',
          image: '/image/Product/Polishing/Sample.jpg',
          quantity: 1,
          stock: 10,
          price: 100,
          category: '浴廁拋光'
        },
        {
          id: 5,
          name: '浴廁拋光商品2',
          image: '/image/Product/Polishing/Sample.jpg',
          quantity: 1,
          stock: 20,
          price: 150,
          category: '浴廁拋光'
        },
        {
          id: 6,
          name: '浴廁拋光商品3',
          image: '/image/Product/FloorCleaning/Sample.jpg',
          quantity: 1,
          stock: 15,
          price: 200,
          category: '浴廁拋光'
        },
        {
          id: 7,
          name: '地板清潔商品1',
          image: '/image/Product/FloorCleaning/Sample.jpg',
          quantity: 1,
          stock: 10,
          price: 100,
          category: '地板清潔'
        },
        {
          id: 8,
          name: '地板清潔商品2',
          image: '/image/Product/FloorCleaning/Sample.jpg',
          quantity: 1,
          stock: 20,
          price: 150,
          category: '地板清潔'
        },
        {
          id: 9,
          name: '地板清潔商品3',
          image: '/image/Product/FloorCleaning/Sample.jpg',
          quantity: 1,
          stock: 15,
          price: 200,
          category: '地板清潔'
        }
      ];
      this.product = products.find(p => p.id === parseInt(productId));
    },
    addToCart() {
      this.$emit('update-cart-item-count', this.product.quantity);
      alert('商品已加入購物車！');
    },
    decreaseQuantity() {
      if (this.product.quantity > 1) {
        this.product.quantity--;
      }
    },
    increaseQuantity() {
      if (this.product.quantity < this.product.stock) {
        this.product.quantity++;
      }
    },
    checkQuantity() {
      if (this.product.quantity > this.product.stock) {
        this.product.quantity = this.product.stock;
      } else if (this.product.quantity < 1) {
        this.product.quantity = 1;
      }
    }
  }
};
</script>

<style scoped>
.product-purchasing {
  width: 100%;
  height: 500px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin-top: 8%;
}

.product-image {
  width: 300px;
  margin-right: 100px;
}

.product-image img {
  max-width: 100%;
  height: auto;
}

.product-info {
  max-width: 400px;
}

.product-info h1 {
  font-size: 28px;
  margin-bottom: 10px;
}

.stock-info {
  color: #888;
  margin-bottom: 10px;
}

.price {
  font-size: 32px;
  color: #ff5722;
  font-weight: bold;
  margin-bottom: 20px;
}

.quantity-control {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.quantity-control button {
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  padding: 5px 10px;
  cursor: pointer;
}

.quantity-control input {
  width: 50px;
  text-align: center;
  margin: 0 10px;
}

.add-to-cart {
  padding: 10px 20px;
  background-color: #ff5722;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

.add-to-cart:hover {
  background-color: #e64a19;
}

.category-info {
  margin-top: 10px;
  color: #888;
}

.product-description {
  margin-top: 20px;
}

.product-description h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.product-description p {
  font-size: 16px;
  line-height: 1.5;
  color: #666;
}
</style>
