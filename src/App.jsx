import React from "react";
import SelectIngredients from "./components/SelectIngredients";
import "semantic-ui-css/semantic.min.css";

const App = () => {
  return (
    <div id="logo">
      <img id="logo" src={require("./assets/grog_bot_small.png")} />
      <div>
      <SelectIngredients />
      </div>
    </div>
   
    
  );
};

export default App;