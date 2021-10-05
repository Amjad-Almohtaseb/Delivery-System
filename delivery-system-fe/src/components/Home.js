import React from "react";
import delivery from "../delivery.png";
import icon from "../icon.jpg";

const Home = () => {
  return (
    <>
      <img src={delivery} alt="logo" className="main-pic" />
      <p className="web-title">Delivery Services</p>

      <div className="animated-logo">
        <img src={icon} alt="" width="80px" height="50px" />
      </div>
    </>
  );
};

export default Home;
