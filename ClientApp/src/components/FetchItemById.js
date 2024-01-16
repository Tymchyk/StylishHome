import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ItemsScene from './ItemScene';
import { useAuth0 } from "@auth0/auth0-react";
import { ClipLoader } from 'react-spinners';

const FetchItems =() => {
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [count, setCount] = useState(0);
    const [price, setPrice] = useState(0);
    const { value } = useParams();
    const { user, isAuthenticated } = useAuth0();
    const [selectedItem, setSelectedItem] = useState(null);
  
    useEffect(() => {
      const populateItemsData = async () => {
        try {
          const result = await axios.get(`items/getitem/${value}`);
          const response = result.data;
          setItem(response);
          setLoading(false);
          if (response.length > 1) {
            handleItemClick(response[0]);
          }
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
        "ItemColorAndCountId":selectedItem.id
      }) 
    };
    const handleItemClick = (item) => {
      setCount(0);
      setPrice(0);
      setSelectedItem(item);
    };
  
    const renderItemsList = (item) => {
      return (
        <div>
           <div>
                <ItemsScene items={selectedItem} />
            </div>
          <h1 className="itemTitle">{selectedItem.item.itemName}</h1>
        <div style={{
                marginTop: '50px',
                marginLeft: '800px',
                display: 'flex'
              }}>
          {item.map((item, index) => (
            <div
              key={index}
              style={{
                marginLeft: '5px',
                width: '50px',
                height: '50px',
                backgroundColor: item.color,
                margin: '5px',
                cursor: 'pointer',
                border: '1px solid silver',
                display:'flex'
              }}
              onClick={() => handleItemClick(item)}
            ></div>
          ))}
          </div>
    
          {selectedItem && (
            <div>
              <div className="itemBlock">
                <h5> Price: {selectedItem.itemPrice}$</h5>
                <h5> Count: {selectedItem.countByColor}</h5>
                <p>Price for {count} items: {price} $</p>
                <div className='add_remove_container'>
                  <button className="btn btn-outline-light add_remove" onClick={() => incrementCount(selectedItem.itemPrice)} disabled={count === selectedItem.countByColor} ><img style={{ width: '20px' }} src={process.env.PUBLIC_URL + '/icons/add-outline.svg'} alt="Моє Зображення" /></button>
                  <button className="btn btn-outline-light add_remove" onClick={() => decrementCount(selectedItem.itemPrice)} disabled={count === 0}><img style={{ width: '20px' }} src={process.env.PUBLIC_URL + '/icons/remove-outline.svg'} alt="Моє Зображення" /></button>
                </div>
                {selectedItem.item.itemCount === 0 ? <p>The item is already on its way.</p> : null}
                {isAuthenticated ? (
                  <div>
                    <button className="btn btn-danger" onClick={() => addValueToCart(selectedItem.item.id)} disabled={selectedItem.item.itemCount === 0 || count === 0} >Add to Cart</button>
                  </div>
                ) : (
                  <div>
                    <p>You need to authorize</p>
                  </div>
                )}
                
              </div>
              <h2>Description:</h2>
              <h5 className="itemText">{selectedItem.item.itemDescription}</h5>
              <h5 >Size: {selectedItem.item.itemSize}</h5>
              <h5>Material: {selectedItem.item.itemMaterial}</h5>
              <h5 >Frame: {selectedItem.item.itemFrame}</h5>
            </div>
            
          )}
        </div>
      );
    };
    const contents = loading
      ? <div className="spinner">
          <ClipLoader color="#3498db" loading={loading} size={50} />
          <p className="loading-text">Loading</p>
        </div>
      : renderItemsList(item);
  
    return (
      <div>
        {contents}
      </div>
    );
  }
  
  export default FetchItems;