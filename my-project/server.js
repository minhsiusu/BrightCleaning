// // 載入 Express 和 MySQL 模組
// const express = require('express');
// const mysql = require('mysql');
// const cors = require('cors'); // 載入 CORS
// const app = express();
// const port = 3000;

// // 啟用 CORS
// app.use(cors());

// // 啟用 express.json 來解析 JSON 請求
// app.use(express.json());

// // 設置 MySQL 連接
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',  // 通常是 'root'
//     password: 'KabutoRXW20',  // 你在安裝MySQL時設置的密碼
//     database: 'test'  // 你想要連接的資料庫
// });

// // 連接到 MySQL
// connection.connect(err => {
//     if (err) {
//         console.error('Error connecting to MySQL:', err.stack);
//         return;
//     }
//     console.log('Connected to MySQL as id ' + connection.threadId);
// });

// // 登入 API 路由
// app.post('/api/login', (req, res) => {
//     const { account, password } = req.body;
    
//     // 驗證資料
//     if (!account || !password) {
//         return res.status(400).json({ success: false, message: '缺少帳號或密碼' });
//     }

//     // 查詢資料庫是否有相符的帳號與密碼
//     const query = 'SELECT * FROM user WHERE account = ? AND password = ?';
//     connection.query(query, [account, password], (error, results) => {
//         if (error) {
//             return res.status(500).json({ success: false, message: '伺服器錯誤' });
//         }

//         if (results.length > 0) {
//             // 成功登入
//             const user = results[0]; // 拿到用戶資料
//             res.json({  success: true, 
//                         message: '登入成功', 
//                         user: {
//                             account: user.account,
//                             email: user.email
//                        } 
//                     });
//         } else {
//             // 帳號或密碼錯誤
//             res.json({ success: false, message: '帳號或密碼錯誤' });
//         }
//     });
// });

// // 啟動伺服器
// app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`);
// });
