import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { Button } from "react-bootstrap";
const Toasted = () => {
  const notify = () => toast("Wow so easy!");
  return (
    <div>
      <button variant="primary" onClick={notify}>
        Toaster!
      </button>
      <ToastContainer />
    </div>
  );
};
export default Toasted;
