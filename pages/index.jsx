import { useState, useEffect } from "react";
import NavigationHeader from "../components/UI/NavigationHeader";
import Hero from "./../components/UI/Hero";
import SingleProduct from "./../components/Product/SingleProduct";
import Cart from "../components/Cart/Cart";
// import { mockSkuData } from "../src/Mock/mockSkuData";
import axios from "axios";
import Modal from "../components/Modal";
import SuccessModal from "../components/Modal/successModal";

export default function Home() {
  const [openCart, setOpenCart] = useState(false);
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSuceessModal, setShowSuceessModal] = useState(false);

  useEffect(() => {
    getCacheCart();
  }, []);

  async function getCacheCart() {
    const cart = await localStorage.getItem("cart");
    setCart(cart);
  }

  const overlayOpen = openCart ? "hiddendiv overlay" : "hiddendiv";

  const showDialog = () => {
    const scrollY =
      document.documentElement.style.getPropertyValue("--scroll-y");
    const body = document.body;
    body.style.position = "fixed";
    body.style.top = `-${scrollY}`;
  };

  const closeDialog = () => {
    const body = document.body;
    const scrollY =
      document.documentElement.style.getPropertyValue("--scroll-y");
    body.style.position = "";
    body.style.top = `-${scrollY}`;
  };

  const addItemToCart = (addedItem) => {
    console.log("ADD ITEM TO", addedItem);

    if (cart) {
      let UpdatedProduct = cart.map((item) =>
        item.sku === addedItem.sku
          ? {
              ...item,
              quantity: parseInt(item.quantity) + parseInt(addedItem.quantity),
            }
          : item
      );

      let isPresent = cart.some(function (el) {
        return el.sku === addedItem.sku;
      });

      const updatedCart = isPresent ? UpdatedProduct : [...cart, addedItem];
      setCart(updatedCart);
      localStorage.setItem("cart", updatedCart);
    } else {
      setCart(addedItem);
      localStorage.setItem("cart", addedItem);
    }
  };

  // INIT FUNCTION
  useEffect(() => {
    loadProducts();
  }, []);

  async function handleCheckout() {
    setLoading(true);
    const lineItemsToAdd = cart?.map((cartItem) => ({
      ...cartItem,
      variantId: parseInt(cartItem.shopifyVariantId),
      quantity: cartItem.quantity,
      sku: cartItem.sku,
    }));

    console.log("LINE ITEMS", lineItemsToAdd);

    setTimeout(() => {
      setLoading(false);
    }, 1500);

    setShowConfirmationModal(true);
    setOpenCart(false);

    let url = "api/email";
    let headers = { "content-type": "application/json" };

    await axios.post(url, lineItemsToAdd, headers);
  }

  async function loadProducts() {
    setProducts([
      { id: 1, title: "My product title", price: 25, smallText: "Something" },
    ]); //MOCK
  }

  return (
    <>
      <div className="App  ">
        <div
          className={overlayOpen}
          onClick={() => {
            setOpenCart(!openCart);
            openCart ? closeDialog() : showDialog();
          }}
        ></div>
        <NavigationHeader
          {...{ openCart, setOpenCart, showDialog, closeDialog }}
          showBadge={cart?.length}
        />
        {!openCart && !showConfirmationModal && showSuceessModal && (
          <SuccessModal
            showConfirmationModal={showConfirmationModal}
            setShowConfirmationModal={setShowConfirmationModal}
            setShowSuceessModal={setShowSuceessModal}
            showSuceessModal={showSuceessModal}
          />
        )}
        {openCart && !showConfirmationModal && !showSuceessModal && (
          <Cart
            {...{
              openCart,
              setOpenCart,
              showDialog,
              closeDialog,
              cart,
              setCart,
              handleCheckout,
              loading,
            }}
          />
        )}
        {!openCart && showConfirmationModal && !showSuceessModal && (
          <Modal
            cart={cart}
            showConfirmationModal={showConfirmationModal}
            setShowConfirmationModal={setShowConfirmationModal}
            setShowSuceessModal={setShowSuceessModal}
            showSuceessModal={showSuceessModal}
          />
        )}

        <Hero />
      </div>
      <div className="footer_fixed segoe-font-title">
        <div className="footer__bottom-content footer__bottom-content--reverse">
          Some Footer
        </div>
      </div>
    </>
  );
}
