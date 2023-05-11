import React, { useState } from "react";
import CrossIcon from "../Icons/Cross";
import CartLineItem from "./CartLineItem";

import { Button } from "primereact/button";

export default function Cart({
  openCart,
  setOpenCart,
  showDialog,
  closeDialog,
  cart,
  setCart,
  handleCheckout,
  loading,
}) {
  const myCartClass = openCart
    ? "slideout-wrapper active-slide"
    : "slideout-wrapper";

  return (
    <div>
      <div className={myCartClass}>
        <div className="slideout-header-wrapper">
          <h2
            className="slideout-h2"
            style={{
              paddingLeft: "24px",
              paddingTop: "24px",
              fontSize: "14px",
              textAlign: "left",
              top: "-11px",
            }}
          >
            Shopping bag
          </h2>
          <div className="slideout-header-x-wrapper">
            <CrossIcon
              clickFunc={() => {
                setOpenCart(!openCart);
              }}
            />
          </div>
        </div>

        {cart?.length > 0 && (
          <>
            <div className="slideout-products-wrapper">
              {cart.map((product) => {
                return (
                  <CartLineItem
                    key={
                      product.id +
                      "-" +
                      product.secondTitle +
                      product.purchaseType
                    }
                    {...{
                      openCart,
                      setOpenCart,
                      showDialog,
                      closeDialog,
                      setCart,
                      cart,
                    }}
                    product={product}
                    amount={product.quantity}
                  />
                );
              })}
            </div>

            <div className="slideout-bottom-wrapper">
              <div className="slideout-bottom-section second-bottom">
                <h3 className="subtotal-h3">Subtotal</h3>
                <h3 className="subtotal-cost">
                  <span className="dollar-sign">$</span> Some Total
                </h3>
              </div>
              <Button
                label={
                  loading ? (
                    <div className="loader">Loading...</div>
                  ) : (
                    "Checkout"
                  )
                }
                onClick={handleCheckout}
                style={{ marginTop: "0.9rem" }}
              />
              <p
                className="checkout-continue-shopping"
                onClick={() => {
                  setOpenCart(!openCart);
                }}
              >
                Continue
              </p>
            </div>
          </>
        )}
        {!cart?.length && <div className="empty-cart">Your cart is empty</div>}
      </div>
    </div>
  );
}
