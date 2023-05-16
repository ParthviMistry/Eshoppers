import { useState, useEffect } from "react";
import protectedPage from "../helpers/auth-only-helper";
import axios from "axios";
import SingleProduct from "../components/Product/SingleProduct";
import ProductForm from "../components/Forms/ProductForm";
import NavigationHeader from "../components/UI/NavigationHeader";

import { Button } from "primereact/button";

import styles from "@/styles/Admin.module.css";
import Modal from "../components/Modal";
import AddItem from "../components/Modal/addItem";

export default function Admin() {
  const [itemForm, setItemForm] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [formData, setFormData] = useState({});
  const [products, setProducts] = useState([]);

  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState("center");

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (editForm) {
      const currProduct = products.find((product) => product.id === editForm);
      setFormData(currProduct);
    }
  }, [editForm]);

  const fetchData = async () => {
    const { data } = await axios.get("api/products");
    setProducts(data);
  };

  const clearAndReload = () => {
    setEditForm(false);
    setItemForm(false);
    setFormData({});
    fetchData();
  };

  const show = (position) => {
    setPosition(position);
    setVisible(true);
    setItemForm(!itemForm);
  };

  const handleSearch = async (query) => {
    let url = `api/products/form-submit?name=${query}`;
    let headers = { "content-type": "application/json" };

    const response = await axios.get(url, { query }, headers);
    if (response.status == 200) {
      setProducts([response.data.data]);
    }
    if (!query) fetchData();
  };

  return (
    <>
      <NavigationHeader handleSearch={handleSearch} />
      <div className=" ">
        <h1 className={styles.heading}>Eshoppers Admin</h1>

        {visible && itemForm && (
          <AddItem
            cart={products}
            visible={visible}
            position={position}
            setVisible={setVisible}
          />
        )}

        <div className=" product-section-wrapper container justify-center items-center">
          <h1 className="text-2xl m-auto my-8 w-full text-center">
            All products
          </h1>
          <div className="m-auto w-full flex flex-col justify-center items-center max-w-xl">
            <Button label="Add Item" onClick={() => show("top")} />
          </div>
          <div className="">
            {products.length > 0 ? (
              <ul>
                <div className="flex flex-row justify-center items-start">
                  <SingleProduct product={products} />
                </div>
              </ul>
            ) : (
              <h2 className="posts-body-heading">No products added so far</h2>
            )}
          </div>
        </div>
      </div>
      <div className="footer_fixed segoe-font-title">
        <div className="footer__bottom-content footer__bottom-content--reverse">
          Eshoppers
        </div>
      </div>
    </>
  );
}

// export async function getServerSideProps(ctx) {
//   const user = protectedPage(ctx);
//   if (!user) {
//     return {
//       redirect: {
//         permanent: false,
//         destination: "/login",
//       },
//     };
//   }
//   return {
//     props: {
//       user: user,
//     },
//   };
// }
