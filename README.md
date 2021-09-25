# HARE

<div align="center">
  <img src="public/concept.ico" style="zoom:60%; text-align: center;" />
</div>

## 1 设计
### 1.1 未完成内容
- [ ] 自定义 CSS
- [ ] 动态导入语言模块

### 1.2 数据库
1. 数据库命令行
    - 注册 `sign <email> <username> <password>`
        - 大小写敏感，不能含有空格
    - 查看 `view <schema>`：
        - `schema` 忽略大小写，必须是下面列出的某个模式
    - 扩容 `cap <schema> <userID> <addition>`
        - `schema` 忽略大小写，必须是 `'unit', 'page', 'item', 'img'` 中的某个
        - `addition` 可以是负数
    - 查询 `sql <sql>`
        - 不能换行，最终用 `query` 函数执行
    - 执行 `eval <eval>`
        - 不能换行，最终用 `eval` 函数执行

      > 创造 ID 为 1 的账号，使用以下账号（修改密码）：
      >
      > ```shell
      > server> npm start
      > server> sign IchinoeMizue@outlook.com Ichinoe mono142857
      > server> cap unit 1 24
      > server> cap page 1 16
      > server> cap item 1 192
      > server> cap img 1 48
      > ```

2. PostgreSQL 模式

    ```sql
    create table userInfo (
      userID serial primary key,
      email varchar(32) unique not null)
    );
    create table userSetting (
      userID integer primary key references userInfo,
      unitSize integer not null default 0,
      password varchar(64) not null,
      username varchar(16) not null,
      avatar varchar(16),
      city varchar(16),
      tel varchar(16),
      gender char(1) default 'U',
      birth date default '2020-01-01',
      maxUnit integer default 16 not null,
      maxPage integer default 16 not null,
      maxItem integer default 64 not null,
      maxImg integer default 16 not null)
    );
    create table unit (
      userID integer not null,
      unitID integer not null,
      unitName varchar(16) not null,
      unitCreateTime timestamp not null,
      pageSize integer not null default 0,
      foreign key (userID)
      references userInfo(userID)
      initially deferred,
      primary key(userID, unitID))
    );
    create table page (
      userID integer not null,
      unitID integer not null,
      pageID integer not null,
      pageName varchar(16) not null,
      pagePresent varchar(512),
      pageCreateTime timestamp not null,
      pageCover smallint not null default 0,
      itemSize integer not null default 0,
      trackSize integer not null default 0,
      imgSize integer not null default 0,
      timeThis timestamp default null,
      foreign key(userID, unitID)
      references unit(userID, unitID)
      on update cascade on delete cascade,
      primary key(userID, unitID, pageID))
    );
    create table item (
      userID integer not null,
      unitID integer not null,
      pageID integer not null,
      itemID integer not null,
      itemCreateTime timestamp not null,
      itemQuery text not null,
      itemKey text not null,
      itemRecord char(1)[)
      foreign key(userID, unitID, pageID)
      references page(userID, unitID, pageID)
      on update cascade on delete cascade,
      primary key(userID, unitID, pageID, itemID))
    );
    create table track (
      userID integer not null,
      unitID integer not null,
      pageID integer not null,
      trackID integer not null,
      startTime timestamp,
      endTime timestamp,
      foreign key(userID, unitID, pageID)
      references page(userID, unitID, pageID)
      on update cascade on delete cascade,
      primary key(userID, unitID, pageID, trackID))
    );
    create table image (
      userID integer not null,
      unitID integer not null,
      pageID integer not null,
      imageID integer not null,
      imageName varchar(16) not null,
      imageCreateTime timestamp not null,
      imageType varchar(16) not null,
      imageByte integer not null,
      foreign key(userID, unitID, pageID) references page(userID, unitID, pageID)
      on update cascade on delete cascade,
      primary key(userID, unitID, pageID, imageID)
    );
    create table log (
      userID integer not null,
      unitID integer not null,
      pageID integer not null,
      itemID integer not null,
      trackID integer not null,
      modTime timestamp not null,
      src char(1) not null,
      dst char(1) not null,
      foreign key(userID, unitID, pageID, itemID) 
      references item(userID, unitID, pageID, itemID) 
      on update cascade on delete cascade,
      foreign key(userID, unitID, pageID, trackID) 
      references track(userID, unitID, pageID, trackID) 
      on update cascade on delete cascade,
      primary key(userID, unitID, pageID, trackID, modTime)
    );
    create table onlineUser (
      userID integer primary key references userInfo,
      token varchar(40) not null,
      lastTime timestamp not null)
    );
    ```

