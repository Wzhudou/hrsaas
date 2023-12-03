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


4 员工 角色 权限
```
给员工分配角色  给角色分配权限
```