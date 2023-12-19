import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";

const MyOrdersByUsername =() => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user} = useAuth0();
  
    useEffect(() => {
      const populateItemsData = async () => {
        try {
          const result = await axios.post(`items/myorders`, {
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

    const renderItemsList = (ordersData) => {
      return (
        <div>
      {ordersData.map((orderGroup, index) => {
        let total = 0;
        return (
        <div>
           <table class="table">
              <thead  class="table-dark">
                <tr>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col">Order № {orderGroup[0].orderNumber}</th>
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
          {orderGroup.map((order) => {
            total += order.item.itemPrice * order.userCount;
            return(
           <tr>
           <th scope="row">{order.item.id}</th>
           <td>{order.item.itemName}</td>
           <td>{order.userCount}</td>
           <td>{order.item.itemPrice}$</td>
           <td>{order.item.itemPrice * order.userCount}$</td>
           </tr>
            );
          })}

          <tr>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col">Final price:</th>
            <th scope="col">{total}$</th>
          </tr>
        </tbody>
      </table>
          
        </div>
        );
          })}
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
  
  export default MyOrdersByUsername;