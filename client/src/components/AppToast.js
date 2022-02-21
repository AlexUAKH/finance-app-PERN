import React, { useContext } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

const AppToast = observer(() => {
  const { toast } = useContext(Context);

  const stl = {
    backgroundColor: toast.toast.type === "error" ? "red" : "green"
  };

  // console.log("tottot: ", toast.toast);
  return (
    <ToastContainer
      className="p-3"
      position="top-end"
      style={{ zIndex: "100" }}
    >
      <Toast
        onClose={() => toast.setShow(false)}
        show={toast.isShow}
        delay={2500}
        autohide
      >
        {/*<Toast.Header>
          <strong className="me-auto">Bootstrap</strong>
          <small>11 mins ago</small>
        </Toast.Header>*/}
        <Toast.Body className="text-white p-3 fs-5" style={stl}>
          {toast.toast.message}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
});

export default AppToast;
