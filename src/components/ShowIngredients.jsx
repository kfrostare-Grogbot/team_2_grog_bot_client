import React, { Component } from "react";
import axios from "axios";


class ShowIngredients extends Component {
  state = {
    ingredientsList: []
  };

  componentDidMount() {
    axios.get("/ingredients").then(response => {
      this.setState({
        ingredientsList: response.data.ingredients
      });
    });
  }

  render() {
    let ingredientsOptions;
    if (this.state.ingredientsList !== []) {
      ingredientsOptions = this.state.ingredientsList.map(ingredient => {
        return (
          <option key={ingredient} value={ingredient}>
            {ingredient}
          </option>
        );
      });
    }
    return (
      <>
        <select id="ingredients_index" onChange={this.props.setIngredient}>
          {ingredientsOptions}
        </select>
      </>
    );
  }
}

export default ShowIngredients;
