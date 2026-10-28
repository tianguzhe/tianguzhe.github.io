# tian · Apps for Mac

四款原生 macOS 应用的个人展示站，使用 Astro 生成纯静态页面，部署至 [tianguzhe.github.io](https://tianguzhe.github.io)。

## 本地开发

需要 Bun 1.4.3 或兼容版本。安装依赖后启动开发服务：

```sh
bun install --frozen-lockfile
bun run dev
```

构建与验证：

```sh
bun run build
bun run check:site
bun run preview
```

## 更新内容

- `src/data/apps.ts`：四个应用的介绍、功能、步骤、FAQ、图片路径与品牌色。
- `src/pages/index.astro`：个人首页。
- `src/pages/[app].astro`：共用产品页模板，自动生成四个独立路由。
- `src/styles/global.css`：响应式界面与动效设置。
- `public/images/`：原有应用图标与界面截图，全部本地托管。

新增应用时，在数据中增加条目，并更新 `scripts/check-site.mjs` 的路由列表及页面数量。下载链接使用 GitHub Releases 的 `latest/download` 地址，无需在应用每次发版后更新网站。

## 部署

GitHub 仓库名必须为 `tianguzhe.github.io`。仓库 Settings → Pages 的 Source 选择 **GitHub Actions**。

推送 `main` 后，`.github/workflows/deploy.yml` 自动安装锁定依赖、构建、检查并发布。Pull Request 只验证，不发布。

网站附带页面元数据、分享卡片、SoftwareApplication 结构化数据、站点地图、robots.txt 与自定义 404 页面。没有统计脚本、外部字体或运行时 API 请求。

## 素材来源

图标和已有截图来自 [DevPocket](https://github.com/tianguzhe/DevPocket)、[MacClean](https://github.com/tianguzhe/MacClean)、[LanguageSwitcher](https://github.com/tianguzhe/LanguageSwitcher) 和 [QuietLock](https://github.com/tianguzhe/QuietLock)。

DevPocket 展示图以原有 SwiftUI 界面渲染示例 JSON；LanguageSwitcher 展示图以原有界面展示 Safari 内置语言。没有用户输入或扫描到的私人文件。分享卡片由网站版式与应用图标组成。
