export const startingCode = () => {
  return `import React from "react";
import ReactDOM from "react-dom";
const App = () => <div>Hello World</div>;
ReactDOM.render(<App />, document.querySelector("#root"));`;
};

export const showDomError = (error: { message: string }) => {
  return `document.querySelector("#root").innerHTML = '<div style="color: red"><h3>Runtime Error</h3>${error.message}</div>';`;
};