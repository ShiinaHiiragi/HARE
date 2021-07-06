const isDevMode = window.location.port === "3000";
const requestURL = isDevMode ? "http://localhost:8000" : "";
const initMenu = { mouseX: null, mouseY: null };
const nil = () => {};
const next = () => new Promise((resolve) => resolve);

export { requestURL, initMenu, nil, next };
export default requestURL;