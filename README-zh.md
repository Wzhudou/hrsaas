### 1 可选链操作符 见Navbar
```
null.name ==> 控制台报错
null?.name ===> undefined
```
### 2 组件的双向绑定
```
见 detail.vue和select-tree.vue组件

v-model 双向绑定
① 子组件：接收value属性 绑定级联属性 级联改变触发 触发input事件
② 父组件：v-model 绑定属性
```

### 3 腾讯云
```
1、注册腾讯云账号 - https://console.cloud.tencent.com/login
2 创建腾讯云存储桶
    云产品 =》对象存储 =》 创建存储桶 =》 创建 =》 弹层 =》一直点下一步 =》安全管理 =》 跨域访问cors设置
3 得到应用秘钥和应用标识
    概览 =》基本信息 =》 存储桶名称和所属地域 =》https://console.cloud.tencent.com/cam/capi =》获取秘钥和应用
4 使用cos-sdk上传
    (1) 安装腾讯云上传sdk
        npm i cos-js-sdk-v5
    (2) 初始化COS
        const cos = new COS({
            SecretId: '应用标识',
            SecretKey: '应用秘钥'
        })
    （3）上传方法
        cos.outObject({
            Bucket: 存储桶名称
            Region: 地域名称
            Key: 文件名称
            StorageClass: 'STANDARD', // 固定值
            Body: params.file // 文件对象
        }, (err, data) => {
            err 错误信息 data返回的数据
        })
```


### 4 员工 角色 权限
```
给员工分配角色  给角色分配权限
```

### 5 权限应用 拆分静态路由和动态路由
```
静态路由 =》所有人都能访问 =》 首页/登录页/404 =》路由固定
动态路由 =》有权限的人才能访问 =》阻止/角色/员工/权限/... =》路由不固定 =》取决于用户角色
```

### 6 自定义指定应用功能权限
```
自定义指定 - 作用在按钮上 - 所有的按钮都可以直接使用
封装自定义指令 =》v-permission =》判断Vuex中的points是否有对应标识 =》有 （正常显示） =》无（删除或者禁用）
```


### 7 数字滚动
```
安装vue-count-to 见dashboard/index.vue
```

### 8 项目打包
```
步骤一：修改路由模式 - 将路由改成history
    hash: 模式带#，#后面的地址变化不会引起页面的刷新
    history：没有#，地址变化会引起页面刷新，更符合页面地址的规范（开发环境不刷新webpack配置）

步骤二：打包分析
    npm run preview -- --report

步骤三：cdn的引入
    1、webpack排除打包
        // 配置需要排除的包
        externals: {
        'vue': 'Vue',
        'element-ui': 'ELEMENT',
        'cos-js-sdk-v5': 'COS'
        }
    2、cdn外链注入public/index.html
        <link href="https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.13/theme-chalk/index.min.css" rel="stylesheet">
        <!-- built files will be auto injected -->
        <script src="https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/vue/2.6.14/vue.min.js"></script>
        <script src="https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.13/index.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/cos-js-sdk-v5/dist/cos-js-sdk-v5.min.js" ></script>

步骤四：安装nginx
    手动：
        项目打包  =》执行脚手架 =》生成html+css+js =》放到服务器托管（node/nginx/docker）=》公众通过地址访问
        1、npm run buid:prod
        2、安装Nginx
         （1）mac
            brew install nginx // 安装
            nginx -v // 查看版本
            brew info nginx // 查看nginx
         (2) windows 一键安装 =》点击.exe 一闪而过，启动成功 （目录不要含中文，不然会报错）
        3、将html+js+css  =》放置到对应的nginx目录下的/html下 =》启动nginx服务访问（安装目录/bin/nginx） =》停止命令（安装目录/bin/nginx -s stop）
            （1）mac查看nginx相关配置 =》 brew info nginx =》安装目录和配置文件（.../nginx.conf） 
                nginx默认访问端口是8080
            （2）windows =》点击.exe 一闪而过，启动成功 （目录不要含中文，不然会报错）
        
        4、history模式下，页面刷新404问题
            解决方法：
                （1）nginx.conf文件 下配置如下
                    location / {
                        try_files $uri $uri/ /index.html;
                    }
                （2）重启nginx
                    mac：   安装目录/bin/nginx -s reload
                    windows：   ./nginx -s reload

        5、使用nginx配置代理解决生产环境跨域问题
            nginx配置跨域 =》修改nginx配置文件 =》重启服务
            nginx.conf
                location /prod-api  {
                  proxy_pass https://heimahr-t.itheima.net;
                }
                




    自动：
        gitlab/阿里云/腾讯云/百度云/...


```

### 9 组件全局注册
```
见 src/components/index.js 和 main.js
```


### 10 全屏
```
方法一：
    document.documentElement.requestFullscreen() 全屏
    document.exitFullscreen() 退出全屏

方法二：插件
    npm i screenfull
```

### 相关资料
```
完整gitee项目代码地址: https://gitee.com/shuiruohanyu/heimahr/tree/master
项目接口文档地址: https://www.apifox.cn/apidoc/shared-e2644216-aad4-4529-a630-78f0631ab076/api-49562537
项目演示地址: https://heimahr.itheima.net/
接口实际地址: 示例-https://heimahr.itheima.net/api/sys/login
项目演示备份地址: https://heimahr-t.itheima.net/ 
备份接口实际地址: 示例-https://heimahr-t.itheima.net/prod-api/sys/login
项目笔记地址(语雀-在线，线下笔记已经在资源中): https://www.yuque.com/shuiruohanyu/agxcua
```
