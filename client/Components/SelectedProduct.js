import React, {useEffect} from "react";
import {connect} from "react-redux";
import {
  updateInput,
  clearInput,
  updateCart,
  fetchSelectedProduct,
} from "../store/actions";
import {Link, useHistory} from "react-router-dom";
import {IconButton} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const SelectedProduct = ({
  match,
  quantity,
  activeOrders,
  updateQuantity,
  addToCart,
  dispatch,
  item,
}) => {
  useEffect(() => {
    dispatch(clearInput());
    const fetchProduct = async () => {
      await dispatch(fetchSelectedProduct(match.params.id));
    };
    fetchProduct();
  }, []);
  if (item) {
    const mapQuant = (num) => {
      const map = [];
      for (let i = 1; i <= num; i++) {
        map.push(<option key={i}>{i}</option>);
      }
      return map;
    };
    const history = useHistory();
    if (item) {
      return (
        <div>
          <div className="productCard">
            <h2>
              {item.name}({item.price})
            </h2>
            <p>{item.description}</p>
            <img className="productImg" src={item.image} alt="" />
            <br />
            <select
              id="quantity"
              name="quantity"
              value={quantity}
              onChange={(e) => updateQuantity(e)}
            >
              <option value="">0</option>
              {mapQuant(item.quantity)}
            </select>
            <button
              type="button"
              onClick={(e) => addToCart(e, activeOrders, item, quantity)}
              disabled={!!(!quantity || !item.quantity)}
            >
              Add to Cart
            </button>
          </div>
          <div className="homeIcon">
            <IconButton onClick={(e) => history.goBack()}>
              <ArrowBackIcon fontSize="large" />
            </IconButton>
          </div>
        </div>
      );
    }
    return <h2>Loading..</h2>;
  }
  return <h2>Loading..</h2>;
};
const mapState = ({products, input, orders, count}) => {
  const {quantity} = input;
  const {activeOrders} = orders;
  const {item} = count;
  return {
    products,
    quantity,
    activeOrders,
    item,
  };
};

const mapDispatch = (dispatch) => {
  const updateQuantity = (e) => {
    dispatch(updateInput("quantity", e.target.value));
  };
  const addToCart = (e, order, item, quantity) => {
    e.preventDefault();
    dispatch(updateCart("add", order.id, item.id, quantity));
  };
  return {
    dispatch,
    updateQuantity,
    addToCart,
  };
};

export default connect(mapState, mapDispatch)(SelectedProduct);