import React from "react";
import { Button, Modal } from "react-bootstrap";
type propsModal = {
  show: any;
  handleDelete: any;
  setModalShow: any;
};
const ModalCus = ({ show, handleDelete, setModalShow }: propsModal) => {
  return (
    <>
      <Modal
        show={show.flag}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <h4>حذف ردیف</h4>
          <p>ایا از حذف این رکورد راضی اطمینان دارید؟</p>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-danger" onClick={() => handleDelete(show.id)}>
            حذف
          </Button>
          <Button
            className="btn-light"
            onClick={() =>
              setModalShow((prev: any) => {
                return {
                  ...prev,
                  flag: false,
                };
              })
            }
          >
            انصراف
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalCus;
