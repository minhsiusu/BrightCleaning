<template>
    <div class="checkout-success">
        <h2>交易成功</h2>
        <p>您的訂單已成功建立！</p>
        <p>訂單編號：{{ orderId }}</p>
        <button @click="goToHome">返回首頁</button>
    </div>
</template>

<script>
import axios from '../service/axios';
import eventBus from '../eventBus.js';//使用事件總線監聽各個事件
export default {
    data() {
        return {
            orderId: null,
        };
    },
    mounted() {
        this.orderId = this.$route.query.orderId;
        console.log('成功支付的訂單 ID:', this.orderId);

        this.updateOrderAndClearCart();
    },
    methods: {
        goToHome() {
            this.$router.push('/');
        },
        async updateOrderAndClearCart() {
            try {
                const payload = {
                    orderId: this.orderId,
                    status: 'paid', // 設定為已支付
                };

                // 調用後端接口更新訂單狀態
                const response = await axios.post('/orders/update_status', payload);
                console.log('訂單狀態更新成功:', response.data);
                // 觸發購物車數量更新事件
                eventBus.emit('updateCartCount');
                // 顯示成功消息（可選）
                alert('訂單狀態更新成功，購物車已清空');
            } catch (error) {
                console.error('更新訂單狀態失敗:', error.response?.data || error.message);
                alert('更新訂單狀態失敗，請稍後再試');
            }
        },
    },
};
</script>

<style scoped>
.checkout-success {
    text-align: center;
    padding: 50px;
}

.checkout-success h1 {
    color: #4CAF50;
}

.checkout-success button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
}

.checkout-success button:hover {
    background-color: #45A049;
}
</style>