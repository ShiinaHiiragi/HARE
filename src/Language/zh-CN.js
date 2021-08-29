const list = {
  signIn: {
    title: "登录到 HARE",
    email: "邮箱地址",
    password: "密码",
    memory: "记住我的邮箱地址",
    button: "登录",
    language: "更换显示语言",
    signUp: "没有账号？",
    copyright: "版权所有"
  },
  panel: {
    initUnit: "创建新卡片组",
    intro: [
      "欢迎来到 HARE！",
      "听说按「？」可以呼出快捷键菜单",
      "想要提高评级？增加词条的个数，减小单个词条的规模吧！",
      "不要再学习了，摸会鱼吧！",
      "是想要学习的 Friends 呢！",
      "你为什么要登录进来呢？是因为要考试了吗？",
      "听说如果一口气背下 514 个词条，网站就会爆炸。",
      "我很可爱，请给我钱。",
      "你醒了？手术很成功。",
      "console.log(\"Hello World!\");",
      "';DROP TABLE *#",
      "q → (p → q)",
      "烫烫烫烫烫烫烫",
      "生活就像海洋，只有意志坚强的人，才能到达彼岸。",
      "今天也是好天气。——那明天呢？",
      "生活不易，猫猫叹气。",
      "1，2，⑨！",
      "可以借我一根鱼竿吗？"
    ],
    cover: {
      createTime: "创建于 {0}",
      details: "详情",
      recall: "回忆",
      view: "查看词条",
      stat: "统计信息",
      gallery: "画廊",
      nilPresent: "没有描述"
    },
    recall: {
      switch: "切换问题/答案",
      revoke: "撤销最近一次标记",
      previous: "上一个",
      next: "下一个",
      pure: "标记为正确",
      far: "标记为错误",
      unload: "您的进度尚未提交"
    },
    stat: {
      totalTitle: "总体数据",
      eachTitle: "{0}回忆",
      precision: "精度",
      judge: {
        tooLong: "过长",
        tooShort: "过短",
        tooOften: "过于频繁",
        tooRare: "间隔过长",
        tooFew: "词条过少",
        noData: "暂无数据"
      },
      timeFormatString: "yyyy-MM-dd hh:mm:ss",
      ongoing: "（正在进行）",
      avgSpan: "平均用时 / 平均每词条用时：",
      avgInterval: "平均间隔：",
      avgClass: "平均正确 / 平均错误 / 平均未知：",
      variance: "正确数方差 / 错误数方差：",
      varianceSame: "频数方差：",
      avgAcc: "平均正确率 / 平均错误率：",
      bestWorst: "最大正确率 / 最大错误率：",
      class: "频数：",
      acc: "准确率：",
      timeSpan: ["少于一秒", () => "秒", () => "分钟", () => "小时", () => "天"],
      line: "准确率变化趋势",
      bar: "错误最多",
      barPure: "正确",
      barFar: "错误",
      recollect: "回想有误词条",
      clearEachRecall: "清除此次记录",
      clearRecall: "清空所有",
      noLog: "（没有日志信息）",
      header: ["类型", "词条序号", "时间","记录"],
      modData: "事后修改",
      newData: "追加词条",
      notApplicable: "不适用"
    },
    gallery: {
      rename: "重命名",
      copy: "复制链接",
      delete: "删除",
      new: "新图片",
      timeFormatString: "yyyy-MM-dd hh:mm:ss"
    }
  },
  popup: {
    language: "更换显示语言",
    kick: {
      title: "与服务器断开连接",
      text: "由于令牌无效或过期，服务器拒绝了您的请求，请重新登录。"
    },
    conflict: {
      title: "页面过期",
      text: "由于会话过期，服务器拒绝了您的请求，请刷新页面。"
    },
    signUp: {
      title: "注册暂不可用",
      text: "我们暂时不提供注册功能，如有需要请联系作者（点击「关于」作者邮箱处以复制）在后台直接注册。"
    },
    newUnitPage: {
      titleUnit: "创建新记忆组",
      titlePage: "创建新记忆册",
      textUnit: "一个记忆组必须包含至少一个记忆册，请输入该记忆组的第一个记忆册信息。",
      textPage: "请输入记忆册信息。",
      unitName: "记忆组名",
      pageName: "记忆册名",
      pagePresent: "记忆册描述"
    },
    newItem: {
      title: "创建新词条",
      editTitle: "编辑词条",
      text: "新词条会被插到指定的 ID 的位置，ID {0}{1}。",
      editText: "正在修改 ID 为 {1} 的词条{0}",
      editTextZero: { query: "问题", key: "答案" },
      supply: "；在指定位置之后的词条会向后顺延 1 号",
      itemID: "词条 ID",
      query: "问题 Markdown 编辑器",
      key: "回答 Markdown 编辑器",
      onlyOne: "只能为 1",
      aboveOne: "的范围是 1 ~ {0}",
      exitTitle: "退出确认",
      exitText: "您正准备放弃所有已编辑内容并退出新建词条的过程，请点击「确定」以退出。",
      applyTitle: "提交确认",
      applyText: "您正准备提交新词条（虽然从未编辑“答案”部分），请点击「确定」以继续。"
    },
    edit: {
      titleUnit: "编辑记忆组信息",
      labelUnit: "记忆组名",
      textUnit: "更改当前记忆组名，然后点击「应用」以继续。",
      titlePage: "编辑记忆册信息",
      labelPageName: "记忆册名",
      labelPagePresent: "记忆册描述",
      textPage: "更改当前记忆组名及其描述，然后点击「应用」以继续。",
      titleMove: "移动词条",
      labelMove: "词条 ID",
      textMove: "输入指定的词条 ID，然后点击「应用」以继续。ID 的范围是 1 ~ {0}",
      titleImage: "重命名图片",
      textImage: "更改当前图片标题，然后点击「应用」以继续。",
      labelImage: "图片标题",
      cover:  "为此记忆册选择一个图标",
      track: "手动修改记忆结果"
    },
    password: {
      title: "更换密码",
      text: "输出当前密码和新密码，点击「应用」以继续。新密码长度在 {0} ~ {1} 字符之间。",
      old: "当前密码",
      new: "新密码"
    },
    logout: {
      title: "退出登录确认",
      text: "您正准备退出 HARE 登录状态，请点击「确定」以登出。",
    },
    delete: {
      title: "删除确认",
      unit: "您正准备删除记忆组「{0}」，请点击「确定」以继续。",
      page: "您正准备删除记忆册「{0}」，请点击「确定」以继续。",
      item: "您正准备删除{0}，请点击「确定」以继续。",
      recall: "您正准备删除{0}，请点击「确定」以继续。",
      image: "您正准备删除图片「{0}」，请点击「确定」以继续。",
      part: "选中的词条",
      all: "所有词条",
      track: "所有词条（包括记忆记录）",
      single: "{0}记录",
      clear: "所有记录"
    },
    clear: {
      title: "选择进度",
      text: "检测到已经有记忆计时，您想要继续上次记录还是清空记录重新开始？",
      restart: "重新开始",
      continue: "继续"
    },
    shortcut: {
      title: "快捷键列表",
      table: {
        "全局": {
          "SHIFT+/": "唤出快捷键页面",
          "SHIFT+1": "唤出容量界面",
          "TAB": "移动焦点",
          "F11": "全屏",
          "ESC": "回到上一级"
        },
        "回忆页面": {
          "CTRL+A": "切换问题/答案",
          "CTRL+Z": "撤销最近一次标记",
          "CTRL+X": "标记为错误",
          "CTRL+C": "标记为正确",
          "→": "下一个",
          "←": "上一个"
        },
        "数据表页面": {
          "ESC": "取消词条选中状态",
          "DEL": "删除选中词条",
          "CTRL+C": "新建词条",
          "CTRL+M": "移动选中词条"
        },
        "新建词条页面": {
          "F1": "打开命令面板",
          "ALT+Z": "切换自动换行",
          "CTRL+Q": "插入 MARKDOWN 下划线",
          "CTRL+S": "插入全角空格实体"
        }
      }
    },
    profile: {
      userName: "用户名",
      userID: "UID",
      email: "电子邮件",
      birth: "生日",
      gender: "性别",
      tel: "电话",
      city: "城市"
    },
    volumn: {
      title: "当前帐号容量",
      table: {
        maxUnit: "记忆组",
        maxPage: "记忆册",
        maxItem: "词条",
        maxImg: "画廊",
        recall: "回忆记录",
        image: "单张图片",
        item: "单个词条",
        request: "单个请求体"
      }
    },
    about: {
      title: "关于 HARE",
      tab: ["基本信息", "更新日志", "帮助"],
      header: ["依赖", "描述", "版本"],
      copyTip: "复制到剪切板",
      timeFormatString: "yyyy MM-dd",
      info: {
        "Node.js": ["服务端脚本", "12.15.4"],
        "Express.js": ["Node.js 服务器", "4.16.1"],
        "Node-Postgre": ["PostgreSQL 数据库连接", "8.6.0"],
        "Cookie Parser": ["服务端 Cookie 解析", "1.4.4"],
        "CORS": ["跨域资源处理", "2.8.5"],
        "Node Dev": ["Node.js 代码热更新", "7.0.0"],
        "Jade": ["模板引擎", "1.11.0"],
        "Crypto-JS": ["标准加密库", "4.0.0"],
        "React.js": ["前端界面渲染", "17.0.2"],
        "Create React App": ["React 脚手架", "4.0.3"],
        "Material UI": ["符合 Material Design 规范的组件库，包括核心和样式", "17.0.2"],
        "Material UI Icons": ["Material UI 图标", "4.11.2"],
        "Material UI Data Grid": ["Material UI 数据表", "4.0.0"],
        "Material UI Pickers": ["Material UI 时间选择器", "3.3.10"],
        "Material UI Labs": ["Material UI 实验性内容", "4.0.0"],
        "React Cookies": ["Cookie 操作", "0.1.1"],
        "React Hotkeys": ["快捷键设置", "0.1.1"],
        "React Monaco": ["代码编辑器", "0.43.0"],
        "React Markdown": ["MARKDOWN 语法渲染", "6.0.2"],
        "Rehype Raw": ["HTML 语法渲染", "5.1.0"],
        "Rehype KaTeX": ["LaTeX 公式渲染", "0.13.11"],
        "React Syntax Highlighter": ["代码高亮", "0.43.0"],
        "React Compound Timer": ["计时器", "1.2.0"],
        "Recharts": ["统计表格绘制", "2.0.10"],
        "Axios": ["异步 HTTP 请求", "0.21.1"],
        "React App Rewired": ["Webpack 配置覆写", "2.1.8"],
        "Date-fns": ["日期工具", "2.22.1"],
        "Copy to Clipboard": ["剪切板复制", "3.3.1"],
        "Markdown to Text": ["MAKRDOWN 转换为纯文本", "1.0.1"],
        "Github CSS": ["Github MARKDOWN 样式表", "4.0.0"]
      },
      help: {
        "关于账号安全": {
          "登录令牌是什么？为什么会失效或过期？": "我们为每一个登录的账号分配一个令牌，实质上是一个十六进制字符串。每次向服务器请求信息或者做出操作时，只需要验证 UID 和令牌是否对应正确，就可以进行实际操作，而不需要总是验证账号和密码。重新登录或者二十四小时没有与服务器交互会使当前令牌失效，此时您会强制与服务器断开连接。",
          "会话是什么？为什么会过期？": "会话是打开一个新的 HARE 标签页时生成的特殊字符串，如果同时在多处登录了同一个账号，那么会话保证只有最新打开的标签页是有效的页面，可以与服务器交互，而其他的页面一旦与服务器交互就会被返回「409 Conflict」的错误提示。会话保证了您在与服务器交互时，存储在浏览器的数据都是最新的。",
          "我的个人信息是否会被泄露？": "您的信息全部存在服务器，不会向未同时持有您的账号密码或者 UID 和令牌的客户端提供信息。请注意，除了您的账号密码不能泄露，未失效或未过期的令牌、会话也不能泄露，否则有安全风险。在不打开控制台等正常网站操作下，您不会无意中泄露自己的令牌和会话。如果想要使当前令牌和会话失效，请直接退出登录，成功退出说明服务器删除了您当前的令牌和会话。请注意，令牌泄露会置您的信息被他人得知的风险；会话泄露会导致服务器上您的信息被他人修改。",
          "Cookie 记录了我的什么信息？": "Cookie 存储了您的 UID、令牌信息、版本号、邮箱（如果勾选了记住）与各种设置。Cookie 中的 UID 和令牌信息是您在直接关闭页面后二十四小时内重新进入网站免登录的保证。值得注意的是，会话并没有存在您的 Cookie 中，Cookie 中的 session 字段只是会话在某一时刻的快照。",
          "为什么本站的图片网址有时会显示「INVALID ARGUMENT」？": "您可能右键在新标签页打开了您的头像，或者将画廊中的链接复制给了他人。但是服务器不会泄露您的个人信息，请求图片需要验证您浏览器 Cookie 中的 UID 和令牌。如果您将图片网址传给了其他人，其他人由于没有您的令牌，不会得到图片。"
        },
        "关于使用方法": {
          "HARE 的主要功能是什么？什么是记忆组、记忆册和词条？": "HARE 类似于市面上可以买到的记忆卡片，正面写上单词，背面写上答案，通过自测的形式检验出对知识的掌握程度。在这方面表现优秀的有诸如 Anki 之类的软件，如果不习惯使用本应用，可以尝试其他「记忆卡片」类应用。词条即一张卡片，正面是问题，背面是答案。记忆册是一叠这样的卡片串起来的小册子，为了方便对册子归类，可以将记忆册放在不同的记忆组里。",
          "回忆和回想是什么？": "相当于将卡片一张张拿出，看正面问题，思考出答案再和背面的答案比对，标记这次回答是正确（○）还是错误（×）的过程。只有在每个记忆册的封面点击「回忆」才能将记录记在数据表格中并上传到服务器中，而且一次需要标记所有的词条。在其他地方都会进入「回想」，数据既不会被记录到数据表格，也不会被上传到服务器，而且可以自行选择词条。「回忆」和「回想」的区别相当于正式测试和随堂自测。",
          "什么是未知？": "当新创建一次回忆记录，但是还没有没标记的时候，这些词条在正在进行中的回忆中暂时地被标记为「未知（△）」，直到被标记；当一个记忆册已经被回忆若干次后，还添加了新的词条时，这个词条在已经结束的回忆中会被永久地标记为「未知」，除非在数据表格中手动修改。",
          "什么时候记忆记录会被上传到服务器？": "每次点击「回忆」，如果检测到计时仍在进行，就可以选择继续或清空标记并重新开始计时；如果没有检测到计时，就会新建一次记录（立即存在服务器中）并开始计时。如果清空了所有未标记的词条，或者在至少标记了一个词条后点击了「返回」或跳转到其他记忆册时，就会上传进度到服务器；如果在至少标记了一个词条的情况下直接关闭了页面，不会将记录上传到服务器。",
          "回忆撤销怎么用？": "如果在点击标记正确或错误时按错了，可以点击撤销取消最近一次标记。请注意，标记的历史记录存在本地，只有进入记忆界面的当此的最后 256 个操作可以撤销。如果记录已经上传到了服务器，请在数据表格处双击修改。",
          "结算界面的等级是怎么划分的？": "等级只按照问题正确率来划分，正确率 100% 为 A；高于 96% 为 B；高于 92% 为 C；高于 84% 为 D；高于 72% 为 E；正确率低于上述最低标准的记为 F。如果您不喜欢现在的评级方式，我们也提供一种更加「音游」式的评级，即将 A ~ F 等级对应到 「X、S、A、B、C、D」。",
        },
        "关于编辑器": {
          "如何在 MARKDOWN 编辑器内插入图片？": "我们为每一个记忆册提供了一个画廊，默认每个册子最多可以保存 16 张图片。请上传大小不超过 1MB 的图片后，点击复制链接，然后将剪切板的内容直接粘贴到 MARKDOWN 服务器。请注意，由于服务器保护您的隐私，返回图片需要检查用户令牌，所以您可以在本站内的所有编辑器（甚至在本人的其他记忆册中）使用此图片，但是无法在其他地方（比如复制给别人）使用。",
          "除了画廊，还有什么方式插入图片？": "一般来说我们还有两种方法达成这个目标。第一种是直接使用 `![]()` 的方式引入图片，使用这种方式说明图片已经被您用某种方式存在了您指定的网址，而不需要存在我们的服务器上。同时您需要保证我们的 MARKDOWN 渲染器对于图片的请求不会被对方服务器由于 CORS 策略阻拦。第二种方式是让图片以 img 标签的形式存储 BASE64 编码在编辑器中。一般来说，较大的图片会占据编辑器的大量空间，这么做会让编辑过程变得麻烦。而且，服务器能接受的最大请求体大小不能超过 32KB，超过这个大小服务器并不会接受您的词条。",
          "为什么编辑器右键菜单总是英文？": "我们使用的编辑器是微软开发的开源编辑器 Monaco 编辑器，现在暂不支持在 ESM 模块下的本地化设置，造成的诸多不便敬请谅解。",
          "怎么在编辑器里面改变配置？": "在光标在 Monaco 编辑器的前提下，按 F1 可以查看 Mocano的配置项和快捷键（此处列出的快捷键比快捷键列表列出的多）。例如，您可以在 Monaco 编辑器用右键菜单或者快捷键 ALT+Z 设置编辑器内换行，浏览器 Cookie 将会记住这个设置。",
          "编辑器现在支持高亮什么语言？": "我们在 Monaco 编辑器支持代码块中 C，C++，C#，Java，Rust，Lua，Python，Ruby，JavaScript，TypeScript，CoffeeScript，HTML，XML，YML，MARKDOWN，JSON，CSS，LESS，SCSS，SQL，MySQL，PostgreSQL，Verilog，SystemVerilog，HCL，MIPS，Shell 的代码高亮。而 MARKDOWN 渲染器支持几乎所有代码的高亮处理，比如 JavaScript 或者 Monaco 编辑器不支持的 Haskell 等语言。注：Monaco 编辑器实际支持高亮的语言比上述列出的语言更多。"
        },
        "关于此应用": {
          "HARE 的名字是怎么来的？": "HARE 是晴天，即「晴れ」的罗马字拼写，这个词大概可以发音为 /hʌle/。在读这个词语的时候，嘴会相对长得比较大，给人以明媚空旷之感。这是作者非常喜欢的一个词语，所以将之作为这个网站的名字。",
          "HARE 的服务是否收费？服务器存储是否可靠？服务器提供多少存储空间？": "HARE 没有收费项目，但是相对的服务器并不是高性能服务器，因此服务提供不稳定。存储的数据可能有遗失的风险，请注意定期导出数据并保存到自己的设备上。默认对于每一位新用户，最多可以创建 8 个记忆组，每个记忆组最多可以创建 16 个记忆册，每个记忆册最多可以创建 64 个词条和 16 张图片。每个词条装在请求体中不超过 32KB 即可存储到服务器中，每张图片不可超过 1MB 大小即可被上传。如果达到这个上限，新建按钮将变灰，指示其不可用。",
          "HARE 是否开源？遇到错误提示或漏洞怎么办？": "HARE 目前暂不开源，如果遇到错误提示，请按照提示内容执行正确的操作；如果只有错误提醒而没有解决方案 （例如「服务器错误: INTERNAL SERVER ERROR」），这可能是漏洞，请将漏洞内容和复现方式告知作者。",
          "为什么网站有些内容屏幕显示不下？": "由于作者对于响应式布局了解不深，不能做到网站布局全平台适配。一般来说，电脑端上建议屏幕宽度大于 700 像素，能够保证较为良好的使用体验；而手机端上屏幕宽度至少要有 320 像素，才能保证最基本的使用体验。",
          "为什么打开控制台会看到有诸如「401 Unauthorized」的错误？为什么这个网站不能前进或后退？": "因为 Axios 异步 HTTP 请求会在控制台输出错误信息，但是这是网站运行的正常现象（比如「401 Unauthorized」只是因为 Cookie 中的 UID 和令牌与服务器的不一致，会跳转到登录界面）。另外，由于 HARE 是单页应用（SPA），页面内容变化全部在一个界面内完场，不会有页面跳转，所以前进和后退无效。",
          "HARE 的版本号是怎么规定的？": "版本号遵循「主版本号·次版本号·补丁」的原则，每修复一个漏洞，补丁版本号加一；每增加一个新功能，次版本号加一；每做出一个破坏性的、不可向下兼容的更新，主版本号加一。"
        }
      }
    }
  },
  menu: {
    editProfile: "编辑个人资料",
    changePassword: "更换密码",
    changeAvatar: "更换头像",
    changeLanguage: "更换显示语言",
    changeRank: "更换评级表示",
    viewCopyright: "关于",
    logout: "退出登录",
    fold: "折叠",
    unfold: "展开",
    editUnit: "编辑卡片组资料",
    editPage: "编辑卡片册资料",
    moveUp: "上移",
    moveDown: "下移",
    addUnitAbove: "在上方创建新卡片组",
    addPageAbove: "在上方创建新卡片册",
    addUnitBelow: "在下方创建新卡片组",
    addPageBelow: "在下方创建新卡片册",
    deleteUnit: "删除此卡片组",
    deletePage: "删除此卡片册"
  },
  message: {
    error: "错误",
    serverError: "服务器错误",
    newVersion: "HARE 已经升级到最新版本",
    signInBlank: "请填写邮箱和密码",
    changeAvatar: "头像已成功上传",
    nonImage: "上传的文件不是图片",
    largeImage: "上传的文件过大",
    unitNameError: "记忆组名长度应为 1 ~ 16 字符",
    pageNameError: "记忆册名长度应为 1 ~ 16 字符",
    imageNameError: "图片标题长度应为 1 ~ 16 字符",
    pagePresentError: "记忆册描述长度不能超过 512 个字符",
    userNameLengthError: "用户名长度应为 1 ~ 16 字符",
    userNameInvalidError: "用户名只能包含 ASCII 字符",
    telError: "电话长度不能超过 16 个字符",
    cityError: "城市名长度不能超过 16 个字符",
    invalidItemID: "指定的 ID 超出了范围",
    itemOverflow: "词条的内容过多",
    copyEmail: "电子邮箱已被复制到剪切板",
    saveRecall: "进度已被保存到服务器",
    completeRecall: "成功完成本次回忆，您的正确率是 {0}%",
    completeRecollect: "成功完成本次回想，此次记录不会被上传。您的正确率是 {0}%，评级为 {1}",
    oldPasswordBlank: "请填写当前密码",
    newPasswordRange: "新密码的长度超出范围",
    passwordChanged: "密码重置成功",
    changeRank: "评级表示已被切换为 {0}",
    copyImageLink: "此图片链接已被复制到剪切板，请直接复制到 MARKDOWN 编辑器。此图片在本网站之外无法显示。"
  },
  grid: {
    column: {
      itemID: "词条序号",
      query: "问题",
      key: "答案",
      time: "创建时间",
      timeFormatString: "yyyy-MM-dd hh:mm"
    },
    buttons: {
      delete: "删除",
      move: "移动",
      newItem: "新建",
      export: "导出",
      recollect: "回想"
    },
    menu: {
      recallSelected: "回忆选中的",
      recallFar: "回忆有错误记录的"
    },
    inherent: {
      noRowsLabel: "没有词条",
      noResultsOverlayLabel: "没有结果",
      errorOverlayDefaultLabel: "表格加载错误",
      toolbarDensity: "行高",
      toolbarDensityLabel: "行高",
      toolbarDensityCompact: "密集",
      toolbarDensityStandard: "标准",
      toolbarDensityComfortable: "稀疏",
      toolbarColumns: "列投影",
      toolbarColumnsLabel: "列投影",
      toolbarFilters: "过滤器",
      toolbarFiltersLabel: "过滤器",
      toolbarFiltersTooltipHide: "隐藏过滤器",
      toolbarFiltersTooltipShow: "显示过滤器",
      toolbarFiltersTooltipActive: (count) => `${count} 个生效过滤规则`,
      columnsPanelTextFieldLabel: "寻找列",
      columnsPanelDragIconLabel: "列重排",
      columnsPanelShowAllButton: "显示全部",
      columnsPanelHideAllButton: "隐藏全部",
      filterPanelAddFilter: "添加过滤规则",
      filterPanelDeleteIconLabel: "删除",
      filterPanelOperators: "谓词",
      filterPanelOperatorAnd: "且",
      filterPanelOperatorOr: "或",
      filterPanelColumns: "列",
      filterPanelInputLabel: "值",
      filterOperatorContains: "包含",
      filterOperatorEquals: "等于",
      filterOperatorStartsWith: "始于",
      filterOperatorEndsWith: "终于",
      filterOperatorIs: "为",
      filterOperatorNot: "不为",
      filterOperatorAfter: "晚于",
      filterOperatorOnOrAfter: "不早于",
      filterOperatorBefore: "早于",
      filterOperatorOnOrBefore: "不晚于",
      filterOperatorIsEmpty: "为空",
      filterOperatorIsNotEmpty: "不为空",
      filterValueAny: "任意值",
      filterValuePure: "正确的",
      filterValueFar: "错误的",
      filterValueLost: "无记录",
      columnHeaderFiltersTooltipActive: (count) => `${count} 个生效过滤规则`,
      footerRowSelected: (count) => `已选中 ${count.toLocaleString()} 行`,
      footerTotalRows: "总行数：",
      footerTotalVisibleRows: (visibleCount, totalCount) =>
        `${visibleCount.toLocaleString()} / ${totalCount.toLocaleString()}`,
      checkboxSelectionHeaderName: "选择",
      booleanCellTrueLabel: "真",
      booleanCellFalseLabel: "假"
    },
    ordinal: [
      "第一次", "第二次", "第三次", "第四次",
      "第五次", "第六次", "第七次", "第八次",
      "第九次", "第十次", "第十一次", "第十二次",
      "第十三次", "第十四次", "第十五次", "第十六次",
      "第十七次", "第十八次", "第十九次", "第二十次",
      "第二十一次", "第二十二次", "第二十三次", "第二十四次",
      "第二十五次", "第二十六次", "第二十七次", "第二十八次",
      "第二十九次", "第三十次", "第三十一次", "第三十二次",
      "第三十三次", "第三十四次", "第三十五次", "第三十六次",
      "第三十七次", "第三十八次", "第三十九次", "第四十次",
      "第四十一次", "第四十二次", "第四十三次", "第四十四次",
      "第四十五次", "第四十六次", "第四十七次", "第四十八次",
      "第四十九次", "第五十次", "第五十一次", "第五十二次",
      "第五十三次", "第五十四次", "第五十五次", "第五十六次",
      "第五十七次", "第五十八次", "第五十九次", "第六十次",
      "第六十一次", "第六十二次", "第六十三次", "第六十四次"
    ]
  },
  common: {
    back: "返回",
    ok: "确定",
    yes: "确定",
    apply: "应用"
  }
};

export default list;
