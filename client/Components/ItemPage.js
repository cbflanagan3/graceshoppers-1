import React from "react";
import {connect} from "react-redux";

const ItemPage = ({match, products}) => {
  const item = products.filter((product) => product.id === match.params.id);
  const myItem = item[0];
  if (item.length) {
    return (
      <div>
        <h2>
          {myItem.name} ({myItem.price})
        </h2>
        <p>{myItem.description}</p>
        <img src={myItem.image} alt="" />
      </div>
    );
  }
  return <h2>Item Loading</h2>;
};
const mapStateToProps = (state) => ({
  products: state.products,
});

export default connect(mapStateToProps)(ItemPage);
