import React from "react";
import Remove from "../Icons/Remove";
import Image from "next/image";
import productDefaultImage from "../../Assets/Css/imgs/default-image.png";
import axios from "axios";

import { Button } from "primereact/button";

const CartLineItem = ({ product, setCart, cart, amount }) => {
  const removeProduct = async (name) => {
    const removeIndex = cart.indexOf(product);
    const copyCart = JSON.parse(JSON.stringify(cart));
    copyCart.splice(removeIndex, 1);
    setCart(copyCart);
    localStorage.setItem("cart", copyCart);

    let url = `api/cart/add-to-cart?id=${name}`;
    let headers = { "content-type": "application/json" };
    await axios.delete(url, { name }, headers);
  };

  const handleAmountChange = (e) => {
    let updatedCart = cart.map((item) =>
      item.sku === product.sku
        ? { ...item, quantity: parseInt(e.target.value) }
        : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", updatedCart);
    e.preventDefault();
  };

  return (
    <div>
      <div className="slideout-product-wrapper">
        <div className="slideout-products-left">
          <Image
            src={product?.featuredImg || productDefaultImage}
            alt="product"
          />
        </div>
        <div className="slideout-products-center">
          <div className="slideout-product-title flex flex-row justify-between">
            <h2>SKU: {product.sku}</h2>
            <div className="slideout-products-right">
              <div className="slideout-products-right-price">
                <span className="price-sign">$</span> {product.price}
              </div>
            </div>
          </div>
          <div className="quantity-price">
            <div
              className="slideout-products quantity-selector"
              style={{ display: "flex", position: "relative" }}
            >
              <div>
                <label>Quantity</label>
                <select
                  className="slideout-dropdown"
                  value={amount}
                  onChange={(e) => handleAmountChange(e)}
                >
                  {[...Array(101).keys()].map((number) => (
                    <option key={number} value={number}>
                      {number}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => removeProduct(product.name)}
                className="slideout-product-button"
              >
                <Remove />
                <span className="remove-span">Remove</span>
              </button>
            </div>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartLineItem;
