import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";

import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Dialog } from "primereact/dialog";

import styles from "@/styles/Admin.module.css";

export default function AddItem({ visible, position, setVisible }) {
  const [formData, setFormData] = useState({});
  const [showMessage, setShowMessage] = useState({});

  const formik = useFormik({
    initialValues: {
      name: "",
      sku: "",
      text: "",
      description: "",
      accept: false,
    },
    validate: (data) => {
      let errors = {};

      if (!data.name) errors.name = "Name is required.";
      if (!data.sku) errors.sku = "sku is required.";
      if (!data.text) errors.text = "text is required.";
      if (!data.description) errors.description = "Description is required.";

      return errors;
    },
    onSubmit: async (data) => {
      let url = "api/products/form-submit";
      let headers = { "content-type": "application/json" };
      const response = await axios.post(url, data, headers);
      if (response.status == 200) {
        setFormData(data);
      }
      setShowMessage(true);
      formik.resetForm();
    },
  });

  const isFormFieldValid = (name) =>
    !!(formik.touched[name] && formik.errors[name]);

  const getFormErrorMessage = (name) => {
    return (
      isFormFieldValid(name) && (
        <small className="p-error">{formik.errors[name]}</small>
      )
    );
  };

  return (
    <div className={styles.form_Container}>
      <Dialog
        header="Add Products"
        visible={visible}
        position={position}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
        draggable={true}
        resizable={false}
      >
        <div className="flex justify-content-center">
          <div className={styles.card}>
            <form onSubmit={formik.handleSubmit} className="p-fluid">
              <div className={styles.field}>
                <span className="p-float-label">
                  <InputText
                    id="name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    autoFocus
                  />
                  <label htmlFor="name">Name*</label>
                </span>
                {getFormErrorMessage("name")}
              </div>
              <div className={styles.field}>
                <span className="p-float-label p-input-icon-right">
                  <i className="pi pi-envelope" />
                  <InputText
                    id="sku"
                    name="sku"
                    value={formik.values.sku}
                    onChange={formik.handleChange}
                  />
                  <label htmlFor="sku">sku*</label>
                </span>
                {getFormErrorMessage("sku")}
              </div>
              <div className={styles.field}>
                <span className="p-float-label">
                  <InputText
                    id="text"
                    name="text"
                    value={formik.values.text}
                    onChange={formik.handleChange}
                  />
                  <label htmlFor="name">Text*</label>
                </span>
                {getFormErrorMessage("text")}
              </div>
              <div className={styles.field}>
                <span className="p-float-label">
                  <InputText
                    id="description"
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                  />
                  <label htmlFor="name">Description*</label>
                </span>
                {getFormErrorMessage("description")}
              </div>

              <div className="field-checkbox">
                <Checkbox
                  inputId="accept"
                  name="accept"
                  checked={formik.values.accept}
                  onChange={formik.handleChange}
                />
                <label htmlFor="accept">
                  I agree to the terms and conditions*
                </label>
              </div>

              <Button type="submit" label="Submit" className="mt-2" />
            </form>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
