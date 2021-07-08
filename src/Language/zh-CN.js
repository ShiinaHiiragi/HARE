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
    initUnit: "创建新卡片组"
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
    logout: {
      title: "退出登录确认",
      text: "您正准备退出 HARE 登录状态，请点击「确定」以继续。",
    },
    delete: {
      title: "删除确认",
      unit: "您正准备删除记忆组「{0}」，请点击「确定」以继续。",
      page: "您正准备删除记忆册「{0}」，请点击「确定」以继续。",
      item: "您正准备删除此词条，请点击「确定」以继续。"
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
    signInBlank: "请填写邮箱和密码。",
    unitNameError: "记忆组名长度应为 0 ~ 16 字符",
    pageNameError: "记忆册名长度应为 0 ~ 16 字符",
    pagePresentError: "记忆册描述长度应为 0 ~ 514 字符"
  },
  common: {
    back: "返回",
    ok: "确定",
    yes: "确定",
    apply: "应用"
  }
};

export default list;
