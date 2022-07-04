import React, { useEffect } from "react";
import { Button, Col, Modal, Row, Table } from "react-bootstrap";
import { PencilSquare, PlusCircle, Trash } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionLists } from "../redux/lists/actionLists";
import styles from "./Lists.module.css";
import ModalCus from "../components/common/modalCustom/ModalCus";
import axios from "axios";

const Lists = () => {
  /////////////////////////////////////////////////////////////////////////state
  const [modalShow, setModalShow] = React.useState<any>({
    flag: false,
    id: "",
  });
  const listsState = useSelector((state: any) => state.listsState);
  /////////////////////////////////////////////////////////////////////////hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    // @ts-ignore
    dispatch(actionLists());
  }, []);

  /////////////////////////////////////////////////////////////////////////functions
  const handleClickUpdate = (itm: any) => {
    navigate("/form", { state: { itm: itm, type: "update" } });
  };
  const handleDelete = (id: any) => {
    axios
      .delete(
        `https://62bfe35ec134cf51cec58701.mockapi.io/api/crud/users/${id}`
      )
      .then((response) => {
        if (response.status === 200) {
          alert("با موفقیت انجام شد");
          // @ts-ignore
          dispatch(actionLists());
        }
      })
      .catch((error) => {
        const errorMsg = error.message;
        console.log("error", error);
      })
      .finally(() => {
        setModalShow((prevState: any) => {
          return {
            ...prevState,
            flag: false,
          };
        });
      });
  };
  return (
    <>
      <div className="d-flex justify-content-between align-items-center w-100">
        <h4>داده ها</h4>
        <div>
          <Button
            className="btn-danger mb-2"
            onClick={() => {
              navigate("/form");
            }}
          >
            <PlusCircle />
            <span className="me-2">ساخت اکانت جدید</span>
          </Button>
        </div>
      </div>

      <div className="shadow rounded-3">
        <div className={`${styles.thead} px-3 `}>
          <Row className="d-flex align-items-center h-100">
            <Col>
              <span className={`${styles.textHead}`}>نام و نام حانوادگی</span>
            </Col>
            <Col>
              <span className={`${styles.textHead}`}>شماره موبایل</span>
            </Col>
            <Col>
              <span className={`${styles.textHead}`}>سن</span>
            </Col>
            <Col>
              <span className={`${styles.textHead}`}>ایمیل</span>
            </Col>
            <Col>
              <span className={`${styles.textHead}`}>تاریخ ایجاد</span>
            </Col>
          </Row>
        </div>
        {listsState.loading ? (
          <h3 className="p-3">در حال بارگزاری...</h3>
        ) : (
          <div className={`${styles.tbody} px-3`}>
            {listsState?.lists?.length
              ? listsState?.lists.map((itm: any, ind: number) => (
                  <Row
                    className="d-flex align-items-center "
                    style={{ height: "70px" }}
                  >
                    <Col>
                      <span
                        className={styles.textBody}
                      >{`${itm?.firstName}  ${itm?.lastName}`}</span>
                    </Col>
                    <Col>
                      <span className={styles.textBody}>{itm?.mobile}</span>
                    </Col>
                    <Col>
                      <span className={styles.textBody}>{itm?.age}</span>
                    </Col>
                    <Col>
                      <span className={styles.textBody}>{itm?.email}</span>
                    </Col>
                    <Col className="d-flex justify-content-between">
                      <div>
                        <span className={styles.textBody}>af</span>
                      </div>
                      <div className="d-flex">
                        <div
                          className="ms-4"
                          onClick={() => handleClickUpdate(itm)}
                        >
                          <span className={styles.textBody}>
                            <PencilSquare />
                          </span>
                        </div>
                        <div
                          onClick={() =>
                            setModalShow({ flag: true, id: itm?.id })
                          }
                        >
                          <span className={styles.textBody}>
                            <Trash
                              style={{
                                fill: "red !important",
                                color: "red !important",
                              }}
                            />
                          </span>
                        </div>
                      </div>
                    </Col>
                  </Row>
                ))
              : ""}
          </div>
        )}

        <ModalCus
          show={modalShow}
          handleDelete={handleDelete}
          setModalShow={setModalShow}
        />
      </div>
    </>
  );
};

export default Lists;
