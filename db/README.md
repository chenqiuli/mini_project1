## json-server：30 秒内提供 Restful Api，零编码，crud 全部在 json 文件中体现出来

### 1、`npm install -g json-server `

### 2、新建 test.json 文件，test.json 文件不要放在小程序项目里面

```json
{
  "user": []
}
```

### 3、启动服务器，`json-server --watch test.json `

### 4、小程序测试接口

```js
handleGet(){
    wx.request({
        url: 'http://localhost:3000/user?id=3',
        success: (res) => {
            console.log("查询", res.data);
        }
    });
},

handlePost() {
    wx.request({
        url: 'http://localhost:3000/user',
        method: 'POST',
        data: {
            username: "李四",
            password: "123",
        },
    });
},

handlePut(){
    wx.request({
        url: 'http://localhost:3000/user/1',
        method: 'PUT',
        data: {
            username: "老秋",
            password: "123456"
        }
    });
},

handleDelete(){
    wx.request({
        url: 'http://localhost:3000/user/1',
        method: 'DELETE'
    })
}
```

## json-server 运行

### 这是一个提供 Restful Api 服务的 json-server 服务器

#### 1、按住 Shift 键，打开 PowerShell 窗口

#### 2、全局安装 npm i -g json-server

#### 3、执行 json-server --watch db.json 开启服务

#### 4、前端访问图片路径不需要/public: http://localhost:3000/images/xxx

#### query 请求：?id=1

#### 分页：?\_page=1&\_limit=5

#### 动态路由：update/1 delete/1

#### xxx_like 模糊查询：goods?title_like=v

#### 联表查询：categories/5?\_embed=goods ，去 goods 表中查找 categoryId=5 的数据，查找到的数据会聚合起来

#### 联表查询：categories?\_embed=goods ，去 goods 表中查找 category 表中对应的数据，查找到的数据会聚合起来；goods 表中有一个字段 categoryId，categories 表中有一个字段 id

#### 聚合查询：/carts?\_expand=good，goods 中有一个字段 id，carts 表中有一个字段 goodId。从 goods 表中查找 id 等于 carts 表中 goodId 的，聚合到 carts 表中，新字段是 good。
