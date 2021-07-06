const isDevMode = window.location.port === "3000";
const requestURL = isDevMode ? "http://localhost:8000" : "";

const drawerWidth = 300;
const nameMaxLength = 16, presentMaxLength = 512;
const initMenu = { mouseX: null, mouseY: null };

const nil = () => {};
const next = () => new Promise((resolve) => resolve);

export {
  requestURL,
  drawerWidth,
  nameMaxLength,
  presentMaxLength,
  initMenu,
  nil,
  next
};
export default requestURL;