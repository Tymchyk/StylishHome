import React, { useState, useEffect} from 'react';
import axios from 'axios';
import ItemsList from './ItemsList';
import { useParams } from 'react-router-dom';

const FetchItems =() => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
  
    const { name } = useParams();
  
    useEffect(() => {
      const populateItemsData = async () => {
        try {
          const result = await axios.get(`items/getitems/${name}`);
          const response = result.data;
          setItems(response);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false);
        }
      };
  
      populateItemsData();
    }, [name]);
  
    const renderItemsList = (items) => {
      return (

        <ItemsList items={items} itemsPerPage={8} />
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
  
  export default FetchItems;