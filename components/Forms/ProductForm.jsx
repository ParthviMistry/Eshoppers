import { Button } from "primereact/button";

export default function ProductForm({
  formFunc,
  formData,
  handleChange,
  index,
  editForm,
  setEditForm,
  isNew = false,
}) {
  const inputStyle =
    "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500";
  const checkBoxStyle =
    "w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600";
  return (
    <>
      <h3 className="flex w-full m-auto justify-center items-center text-xl font-bold">
        {isNew ? "New Product Form" : "Editing Product " + (index + 1)}
      </h3>
      <form className="w-full max-w-lg" onSubmit={formFunc}>
        <div className="flex flex-wrap mb-2">
          <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="Sku"
            >
              Sku
            </label>
            <input
              className={[inputStyle].join(" ")}
              id="Sku"
              name="sku"
              type="text"
              placeholder="SKU"
              onChange={handleChange}
              value={formData.sku}
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="name"
            >
              Name
            </label>
            <input
              className={[inputStyle].join(" ")}
              id="name"
              type="text"
              placeholder="Product Name"
              onChange={handleChange}
              value={formData.name}
              name="name"
            />
          </div>
        </div>
        <div className="flex flex-wrap mb-2">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="image"
            >
              Image
            </label>
            <input
              className={[inputStyle].join(" ")}
              id="image"
              type="text"
              placeholder="Image URL"
              onChange={handleChange}
              value={formData.image}
              name="image"
            />
          </div>
        </div>
        <div className="flex flex-wrap mb-2">
          <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="description"
            >
              Description
            </label>
            <input
              className={[inputStyle].join(" ")}
              id="description"
              type="text"
              placeholder="SKU Description"
              onChange={handleChange}
              value={formData.description}
              name="description"
            />
          </div>

          <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="quantity"
            >
              Inventory Quantity
            </label>
            <input
              className={[inputStyle].join(" ")}
              type="number"
              placeholder="10"
              onChange={handleChange}
              value={formData.inventory}
              name="inventory"
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 px-3 mt-4 md:mb-0">
          <div className="relative">
            <div class="flex items-center mb-4">
              <input
                id="default-checkbox"
                type="checkbox"
                name="availability"
                className={[checkBoxStyle].join(" ")}
              />
              <label
                for="default-checkbox"
                class="ml-2 text-sm font-medium text-gray-900  "
              >
                Availability
              </label>
            </div>
          </div>
        </div>
        <Button label={isNew ? "Add Product" : "Update Product"} />
        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-700 max-w-sm m-auto text-white font-bold py-2 px-4 rounded md:flex md:justify-center mb-2"
        >
          {isNew ? "Add Product" : "Update Product"}
        </button>
      </form>
      {isNew ? null : (
        <>
          <br />
          <Button
            label={editForm === formData.id ? "Cancel" : "Edit"}
            style={{ paddingTop: 2, paddingBottom: 2 }}
            onClick={() =>
              editForm === formData.id
                ? setEditForm(false)
                : setEditForm(formData.id)
            }
          />
          <button
            className="bg-white absolute top-4 right-4 text-sm text-gray-700  hover:text-gray-300 border-blue-300 border font-bold p-2 px-3 rounded md:flex md:justify-center m-auto mb-2 h-6 flex justify-center items-center"
            style={{ paddingTop: 2, paddingBottom: 2 }}
            onClick={() =>
              editForm === formData.id
                ? setEditForm(false)
                : setEditForm(formData.id)
            }
          >
            {editForm === formData.id ? "Cancel" : "Edit"}
          </button>
        </>
      )}
    </>
  );
}
