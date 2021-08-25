const list = {
  signIn: {
    title: "Sign in to HARE",
    email: "E-mail Address",
    password: "Password",
    memory: "Remember my E-mail",
    button: "SIGN IN",
    language: "Change the displaying language",
    signUp: "Don't have an account?",
    copyright: "Copyright"
  },
  panel: {
    initUnit: "Add New Group",
    intro: [
      "Welcome to HARE!",
      "It's said that pressing '?' may toggle shortcut list.",
      "Want higher ranking? Increasing the number of entries may work!",
      "Do not study anymore. Let's have fun!",
      "Are you Friends who want to study?",
      "Why do you log in? Do you have exams in the near future?",
      "It's said that if you recite 514 entries in one go, the website will explode.",
      "I'm cute. Please give me money.",
      "Are you awake? The operation was very successful.",
      "console.log(\"Hello World!\");",
      "';DROP TABLE *#",
      "q → (p → q)",
      "╠╠╠╠╠╠╠",
      "This is an apple. I like apples. Apples are good for our health.",
      "Today is a good day. What about tomorrow?",
      "Hard life, cat sigh.",
      "1, 2, ⑨!",
      "Can you borrow me a fishing pole?"
    ],
    cover: {
      createTime: "Created at {0}",
      details: "Details",
      recall: "Recall",
      view: "View Items",
      stat: "Statistics",
      gallery: "Gallery",
      nilPresent: "No Description"
    },
    recall: {
      switch: "Switch Question/Answer",
      revoke: "Revoke Latest Mark",
      previous: "Previous",
      next: "Next",
      pure: "Mark as Correct",
      far: "Mark as Fault",
      unload: "Your progress hasn't been upload."
    },
    stat: {
      totalTitle: "Overall Data",
      eachTitle: "The {0} Recall",
      precision: "Precision",
      judge: {
        tooLong: "Too Long",
        tooShort: "Too Short",
        tooOften: "Too Often",
        tooRare: "Too Rarely",
        tooFew: "Too Few Entries",
        noData: "No Data"
      },
      timeFormatString: "MM/dd/yyyy hh:mm:ss",
      ongoing: " (Ongoing)",
      avgSpan: "Average Timespan / Per Entry: ",
      avgInterval: "Average Interval: ",
      avgClass: "Average Correct / Average Fault / Average Unknown: ",
      variance: "Variance of Correct / Variance of Fault: ",
      varianceSame: "Variance: ",
      avgAcc: "Average Correct Rate / Average Fault Rate: ",
      bestWorst: "Best Correct Rate / Worst Fault Rate: ",
      class: "Frequency: ",
      acc: "Accuracy: ",
      timeSpan: [
        "Less than one second",
        (value) => value <= 1 ? "second" : "seconds",
        (value) => value <= 1 ? "minute" : "minutes",
        (value) => value <= 1 ? "hour" : "hours",
        (value) => value <= 1 ? "day" : "days",
      ],
      line: "Accuracy Changing Trend",
      bar: "Most Fault",
      barPure: "Correct",
      barFar: "Fault",
      recollect: "Recollect Faulted",
      clearEachRecall: "Clear This Recall",
      clearRecall: "Clear All"
    },
    gallery: {
      rename: "Rename",
      copy: "Copy Link",
      delete: "Delete",
      new: "New Image",
      timeFormatString: "MM/dd/yyyy hh:mm:ss"
    }
  },
  popup: {
    language: "Change the Displaying Language",
    kick: {
      title: "Disconnect from Server",
      text: "The server reject your request for invalid or expired token. Please re-login."
    },
    conflict: {
      title: "Page Expired",
      text: "The server reject your request for invalid session. Please click 'OK' to reload this page."
    },
    signUp: {
      title: "Sign Up is Unavailable Now",
      text: "We don't provide registration entry temporarily. You can contact the author to register in the server directly."
    },
    newUnitPage: {
      titleUnit: "Create New Group",
      titlePage: "Create New Booklet",
      textUnit: "A group should contain at least one booklet. Please enter the information of the first booklet in newly created group.",
      textPage: "Enter the information of new booklet.",
      unitName: "Name of New Group",
      pageName: "Name of New Booklet",
      pagePresent: "The Description of the Booklet Created"
    },
    newItem: {
      title: "Create New Entry",
      editTitle: "Edit Existed Entry",
      text: "The new entry will be inserted to the entry ID appointed, which {0}{1}.",
      editText: "Your are editing {0} of the entry whose ID is {1}.",
      editTextZero: { query: "question", key: "answer" },
      supply: "; those entries whose ID is larger will be put off",
      itemID: "Target Entry ID",
      query: "Question Markdown Editor",
      key: "Answer Markdown Editor",
      onlyOne: "can only be 1",
      aboveOne: "ranges from 1 to {0}",
      exitTitle: "Exit Confirm",
      exitText: "You are attempting to discard editing contents and quit. Please click 'YES' to continue.",
      applyTitle: "Submit Confirm",
      applyText: "You are attempting to submit a new entry, though you didn't edit 'Answer'. Please click 'YES' to continue submitting."
    },
    edit: {
      titleUnit: "Edit Group Information",
      labelUnit: "Group Name",
      textUnit: "Type your desired name and click 'APPLY' to continue.",
      titlePage: "Edit Booklet Information",
      textPage: "Type your desired name and description and click 'APPLY' to continue.",
      labelPageName: "Booklet Name",
      labelPagePresent: "The Description of the Booklet",
      titleMove: "Move Entry",
      textMove: "Type your desired target entry ID and click 'APPLY' to continue. The range of ID is 1 ~ {0}",
      labelMove: "Entry ID",
      cover: "Choose a Icon for this Booklet",
      track: "Change Record Manually"
    },
    password: {
      title: "Change Password",
      text: "Enter the current password and new password and click 'APPLY' to continue. The password should be between {0} ~ {1} characters.",
      old: "Current Password",
      new: "New Password"
    },
    logout: {
      title: "Logout Confirmation",
      text: "You are attempting to quit your HARE account. Please click 'YES' to logout."
    },
    delete: {
      title: "Deletion Confirmation",
      unit: "You are attempting to delete the unit '{0}'. Please click 'YES' to continue.",
      page: "You are attempting to delete the booklet '{0}'. Please click 'YES' to continue.",
      item: "You are attempting to delete {0}. Please click 'YES' to continue.",
      recall: "You are attempting to delete {0}. Please click 'YES' to continue.",
      part: "selected entries",
      all: "all entries",
      track: "all entries including records",
      single: "the {0} record",
      clear: "all records"
    },
    clear: {
      title: "Progress Choosing",
      text: "It's detected that the timing has been started. Will you start from scratch or continue the last progress?",
      restart: "Restart",
      continue: "Continue"
    },
    shortcut: {
      title: "Shortcuts List",
      table: {
        "Global": {
          "SHIFT+/": "Toggle Shortcut Dialogue",
          "SHIFT+1": "Toggle Volumn Dialogue",
          "TAB": "Move Focus",
          "F11": "Toggle Full Screen",
          "ESC": "Back to Cover Page"
        },
        "Recall Page": {
          "CTRL+A": "Switch Question/Answer",
          "CTRL+Z": "Revoke Latest Mark",
          "CTRL+X": "Mark as Fault",
          "CTRL+C": "Mark as Correct",
          "→": "Next",
          "←": "Previous"
        },
        "Data Grid Page": {
          "ESC": "Calcel entries' selected state",
          "DEL": "Delete entries selected",
          "CTRL+C": "Create new entry",
          "CTRL+M": "Move selected entry",
        },
        "Create New Item Page": {
          "F1": "Toggle Command Palette",
          "ALT+Z": "Switch Word Wrap",
          "CTRL+Q": "Insert MARKDOWN Underline",
          "CTRL+S": "Insert EM Space"
        }
      }
    },
    profile: {
      userName: "Username",
      userID: "UID",
      email: "E-mail",
      birth: "Birthday",
      gender: "Gender",
      tel: "TEL",
      city: "City"
    },
    volumn: {
      title: "Volumn Limit of Current Account",
      table: {
        maxUnit: "Group",
        maxPage: "Booklet",
        maxItem: "Entry",
        maxImg: "Gallery",
        recall: "Recall",
        image: "Image",
        item: "Entry Request",
        request: "Request Body"
      }
    },
    about: {
      title: "About HARE",
      tab: ["Information", "Log", "Help"],
      header: ["Dependency", "Description", "Version"],
      copyTip: "Copy to Clipboard",
      timeFormatString: "MM/dd yyyy",
      info: {
        "Node.js": ["Script for Server", "12.15.4"],
        "Express.js": ["Node.js Server", "4.16.1"],
        "Node-Postgre": ["Connecting to PostgreSQL Database", "8.6.0"],
        "Cookie Parser": ["Cookie Parser for Express", "1.4.4"],
        "CORS": ["Cross-Origin Resource Sharing", "2.8.5"],
        "Node Dev": ["Node.js Code Hot Update", "7.0.0"],
        "Jade": ["Template Engine", "1.11.0"],
        "Crypto-JS": ["Standard Encryption Library", "4.0.0"],
        "React.js": ["Front-end Interface Rendering", "17.0.2"],
        "Create React App": ["React Scaffold", "4.0.3"],
        "Material UI": ["Component Library Meeting Specification of Material Design, including Core and Styles", "17.0.2"],
        "Material UI Icons": ["Material UI Icons", "4.11.2"],
        "Material UI Data Grid": ["Material UI Data Table", "4.0.0"],
        "Material UI Pickers": ["Material UI Time Picker", "3.3.10"],
        "Material UI Labs": ["Material UI Experimental Content", "4.0.0"],
        "React Cookies": ["Cookie Operating", "0.1.1"],
        "React Hotkeys": ["Shortcut Settings", "0.1.1"],
        "React Monaco": ["Code Editor", "0.43.0"],
        "React Markdown": ["MARKDOWN Renderer", "6.0.2"],
        "Rehype Raw": ["HTML Renderer", "5.1.0"],
        "Rehype KaTeX": ["LaTeX Renderer", "0.13.11"],
        "React Syntax Highlighter": ["Code Highlight", "0.43.0"],
        "React Compound Timer": ["Timer when recalling", "1.2.0"],
        "Recharts": ["Statistics Charts Drawing", "2.0.10"],
        "Axios": ["Asynchronous HTTP Request", "0.21.1"],
        "React App Rewired": ["Webpack Configuration Override", "2.1.8"],
        "Date-fns": ["Date Tool", "2.22.1"],
        "Copy to Clipboard": ["Clipboard Copying", "3.3.1"],
        "Markdown to Text": ["Convert MARKDOWN String to Plain Text", "1.0.1"],
        "Github CSS": ["Stylesheet of Github Markdown", "4.0.0"]
      },
      help: {
        "About Account Security": {
          "What is token? Why is it invalid or expired?": "We assign a token to each login account, which is essentially a hexadecimal string. Every time you request information or perform an operation from the server, we only need to verify whether the UID and token, and then the actual operation can be performed, instead of always verifying the account and password. Logging in again or not interacting with the server for twenty-four hours will invalidate the current token, and you will be forced to disconnect from the server.",
          "What is session? Why does it expire?": "A session is a special string generated when a new HARE tab is opened. If the same account is logged in multiple places at the same time, the session ensures that only the latest opened tab is the valid page and is able to interact with the server, while once other pages interacting with the server, an error message of '409 Conflict' will be returned. The session ensures that when you interact with the server, the data stored in the browser is up to date.",
          "Will my personal information be leaked by HARE?": "All your information is stored on the server, and will not be provided to clients that do not hold your account password or UID and token at the same time. Please note that in addition to your account password, valid or unexpired tokens cannot be leaked either, otherwise there is a serious security risk. Under normal website operations not opening the console, you will not unconsciously reveal your token. If you want to invalidate the current token, please log out directly. If you log out successfully, the server has deleted your current token.",
          "What information does cookie record in my broswer?": "Cookies store your UID, token information, email (if remembered is checked), language, and editor line breaks. The UID and token information in the cookie is a guarantee for you to re-enter the website within 24 hours after you directly close the page without logging out.",
          "Why does the image of the avatar sometimes show INVALID ARGUMENT?": "You may open your avatar in a new tab by context menu. But the server will not reveal your avatar for requesting an avatar requires verification of the UID and token in your browser's cookie. If you pass the image URL to someone else, they won’t get the image because they don’t have your token."
        },
        "About Usage": {
          "What are the main functions of HARE? What is group, booklet and entry?": "HARE is similar to the memory cards that can be bought on the market, with words written on the front and answers on the back. There are softwares such as Anki that perform well in this field. If you are not used to using this application, you can try other memory card applications. The entry is a card with the question on the front and the answer on the back; the booklet is a booklet made up of a stack of such cards. In order to facilitate the classification of the booklets, the booklets can be placed in different groups.",
          "What is 'recall' and 'recollect'?": "It is equivalent to the process of taking out the cards one by one, looking at the front question, thinking about the answer, and comparing it with the answer on the back, marking whether the answer is correct (○) or fault (×). Only by clicking 'Recall' on the cover of each booklet can the records be recorded in the data grid and uploaded to the server, and all entries need to be marked at once. In other places, it will enter 'Recollect', the data will neither be recorded in the data grid nor uploaded to the server, and you can choose the entry by yourself. The difference between 'memory' and 'recall' is equivalent to a formal exam and a self-test.",
          "What is the 'unknown'?": "When a new memory record is created, but it has not been marked yet, these entries are temporarily marked as 'unknown (△)' in the ongoing memory until they are marked; when a booklets has been recalled several times and a new entry is added, the entry will be permanently marked as 'unknown' in the memory that has ended, unless it is manually modified in the data grid.",
          "When will the memory record be uploaded to the server?": "Each time you click 'Recall', if it is detected that the timing is still in progress, you can choose to continue or clear the mark and restart the timing; if the timing is not detected, a new record (will be save in the server immediately) and start timing will be created. If all unmarked entries are cleared, or when you click 'BACK' or jump to another booklet after marking at least one entry, the progress will be uploaded to the server; if the page is closed directly with at least one entry is marked, the record won't be uploaded to the server.",
          "How to use 'revoke'?": "If you press the wrong button when you click the mark buttons, you can click 'Revoke' to cancel the last mark. Please note that the marked history is stored locally, and only the last 256 operations can be revoked. If the record has been uploaded to the server, please double-click to modify in the data grid.",
          "How are the levels of the ranking panel divided?": "The level is only divided according to the correct rate of the question, the correct rate is 100% as A; higher than 96% is B; higher than 92% is C; higher than 84% is D; higher than 72% is E; the correct rate is lower than the above lowest standard will be marked as F. If you don’t like the current rating method, we also provide a more 'music game'-like rating, that is, the A ~ F level which corresponds to 'X, S, A, B, C, D'.",
        },
        "About Editor": {
          "How to upload image in markdown editor?": "There are two ways generally to upload your image. The one is to refer an address directly in `![]()` block, which means you have find a place to store your image other than our server and the request for the image won't be blocked by that server due to the CORS policy. The second way is to store the image in the form of an <img> tag with BASE64 encoding in the editor. Generally speaking, larger images will take up a lot of space in the editor, and doing so will make the editing process troublesome. Moreover, the maximum request body size that the server can accept cannot exceed 32KB, and the server will not accept your entry if it exceeds this size.",
          "Why is the context menu of editors always English?": "The Editor we are using is Monaco developed by Microsoft. The Monaco Editor doesn't support localization in ESM now. Sorry for inconvenience.",
          "How to change the configuration in the editor?": "With the cursor in the Monaco editor, press F1 to view Mocano's configuration items and shortcut keys (there are more shortcut keys listed here than in the shortcut list). For Example, you can change the wrap attribute by clicking 'Word Wrap' in context menu or just pressing 'ALT+Z'. This setting will be remembered by your browser cookie.",
          "What language does the editor support to highlight?": "We now choose to support C, C++, C#, Java, Rust, Lua, Python, Ruby, JavaScript, TypeScript, CoffeeScript, HTML, XML, YML, MARKDOWN, JSON, CSS, LESS, SCSS, SQL, MySQL, PostgreSQL, Verilog, SystemVerilog, HCL, MIPS, Shell in Monaco Editor. And the markdown renderer support  highlighting of almost all language such as JavaScript or Haskell, which Monaco Editor may not support yet. PS: the actual languages the Monaco Editor supports is much more than what we listed above."
        },
        "About Application": {
          "How does HARE's name come from?": "HARE means 'sunny', which is the Romanization spelling of '晴れ'. This word can probably be pronounced as /hʌle/. When reading this word, the mouth will grow relatively large, giving reader a feeling of brightness. This is a word that the author likes very much.",
          "Is there a fee for HARE's services? Is server storage reliable? How much storage space does the server provide?": "HARE does not have a charge, but relatively the server is not a high-performance machine, so service provision is unstable. The stored data may be at a risk of loss. Please export the data and save it to your own device regularly just in case. By default, for each new user, up to 8 groups can be created； each memory group can create up to 16 booklets, and each booklet can create up to 64 entries. Each entry can be stored in the server without exceeding 32KB loaded into the request body. If this limit is reached, the creating button will be grayed out, indicating that it is not available.",
          "Is HARE open source? What should I do if I encounter an error message or bug?": "HARE is not open-source currently. If you encounter an error message, please follow the prompt content to perform the correct operation; if there is only one error message without solutions, this may be a bug. Please inform the author of that bug and the way to reproduce.",
          "Why can't some content of the website be displayed fully on the screen?": "Because the author does not have a deep understanding of responsive layout, we cannot adapt the website layout to all platforms. Generally speaking, it is recommended that the screen width be greater than 700 pixels on the computer side to ensure a relatively good user experience; and the screen width on the mobile phone side must be at least 300 pixels to ensure the most basic user experience.",
          "Why do I see an error such as '401 Unauthorized' when I open the console? Why can't this website go back or forward?": "Because Axios asynchronous HTTP requests will output error messages in the console, but this is a normal phenomenon of website operation (for example, '401 Unauthorized' is just because the UID and token in the cookie are inconsistent with the server's, triggering jumping to the login interface). In addition, since HARE is a Single Page Application, all page content changes are completed in one interface, so there will be no page jumps.",
          "How is the version number of HARE regulated?": "The version number follows the principle of 'major.minor.patch'. Each time a bug is fixed, the patch version number is increased by one; each time a new feature is added, the minor version number is increased by one; each time a destructive and incompatible with the ealry ones is made, the major version number is increased by one."
        },
      }
    }
  },
  menu: {
    editProfile: "Edit Profile",
    changePassword: "Change Password",
    changeAvatar: "Change Avatar",
    changeLanguage: "Change Displaying Language",
    changeRank: "Change Display of Ranking",
    viewCopyright: "About HARE",
    logout: "Logout",
    fold: "Fold",
    unfold: "Unfold",
    editUnit: "Edit Group",
    editPage: "Edit Booklet",
    moveUp: "Move Up",
    moveDown: "Move Down",
    addUnitAbove: "Add New Group Above",
    addPageAbove: "Add New Booklet Above",
    addUnitBelow: "Add New Group Below",
    addPageBelow: "Add New Booklet Below",
    deleteUnit: "Delete this Group",
    deletePage: "Delete this Booklet"
  },
  message: {
    error: "Error",
    serverError: "Server Error",
    newVersion: "The HARE has been updated to the latest version.",
    signInBlank: "Please enter the E-mail and password.",
    changeAvatar: "Your avatar has been set successfully.",
    nonImage: "The file you selected is not image.",
    largeImage: "The file you selected is too large.",
    unitNameError: "The name of the group should be between 1 ~ 16 characters.",
    pageNameError: "The name of the booklet should be between 1 ~ 16 characters.",
    pagePresentError: "The description of the booklet should be no more than 512 characters.",
    userNameLengthError: "The username should be between 1 ~ 16 characters.",
    userNameInvalidError: "The username should only contain ASCII characters.",
    telError: "The name of the phone should be no more than 16 characters.",
    cityError: "The name of the city should be no more than 16 characters.",
    invalidItemID: "The target entry ID is out of range.",
    itemOverflow: "The size of this entry's content is out of range.",
    copyEmail: "The E-mail has been copied to your clipboard.",
    saveRecall: "The progress has been uploaded to server.",
    completeRecall: "The recall has been completed successfully. Your accuracy is {0}%.",
    completeRecollect: "The recollection has been completed successfully and the record won't be upload to the server. Your accuracy is {0}%, ranked {1}.",
    oldPasswordBlank: "Please fill in the current password.",
    newPasswordRange: "The size of new password is out of range.",
    passwordChanged: "Your password has been changed successfully.",
    changeRank: "The display of rank has been changed to {0}"
  },
  grid: {
    column: {
      itemID: "Entry ID",
      query: "Question",
      key: "Answer",
      time: "Time Created",
      timeFormatString: "MM/dd/yyyy hh:mm"
    },
    buttons: {
      delete: "Delete",
      move: "Move",
      newItem: "New",
      export: "Export",
      recollect: "Recollect"
    },
    menu: {
      recallSelected: "Recall Selected",
      recallFar: "Recall Faulted"
    },
    inherent: {
      noRowsLabel: "No rows",
      noResultsOverlayLabel: "No results found.",
      errorOverlayDefaultLabel: "An error occurred.",
      toolbarDensity: "Density",
      toolbarDensityLabel: "Density",
      toolbarDensityCompact: "Compact",
      toolbarDensityStandard: "Standard",
      toolbarDensityComfortable: "Comfortable",
      toolbarColumns: "Columns",
      toolbarColumnsLabel: "Select columns",
      toolbarFilters: "Filters",
      toolbarFiltersLabel: "Show filters",
      toolbarFiltersTooltipHide: "Hide filters",
      toolbarFiltersTooltipShow: "Show filters",
      toolbarFiltersTooltipActive: (count) =>
        count !== 1 ? `${count} active filters` : `${count} active filter`,
      toolbarExport: "Export",
      toolbarExportLabel: "Export",
      toolbarExportCSV: "Download as CSV",
      columnsPanelTextFieldLabel: "Find column",
      columnsPanelDragIconLabel: "Reorder column",
      columnsPanelShowAllButton: "Show all",
      columnsPanelHideAllButton: "Hide all",
      filterPanelAddFilter: "Add filter",
      filterPanelDeleteIconLabel: "Delete",
      filterPanelOperators: "Operators",
      filterPanelOperatorAnd: "And",
      filterPanelOperatorOr: "Or",
      filterPanelColumns: "Columns",
      filterPanelInputLabel: "Value",
      filterOperatorContains: "contains",
      filterOperatorEquals: "equals",
      filterOperatorStartsWith: "starts with",
      filterOperatorEndsWith: "ends with",
      filterOperatorIs: "is",
      filterOperatorNot: "is not",
      filterOperatorAfter: "is after",
      filterOperatorOnOrAfter: "is on or after",
      filterOperatorBefore: "is before",
      filterOperatorOnOrBefore: "is on or before",
      filterOperatorIsEmpty: "is empty",
      filterOperatorIsNotEmpty: "is not empty",
      filterValueAny: "any",
      filterValuePure: "correct",
      filterValueFar: "fault",
      filterValueLost: "lost",
      footerRowSelected: (count) =>
        count !== 1
          ? `${count.toLocaleString()} rows selected`
          : `${count.toLocaleString()} row selected`,
      footerTotalRows: "Total Rows:",
      footerTotalVisibleRows: (visibleCount, totalCount) =>
        `${visibleCount.toLocaleString()} of ${totalCount.toLocaleString()}`,
      checkboxSelectionHeaderName: "Checkbox selection",
      booleanCellTrueLabel: "true",
      booleanCellFalseLabel: "false"
    },
    ordinal: [
      "First",         "Second",         "Third",
      "Fourth",        "Fifth",          "Sixth",
      "Seventh",       "Eighth",         "Ninth",
      "Tenth",         "Eleventh",       "Twelfth",
      "Thirteenth",    "Fourteenth",     "Fifteenth",
      "Sixteenth",     "Seventeenth",    "Eighteenth",
      "Nineteenth",    "Twenty-first",   "Twenty-second",
      "Twenty-third",  "Twenty-fourth",  "Twenty-fifth",
      "Twenty-sixth",  "Twenty-seventh", "Twenty-eighth",
      "Twenty-ninth",  "Thirtieth",      "Thirty-first",
      "Thirty-second", "Thirty-third",   "Thirty-fourth",
      "Thirty-fifth",  "Thirty-sixth",   "Thirty-seventh",
      "Thirty-eighth", "Thirty-ninth",   "Fortieth",
      "Forty-first",   "Forty-second",   "Forty-third",
      "Forty-fourth",  "Forty-fifth",    "Forty-sixth",
      "Forty-seventh", "Forty-eighth",   "Forty-ninth",
      "Fiftieth",      "Fifty-first",    "Fifty-second",
      "Fifty-third",   "Fifty-fourth",   "Fifty-fifth",
      "Fifty-sixth",   "Fifty-seventh",  "Fifty-eighth",
      "Fifty-ninth",   "Sixtieth",       "Sixty-first",
      "Sixty-second",  "Sixty-third",    "Sixty-fourth"
    ]
  },
  common: {
    back: "Back",
    ok: "OK",
    yes: "Yes",
    apply: "Apply"
  }
};

export default list;