## 2 部署
1. 下载文件并安装对应依赖

    ```shell
    > git clone https://github.com/ShiinaHiiragi/hare
    > cd hare
    > npm install
    > npm run deploy
    > cd server
    > npm install
    ```

2. 下载 PostgreSQL，如果配置不顺利，建议下载版本 12.6。建立一个数据库（建议取名为 `hare`），将数据库名和密码填写到 `server/bin/setting.json` 中
3. 如果需要发布到公网，假设域名为 `s.ichinoe.xyz`，需要修改以下配置
    - 将域名填写到 `server/bin/api.jh` 的 `exports.domain` 字符串中
    - 将 SSL 证书放到 `server/bin/https` 下，名字按照例子名为 `1_s.ichinoe.xyz_bundle.crt` 和 `2_s.ichinoe.xyz.key`
4. 指令 `npm run server` 或 `npm run dev` 运行服务器

## 3 依赖
1. 服务端

    | 项目            | 说明                  | 版本    |
    | --------------- | --------------------- | ------- |
    | `Node.js`       | 服务端脚本            | 12.15.4 |
    | `Express.js`    | Node.js 服务器        | 4.16.1  |
    | `Node-Postgre`  | PostgreSQL 数据库连接 | 8.6.0   |
    | `Cookie Parser` | 服务端 Cookie 解析    | 1.4.4   |
    | `CORS`          | 跨域资源处理          | 2.8.5   |
    | `Node Dev`      | Node.js 代码热更新    | 7.0.0   |
    | `Morgan`        | 日志生成              | 1.9.1   |
    | `Crypto-JS`     | 标准加密库            | 4.0.0   |

2. 客户端

    | 项目                       | 说明                                              | 版本    |
    | -------------------------- | ------------------------------------------------- | ------- |
    | `Crypto-JS`                | 标准加密库                                        | 4.0.0   |
    | `React.js`                 | 前端界面渲染                                      | 17.0.2  |
    | `Create React App`         | React 脚手架                                      | 4.0.3   |
    | `Material UI`              | 符合 Material Design 规范的组件库，包括核心和样式 | 17.0.2  |
    | `Material UI Icons`        | Material UI 图标                                  | 4.11.2  |
    | `Material UI Data Grid`    | Material UI 数据表                                | 4.0.0   |
    | `Material UI Pickers`      | Material UI 时间选择器                            | 3.3.10  |
    | `Material UI Labs`         | Material UI 实验性内容                            | 4.0.0   |
    | `React Cookies`            | Cookie 操作                                       | 0.1.1   |
    | `React Hotkeys`            | 快捷键设置                                        | 0.1.1   |
    | `React Monaco`             | 代码编辑器                                        | 0.43.0  |
    | `React Markdown`           | MARKDOWN 语法渲染                                 | 6.0.2   |
    | `Rehype Raw`               | HTML 语法渲染                                     | 5.1.0   |
    | `Rehype KaTeX`             | LaTeX 公式渲染                                    | 0.13.11 |
    | `React Syntax Highlighter` | 代码高亮                                          | 0.43.0  |
    | `React Compound Timer`     | 计时器                                            | 1.2.0   |
    | `Recharts`                 | 统计表格绘制                                      | 2.0.10  |
    | `Axios`                    | 异步 HTTP 请求                                    | 0.21.1  |
    | `React App Rewired`        | Webpack 配置覆写                                  | 2.1.8   |
    | `Date-fns`                 | 日期工具                                          | 2.22.1  |
    | `Copy to Clipboard`        | 剪切板复制                                        | 3.3.1   |
    | `Markdown to Text`         | MAKRDOWN 转换为纯文本                             | 1.0.1   |
    | `Github CSS`               | Github MARKDOWN 样式表                            | 4.0.0   |

## 4 备忘
### 4.1 XGrid 修改记录
1. 删除水印产生：GridBody.tsx

    ```diff
    // delete line 37
    - <Watermark licenseStatus={rootProps.licenseStatus} />
    ```

2. 修改全选时的选择范围：useGridKeyboard.ts

    ```diff
    - apiRef.current.selectRows(apiRef.current.getAllRowIds(), true);
    + apiRef.current.selectRows(
    +  [...apiRef.current.getVisibleRowModels().keys()],
    +  true, true
    + );
    ```

