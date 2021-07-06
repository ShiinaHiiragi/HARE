const isDevMode = window.location.port === "3000";
const requestURL = isDevMode ? "http://localhost:8000" : "";

const initMenu = { mouseX: null, mouseY: null };
const nameMaxLength = 16, presentMaxLength = 512;

const nil = () => {};
const next = () => new Promise((resolve) => resolve);

export {
  requestURL,
  initMenu,
  nameMaxLength,
  presentMaxLength,
  nil,
  next
};
export default requestURL;