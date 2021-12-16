import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const Confirmation = () => {
  //   function noRefCheck() {
  //     console.log("Testing Button");
  //   }
  const [modal, setModal] = React.useState(false);
  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button color="danger" onClick={toggle}>
        Click Me
      </Button>
    </div>
  );
};
export default Confirmation;
