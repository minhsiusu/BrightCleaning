import { createRouter, createWebHistory } from 'vue-router';
// import store from '@/store/store';
import Portfolio from '@/components/Portfolio.vue';
import HomePage from '@/components/HomePage.vue';
import Questionnaire from '@/components/Questionnaire.vue';
import ProductIntroduction from '@/components/ProductIntroduction.vue';
import ProductPurchasing from '@/components/ProductPurchasing.vue';
import Cart from '@/components/Cart.vue';
import Login from '@/components/Login.vue';
import Reset from '@/components/Reset.vue';
import ForgotPassword from '@/components/ForgotPassword.vue';
import Register from '@/components/Register.vue';
import RegisterComfirm from '@/components/RegisterComfirm.vue';
import Checkout from '@/components/Checkout.vue';
import CheckoutSuccess from '@/components/CheckoutSuccess.vue';
import MyAccount from '@/components/MyAccount.vue';
const routes = [
    {
        path: '/',
        name: 'HomePage',
        component: HomePage,
        // 首頁麵包屑
        meta: { breadcrumb: '首頁' },
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
        component: ProductIntroduction,
        //產品介紹麵包屑
        meta: {
            breadcrumb: route =>`產品介紹 - ${route.params.category || '所有產品'}`,
        },
    },
    {   path: '/product-purchasing/:category/:productId',
        name: 'ProductPurchasing',
        component: ProductPurchasing,
        meta: {
            breadcrumb: route => `產品購買 - ${route.params.productId || '商品'}`, 
        }
    },
    {
        path: '/cart',
        name: 'Cart',
        component: Cart,
        // 需要登入
        meta: { requiresAuth: true },
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/reset',
        name: 'Reset',
        component: Reset,
    },
    {
        path: '/forgot-password',
        name: 'ForgotPassword',
        component: ForgotPassword,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
    },
    {
        path: '/register-comfirm',
        name: 'RegisterComfirm',
        component: RegisterComfirm,
    },
    {
        path: '/checkout',
        name: 'Checkout',
        component: Checkout,
        // 設定這個路由使用沒有 `header` 和 `footer` 的佈局
        meta: {
            // 需要登入
            requiresAuth: true,
            layout: 'none',
        }
    },
    {
        path: '/checkout/success',
        name: 'CheckoutSuccess',
        component: CheckoutSuccess,
        meta: {
            requiresAuth: true, // 確保只有登入用戶才能訪問
            layout: 'none', // 不需要 header 和 footer
        },
    },
    {
        path: '/MyAccount',
        name: 'MyAccount',
        component: MyAccount,
        meta: {
            requiresAuth: true, // 確保只有登入用戶才能訪問
        },
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { top: 0 }; // 滾動到頁面頂部
        }
    }
});
// // 路由守衛
// router.beforeEach((to,from,next) =>{
//     // 目標路由需要登入
//     // 檢視目標路由物件內容, 找到登入狀態
//     if(to.matched.some(record => record.meta.requiresAuth)){
//         const isLoggedIn = store.state.isAuthenticated || false;
//         if (!isLoggedIn) {
//             // 未登入，重定向到登入頁面
//             next({ name: 'Login'});
//         } else {
//             // 已登入，繼續導航
//             next();
//         }
//     }else{
//         // 不需要驗證，繼續導航
//         next();
//     }
// });


export default router;
