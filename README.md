# HARE

<img src="public/concept.ico" style="zoom:60%;" />

## 0 设计

### 0.1 框架

1. Web 前端框架：`React.js`，UI 框架：`Material UI`
2. Web 后端框架：`express.js`，数据库：`PostgreSQL`
3. 其他
    - 富文本编辑器：`Quill.js` 和公式 `KaTex`
    - SHA-256 加密密码：`crypto-JS`

### 0.2 界面

#### 0.2.1 登录

1. 账号（邮箱），密码
2. 登陆图片，可随机轮换
3. 不开放注册，仅在服务器后端提供注册

#### 0.2.2 主界面

1. 欢迎页：写一句没啥用的话？
2. 菜单栏：记忆册项目，分组展示，对全局修改的入口
3. 导航栏：显示项目名，对当前项目修改的入口
4. 弹出窗：消息，附加操作；加载转圈

以下是主界面的主要部分的形式

##### （一）概览页

1. 基本信息：图片，名称，简介
2. 基础功能列表：
    - 回忆（转二）：进行一轮记忆（接续上次<若有>还是重开）
    - 复习（转二）：只重新复习错误条目
    - 列表（转三）：查看所有记忆项目
    - 统计（转五）：查看统计信息

##### （二）回忆 / 复习

1. 按钮
    - 查看解释，隐藏解释
    - 标记为正确或错误
    - 跳到上一个或下一个
    - （复习）从复习列表清除，会将条目记录标记为全
    - 退出并保存当前进度
2. 正计时，退出保存进度；一次只能保存一个进度

##### （三）列表

视图并不修改条目的实际存储顺序和内容，

1. 排列视图
    - 依据：按照序号，按照错误次数，按照创建时间
    - 顺序：正序、逆序
    - 只查看正确或错误
    - 按当前视图导出（弹出）：导入和导出 `json` 格式；导出 Markdown 格式
2. 导入、按默认顺序导出：和视图中的按钮属于同一个
3. 显示：序号，问题提要，答案提要，统计数据，浏览
4. 详情：移动位置，添加条目，删除条目，人工修改统计结果
    - 添加：编辑，预览

##### （四）设置

1. 对于单个项目
    - 修改资料：图片，名称，简介
    - 清空记忆记录：全部，某一次
    - 删除项目
2. 全局设置
    - 创建、删除分组；创建、删除项目；拆分、合并项目
    - 编辑：分组重组，重排列
    - 设置：修改个人资料；上传外部 CSS；语言
    - 退出登录

##### （五）统计 ==待完善==

1. 基本数据
2. 平均回忆时间，单个回忆时间
3. 每一次记忆的数据，结算界面

##### （六）全局

- 「？」调出快捷键菜单（`useKeyPress` 钩子即可）
- 结算界面：

### 0.3 数据库

- PostgreSQL

    ```SQL
    userInfo(userID, email);
    userSetting(userID, avatar, username,
                city, tel, gender, birth);
    unit(unitID, userID, unitName);
    page(pageID, unitID, pageName, pageCover, pageDescribe);
    item(itemID, pageID, seq, createTime
         itemQuery, itemKey, itemRecord);
    track(trackID, pageID, startTime, endTime);
    ```

### 0.4 专有名词语义

这里的语义是规划时采用的中文自然语言，命名是内部变量的命名方式，与英文无关。

#### 0.4.1 界面

1. 登陆界面

    | 中文   | 命名       |
    | ------ | ---------- |
    | 登录   | `SignIn`   |
    | 邮箱   | `EMail`    |
    | 用户名 | `Username` |
    | 密码   | `Password` |
    | 退出   | `LogOut`   |

2. 主界面

    | 中文   | 命名         |
    | ------ | ------------ |
    | 主界面 | `Panel`      |
    | 欢迎页 | `Intro`      |
    | 列表   | `NavList`    |
    | 导航栏 | `NavBar`     |
    | 菜单   | `GlobalInfo` |
    | 信息   | `LocalInfo`  |

3. 快捷键

    | 中文                         | 命名                        |
    | ---------------------------- | --------------------------- |
    | 快捷键                       | `Shortcut`                  |
    | 插入条目                     | `InsertItem`                |
    | 选择题型                     | `InsertItemChooseType`      |
    | 增加一个选项                 | `InsertItemPushChoice`      |
    | 去除一个选项                 | `InsertItemPopChoice`       |
    | 插入下划线                   | `InsertItemInsertUnderline` |
    | 增加下划线                   | `InsertItemDrawUnderline`   |
    | 确定插入条目                 | `InsertItemConfirm`         |
    | 显示解释                     | `RecShowKey`                |
    | 隐藏解释                     | `RecHideKey`                |
    | 跳到下一个                   | `RecSkipNext`               |
    | 跳到上一个                   | `RecSkipPrev`               |
    | 标记为正确                   | `RecMarkPure`               |
    | 标记为错误                   | `RecMarkLost`               |
    | 清除错误标记（全部标为错误） | `RecForceClear`             |

