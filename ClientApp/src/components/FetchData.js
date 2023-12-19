import React, { Component ,useState } from 'react';
import axios from 'axios';
import ItemsList from './ItemsList';

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
    this.state = { items: [], loading: true
     };
  }


  componentDidMount() {
    this.populateItemsData();
  }


  static renderItemsList(items) {
    return (
    <ItemsList items = {items} itemsPerPage={8}/>
    );
  };


  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchData.renderItemsList(this.state.items);

    return (
      <div>
        {contents}
      </div>
    );
  }

  async populateItemsData() {
   await axios.get("items/getitems").then(result => {
    const response = result.data;
    this.setState({ items: response, loading: false });

   })
  }
}