3. 修改过滤器的项目为 `MenuItem`：GridFilterForm.tsx

    ```diff
    -  <option
    +  <MenuItem
        key={GridLinkOperator.And.toString()}
        value={GridLinkOperator.And.toString()}
      >
        {apiRef!.current.getLocaleText('filterPanelOperatorAnd')}
    -  </option>
    -  <option
    +  </MenuItem>
    +  <MenuItem
        key={GridLinkOperator.Or.toString()}
        value={GridLinkOperator.Or.toString()}
      >
        {apiRef!.current.getLocaleText('filterPanelOperatorOr')}
    -  </option>
    -  <option
    +  </MenuItem>
    +  <MenuItem
        key={col.field}
        value={col.field}
      >
        {col.headerName || col.field}
    -  </option>
    -  <option
    +  </MenuItem>
    +  <MenuItem
        key={operator.value}
        value={operator.value}
      >
        {operator.label ||
          apiRef!.current.getLocaleText(
            `filterOperator${capitalize(operator.value)}` as GridTranslationKeys,
          )}
    -  </option>
    +  </MenuItem>
    ```

    将上面的所有 `option` 改为 `MenuItem` 即可。**但是 `MenuItem` 不被识别为 `ClickAwayListener` 内部的组件，需要更改 `handleClickAway`：GridPanel.tsx**

    ```diff
    const handleClickAway = React.useCallback((event) => {
    +  if (event.target !== document.body)
         apiRef!.current.hidePreferences();
    }, [apiRef]);
    ```

4. 修改过滤器 `FormControl` 的间距：GridFilterForm.tsx

    ```diff
    columnSelect: {
      width: 150,
    + marginRight: 12
    }
    operatorSelect: {
      width: 120,
    + marginRight: 12
    }
    ```

5. 修改数字比较对应的标签：gridNumericOperators.tsx

    ```diff
    {
      // change [label] to '≠', but do not edit [value]
    - label: '!=',
    + label: '≠',
      value: '!=',
      getApplyFilterFn: (filterItem: GridFilterItem) => {
        if (!filterItem.value) {
          return null;
        }
    
        return ({ value }): boolean => {
          return Number(value) !== filterItem.value;
        };
      },
      InputComponent: GridFilterInputValue,
      InputComponentProps: { type: 'number' },
    }
    ```

6. 修改时间选择器，加入时间组件。即在输入内建类型标签为 `datetime-local` 时使用 `DateTimePicker` 而不是 `TextField`。
    - 如果今后需要选择 `date` 类型，那么也要特判，使用 `DatePicker`：GridFilterInputValue.tsx
    - `format` 使用的是 `localeText`，注意需要特别规定这里的文本内容

    ```tsx
    return (
      type === 'datetime-local'
      ? (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DateTimePicker
            disableFuture
            variant="inline"
            label={apiRef.current.getLocaleText('filterPanelInputLabel')}
            placeholder={apiRef.current.getLocaleText('filterPanelInputPlaceholder')}
            format={apiRef.current.getLocaleText('timeFormatStringFilter')}
            value={filterValueState || new Date()}
            onChange={onFilterChange}
          />
        </MuiPickersUtilsProvider>
      ) : (
        <TextField
          id={id}
          label={apiRef.current.getLocaleText('filterPanelInputLabel')}
          placeholder={apiRef.current.getLocaleText('filterPanelInputPlaceholder')}
          value={filterValueState}
          onChange={onFilterChange}
          type={type || 'text'}
          variant="standard"
          InputProps={InputProps}
          InputLabelProps={{
            shrink: true,
          }}
          {...singleSelectProps}
          {...others}
        />
      )
    );
    ```

    `DateTimePicker` 的 `onChange` 有区别，不是传入 `event` 而是直接传入修改后的值（Date 类型）

    ```tsx
    const onFilterChange = React.useCallback(
      (event) => {
        clearTimeout(filterTimeout.current);
        const value = type === 'datetime-local' ? event : event.target.value;
        setFilterValueState(value);
        ...
    ```

    `buildApplyFilterFn` 函数需要大改。首先，修改后的 `filterItem.value` 是 Date 类型，可以用 `setHours` 直接获得时间戳；其次，在本项目中，秒钟之后的时间需要被忽略，所以需要直接设为零后和前者比较。

    ```tsx
    function buildApplyFilterFn(
      filterItem: GridFilterItem,
      compareFn: (value1: number, value2: number) => boolean,
      showTime?: boolean
    ) {
      if (!filterItem.value) {
        return null;
      }
      // the RegExp is useless
      const time = filterItem.value.setHours(
        filterItem.value.getHours(),
        filterItem.value.getMinutes(),
        0,
        0
      );
    
      return ({ value }): boolean => {
        if (!value) {
          return false;
        }
        const valueAsDate = value instanceof Date ? value : new Date(value.toString());
        // must erase seconds and milliseconds
        // if (keepHours) {
        //   return compareFn(valueAsDate.getTime(), time);
        // }
    
        // Make a copy of the date to not reset the hours in the original object
        const dateCopy = value instanceof Date ? new Date(valueAsDate) : valueAsDate;
        const timeToCompare = dateCopy.setHours(
          showTime ? valueAsDate.getHours() : 0,
          showTime ? valueAsDate.getMinutes() : 0,
          0,
          0,
        );
        return compareFn(timeToCompare, time);
      };
    }
    ```

