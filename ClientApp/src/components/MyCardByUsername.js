import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";

const MyCardByUsername =() => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user} = useAuth0();
  
    useEffect(() => {
      const populateItemsData = async () => {
        try {
          const result = await axios.post(`items/fromcard`, {
            "UserName": user.name,
            "UserEmail":user.email
          });
          const response = result.data;
          setItems(response);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      };
      populateItemsData();
    }, []);

    const updateValue = async() =>{
      await axios.put("/items/confirmeorder",{
        "UserName": user.name,
        "UserEmail":user.email
      });
    }
  
    const renderItemsList = (items) => {
      let total = 0; 
      return (
        <div>
              <table class="table">
              <thead  class="table-dark">
                <tr>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col">Your shoping card</th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
                <tr>
                  <th scope="col">Item Id</th>
                  <th scope="col">Item Name</th>
                  <th scope="col">Item Count</th>
                  <th scope="col">Item Price</th>
                  <th scope="col">Sum</th>
                </tr>
              </thead>
              <tbody>
              {items.map((item, index) => {
                total += item.item.itemPrice * item.userCount;
                return (
                <tr>
                <th scope="row">{item.item.id}</th>
                <td>{item.item.itemName}</td>
                <td>{item.userCount}</td>
                <td>{item.item.itemPrice}$</td>
                <td>{item.item.itemPrice * item.userCount}$</td>
                </tr>
                );
                } )}
             <tr>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col">Final price:</th>
                  <th scope="col">{total}$</th>
                </tr>
              </tbody>
            </table>
          <button className= "btn btn-success" onClick={() =>  updateValue()} >Confirm order</button>
        </div>
      );
    };
  
    const contents = loading
      ? <p><em>Loading...</em></p>
      : renderItemsList(items);
  
    return (
      <div>
        {contents}
      </div>
    );
  }
  
  export default MyCardByUsername;