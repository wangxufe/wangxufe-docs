# Astro

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/basics)

## 📖说明
虽然`astro`支持多种视图层， 但是为了方便多人协作及跨项目协作，统一使用`vue3`作为视图层
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

## 👀 了解更多

查看 [Astro 文档](https://docs.astro.build) 

## 必备插件说明

### polyfill
### deploy

### tracking
### i18n

### icons
Copied