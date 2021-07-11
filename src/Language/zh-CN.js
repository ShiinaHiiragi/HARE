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
      "1，2，⑨！"
    ]
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
    cityError: "城市名长度不能超过 16 个字符"
  },
  common: {
    back: "返回",
    ok: "确定",
    yes: "确定",
    apply: "应用"
  }
};

export default list;
