// import React from "react";
// import CheckoutCart from "../Icons/CheckoutCart";

// const NavigationHeader = ({ setOpenCart, openCart, showBadge }) => {
//   return (
//     <div className="header-container">
//       <div className="logo">Some Logo</div>

//       <div className={`icon-wrapper `}>
//         <ul className="nav-items">
//           <li>
//             <a href="https://google.com">Some Link</a>
//           </li>
//         </ul>
//         <div
//           className="cart_icon"
//           style={{ width: "40px", cursor: "pointer" }}
//           onClick={() => {
//             setOpenCart(!openCart);
//           }}
//         >
//           {showBadge ? <div className="bag-badge"></div> : ""}
//           <CheckoutCart />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NavigationHeader;

import React from "react";
import { MegaMenu } from "primereact/megamenu";
import { InputText } from "primereact/inputtext";

import CheckoutCart from "../Icons/CheckoutCart";
import axios from "axios";

export default function NavigationHeader({
  setOpenCart,
  openCart,
  showBadge,
  handleSearch,
}) {
  const items = [
    { label: "Home" },
    { label: "Products" },
    { label: "My Profile" },
    { label: "Settings" },
  ];

  const start = (
    <img
      alt="logo"
      src="https://primefaces.org/cdn/primereact/images/logo.png"
      className="mr-2"
    ></img>
  );

  const end = (
    <div className="cart_container">
      <InputText
        placeholder="Search"
        type="text"
        onChange={(e) => handleSearch(e.target.value)}
      />
      <div
        className="cart_icon"
        style={{ width: "40px", cursor: "pointer" }}
        onClick={() => {
          setOpenCart(!openCart);
        }}
      >
        {showBadge ? <div className="bag-badge"></div> : ""}
        <CheckoutCart />
      </div>
    </div>
  );

  return (
    <div className="card">
      <MegaMenu
        model={items}
        orientation="horizontal"
        // start={start}
        end={end}
        breakpoint="960px"
      />
    </div>
  );
}
