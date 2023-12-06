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

