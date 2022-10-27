import React from "react";
import logo from "../assets/Logo.png";

import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.content_wrapper}>
      <img src={logo} alt="logo_ally" />
    </div>
  );
};

export default Navbar;