#### 0.4.2 名词

1. 卡片组

    | 中文                   | 命名          |
    | ---------------------- | ------------- |
    | 册项目组               | `Unit`        |
    | 册项目（在册项目组中） | `Page`        |
    | 册项目宏观统计信息     | `PageTrack`   |
    | 册描述                 | `PagePresent` |
    | 册最大序列             | `PageSeq`     |
    | 册条目（在册项目中）   | `Item`        |
    | 册条目问题             | `ItemQuery`   |
    | 册条目答案             | `ItemKey`     |
    | 册条目记忆历史         | `ItemRecord`  |

2. 概念

    | 中文 | 命名        |
    | ---- | ----------- |
    | 回忆 | `Recall`    |
    | 复习 | `Recollect` |
    | 正确 | `Pure`      |
    | 错误 | `Lost`      |
    | 重组 | `Rearrange` |
    | 视图 | `View`      |
    | 令牌 | `Token`     |

    > # Recall 和 Recollect
    >
    > 两者差别很小，但是 Recollect 更有努力回想的含义。

3. 题型

    | 中文 | 命名      |
    | ---- | --------- |
    | 问答 | `Default` |
    | 选择 | `Choice`  |
    | 填空 | `Blank`   |
    | 判断 | `Judge`   |

#### 0.4.3 全局

1. 习惯

    | 中文         | 命名                  |
    | ------------ | --------------------- |
    | 循环变量     | `index`               |
    | 上级循环变量 | `supIndex`            |
    | 下级循环变量 | `subIndex`            |
    | 函数遍历变量 | `(entry, index)`      |
    | 请求与回复   | `(request, response)` |
    | 回调函数     | `callback`            |
    
2. React 层次

    | 中文 | 命名        |
    | ---- | ----------- |
    | 组件 | `Component` |
    | 单元 | `Unit`      |
    | 页面 | `Page`      |
    | 接口 | `Interface` |

## 1 备忘

### 1.1 约定配置

#### 1.1.1 NPM 脚本

1. `npm run build` 是生成 React 的 `build` 文件的指令；`npm run build-copy` 在前者的基础上将 `build` 复制到了 `server/build`，由于 `ROBOCOPY` 指令执行成功会返回比 `7` 小的数值，导致 `npm` 报错，请忽略 `npm` 的报错。
2. `npm run server` 是运行 `Express` 服务器的指令。注意：在 `server` 下运行 `npm run server` 会传入 `--disable-cors` 的参数，导致跨域失败；另外，服务器下面的指令也不支持热更新。

#### 1.1.2 路径

1. 在 `server/build` 中存放的是 React 生成的单页应用，这个目录不能有其他的内容，否则会被下一次 `npm run build` 覆盖。
2. SPA 通过检测自己的端口号为 `3000` 时，认为是开发模式；此时会向 `http://localhost:8000/` 请求数据；除此之外均认为是发布模式，会通过 `axios` 直接向 `/` 请求数据。

### 1.2 通讯

1. 登录时，服务器返回 `uid` 分配一个令牌 `token`；`uid` 用于获取资源，`token` 用于取得与服务器得到 `/data` 下其他数据的许可
2. 在浏览器端，`uid` 和 `token` 保存一天在 `cookie` 中
    - 点开新网页或者刷新，检测 `cookie`；
    - 每一次请求回应后更新过期时间（请求时间点顺延一天）；
    - 如果服务器返回了错误表示令牌错误，说明可能发生了异地登陆等情况，退出到登陆界面；
    - 如果服务器返回了错误表示令牌过期，说明可能发生了页面长时间（超过一天）没有请求等情况，退出到登陆界面
3. 在服务器端，`uid` 和 `token` 一直保存，同时维护一个最后请求时间
    - 当有新的登录要求时，覆盖原来的令牌；
    - 当有新的请求时，更新最后请求时间；
    - 当请求提供了错误的令牌，回应异常状态码；
    - 当请求提供了正确的令牌，但是最后请求时间距现在超过了一天，也回应异常状态码

> 家贫，无从致书以观。

<p align="right"> Ichinoe Mizue </p>