import { createRouter, createWebHistory } from 'vue-router';
import Portfolio from '@/components/Portfolio.vue';
import HomePage from '@/components/HomePage.vue';
import Questionnaire from '@/components/Questionnaire.vue';
import ProductIntroduction from '@/components/ProductIntroduction.vue';
import ProductPurchasing from '@/components/ProductPurchasing.vue';
import Cart from '@/components/Cart.vue';
import Login from '@/components/Login.vue';
import ForgotPassword from '@/components/ForgotPassword.vue';
import Register from '@/components/Register.vue';
import Checkout from '@/components/Checkout.vue';
const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage
    },
    {
        path: '/Portfolio',
        name: 'Portfolio',
        component: Portfolio
    },
    {
        path: '/questionnaire',
        name: 'Questionnaire',
        component: Questionnaire
    },
    {
        path: '/product-introduction/:category',
        name: 'ProductIntroduction',
        component: ProductIntroduction
    },
    {   path: '/product-purchasing/:productId',
        name: 'ProductPurchasing',
        component: ProductPurchasing
    },
    {
        path: '/cart',
        name: 'Cart',
        component: Cart,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/forgot-password',
        name: 'ForgotPassword',
        component: ForgotPassword
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
    },
    {
        path: '/checkout',
        name: 'Checkout',
        component: Checkout,
    },

   
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      } else {
        return { top: 0 }; // 滾動到頁面頂部
      }
    }
});

export default router;
