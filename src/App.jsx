import React from "react";
import SelectIngredients from "./components/SelectIngredients";
import 'semantic-ui-css/semantic.min.css'
import { Logo } from './assets/grog_bot_small.png'

const App = () => {
  return (
    <>
      <img src={require('./assets/grogbot_logo.png')} />
      <SelectIngredients />
    </>
  );
};

export default App;
