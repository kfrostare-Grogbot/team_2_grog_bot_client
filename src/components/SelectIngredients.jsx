import React, { Component } from "react";
import ShowIngredients from "./ShowIngredients";
import SelectAlcohol from "./SelectAlcohol";
import axios from "axios";
import { Button, Header, Image, Modal } from "semantic-ui-react";

class SelectIngredients extends Component {
  state = {
    selectedIngredient: "Coca-Cola",
    cocktailList: [],
    selectedCocktail: []
  };

  setIngredient(event) {
    this.setState({
      selectedIngredient: event.target.value
    });
  }

  async submitHandler() {
    let result = await axios.get(
      `/cocktails?q=${this.state.selectedIngredient}`
    );
    this.setState({
      cocktailList: result.data.drinks
    });
  }

  async getDetails(event) {
    let id = event.target.dataset.id;
    let result = await axios.get(`/cocktails/${id}`);
    this.setState({
      selectedCocktail: result.data.drink
    });
  }

  render() {
    let cocktailIndex, renderSpecificCocktail;
    let cocktailDetails = this.state.selectedCocktail;

    if (this.state.cocktailList !== []) {
      cocktailIndex = this.state.cocktailList.map(cocktail => {
        return (
          <div className="card small cocktail-container" id={cocktail.strDrink}>
            <div className="image">
              <img
                className="drinkImage"
                src={cocktail.strDrinkThumb}
                alt="Cocktail"
              />
            </div>
            <div class="content">
              <div className="header">{cocktail.strDrink}</div>
              <div class="description_bottom">
                <button
                  key={cocktail.idDrink}
                  data-id={cocktail.idDrink}
                  onClick={this.getDetails.bind(this)}
                >
                  {cocktail.strDrink}
                </button>
              </div>
            </div>
          </div>
        );
      });
    }

    if (cocktailDetails.id > 0) {
      renderSpecificCocktail = (
        <div
          className="card"
          key={cocktailDetails.id}
          id="specific-cocktail-container"
        >
          <div className="image left">
            <img
              className="drinkImage"
              src={cocktailDetails.image}
              alt="Cocktail"
            />
          </div>
          <div className="content">
            <div className="header1">{cocktailDetails.name}</div>
            <div className="meta">{cocktailDetails.category}</div>
            <div className="description">
              Ingredients:
              {cocktailDetails.ingredients.map(item => {
                return (
                  <div key={cocktailDetails.id} id="ingredients-container">
                    {item.name} {item.measure}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="extra content">
            Instructions: {cocktailDetails.instructions}
          </div>
          <div className="extra content">Glass: {cocktailDetails.glass}</div>
          <SelectAlcohol />
        </div>
      );
    }

    return (
      <>
        <div className="top">
          <p>Let's get you some cocktails! Select a virgin ingredient.</p>
          <ShowIngredients setIngredient={this.setIngredient.bind(this)} />

          <Button size="large" onClick={this.submitHandler.bind(this)}>
            Submit
          </Button>
        </div>

        <div className="middle">
          <div id="specific_cocktail" className="ui cards">
            {renderSpecificCocktail}
          </div>
        </div>
        <div id="cocktail_list" className="ui cards">
          {cocktailIndex}
        </div>
        <div></div>
      </>
    );
  }
}

export default SelectIngredients;
