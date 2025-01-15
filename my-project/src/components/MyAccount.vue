<template>
    <div class="wrapper">
        <div class="myAccount-container">
            <!-- 左側菜單 -->
            <div class="myAccount-left">
                <div class="user-profile">
                    <p class="user-name">{{ userAccount }}</p>
                </div>
                <ul class="menu-list">
                    <li
                        v-for="(menu, index) in menuList"
                        :key="index"
                        :class="{ active: selectedMenu === index }"
                        @click="selectMenu(index)"
                    >
                        <i :class="menu.icon"></i>
                        <span>{{ menu.text }}</span>
                    </li>
                </ul>
            </div>

            <!-- 右側內容 -->
            <div class="myAccount-right">
                <!-- 會員資訊 -->
                <div v-if="selectedMenu === 0">
                    <h2>會員資訊</h2>
                        <template v-if="!isEditing">
                            <p>名稱：{{ userName }}</p>
                            <p>郵箱：{{ email }}</p>
                            <p>地址：{{ address }}</p>
                            <p>手機：{{ cellphone }}</p>
                            <button @click="startEditing" class="edit-button">編輯資訊</button>
                        </template>
                        <template v-else>
                            <form @submit.prevent="updateUserInfo">
                                <label>
                                    名稱：
                                    <input type="text" v-model="formData.name" required />
                                </label>
                                <label>
                                    地址：
                                    <input type="text" v-model="formData.address" required />
                                </label>
                                <label>
                                    手機：
                                    <input type="text" v-model="formData.cellphone" required />
                                </label>
                                <button type="submit" class="save-button">保存</button>
                                <button @click="cancelEditing" class="cancel-button">取消</button>
                            </form>
                        </template>
                </div>

                <!-- 購物紀錄 -->
                <div v-else-if="selectedMenu === 1">
                    <h2>購物紀錄</h2>
                    <div v-if="orders.length === 0">
                        <p>目前沒有任何購物紀錄。</p>
                    </div>
                    <div v-else>
                        <div v-for="order in orders" :key="order.id" class="order-card">
                            <h3>訂單編號：{{ order.id }}</h3>
                            <p>建立日期：{{ order.createdAt }}</p>
                            <p>支付狀態：{{ order.status }}</p>
                            <p>總金額：${{ order.totalPrice }}</p>
                            <div v-if="selectedOrderItems[order.id]">
                                <h4>商品清單</h4>
                                <ul>
                                    <li v-for="item in selectedOrderItems[order.id]" :key="item.id">
                                        <p>商品名稱：{{ item.productName }}</p>
                                        <p>數量：{{ item.quantity }}</p>
                                        <p>單價：${{ item.price }}</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "../service/axios";

export default {
    name: "MyAccount",
    props: {
        isLoggedIn: {
            type: Boolean,
            default: false,
        },
        userId: {
            type: String,
            required: true
        },
        userName: {
            type: String,
            default: ""
        },
        userAccount: {
            type: String,
            default: ""
        },
        email: {
            type: String,
            default: ""
        },
        address: {
            type: String,
            default: ""
        },
        cellphone: {
            type: String,
            default: ""
        },
    },
    data() {
        return {
            menuList: [
                { text: "會員資訊", icon: "fas fa-user" },
                { text: "購物紀錄", icon: "fas fa-shopping-cart" },
            ],
            selectedMenu: 0, // 預設顯示會員資訊
            isEditing: false, // 控制是否進入編輯模式
            formData: {
                name: this.userName,
                email: this.email,
                address: this.address,
                cellphone: this.cellphone,
                userAccount: this.userAccount,
            },
            orders: [], // 存放用戶訂單
            selectedOrderItems: {}, // 每個訂單的商品細節
        };
    },
    watch: {
        userId(newVal) {
            console.log("userId 更新為:", newVal);
            if (newVal) {
                this.fetchOrders(); // 當 userId 更新時加載訂單
            }
        },
        userName(newVal) {
            this.formData.name = newVal;
        },
        userAccount(newVal) {
            this.formData.userAccount = newVal;
        },
        email(newVal) {
            this.formData.email = newVal;
        },
        address(newVal) {
            this.formData.address = newVal;
        },
        cellphone(newVal) {
            this.formData.cellphone = newVal;
        },
    },
    mounted() {
        this.fetchOrders(); // 頁面加載時獲取訂單
    },
    methods: {
        // 切換菜單
        selectMenu(index) {
            this.selectedMenu = index;
        },
        // 開始編輯
        startEditing() {
            this.isEditing = true;
        },
        // 取消編輯
        cancelEditing() {
            this.isEditing = false;
            this.formData = {
                name: this.userName,
                address: this.address,
                cellphone: this.cellphone,
            };
        },
        // 提交更新
        async updateUserInfo() {
            try {
                console.log("提交的表單數據：", {
                    name: this.formData.name,
                    address: this.formData.address,
                    cellphone: this.formData.cellphone,
                });
                const response = await axios.put(`/user/update`, {
                    name: this.formData.name,
                    address: this.formData.address,
                    cellphone: this.formData.cellphone,
                });
                console.log("更新成功：", response.data);

                 // 通知父組件更新數據
                this.$emit("user-updated", {
                    name: this.formData.name,
                    address: this.formData.address,
                    cellphone: this.formData.cellphone,
                    email: this.formData.email,
                    userAccount: this.userAccount,
                });
                this.isEditing = false;
            } catch (error) {
                console.error("更新失敗：", error);
                alert("更新失敗，請稍後再試。");
            }
        },
        // 獲取用戶所有訂單
        async fetchOrders() {
            try {
                if (!this.userId) {
                    console.error("userId 未提供，無法發送請求。");
                    return;
                }
                const response = await axios.get(`/orders/user/${this.userId}`);

                 // 過濾僅狀態為 "paid" 的訂單
                this.orders = response.data.filter(order => order.status === "paid");

                // 為每個訂單加載商品數據
                for (const order of this.orders) {
                    await this.getOrderItems(order.id);
                }
            } catch (error) {
                console.error("無法獲取訂單：", error);
            }
        },
        // 獲取某訂單的商品
        async getOrderItems(orderId) {
            try {
                const response = await axios.get(`/order-items/order/${orderId}`);
                this.selectedOrderItems[orderId] = response.data; // 直接更新對象
                console.log("訂單商品：", this.selectedOrderItems[orderId]);
            } catch (error) {
                console.error("無法獲取訂單商品：", error);
            }
        },
    },
};
</script>

<style scoped>
/* 會員專區樣式 */
.wrapper {
    background-color: #f3f4f6;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
