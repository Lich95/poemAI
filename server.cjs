// server.js

const express = require('express');
const { createServerRenderer } = require('vite-plugin-vue/server');

const app = express();

// 创建服务器渲染器
const render = createServerRenderer({
    // 传入 Vite 的服务器端构建路径
    root: './dist',
    isProduction: true,
});

// 处理所有请求
app.use('*', async (req, res) => {
    try {
        // 渲染应用程序
        const result = await render(req.originalUrl);
        res.status(200).send(result);
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
