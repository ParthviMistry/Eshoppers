import React from "react";

const Hero = ({}) => {
  return (
    <div className="container">
      <div className="hero-container ">
        <div className="hero-text-container">
          <h1 className="noe-font-title hero-h1">Eshoppers</h1>
          <h3 className="hero-h3">
            Add our SKUs to your `Bag` and then submit your invoice for
            purchase!
            <br />
            <span className="contact_span">
              Any questions? Contact us at
              <a href="mailto:info@example.com"> info@example.com </a>
              <br />
            </span>
            <br />
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Hero;
