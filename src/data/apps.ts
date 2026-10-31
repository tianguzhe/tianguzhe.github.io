export interface App {
  slug: string;
  name: string;
  category: string;
  color: string;
  tint: string;
  tagline: string;
  headline: [string, string];
  description: string;
  icon: string;
  screenshot: string;
  screenshotAlt: string;
  screenshotWidth: number;
  screenshotHeight: number;
  caption: string;
  features: { icon: string; title: string; text: string }[];
  steps: { title: string; text: string }[];
  faqs: { question: string; answer: string }[];
}

export const apps: App[] = [
  {
    slug: 'devpocket', name: 'DevPocket', category: '开发工具',
    color: '#13785e', tint: '#eaf5ef',
    tagline: '开发者的随身工具箱',
    headline: ['一个小工具，', '少一点打断。'],
    description: 'JSON 格式化、时间戳转换、编码解码、AES 与二维码。把开发中常用的小操作，收进一个原生 Mac 工具箱。',
    icon: '/images/devpocket-icon.png', screenshot: '/images/devpocket-preview.png',
    screenshotWidth: 2240, screenshotHeight: 1520,
    screenshotAlt: 'DevPocket 的 JSON 工作台，左侧为工具列表，右侧并排显示输入和格式化结果',
    caption: '熟悉的双栏工作台，输入与结果一目了然。',
    features: [
      { icon: 'braces', title: '六种工具，随手可用', text: 'JSON、时间戳、URL、Base64、AES 和二维码，覆盖日常开发中的高频操作。' },
      { icon: 'command', title: '让手留在键盘上', text: '⌘1–⌘6 切换工具，⌘K 搜索，⌘↩ 处理内容。输入与结果在各工具之间分别保留。' },
      { icon: 'shield', title: '数据留在你的 Mac', text: '转换在本机完成。关闭应用后不保存输入历史，处理文本时无需上传到在线工具。' },
    ],
    steps: [
      { title: '选择工具', text: '从侧栏选择，或用 ⌘K 搜索需要的工具。' },
      { title: '粘贴内容', text: '输入文本，按需要调整转换模式和参数。' },
      { title: '处理并复制', text: '按 ⌘↩ 处理，再用 ⌘⇧C 复制结果。' },
    ],
    faqs: [
      { question: '转换内容会发送到服务器吗？', answer: '不会。JSON、编码解码、AES、时间转换与二维码生成均在本机完成，不需要账号。编辑内容仅在当前进程内保留。' },
      { question: '二维码支持哪些内容？', answer: '支持中文、emoji、多行文本和网址。停止输入 1 秒后自动生成，可选择 256、512 或 1024 像素，并支持 L / M / Q / H 四种纠错等级。' },
      { question: '支持哪些 AES 格式？', answer: '使用 AES-CBC / PKCS7，支持 Hex 和 Base64 密文，以及 Package、Channel、自定义密钥。该模式不提供完整性认证；详细兼容规则见 GitHub 文档。' },
      { question: '适合处理多大的文本？', answer: '单次输入最多 5 MB。大型 JSON 使用普通文本显示，以保持编辑流畅。Base64 解码面向 UTF-8 文本，不用于导出二进制文件。' },
    ],
  },
  {
    slug: 'macclean', name: 'MacClean', category: '磁盘分析',
    color: '#5c63b5', tint: '#efeff9',
    tagline: '给开发，留点空间',
    headline: ['开发缓存，', '看清再清理。'],
    description: '找出构建缓存、依赖下载与编辑器资料的占用。看清空间去了哪里，再决定如何整理你的开发环境。',
    icon: '/images/macclean-icon.png', screenshot: '/images/macclean-overview-v2.png',
    screenshotWidth: 2440, screenshotHeight: 1580,
    screenshotAlt: 'MacClean 空间总览，按开发生态展示缓存占用和磁盘空间',
    caption: '从磁盘总览到工具明细，找到空间的去向。图中为示例数据。',
    features: [
      { icon: 'layers', title: '开发缓存，集中查看', text: '覆盖 Apple、JavaScript、JVM、Python 等开发生态，识别常见工具的默认缓存目录。' },
      { icon: 'folder', title: '缓存与资料，分开统计', text: '区分编辑器缓存、配置与插件。查看文件数量、目录明细，并在 Finder 中定位。' },
      { icon: 'terminal', title: '清理方式，心里有数', text: '查看官方清理命令及适用范围，按需复制执行。MacClean 负责分析，由你决定下一步。' },
    ],
    steps: [
      { title: '打开并扫描', text: '启动应用，扫描当前用户的已知开发缓存目录。' },
      { title: '找到空间大户', text: '按工具查看占用，进一步检查目录明细。' },
      { title: '按需整理', text: '阅读清理范围，再复制命令或在 Finder 中处理。' },
    ],
    faqs: [
      { question: 'MacClean 会自动删除文件吗？', answer: '不会。MacClean 只做本地分析，不自动删除文件，也不会替你执行清理命令。你可以查看说明，复制命令后自行决定是否执行。' },
      { question: '显示的缓存占用都能释放吗？', answer: '缓存占用不等于可释放空间。APFS 共享块、快照和扫描期间的变化会影响结果；部分缓存还可能包含本地历史或无法重新下载的构件。' },
      { question: '会扫描项目源码和个人文件吗？', answer: '扫描已知的默认开发缓存与编辑器资料位置，不遍历项目源码、项目内 node_modules、虚拟环境、Xcode Archives 或模拟器设备。自定义缓存路径目前不在扫描范围内。' },
      { question: '为什么某些目录无法读取？', answer: 'macOS 会限制部分目录的访问。应用会显示访问状态；如确有需要，可在系统设置中配置完全磁盘访问权限后重新扫描。扫描数据不上传。' },
    ],
  },
  {
    slug: 'languageswitcher', name: 'LanguageSwitcher', category: '语言切换',
    color: '#4365b7', tint: '#edf2fc',
    tagline: '让应用，说你的语言',
    headline: ['换一种语言，', '打开熟悉的应用。'],
    description: '无需更改系统语言。拖入一个 Mac 应用，选择它内置的语言，用你想要的语言启动这一次。',
    icon: '/images/languageswitcher-icon.png', screenshot: '/images/languageswitcher-preview-v2.png',
    screenshotWidth: 1480, screenshotHeight: 1360,
    screenshotAlt: 'LanguageSwitcher 识别 Safari 的内置语言，显示可搜索的语言列表',
    caption: '拖入应用，选好语言，开始使用。',
    features: [
      { icon: 'globe', title: '只切换这一次启动', text: '为单个应用传入语言偏好，保留系统语言设置，也不修改目标应用的资源文件。' },
      { icon: 'folder', title: '拖入，就能识别', text: '拖入 .app 或按 ⌘O 选择应用，自动扫描内置语言，无需手动查找语言代码。' },
      { icon: 'search', title: '快速找到你的语言', text: '支持名称、原生名称和语言代码搜索。繁体中文、英语、简体中文优先展示。' },
    ],
    steps: [
      { title: '先退出目标应用', text: '完全退出已有进程，让新的启动语言生效。' },
      { title: '拖入 .app', text: '拖入目标应用，或使用 ⌘O 从本机选择。' },
      { title: '选择语言启动', text: '点击语言卡片；启动成功后，切换工具自动退出。' },
    ],
    faqs: [
      { question: '会更改系统或应用的默认语言吗？', answer: '不会。语言偏好只用于本次启动。下次直接打开目标应用时，它会按自身设置运行；系统语言和目标应用资源不会被改写。' },
      { question: '可以为应用增加中文翻译吗？', answer: '不能。LanguageSwitcher 读取应用自带的 .lproj 语言资源，只能切换已有的语言，不能添加尚未内置的翻译。' },
      { question: '为什么有些应用没有显示语言？', answer: '部分应用使用自定义语言资源，或在应用内部提供独立的语言设置，因此可能无法识别。Base 资源目录会被过滤。' },
      { question: '为什么启动后语言没有变化？', answer: '请先完全退出目标应用。部分应用会优先使用自身语言设置，或忽略 AppleLanguages 启动参数，这些应用可能无法通过本工具切换。' },
    ],
  },
  {
    slug: 'quietlock', name: 'QuietLock', category: '菜单栏工具',
    color: '#147a78', tint: '#e9f4f3',
    tagline: '息屏时间，随手掌控',
    headline: ['什么时候息屏，', '你说了算。'],
    description: '在菜单栏调整显示器休眠时间，切换自动屏保。阅读、演示或专注工作时，让屏幕按你的节奏休息。',
    icon: '/images/quietlock-icon.png', screenshot: '/images/quietlock-preview-v2.png',
    screenshotWidth: 752, screenshotHeight: 460,
    screenshotAlt: 'QuietLock 的浅色与深色菜单栏面板，包含息屏滑杆和自动屏保开关',
    caption: '一个菜单栏面板，照顾浅色与深色的每一种工作状态。',
    features: [
      { icon: 'sliders', title: '六档时间，随手一调', text: '1、5、10、15、30 分钟或永不。拖动滑杆或点击刻度，统一应用到各个电源模式。' },
      { icon: 'sun', title: '屏保，也一起照顾', text: '独立切换自动屏保。若屏保仍可能触发锁定，面板会给出提示，帮助你理解当前状态。' },
      { icon: 'refresh', title: '跟随系统实际状态', text: '定时读取系统设置，唤醒或解锁后同步。其他应用改了设置，也能及时看到变化。' },
    ],
    steps: [
      { title: '打开菜单栏面板', text: '启动后点击菜单栏的 Q 时钟图标。' },
      { title: '选择息屏时间', text: '拖动滑杆并松开，首次修改按系统提示授权。' },
      { title: '按需调整屏保', text: '需要保持常亮时，选永不并检查自动屏保状态。' },
    ],
    faqs: [
      { question: '“永不”能阻止所有形式的锁屏吗？', answer: '不能。“永不”针对空闲息屏，运行期间也会保持唤醒。它不会阻止手动锁屏、合盖、低电量休眠或组织策略；屏保还有独立的空闲计时器。' },
      { question: '为什么修改时需要管理员授权？', answer: '更改系统息屏时间需要管理员权限。每次启动后的首次修改会显示系统授权提示，应用不保存密码。授权范围和撤销方式在 GitHub 文档中有完整说明。' },
      { question: '退出应用后设置会恢复吗？', answer: '已经写入的系统设置会保留。退出后，应用持有的保持唤醒状态会结束，本次运行创建的授权规则也会清理。' },
      { question: '如何确保息屏后需要密码？', answer: '在“系统设置 → 锁定屏幕”中，将屏幕保护程序启动或显示器关闭后要求输入密码设为“立即”。QuietLock 控制息屏时机，系统设置决定是否需要密码。' },
    ],
  },
  {
    slug: 'procscope', name: 'ProcScope', category: '进程与端口',
    color: '#16766c', tint: '#edf4ef',
    tagline: '看清每一个运行中的任务',
    headline: ['谁在运行，', '一眼看清。'],
    description: '从应用资源到监听端口，从启动命令到父子进程。把 Mac 正在做的事，看得更清楚，管理得更从容。',
    icon: '/images/procscope-icon.png', screenshot: '/images/procscope-preview.png',
    screenshotWidth: 2480, screenshotHeight: 1620,
    screenshotAlt: 'ProcScope 应用视图，石墨绿侧栏、应用 CPU 与内存列表，以及 Terminal 的进程详情',
    caption: '应用、进程、端口，三个视角观察这台 Mac。图中为示例数据。',
    features: [
      { icon: 'activity', title: '资源占用，看清归属', text: '汇总应用与关联进程的 CPU 和内存，按名称、PID 或路径搜索。区分前台、后台与暂停状态。' },
      { icon: 'network', title: '常用端口，随手可达', text: '收藏并命名常用服务，停止后仍保留。右键复制地址、打开浏览器，或追溯进程的启动命令与工作目录。' },
      { icon: 'shield', title: '操作结果，看得清楚', text: '执行前核对进程身份与端口归属，执行后确认退出、暂停或恢复的结果，并复查可见端口占用。' },
    ],
    steps: [
      { title: '选一个观察视角', text: '用 ⌘1–⌘3 切换应用、全部进程与监听端口。' },
      { title: '找到需要的任务', text: '按 ⌘F 搜索名称、PID 或端口号，查看详情与来源。' },
      { title: '了解清楚，再操作', text: '切换到应用，或核对目标与操作提示后再执行管理。' },
    ],
    faqs: [
      { question: '服务停止后，收藏会消失吗？', answer: '不会。收藏与名称按协议和端口保存在本机，服务停止后仍显示；进程重新启动或 PID 改变，也能继续匹配。同一端口的 TCP 与 UDP 分别收藏。' },
      { question: '会上传进程或命令信息吗？', answer: '不会。系统采样、筛选和关联都在本机完成，不需要账号，也没有网络上传。基本功能无需辅助功能、屏幕录制或完全磁盘访问权限。' },
      { question: '为什么 CPU 可能超过 100%，内存合计偏大？', answer: 'CPU 采用单个核心为 100% 的进程口径，多核合计可以超过 100%。内存为 RSS 驻留内存，共享页面可能被不同进程重复统计，不等于整机实际已用内存。' },
      { question: '“等待中”是不是应用卡住了？', answer: '不是。等待事件或资源是正常进程状态，不表示无响应。ProcScope 会明确区分等待、后台与暂停，目前不检测应用窗口是否无响应。' },
      { question: '能结束所有进程，或释放所有端口吗？', answer: '不能。操作只针对当前用户的所选 PID，不递归结束子进程；系统进程、其他用户进程和 ProcScope 自身为只读。受保护进程的详情或端口可能不可见。' },
      { question: '暂停进程会释放内存和端口吗？', answer: '不会。暂停只停止调度，内存和端口仍被占用。强制结束可能丢失未保存内容；服务也可能被系统自动重启，执行前请核对确认面板。' },
    ],
  },
];

export const repository = (app: App) => `https://github.com/tianguzhe/${app.name}`;
export const download = (app: App) => `${repository(app)}/releases/latest/download/${app.name}.dmg`;
