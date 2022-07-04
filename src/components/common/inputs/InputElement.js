import React, { forwardRef } from "react";
import Form from "react-bootstrap/Form";

import { useField } from "formik";
import { ExclamationCircle } from "react-bootstrap-icons";
const InputElement = forwardRef(
  (
    {
      label /** string */,
      type /** string */,
      className,
      labelClassName,
      guidText: GuidText /** string */,
      autocomplete /** boolean */,
      currencyFormat /** boolean */,
      textArea /** boolean */,
      isValid /** boolean */,
      isInvalid /** boolean */,
      amountString /** boolean */,
      disabled = false /** boolean */,
      dataLoading = false /** boolean */,
      gpClassName,
      preIcon,
      prepend,
      tradeInput,
      fakeValue,
      rows,
      textarea,
      ...props
    },
    ref
  ) => {
    const [{ name, value, ...field }, { error, touched }, { setValue }] =
      useField(props);

    return (
      <>
        {textarea ? (
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>{label}</Form.Label>
            <Form.Control
              {...field}
              isInvalid={isInvalid || (error && touched)}
              value={value}
              rows={rows ? rows : 3}
              as={"textarea"}
              onChange={(e) => setValue(e.target.value)}
            />
          </Form.Group>
        ) : (
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>{label}</Form.Label>
            <Form.Control
              {...field}
              isInvalid={isInvalid || (error && touched)}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              type={type}
            />

            {error && touched && (
              <div className="d-flex w-100 justify-content-end">
                <span className="text-danger">
                  {error}
                  <ExclamationCircle size="16" />
                </span>
              </div>
            )}
          </Form.Group>
        )}
      </>
    );
  }
);

export default InputElement;
