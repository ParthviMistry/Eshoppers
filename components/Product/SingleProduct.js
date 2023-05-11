import axios from "axios";
import Image from "next/image";
import React from "react";
import productDefaultImage from "../../Assets/Css/imgs/default-image.png";

import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Rating } from "primereact/rating";
import { Tag } from "primereact/tag";

const SingleProduct = ({
  openCart,
  setOpenCart,
  addItemToCart,
  title,
  sku,
  smallText,
  subTitle,
  description,
  id,
  featuredImg,
  price,
  productDescription,
  product,
}) => {
  const newProduct = {
    ...product,
    name: title,
    id: id,
    quantity: 1,
    img: featuredImg,
    price,
    productDescription,
    sku,
  };

  const addClick = async () => {
    setOpenCart(!openCart);
    addItemToCart(newProduct, 1);

    let url = "api/cart/add-to-cart";
    let headers = { "content-type": "application/json" };

    await axios.post(url, newProduct, headers);
  };

  const formatCurrency = (value) => {
    // return value.toLocaleString("en-US", {
    //   style: "currency",
    //   currency: "USD",
    // });
  };

  const imageBodyTemplate = (product) => {
    return (
      <img
        src={featuredImg?.includes("http") ? featuredImg : productDefaultImage}
        alt={product.image}
        className="w-6rem shadow-2 border-round"
      />
    );
  };

  const priceBodyTemplate = (product) => {
    return formatCurrency(product.price);
  };

  const ratingBodyTemplate = (product) => {
    return <Rating value={product.rating} readOnly cancel={false} />;
  };

  const statusBodyTemplate = (product) => {
    return (
      <Tag
        value={product.inventoryStatus}
        severity={getSeverity(product)}
      ></Tag>
    );
  };

  const getSeverity = (product) => {
    switch (product.inventoryStatus) {
      case "INSTOCK":
        return "success";

      case "LOWSTOCK":
        return "warning";

      case "OUTOFSTOCK":
        return "danger";

      default:
        return null;
    }
  };

  const footer = `In total there are ${product ? product.length : 0} products.`;

  const actionBodyTemplate = () => {
    return (
      <div>
        <Button label="edit" type="button" icon="pi pi-cog"></Button>
        <Button label="delete" type="button" icon="pi pi-cog"></Button>
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
        <Column field="price" header="Price" body={priceBodyTemplate}></Column>
        <Column field="inventory" header="Inventory"></Column>
        <Column field="available" header="Available"></Column>
        <Column
          header="Action"
          headerStyle={{ width: "4rem", textAlign: "center" }}
          bodyStyle={{ textAlign: "center", overflow: "visible" }}
          body={actionBodyTemplate}
        />
      </DataTable>
    </div>

    // <div className="flex flex-col w-6/12 m-auto justify-center relative z-10 iems-center">
    //   <div className="section2-left-picture-container">
    //     <Image
    //       src={
    //         featuredImg?.includes("http") ? featuredImg : productDefaultImage
    //       }
    //       alt="product"
    //     />
    //   </div>
    //   <div className="section2-bottom-header">
    //     <h2 className="segoe-font-title sku-title">{title}</h2>
    //     <p className="segeo-font-title sku-item-title">{smallText}</p>

    //     <div className="section-2-paragraph-font section2-bottom-paragraph">
    //       {description}
    //     </div>
    //     {price ? `$${price}` : ""}
    //     <div className="section-2-bottom-header-button-wrapper">
    //       <div className="product-button-wrapper">
    //         <Button
    //           className="section-2-bottom-header-button first-purchase-btn"
    //           onClick={() => addClick()}
    //           label="Add to bag"
    //         />
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default SingleProduct;
