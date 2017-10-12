# qvbus_map_vue_demo
qvbus项目 新加加 高德地图功能
# qvbusproject



## 执行命令
	cd qvbupProject	
## 安装依赖
	npm install		
	npm install superagent-jsonp
	npm install superagent
	npm install webpack-zepto
	npm install sass-loader
	npm install node-sass
	npm install vue-amap
	npm run dev
## 结构分部
	|-- build                              // webpack配置文件
  	|-- config                             // 项目打包路径
  	|-- src                                // 源码目录
  	|       |-- common                     // 公共组件
  	|           |-- header.vue             // 首页的公共头部，预约车辆和立即乘车
  	|		    |-- components                    // 组件页面
  	|           |-- addPerson.vue          // 添加乘客人信息页面
  	|           |-- appointment.vue        // 预约车辆页面
  	|           |-- Home.vue               // 主页盛放 预约车辆与立即乘车的容器
  	|           |-- login.vue          	    // 登录页面
  	|           |-- map.vue                // vue-amap地图插件页面
  	|           |-- mapMain.vue            // 原生高德地图页面
  	|           |-- orderDetail.vue        // 订单详情页面
  	|           |-- passengerInfo.vue      // 成哥信息页面
  	|           |-- scanResult.vue         // 支付结果页面
  	|           |-- selectCity.vue         // 选择城市页面
  	|           |-- selectSeat.vue         // 选座页面
  	|   |-- App.vue                      // 页面入口文件
  	|   |-- main.js                      // 程序入口文件，加载各种公共组件
  	|-- .babelrc                         // ES6语法编译配置
  	|-- .editorconfig                    // 代码编写规格
  	|-- .gitignore                       // 忽略的文件
  	|-- index.html                       // 入口html文件
  	|-- package.json                     // 项目及工具的依赖配置文件
  	|-- README.md                        // 说明
