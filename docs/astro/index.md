# Astro

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/basics)

## ❌浏览器兼容性

必须符合 `ES2015` 执行标准的浏览器

如果**优雅降级**（即部分功能对低版本浏览器不可见）， 可宽限至 符合 `ES2017` 标准的浏览器；
## 📁astro文件

astro文件是按照Astro框架自定义的语法书写的文件， 本质上是对 html进行服务端增强， 有如下特点：

1、通过组件机制， 将大段html代码拆分成小的代码片段 (实质是html字符串拼接)；

2、因为存在服务端， 因此可以访问文件IO、网络IO， 还能得到页面线上url；


## 📖开发规范

> 使用 astro + vue3 进行开发；如果功能简单， 请使用astro开发（即原始的 html + css + js）； 否则使用vue3开发。
### 1、图标加载

```js
import UploadIcon from '~icons/upload'
// or
import uploadIconSrc from '@icons/upload'
```
使用:
```html
<UploadIcon />
<!-- or -->
<img src={uploadIconSrc} />
```

### 2、图片加载：
页面中的大图应在astro中使用 [imagetools](https://astro-imagetools-docs.vercel.app/en/components-and-apis)的 Picture导入

```js
---
import { Picture } from "@central/assets/imagetools";
---

<Picture
  src="/src/images/landscape.jpg"
  alt="A landscape image"
/>
```

其余图片按如下方式导入(无论是在astro、vue还是svelte文件中): 
```js
import HeroImage from '~images/hero-image'
// Or
import heroImageSrc from '@images/hero-image'

```
使用：
```html
<HeroImage />
<!-- Or -->
<img src={heroImageSrc} />
```

### 3、路径即路由， 路由即语言
目录 `src/pages/[lang]/[file]` 决定页面url `https://[domain]/[lang]/[file]`

类似地，多语言目录结构为 `src/locales/[lang]`

### 4、发布 (🚔 一般使用增量发布)
采用 [fast-glob](https://github.com/mrmlnc/fast-glob) 匹配文件，实现文件增量发布, 请熟悉 `glob` 语法。

例如， 发布**除了中文、英文语言的login、signup**页面：
```
!(en|zh)/{login,signup}
```

### 5、国际化
和运营使用飞书文档异步协作，研发通过飞书excel提供文案中文， 运营通过同一飞书excel提供多语言文案。

导出多语言到根目录下的`i18n.xlsx`文件：

```shell
pnpm i18n export
```

从文件`i18n.xlsx`导入多语言
```shell
pnpm i18n import
```

更多内容参考 [@central/i18n](http://npm.aoscdn.com/-/web/detail/@central/i18n)

## 🚀 项目结构

astro项目目录结构如下

```
/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/
│   │   ├── icons/
│   │   └── images/
│   └── locales/ 
│   │   └── zh.ts
│   ├── components/
│   │   └── Layout.astro
│   └── layouts/ 
│   │   └── ChinaLayout.astro
│   └── pages/  注意文件即路由
│       └── index.astro
└── package.json
```
Astro在 `src/pages/`路径下查找 `.astro`或 `.md`文件。每个页面都会基于页面文件名称形成路由。

图标放在 `src/assets/icons` 中， 图片放在 `src/assets/images`中, 不需要在文件夹中嵌套文件结构， 如 `src/assets/images/home/hero.jpg`, 保持扁平结构(`src/assets/home-hero.jpg`)即可。

图标使用组件即可自动引用

翻译放在 `src/locales/[lang].ts` 文件中, 会被 `@central/i18n` 处理。

组件放在 `src/components` 中， 以组件为中心， 不需要按页面嵌套文件结构， 如果需要整个页面都是用`vue`组件， 命名应该是`IndexPageRoot`、`LoginPageRoot`

## 🧞 命令

所有命令都需要在项目根路径下运行

| 命令              | 操作                                       |
| :---------------- | :------------------------------------------- |
| `pnpm install`    | 安装依赖                      |
| `pnpm dev`        | 启动开发服务器 `localhost:3000` (只能在开发分支)  |
| `pnpm build`      | 构建页面，在 `./dist/` 位置输出, 仅用于调试      |
| `pnpm preview`    | 可在部署前， 预览本地构建的页面, 仅用于调试 |
| `pnpm deploy:test`| 测试环境部署 (只能在开发分支) |
| `pnpm deploy:prod`| 生产环境部署（只能在master分支） |

## ❓问答

### 1、astro文件允许使用服务端代码， 到底意味着什么？
因为Astro文件即路由的特性， 可以由文件路径判断页面url， 进一步可以得出当前页面的语言参数； 因此可以如下实现，在所有语言的页面中使用该组件， 均能展示对应的代码并且无冗余。

```html
---
// 服务端代码
import { getLang } from '@central/i18n'
const lang = getLang()
---
<!-- html 片段 -->
<div class="bg-[#f7f7f7] relative overflow-hidden">
    {
        lang === 'zh' ? (
            <div class="h-10 md:h-20 ">
                <div id="marquee-inner" class="bg-[url('@images/marquee.png')] [animation:marquee]">
                </div>
            </div>
            <div class="h-10 md:h-20 mt-2 md:mt-5">
                <div id="marquee-inner" class="bg-[url('@images/marquee2.png')] [animation:marquee-reverse]">
                </div>
            </div>
        ) : (
            <div class="h-10 md:h-20">
                <div id="marquee-inner" class="bg-[url('@images/marquee-en.png')] [animation:marquee]">
                </div>
            </div>
        )
    }
    <div class="fade-left-edge"></div>
    <div class="fade-right-edge"></div>
    <p class="text-sm pt-6 pb-3 md:pt-12 md:pb-6 text-[#aaa] text-center">
        ※我们的用户和合作者不只来自以上平台，仅举例说明
    </p>
</div>

<!-- 样式， 这里必须使用 is:global 指令, 将样式改为全局作用；
 因为astro文件默认会对样式增加作用域， 但该功能存在兼容性问题（只能兼容到 ES2021）
-->
<style is:global>
    .fade-left-edge {
      /* 这种方式能避免 原子类名过于重复 */
        @apply absolute top-0 left-0 w-[24%] h-[80%];
        background: linear-gradient(-90deg, rgba(245, 246, 255, 0%) 0%, #F5F6FF 100%);
    }
    .fade-right-edge {
        @apply absolute top-0 right-0 w-[24%] h-[80%];
        background: linear-gradient(90deg, rgba(245, 246, 255, 0%) 0%, #F5F6FF 100%);
    }
    @keyframes marquee {
        to {
            background-position: 4237px 0;
        }
    }
    @keyframes marquee-reverse {
        to {
            background-position: -4237px 0;
        }
    }
    #marquee-inner {
        animation-duration: 160s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        @apply absolute h-full w-full bg-[length:auto_40px] bg-repeat-x md:bg-auto;
    }
</style>
```

### 2、在Astro框架中， 使用vue、svelte、react等代码有什么特点？

所有的视图层代码都会经过 服务端构建（ssr）和客户端构建（client）， 因为vue、svelte、react这些视图层框架允许在服务端执行， 因此相关代码会存在两种执行环境， 在书写代码时必须考虑到这一点。而astro文件将服务端代码和客户端代码做了区分， 分别写在不同的位置。

## 👀 了解更多

查看 [Astro 文档](https://docs.astro.build) 

## 插件说明

基于Astro框架的插件机制， 根据公司业务特点， 开发了若干插件增强开发体验：

### polyfill

兼容部分老旧浏览器
### deploy

### tracking
### i18n

### icons
Copied