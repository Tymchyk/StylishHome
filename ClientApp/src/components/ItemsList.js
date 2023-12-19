import React, { useState } from 'react';

import { Link } from 'react-router-dom';

const ItemsList = ({ items, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nearbyPages = [
    currentPage - 2,
    currentPage - 1,
    currentPage,
    currentPage + 1,
    currentPage + 2,
  ].filter((page) => page > 0 && page <= Math.ceil(items.length / itemsPerPage));

  return (
    <div>
    <div className="container">
    <div className="row row-cols-4">
      {currentItems.map((item, index) => (
            <div className="col" key={item.id}>
              <Link to = {`/item/${item.id}`}>     
               <div className="card">
                     {item.verticalRotation
                     ? (<img className="card-img-top sofa" src={process.env.PUBLIC_URL + '/images/' + item.imageName} alt="My image"/>)
                     : (<img className="card-img-top" src={process.env.PUBLIC_URL + '/images/' + item.imageName} alt="My image"/>)}
                      <div className="card-body">
                         <p className="card-text">{item.itemName}</p>
                      </div>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">{item.itemPrice}$</li>
                      </ul>
                  </div></Link></div>
      ))}

</div>
</div>

        <div className="d-flex justify-content-center mt-4">
                <button
                    className="btn btn-primary"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
            

                {nearbyPages.map((page) => (
                    (<button
                    key={page}
                    className={currentPage === page ? 'btn btn-primary' : 'btn btn-outline-primary'}
                    onClick={() => handlePageChange(page)}
                    >
                    {page}
                    </button>)
                ))}

                <button
                    className="btn btn-primary"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={indexOfLastItem >= items.length}
                >
                    Next
                </button>
            </div>
            </div>
  );
};

export default ItemsList;