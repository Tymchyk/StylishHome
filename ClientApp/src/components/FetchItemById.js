import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ItemsScene from './ItemScene';
import { useAuth0 } from "@auth0/auth0-react";

const FetchItems =() => {
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [count, setCount] = useState(0);
    const [price, setPrice] = useState(0);
    const { value } = useParams();
    const { user, isAuthenticated } = useAuth0();
  
    useEffect(() => {
      const populateItemsData = async () => {
        try {
          const result = await axios.get(`items/getitem/${value}`);
          const response = result.data;
          setItem(response);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      };
  
      populateItemsData();
    }, [value]);

    const incrementCount = (itemPrice) => {
      setCount(count +1 );
      const counter = count + 1;
      const value = counter * itemPrice
      setPrice(value);
    };
  
    const decrementCount = (itemPrice) => {
      setCount(count -1 );
      const counter = count - 1;
      const value = counter * itemPrice
      setPrice(value);
    };

    const addValueToCart = async(id) => {
      await axios.post('/items/addtocard', {
        "userName": user.name,
        "userEmail": user.email,
        "UserCount": count,
        "itemsid": id,
      }) 
    };
  
    const renderItemsList = (item) => {
      return (
        <div>
        <ItemsScene items = {item} />
        <div className ="itemBlock">
          <div className ="itemDescription">
          <h1 className="itemTitle">{item.itemName}</h1>
          <h5 className="itemText">{item.itemDescription}</h5>
          </div>
          <h6> Price: {item.itemPrice}$</h6>
          <h6> Count: {item.itemCount}</h6>
          {count === 0?<p></p>:
          <p>Price for {count} items: {price}</p>}
          <button onClick={() => incrementCount(item.itemPrice)} disabled={count === item.itemCount} >Increment</button>
          <button onClick={ () => decrementCount(item.itemPrice)} disabled={count === 0}>Decrement</button>
          {item.itemCount === 0?<p>The item is already on its way.</p>:<p></p>}
          {isAuthenticated ? (
              <div>
              <button className = "btn btn-danger" onClick={() =>  addValueToCart(item.id)} disabled={item.itemCount === 0 || count === 0 } >Add to Сart</button>
              </div>
            ) : (
              <div>
                <p>You need to authorize</p>
              </div>
            )}
        </div>
        </div>
      );
    };
  
    const contents = loading
      ? <p><em>Loading...</em></p>
      : renderItemsList(item);
  
    return (
      <div>
        {contents}
      </div>
    );
  }
  
  export default FetchItems;