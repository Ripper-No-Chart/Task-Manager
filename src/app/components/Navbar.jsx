import React from "react";
import swal from "sweetalert";

export const Navbar = () => {
  const About = () => {
    swal({
      title: "About",
      text: "Author: RipperNoChart | GitHub: Ripper-No-Chart",
      icon: "success",
    });
  };

  return (
    <nav>
      <div className="nav-wrapper" style={{ backgroundColor: "#28436B" }}>
        <a href="/" className="brand-logo" style={{ paddingLeft: "20px" }}>
          MERN - Task Manager
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <div
              style={{ cursor: "pointer", paddingRight: "10px" }}
              onClick={() => {
                About();
              }}
            >
              About
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};
