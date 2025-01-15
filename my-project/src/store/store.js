import { createStore } from 'vuex';
import axios from '../service/axios';

const store = createStore({
    state: {
        isLoggedIn: false,
        userAccount: '',
        userEmail: '',
        cartItemCount: '',
        cartItems: [],
    },
    mutations: {
        setAuthentication(state, payload) {
            state.isLoggedIn = payload.isLoggedIn;
            state.userAccount = payload.account || '';
            state.userEmail = payload.email || '';
        },
        setCartItemCount(state, count) {
            console.log('更新購物車數量:', count);
            state.cartItemCount = count;
            console.log('更新購物車數量:', state.cartItemCount);
        },
        setCartItems(state, items) {
            state.cartItems = items;
        },
        removeCartItem(state, id) {
            state.cartItems = state.cartItems.filter(item => item.id !== id);
        },
        clearCart(state) {
            state.cartItems = [];
        },
        logout(state) {
            state.isLoggedIn = false;
            state.userAccount = '';
            state.userEmail = '';
            state.cartItemCount = 0;
        },
    },
    actions: {
        async updateCartItemCount({ commit }) {
            try {
                const response = await axios.get('/cart/');
                const cartQuantity = response.data.cartItems.length;
                commit('setCartItemCount', cartQuantity);
            } catch (error) {
                console.error('無法更新購物車數量:', error);
            }
        },
        // 檢查使用者的登入狀態
        async checkUserSession({ commit , dispatch}) {
            try {
                const response = await axios.get('/user/session');
                if (response.data.isLoggedIn) {
                    commit('setAuthentication', {
                        isLoggedIn: true,
                        account: response.data.account,
                        email: response.data.email,
                    });
                    await dispatch('updateCartItemCount');
                }
            } catch (error) {
                console.error('無法確認登入狀態:', error);
            }
        },

        // 登出
        logout({ commit }) {
            return axios.post('/user/logout')
                .then(() => {
                    commit('logout');
                    window.location.href = '/login';
                })
                .catch(error => {
                    console.error('登出失敗:', error);
                });
        },
        // 登入
        async login({ commit }, userData) {
            try {
                const response = await axios.post('/user/login', userData);
                if (response.data) {
                    commit('setAuthentication', {
                        isLoggedIn: true,
                        account: response.data.account,
                        email: response.data.email,
                    });
                } else {
                    throw new Error(response.data.message || '登入失敗');
                }
            } catch (error) {
                console.error('登入失敗:', error);
                throw error;
            }
        },
        async fetchCartItems({ commit }) {
            try {
                const response = await axios.get('/cart/');
                commit('setCartItems', response.data.cartItems || []);
            } catch (error) {
                console.error('無法加載購物車數據:', error);
            }
            },
        async addToCart({ dispatch }, payload) {
            try {
                await axios.put('/cart/add', payload);
                await dispatch('fetchCartItems'); // 更新購物車內容
            } catch (error) {
                console.error('加入購物車失敗:', error);
                throw error;
            }
        },
        async removeCartItem({ commit }, id) {
            try {
                await axios.delete(`/cartItem/${id}`);
                commit('removeCartItem', id);
            } catch (error) {
                console.error('刪除商品失敗:', error);
                throw error;
            }
        },
        async clearAllCartItems({ commit }) {
            try {
                await axios.delete('/cartItem/deleteall');
                commit('clearCart');
            } catch (error) {
                console.error('清空購物車失敗:', error);
                throw error;
            }
        },
    },
});

export default store;
