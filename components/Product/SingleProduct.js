import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

import styles from "@/styles/SingleProduct.module.css";

import AddItem from "../Modal/addItem";
import productDefaultImage from "../../Assets/Css/imgs/default-image.png";

const SingleProduct = ({ product }) => {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState({});

  // const addClick = async () => {
  //   setOpenCart(!openCart);
  //   addItemToCart(newProduct, 1);

  //   let url = "api/cart/add-to-cart";
  //   let headers = { "content-type": "application/json" };

  //   await axios.post(url, newProduct, headers);
  // };

  const imageBodyTemplate = (product) => {
    return (
      <img
        src={product.image}
        alt={"-"}
        className="w-6rem shadow-2 border-round"
      />
    );
  };

  const footer = `In total there are ${product ? product.length : 0} products.`;

  const handleEdit = async (id) => {
    setOpen(true);

    let url = `api/products/form-submit?id=${id}`;
    let headers = { "content-type": "application/json" };

    const res = await axios.get(url, { id }, headers);

    if (res.status == 200) {
      setEditData(res.data.data);
    }
  };

  const handleDelete = async (id) => {
    let url = `api/products/form-submit?id=${id}`;
    let headers = { "content-type": "application/json" };

    await axios.delete(url, { id }, headers);
  };

  const actionBodyTemplate = (data) => {
    return (
      <div className={styles.actionContainer}>
        <Button
          label="Edit"
          type="button"
          icon="pi pi-cog"
          className={styles.actionButton}
          onClick={() => handleEdit(data.id)}
        ></Button>
        <Button
          label="Delete"
          type="button"
          icon="pi pi-cog"
          className={styles.actionButton}
          onClick={() => handleDelete(data.id)}
        ></Button>
      </div>
    );
  };

  return (
    <div className="card">
      <DataTable
        value={product}
        footer={footer}
        tableStyle={{ minWidth: "60rem" }}
      >
        <Column field="name" header="Name" sortable></Column>
        <Column field="sku" header="SKU"></Column>
        <Column field="description" header="Description"></Column>
        <Column header="Image" body={imageBodyTemplate}></Column>
        <Column field="price" header="Price"></Column>
        <Column
          header="Action"
          headerStyle={{ width: "4rem", textAlign: "center" }}
          bodyStyle={{ textAlign: "center", overflow: "visible" }}
          body={actionBodyTemplate}
        />
      </DataTable>

      {open && (
        <AddItem
          cart={product}
          visible={open}
          position={"top"}
          setVisible={setOpen}
          editData={editData}
        />
      )}
    </div>
  );
};

export default SingleProduct;
