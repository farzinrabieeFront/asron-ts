import React, { useEffect, useState } from "react";
import { FastField, Form, Formik } from "formik";
import { Col } from "react-bootstrap";
import InputElement from "../../components/common/inputs/InputElement";
import * as yup from "yup";
import Styles from "./Forms.module.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { actionLists } from "../../redux/lists/actionLists";
import { useNavigate, useLocation } from "react-router-dom";

const Forms = () => {
  /////////////////////////////////////////////////////////hooks
  const location: any = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  /////////////////////////////////////////////////////////functions
  const handleSubmit = async (val: any) => {
    if (val.fullName) {
      let fullNameSplit = val.fullName.split(" ");
      val.firstName = fullNameSplit[0] ? fullNameSplit[0] : "";
      val.lastName = fullNameSplit[1] ? fullNameSplit[1] : "";
      delete val.fullName;
    }

    if (location?.state?.type === "update") {
      axios
        .put(
          `https://62bfe35ec134cf51cec58701.mockapi.io/api/crud/users/${location?.state?.itm?.id}`,
          val
        )
        .then((response) => {
          if (response.status === 200) {
            alert("با موفقیت انجام شد");
            // @ts-ignore
            dispatch(actionLists());
            // @ts-ignore
            navigate("/Lists");
          }
        })
        .catch((error) => {
          const errorMsg = error.message;
          console.log("error", error);
        });
    } else {
      axios
        .post(`https://62bfe35ec134cf51cec58701.mockapi.io/api/crud/users`, val)
        .then((response) => {
          if (response.status === 201) {
            alert("با موفقیت انجام شد");
            // @ts-ignore
            dispatch(actionLists());
            // @ts-ignore
            navigate("/Lists");
          }
        })
        .catch((error) => {
          const errorMsg = error.message;
          console.log("error", error);
        });
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          fullName: location?.state?.itm
            ? `${location?.state?.itm?.firstName} ${location?.state?.itm?.lastName}`
            : "",
          mobile: location?.state?.itm ? location?.state?.itm?.mobile : "",
          age: location?.state?.itm ? location?.state?.itm?.age : "",
          email: location?.state?.itm ? location?.state?.itm?.email : "",
        }}
        validationSchema={yup.object().shape({
          fullName: yup.string().required("این فیلد الزامی است."),
          mobile: yup.string().required("این فیلد اجباری است"),

          age: yup.number().required(`این فیلد الزامی است.`),
          email: yup
            .string()
            .required("این فیلد الزامی است.")
            .email("ایمیل وارد شده معتبر نیست"),
        })}
        onSubmit={(vals) => handleSubmit(vals)}
      >
        <Form>
          <div
            className="d-flex align-items-center justify-content-center
          "
          >
            <div
              className={`${Styles.box} p-2 py-4 row d-flex align-items-center justify-content-center shadow  `}
            >
              <p
                className="mb-3"
                style={{ fontSize: "18px", fontWeight: "700" }}
              >
                {location?.state?.type === "update"
                  ? "ویرایش"
                  : "فرم زیر را پر کنید"}
              </p>
              <Col xs={12} className="mb-2">
                <FastField
                  as={InputElement}
                  type="text"
                  name="fullName"
                  label="نام و نام خانوادگی"
                />
              </Col>
              <Col xs={12} className="mb-2">
                <FastField
                  as={InputElement}
                  type="text"
                  name="mobile"
                  label="شماره موبایل"
                />
              </Col>

              <Col xs={12} className="mb-2">
                <FastField
                  as={InputElement}
                  type="number"
                  name="age"
                  label="سن"
                />
              </Col>
              <Col xs={12} className="mb-2">
                <FastField
                  as={InputElement}
                  type="email"
                  name="email"
                  label="ایمیل"
                />
              </Col>

              <Col
                xs={12}
                className="d-flex justify-content-center align-items-center"
              >
                <button
                  // disabled={!(isValid && dirty)}
                  type="submit"
                  className="btn  btn-danger justify-content-center w-100 d-flex align-items-center"
                >
                  {location?.state?.type === "update"
                    ? "ثبت اطلاعات"
                    : "ساخت اکانت"}
                </button>
              </Col>
            </div>
          </div>
        </Form>
      </Formik>
    </>
  );
};

export default Forms;
