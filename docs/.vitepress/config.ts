import { defineConfig } from 'vitepress'

export default defineConfig({
  // ...
  title: 'WangxuFE',
  lastUpdated:true,
  themeConfig: {
    nav: [
      {
        text: '向导',
        link: '/guide/start.md'
      }
    ],
    sidebar: {
      '/astro/': [
        {
          text: 'Astro',
          items: [
            {
              text: 'astro项目说明',
              link: '/astro/index.md'
            }
          ]
        }        
      ],
      '/newbie/': [
        {
          text: '入职礼包',
          items: [
            {
              text: '需求工作流',
              link: '/newbie/product-workflow.md'
            }
          ]
        }
      ],
      '/electron/': [
        {
          text: 'electron',
          items: [
            {
              text: 'MAS 打包与上架',
              link: '/electron/mas.md'
            }
          ]
        }        
      ],
      '/guide/': [
        {
          text: '向导',
          items: [
            {
              text: '前言',
              link: '/guide/start.md'
            },
            {
              text: '入职礼包',
              link: '/newbie/index.md'
            },
            {
              text: 'Electron',
              link: '/electron/mas.md'
            },
            {
              text: 'Astro',
              link: '/astro/index.md'
            },
            {
              text: '网旭文档',
              link: 'https://docs.wangxutech.com/#/'
            }
          ]
        }
      ]
    },
    logo: 'https://qncdn.aoscdn.com/local/wangxutech.com/img/favicon.png?62f7',
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present WangxuFE Team'
    },
    editLink: {
      pattern: 'https://github.com/andywang646691/wangxufe-docs/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },
    lastUpdatedText: '更新时间'
  }
})