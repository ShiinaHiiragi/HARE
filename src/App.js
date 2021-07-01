import React from "react";

function App() {
  React.useEffect(() => {
    console.log(window.location.port);
  }, [])
  return (
    <div>
      <p> Hello World! </p>
    </div>
  );
}

export default App;