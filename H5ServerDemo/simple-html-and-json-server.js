// 使用 express 框架搭建本地服务，监听端口 3000，可以访问 Html 主文档 和 Json 数据
var app = require('express')();
// 处理 Html 主文档路由
const handlerHtml = function (req, res) {
    const htmlPath = __dirname + '/index.html';
    console.log("SSU", "用户访问 index.html，后端路径为" + htmlPath);
    res.sendfile(htmlPath);
};
// 处理 Json 数据路由
const handlerJson = function (req, res) {
    const jsonPath = __dirname + '/hello.json';
    console.log("SSU", "用户访问 hello.json，后端路径为" + jsonPath);
    res.sendfile(jsonPath);
};
// 处理浏览器标题栏图标 favicon.ico 图片路由
const handlerFavicon = function (req, res) {
    const faviconPath = __dirname + '/favicon.ico';
    console.log("SSU", "用户访问 favicon.ico，后端路径为" + faviconPath);
    res.sendfile(faviconPath);
};
// Html 主文档路由，http://localhost:3000/ 和 http://localhost:3000/index.html 皆可
app.get('/', handlerHtml);
app.get('/index.html', handlerHtml);
// Json 数据路由，http://localhost:3000/hello.json
app.get('/hello.json', handlerJson);
// favicon.ico 图片路由
app.get('/favicon.ico', handlerFavicon);
// 监听 3000 端口
app.listen(3000);