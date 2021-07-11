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
      "1, 2, ⑨!"
    ],
    cover: {
      createTime: "Created at {0}",
      details: "Details",
      recall: "Recall",
      view: "View Items",
      stat: "Statistics",
      nilPresent: "No Description"
    }
  },
  popup: {
    language: "Change the Displaying Language",
    kick: {
      title: "Disconnect from Server",
      text: "The server reject your request for invalid or expired token. Please re-login."
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
    edit: {
      titleUnit: "Edit Group Information",
      labelUnit: "Group Name",
      textUnit: "Type your desired name and click 'APPLY' to continue."
    },
    logout: {
      title: "Logout Confirmation",
      text: "You are attempting to quit your HARE account. Please click 'YES' to logout."
    },
    delete: {
      title: "Deletion Confirmation",
      unit: "You are attempting to delete the unit '{0}'. Please click 'YES' to continue.",
      page: "You are attempting to delete the booklet '{0}'. Please click 'YES' to continue.",
      item: "You are attempting to delete this entry. Please click 'YES' to continue."
    },
    profile: {
      userName: "Username",
      userID: "UID",
      email: "E-mail",
      birth: "Birthday",
      gender: "Gender",
      tel: "TEL",
      city: "City"
    }
  },
  menu: {
    editProfile: "Edit Profile",
    changeAvatar: "Change Avatar",
    changeLanguage: "Change Displaying Language",
    viewCopyright: "View Copyright Information",
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
    cityError: "The name of the city should be no more than 16 characters."
  },
  common: {
    back: "Back",
    ok: "OK",
    yes: "Yes",
    apply: "Apply"
  }
};

export default list;
