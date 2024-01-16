import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import { ClipLoader } from 'react-spinners';

const MyCardByUsername =() => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user} = useAuth0();
    const [buttonClick, setButtonClick] = useState(true);
  
    useEffect(() => {
      const populateItemsData = async () => {
        try {
          const result = await axios.post(`items/fromcard`, {
            "UserName": user.name,
            "UserEmail":user.email
          });
          const response = result.data;
          console.log(response);
          setItems(response);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      };
      if (buttonClick) {
      populateItemsData();
      setButtonClick(false);
      }
    }, [buttonClick]);

    const updateValue = async() =>{
      await axios.put("/items/confirmeorder",{
        "UserName": user.name,
        "UserEmail":user.email
      });
      setButtonClick(true);
    }
    const incrementValue = async(id) =>{
      console.log(id);
      await axios.put("/items/updateorder",{
        "UserName": user.name,
        "UserEmail":user.email,
        "itemid": id,
        "taskupdate":"increment"
      });
      setButtonClick(true);
    }
    const decrementValue = async(id) =>{
      await axios.put("/items/updateorder",{
        "UserName": user.name,
        "UserEmail":user.email,
        "itemid": id,
        "taskupdate":"decrement"
      });
      setButtonClick(true);
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
                  <th scope="col">Update</th>
                </tr>
              </thead>
              <tbody>
              {items.map((item, index) => {
                total += item.itemColorAndCount.itemPrice * item.userCount;
                return (
                <tr>
                <th scope="row">{item.item.id}</th>
                <td>{item.item.itemName}({item.itemColorAndCount.color})</td>
                <td>{item.userCount}</td>
                <td>{item.itemColorAndCount.itemPrice}$</td>
                <td>{item.itemColorAndCount.itemPrice * item.userCount}$</td>
                <td>
                <button className="btn btn-outline-light add_remove" onClick={ () => incrementValue(item.item.id) } disabled={item.userCount === item.itemColorAndCount.countByColor}><img style={{width: '20px'}} src={process.env.PUBLIC_URL + '/icons/add-outline.svg'} alt="Моє Зображення" /></button>
               <button className="btn btn-outline-light add_remove" onClick={ () => decrementValue(item.item.id)}><img style={{width: '20px'}} src={process.env.PUBLIC_URL + '/icons/remove-outline.svg'} alt="Моє Зображення" /></button>
                </td>
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
      ?  <div className="spinner">
            <ClipLoader color="#3498db" loading={loading} size={50} />
            <p className="loading-text">Loading</p>
          </div>
      : renderItemsList(items);
  
    return (
      <div>
        {contents}
      </div>
    );
  }
  
  export default MyCardByUsername;