7. 移除占位符，将列投影面板改成不可选择的

    ```diff
    // delete line 96 in GridColumnsPanel.tsx
    - placeholder={apiRef!.current.getLocaleText('columnsPanelTextFieldPlaceholder')}
    // don't forget to add userSelect in GridPanelWrapper.tsx
    ```

### 4.2 通讯

1. 登录时，服务器返回 `uid` 分配一个令牌 `token`；`uid` 用于获取资源，`token` 用于取得与服务器得到其他数据的许可；每次打开一个新的页面，服务器分配一个会话 `session`，用于验证页面当前状态是最新状态。
2. 在浏览器端，`uid` 和 `token` 保存一天在 `cookie` 中
    - 点开新网页或者刷新，检测 `cookie`；更新 `session`，这个 `session` 是 `Panel` 的状态，随时会消失。
    - 每一次请求回应后更新过期时间（请求时间点顺延一天）；
    - 如果服务器返回了错误表示令牌错误，说明可能发生了异地登陆等情况，退出到登陆界面；
    - 如果服务器返回了错误表示令牌过期，说明可能发生了页面长时间（超过一天）没有请求等情况，退出到登陆界面
3. 在服务器端，`uid` 和 `token` 一直保存，同时维护一个最后请求时间
    - 当有新的登录要求时，覆盖原来的令牌；
    - 当有新的请求时，更新最后请求时间；
    - 当请求提供了错误的令牌，回应异常状态码；
    - 当请求提供了正确的令牌，但是最后请求时间距现在超过了一天，也回应异常状态码
4. 全部返回状态码

    | 状态码 | 名称                  | 出现时机                         |
    | ------ | --------------------- | -------------------------------- |
    | 200    | OK                    | 成功并返回消息                   |
    | 204    | No Content            | 成功且没有消息                   |
    | 304    | Not Modified          | （自动）成功且返回消息与上次一致 |
    | 401    | Not Authorized        | 令牌失效或过期                   |
    | 403    | Forbidden             | 账号密码错误或参数超出范围       |
    | 404    | Not Found             | （自动）找不到路由               |
    | 406    | Not Acceptable        | 缺少参数或参数不合法             |
    | 409    | Conflict              | 会话过期                         |
    | 500    | Internal Server Error | 服务器内部错误                   |

5. 使用的加密算法

    | 加密算法 | 位数 | 出现时机                             |
    | -------- | ---- | ------------------------------------ |
    | MD5      | 32   | 请求图片时的（随机）时间戳，刷新缓存 |
    | SHA1     | 40   | 保存图片的图片名，导出的 JSON 文件名 |
    | SHA224   | 56   | 生成会话                             |
    | SHA256   | 64   | 生成令牌                             |
    | SHA512   | 128  | 密码单向加密                         |

### 4.3 文件配置
#### 4.3.1 NPM 脚本
1. `npm run build` 是生成 React 的 `build` 文件的指令；`npm run deploy` 在前者的基础上将 `build` 复制到了 `server/build`，并删除原本在 `server/build` 内的所有文件
2. `npm run server` 是运行 `Express` 服务器的指令，也是运行 `server` 文件夹内的 `npm start`；`npm run dev` 是本地测试服务器的指令，同时是 `server` 文件夹内的同名指令
    - 运行 `npm run server` 会传入 `--disable-cors` 和 `--https` 的参数，导致跨域失败，同时开启 `https` 对应端口的监听
    - 运行 `npm run dev` 指令支持热更新

#### 4.3.2 路径
1. 在 `server/build` 中存放的是 React 生成的单页应用，这个目录不能有其他的内容，否则会被下一次 `npm run deploy` 覆盖
2. SPA 通过检测自己的端口号为 `3000` 时，认为是开发模式；此时会向 `http://localhost:8000/` 请求数据；除此之外均认为是发布模式，会通过 `axios` 直接向 `/` 请求数据
3. 服务器在 `--https` 模式下接收到 `http` 对应端口传来的请求时，会重定向到 `https` 对应监听的端口。如果 `https` 监听端口不是 `443`，则会在重定向 URL 中附加端口号

<p align="right"> Ichinoe Mizue </p>
