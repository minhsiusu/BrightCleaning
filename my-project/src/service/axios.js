import axios from 'axios';
import router from '../router';

// 創建 Axios 實例
const instance = axios.create({
    // 開啟 Cookie 支持
    withCredentials: true,
    // 設定 API 基本路徑
    baseURL: 'http://localhost:8070',
});

// 響應攔截器：處理 401 錯誤，並執行登出操作
instance.interceptors.response.use(
    response => response,
    error => {
    // 如果是 401 錯誤，表示 JWT 已失效
        if (error.response && error.response.status === 401) {
            const requestUrl = error.config.url;
            // 檢查api是否是忘記密碼或重設密碼的請求（這些是用於 Token 驗證的請求）
            if(!requestUrl.include('/forget') && !requestUrl.include('/register/initiate') ){
                // 清除 cookie 中的 JWT，這裡清除 mailtoken
                clearCookie('mailtoken');
                console.log("失敗");
                // 跳轉到首頁並顯示登出提示
                router.push({ name: 'HomePage' });
            }
        }
        return Promise.reject(error);
    }
);
// 清除 Cookie 方法
function clearCookie(name) {
    document.cookie = `${name}=; Max-Age=-99999999;`;  // 設置過期時間為過去，刪除 cookie
}
export default instance;