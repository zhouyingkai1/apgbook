### 项目介绍
使用 react-native + dva + react-navigation 开发的一款书房类项目。

项目接口及UI使用的是[时光流影](http:www.timeface.cn)开发的[时代书房](http://www.apgbook.com/timeread)项目

此项目仅用来学习交流，所以购买等操作都没有开发
### 部分运行效果图（更多图片在文末）
![](https://user-gold-cdn.xitu.io/2018/2/28/161da79f8385886d?w=375&h=689&f=png&s=233731)

![](https://user-gold-cdn.xitu.io/2018/2/28/161da79f81c0a970?w=375&h=689&f=png&s=150130)
### 开源地址
[github](https://github.com/zhouyingkai1/apgbook)

### 如何运行
```js
克隆项目
npm i
react-native link
使用Xcode打开项目，运行即可
```

### 使用的技术及框架

* [dva.js](https://github.com/dvajs/dva)

* react-native: "^0.51.0",

* react-navigation: "^1.0.3",

* react-native-modal: "^4.1.1",

* react-native-swiper: "^1.5.13",

* react-native-root-toast: "^3.0.0",

* react-native-vector-icons: "^4.5.0",

* react-native-image-picker: "^0.26.7",

### 开始

项目框架搭建参考的是[a React Native starter powered by dva and react-navigation](https://github.com/nihgwu/react-native-dva-starter)

### 项目结构

```js
|-- android 
|-- ios
|-- node_modules
|-- app
    |-- components // 公用组件
    |-- containers 
        |-- Home // 首页
        |-- Category // 分类
        |-- Press // 出版社
        |-- Rank // 排行榜   
    |-- images // 静态图片
    |-- models // 各个组件model （可参考[dva.js](https://github.com/dvajs/dva)）
        ... 
    |-- page //存放非tab页的每个页面组件 
    |-- services // 定义API
    |-- utils // 工具及方法
    |-- index.js // 创建dva实力，注册应用，记载model的地方
    |-- router.js // 定义路由
|-- index.js // 主入口
```

### 遇到的坑

1. 获取验证码的倒计时，清除倒计时的时机要考虑周全
2. 书籍阅读时返回的是html拼接的，没有好的办法去完成翻页效果，所以用的是Webview
3. 数据的缓存与刷新时机（还未考虑全）

### todo
1. 缓存数据优化
2. 分享
3. 代码优化

### 总结

首先非常感谢dva的作者[sorrycc](https://github.com/sorrycc)，这个项目真的很赞。

自己也是看了很久的RN，不过由于公司原因，一直都是自学，并没有上线项目（本来打算把这个打包上线的，不过要开发者账号，99刀还是算了…）

## 截图

![](https://user-gold-cdn.xitu.io/2018/2/28/161da79f81e8e7f5?w=375&h=689&f=png&s=68580)
![](https://user-gold-cdn.xitu.io/2018/2/28/161da79f83410f55?w=375&h=689&f=png&s=208062)
![](https://user-gold-cdn.xitu.io/2018/2/28/161da79f837aa2c4?w=375&h=689&f=png&s=153547)
![](https://user-gold-cdn.xitu.io/2018/2/28/161da79f8385886d?w=375&h=689&f=png&s=233731)