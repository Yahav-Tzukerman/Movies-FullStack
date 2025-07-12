import React from "react";
import AppButton from "./src/components/common/AppButton";

const Test = () => {
  return (
    <div>
      <h1>Test Component</h1>
      <p>If you see this, everything works!</p>
      <AppButton label="Click Me" onClick={() => alert("Button Clicked!")} />
    </div>
  );
};

export default Test;
