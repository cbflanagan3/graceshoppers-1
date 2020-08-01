import React from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

const ItemList = ({products}) => {
  if (products.length) {
    const items = products.filter((item) => item.categoryId === 4);
    return (
      <div className="productList">
        <h1 className="header">Items</h1>
        <div>
          <ul>
            {items.map((item) => {
              return (
                <div key={item.id}>
                  <Link to={`/items/${item.id}`} key={item.id}>
                    {item.name}
                  </Link>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
  return <h1>Items Loading...</h1>;
};

const mapState = ({products}) => ({products});

export default connect(mapState)(ItemList);
