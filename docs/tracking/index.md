# 数据跟踪

网旭站点利用多种脚本进行数据跟踪，包括：

1、 hawkeye.js: 是一个用于数据跟踪的脚本，用于跟踪渠道、下载、安装、支付等数据。代码地址在 [@central/hawkeye](https://git.wangxutech.com/web/frontend/modules/central/-/tree/master/hawkeye)

2、GTM: 跟踪脚本管理器，用于跟踪网站访问数据， 会聚合多个跟踪脚本。

3、部分站点还有其他跟踪脚本， 比如 百度、阿里的.

## 广告跟踪 or 产品跟踪

不同的角色有不同的数据跟踪需要。 在产品开发流程中， 产品经理、运营、市场等角色都会关注下载渠道安装、页面访问量、注册用户数等数据。 除此之外， 产品也会关注业务逻辑数据跟踪，比如图片上传、下载等。

下面就具体的数据跟踪类别做出说明：

### 下载渠道跟踪

也称为安装跟踪， 用于跟踪用户从哪个渠道下载了app， 从而可以统计不同渠道的下载量。实现方式， 是依靠用户点击下载链接， 下载链接会带上渠道参数， 通过渠道参数， 服务器端可以统计不同渠道的下载量。此处的渠道参数会由 hawkeye.js 自动处理。

### 支付跟踪

即跟踪用户支付行为， 用于统计不同支付渠道的支付量。

中文支付， 通过创建订单接口， body传递 apptype 决定跟踪渠道；

海外支付， 由 wx_inline_checkout.js 从 hawkeye.js 获取渠道数据， 传给后端。具体来说， 点击购买按钮， 页面会加载 paddle.js 脚本， 其中 https://buy.paddle.com/paddlejs 携带的参数 passthrough中的 apptype 值正确， 则前端跟踪参数传递正常

## GTM 配置跟踪元素

为了准确获取元素的class, 避免点击嵌套元素而不能触发跟踪的情况, 在GTM中使用以下方式配置：

```
变量：  {{Get Match Classes}}

作用：根据传入的class 名称， 获取匹配到的 class。
如：  {{Get Match Classes}}("upload-img"), 将获取到 符合如下格式的class 名称： upload-img 或 upload-img-xxx

使用方式： {{Get Match Classes}}("upload-img"), 需要引号。
```

## GTM 埋点规范

https://alidocs.dingtalk.com/i/nodes/mM3zoYAw1Rr8DkyY2bQqJnZ07y9NpXxD?doc_type=wiki_doc&dontjump=true# 「佐糖GA跟踪埋点」




