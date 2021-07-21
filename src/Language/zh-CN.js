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
      nilPresent: "没有描述"
    }
  },
  popup: {
    language: "更换显示语言",
    kick: {
      title: "与服务器断开连接",
      text: "由于令牌无效或过期，服务器拒绝了您的请求，请重新登录。"
    },
    signUp: {
      title: "注册暂不可用",
      text: "我们暂时不提供注册功能，如有需要请联系作者在后台直接注册。"
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
      text: "新词条会被插到指定的 ID 的位置，ID {0}{1}。",
      supply: "；在指定位置之后的词条会向后顺延 1 号",
      itemID: "词条 ID",
      query: "问题 Markdown 编辑器",
      key: "回答 Markdown 编辑器",
      onlyOne: "只能为 1",
      aboveOne: "的范围是 1 ~ {0}",
      exitTitle: "退出确认",
      exitText: "您正准备放弃所有已编辑内容并退出新建词条的过程，请点击「确定」以退出。",
      applyTitle: "提交确认",
      applyText: "您正准备提交新词条（虽然从未编辑“答案”部分），请点击「确定」以继续。",
      helpTitle: "帮助",
      helpText: [
        [
          "怎么在 MARKDOWN 编辑器内插入图片？",
          "一般来说我们有两种方法达成这个目标。第一种是直接使用 `![]()` 的方式引入图片，使用这种方式说明图片已经被您用某种方式存在了您指定的网址，而不需要存在我们的服务器上。同时您需要保证我们的 MARKDOWN 渲染器对于图片的请求不会被对方服务器由于 CORS 策略阻拦。第二种方式是使用右键菜单的上传图片，图片会以 img 标签的形式存储 BASE64 编码在编辑器中。一般来说，较大的图片会占据编辑器的大量空间，这么做会让编辑过程变得麻烦。"
        ],
        [
          "为什么编辑器右键菜单总是英文？",
          "我们使用的编辑器是微软开发的开源编辑器 Monaco 编辑器，现在暂不支持在 ESM 模块下的本地化设置，造成的诸多不便敬请谅解。"
        ],
        [
          "怎么在编辑器里面改变自动换行？",
          "您可以在 Monaco 编辑器用右键菜单或者快捷键 ALT+Z 设置编辑器内换行，浏览器 Cookie 将会记住这个设置。"
        ],
        [
          "编辑器现在支持高亮什么语言？",
          "我们在 Monaco 编辑器支持代码块中 C，C++，C#，Java，Rust，Lua，Python，Ruby，JavaScript，TypeScript，CoffeeScript，HTML，XML，YML，MARKDOWN，JSON，CSS，LESS，SCSS，SQL，MySQL，PostgreSQL，Verilog，SystemVerilog，HCL，MIPS，Shell 的代码高亮。而 MARKDOWN 渲染器支持几乎所有代码的高亮处理，比如 JavaScript 或者 Monaco 编辑器不支持的 Haskell 等语言。注：Monaco 编辑器实际支持高亮的语言比上述列出的语言更多。"
        ]
      ],
    },
    edit: {
      titleUnit: "编辑记忆组信息",
      labelUnit: "记忆组名",
      textUnit: "更改当前记忆组名，然后点击「应用」以继续。"
    },
    logout: {
      title: "退出登录确认",
      text: "您正准备退出 HARE 登录状态，请点击「确定」以登出。",
    },
    delete: {
      title: "删除确认",
      unit: "您正准备删除记忆组「{0}」，请点击「确定」以继续。",
      page: "您正准备删除记忆册「{0}」，请点击「确定」以继续。",
      item: "您正准备删除此词条，请点击「确定」以继续。"
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
    katex: {
      title: "公式",
      text: "在文本框输入 LaTeX 公式并在下方预览。",
      label: "LaTeX 公式"
    },
    about: {
      title: "关于 HARE",
      tab: ["基本信息", "帮助"],
      info: {
      },
      help: {
        "关于服务器": {
        },
        "关于编辑器": {
          "怎么在 MARKDOWN 编辑器内插入图片？": "一般来说我们有两种方法达成这个目标。第一种是直接使用 `![]()` 的方式引入图片，使用这种方式说明图片已经被您用某种方式存在了您指定的网址，而不需要存在我们的服务器上。同时您需要保证我们的 MARKDOWN 渲染器对于图片的请求不会被对方服务器由于 CORS 策略阻拦。第二种方式是使用右键菜单的上传图片，图片会以 img 标签的形式存储 BASE64 编码在编辑器中。一般来说，较大的图片会占据编辑器的大量空间，这么做会让编辑过程变得麻烦。",
          "为什么编辑器右键菜单总是英文？": "我们使用的编辑器是微软开发的开源编辑器 Monaco 编辑器，现在暂不支持在 ESM 模块下的本地化设置，造成的诸多不便敬请谅解。",
          "怎么在编辑器里面改变自动换行？": "您可以在 Monaco 编辑器用右键菜单或者快捷键 ALT+Z 设置编辑器内换行，浏览器 Cookie 将会记住这个设置。",
          "编辑器现在支持高亮什么语言？": "我们在 Monaco 编辑器支持代码块中 C，C++，C#，Java，Rust，Lua，Python，Ruby，JavaScript，TypeScript，CoffeeScript，HTML，XML，YML，MARKDOWN，JSON，CSS，LESS，SCSS，SQL，MySQL，PostgreSQL，Verilog，SystemVerilog，HCL，MIPS，Shell 的代码高亮。而 MARKDOWN 渲染器支持几乎所有代码的高亮处理，比如 JavaScript 或者 Monaco 编辑器不支持的 Haskell 等语言。注：Monaco 编辑器实际支持高亮的语言比上述列出的语言更多。"
        }
      }
    }
  },
  menu: {
    editProfile: "编辑个人资料",
    changeAvatar: "更换头像",
    changeLanguage: "更换显示语言",
    viewCopyright: "查看版权信息",
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
    signInBlank: "请填写邮箱和密码",
    changeAvatar: "头像已成功上传",
    nonImage: "上传的文件不是图片",
    largeImage: "上传的文件过大",
    unitNameError: "记忆组名长度应为 1 ~ 16 字符",
    pageNameError: "记忆册名长度应为 1 ~ 16 字符",
    pagePresentError: "记忆册描述长度不能超过 512 个字符",
    userNameLengthError: "用户名长度应为 1 ~ 16 字符",
    userNameInvalidError: "用户名只能包含 ASCII 字符",
    telError: "电话长度不能超过 16 个字符",
    cityError: "城市名长度不能超过 16 个字符",
    invalidItemID: "指定的 ID 超出了范围"
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
      recollect: "回忆"
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
