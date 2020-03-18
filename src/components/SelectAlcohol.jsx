import React, { Component } from "react";
import axios from "axios";
import { Grid } from "semantic-ui-react";

class SelectAlcohol extends Component {
  state = {
    alcoholList: []
  };
  setAlcohol(event) {
    this.setState({
      selectedAlcohol: event.target.value
    });
  }

  async onSearchHandler() {
    let result = await axios.get(
      `/alcohols?country=Sverige&q=${this.state.selectedAlcohol}`
    );
    this.setState({
      alcoholList: result.data.alcohols
    });
  }
  render() {
    let alcoholIndex;
    if (this.state.alcoholList !== []) {
      alcoholIndex = this.state.alcoholList.map(alcohol => {
        return (
          <Grid.Row columns={6}>
            <Grid.Column>
              <div className="image">
                <img
                  className="drinkImage"
                  src={alcohol.Thumbnail.ImageUrl}
                  alt="alcohol selection"
                />
              </div>

              {alcohol.ProductNameBold}
              {alcohol.ProductNameThin}
              {alcohol.PriceText}
              {alcohol.VolumeText}
            </Grid.Column>
          </Grid.Row>
        );
      });
    }
    return (
      <>
        <select
          key="alcohols"
          id="alcohol_selector"
          onChange={this.setAlcohol.bind(this)}
        >
          <option value="Vodka">Vodka</option>
          <option value="Gin">Gin</option>
          <option value="Whisky">Whisky</option>
          <option value="Mörk rom">Dark Rum</option>
          <option value="Ljus rom">Light Rum</option>
          <option value="Smaksatt sprit">Flavoured Liquor</option>
          <option value="Smaksatt vodka">Flavoured Vodka</option>
        </select>
        <button id="search_button" onClick={this.onSearchHandler.bind(this)}>
          Search
        </button>
        <div id="alcohol_list" className="ui cards">
          {alcoholIndex}
        </div>
      </>
    );
  }
}
export default SelectAlcohol;
