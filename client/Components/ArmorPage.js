import React from "react";
import {connect} from "react-redux";

const ArmorPage = ({match, products}) => {
  const armor = products.filter((product) => product.id === match.params.id);
  const myArmor = armor[0];
  if (armor.length) {
    return (
      <div>
        <h2>
          {myArmor.name} ({myArmor.price})
        </h2>
        <p>{myArmor.description}</p>
        <img src={myArmor.image} />
      </div>
    );
  }
  return <h2>Armor Loading</h2>;
};
const mapStateToProps = (state) => ({
  products: state.products,
});

export default connect(mapStateToProps)(ArmorPage);
