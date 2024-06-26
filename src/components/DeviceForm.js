import { Formik, Form, Field, ErrorMessage } from "formik";
import React from "react";
import { device_initialValues } from "../contsants/Variables";
import { device_schema } from "../contsants/Schemas";
import { addNewDevice, updateDeviceById } from "../services/deviceService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const DeviceForm = (props) => {
  const navigate = useNavigate();
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    Object.keys(values).forEach(
      (k) =>
        (values[k] =
          values[k] === ""
            ? null
            : typeof values[k] === "string"
            ? values[k].trim()
            : values[k])
    );
    console.log(values);
    try {
      if (props?.id) {
        await updateDeviceById(props.id, values);
        toast.success("Device Updated Successfully");
        navigate(-1);
        window.scrollTo(0, 0);
      } else {
        await addNewDevice(values);
        toast.success("Device Added Succcessfully");
        resetForm();
      }
    } catch (error) {
      toast.error(error?.response?.data?.error);
    } finally {
      setSubmitting(false);
    }
  };
  const numberInputOnWheelPreventChange = (e) => {
    // Prevent the input value change
    e.target.blur();

    // Prevent the page/container scrolling
    e.stopPropagation();

    // Refocus immediately, on the next tick (after the current
    // function is done)
    setTimeout(() => {
      e.target.focus();
    }, 0);
  };
  return (
    <Formik
      initialValues={
        props?.id && props?.deviceData
          ? {
              ...props.deviceData,
              purchaseDate: new Date(props.deviceData.purchaseDate)
                .toISOString()
                .substr(0, 10),
              soldDate: new Date(props.deviceData.soldDate)
                .toISOString()
                .substr(0, 10),
            }
          : device_initialValues
      }
      validationSchema={device_schema}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue, isSubmitting, resetForm, dirty }) => (
        <Form>
          <div className="row" style={{ backgroundColor: "" }}>
            <div className="col-md-8 offset-md-2">
              <div className="form-group mt-3">
                <label for="brand">Brand</label>
                <Field
                  className="form-control form-control-lg"
                  type="text"
                  name="brand"
                  maxLength={20}
                />
                <ErrorMessage
                  component="div"
                  style={{ color: "red" }}
                  name="brand"
                />
              </div>

              <div className="form-group mt-3">
                <label for="model">Model</label>
                <Field
                  className="form-control form-control-lg"
                  type="text"
                  name="model"
                  maxLength={20}
                />
                <ErrorMessage
                  component="div"
                  style={{ color: "red" }}
                  name="model"
                />
              </div>

              <div className="form-group mt-3">
                <label for="imei">IMEI</label>
                <Field
                  disabled={props?.id}
                  className="form-control form-control-lg"
                  type="number"
                  name="imei"
                  onWheel={numberInputOnWheelPreventChange}
                />
                <ErrorMessage
                  component="div"
                  style={{ color: "red" }}
                  name="imei"
                />
              </div>

              <div className="form-group mt-3">
                <label for="ram">RAM</label>
                <Field
                  className="form-control form-control-lg "
                  name="ram"
                  type="number"
                  onWheel={numberInputOnWheelPreventChange}
                />
                <ErrorMessage
                  component="div"
                  style={{ color: "red" }}
                  name="ram"
                />
              </div>

              <div className="form-group mt-3">
                <label for="rom">ROM (Internal Storage)</label>
                <div className="input-group d-flex align-items-center gap-2">
                  <Field
                    className="form-control form-control-lg"
                    name="rom"
                    type="number"
                    onWheel={numberInputOnWheelPreventChange}
                    maxLength={3}
                  />
                  <div className="input-group-append">
                    <Field
                      className="form-control form-control-lg"
                      name="romUnit"
                      as="select"
                      defaultValue="GB"
                    >
                      <option value="GB">GB</option>
                      <option value="TB">TB</option>
                    </Field>
                  </div>
                </div>
                <ErrorMessage
                  component="div"
                  style={{ color: "red" }}
                  name="rom"
                />
              </div>

              <div className="form-group mt-3">
                <label for="deviceCondition">Device Condition</label>
                <Field
                  className="form-control form-control-lg text-area"
                  type="text-area"
                  component="textarea"
                  rows="4"
                  name="deviceCondition"
                  maxLength={500}
                />
                <ErrorMessage
                  component="div"
                  style={{ color: "red" }}
                  name="deviceCondition"
                />
              </div>

              <div className="form-group mt-3">
                <label for="purchasedFrom">Purchased From</label>
                <Field
                  className="form-control form-control-lg"
                  type="text"
                  name="purchasedFrom"
                  maxLength={50}
                />
                <ErrorMessage
                  component="div"
                  style={{ color: "red" }}
                  name="purchasedFrom"
                />
              </div>

              <div className="form-group mt-3">
                <label for="purchasedFromContactNo">
                  Purchased From Contact No.
                </label>
                <Field
                  className="form-control form-control-lg"
                  name="purchasedFromContactNo"
                  type="string"
                />
                <ErrorMessage
                  component="div"
                  style={{ color: "red" }}
                  name="purchasedFromContactNo"
                />
              </div>
              <div className="form-group mt-3">
                <label for="purchaseCost">Purchase Cost</label>
                <Field
                  className="form-control form-control-lg"
                  name="purchaseCost"
                  type="number"
                  onWheel={numberInputOnWheelPreventChange}
                  onChange={(e) => {
                    // Update value1 field
                    setFieldValue("purchaseCost", parseInt(e.target.value || 0));
                    if (!(values.soldPrice && e.target.value)) return;
                    // Calculate and update calculatedValue field
                    setFieldValue(
                      "profit",
                      values.soldPrice - parseInt(e.target.value)
                    );
                  }}
                />
                <ErrorMessage
                  component="div"
                  style={{ color: "red" }}
                  name="purchaseCost"
                />
              </div>

              <div className="form-group mt-3">
                <label for="purchaseDate">Purchase Date</label>
                <Field
                  className="form-control form-control-lg"
                  name="purchaseDate"
                  type="date"
                />
                <ErrorMessage
                  component="div"
                  style={{ color: "red" }}
                  name="purchaseDate"
                />
              </div>

              <div className="form-group mt-3">
                <label for="soldTo">Sold To</label>
                <Field
                  className="form-control form-control-lg"
                  type="text"
                  name="soldTo"
                  maxLength={50}
                />
                <ErrorMessage
                  component="div"
                  style={{ color: "red" }}
                  name="soldTo"
                />
              </div>

              <div className="form-group mt-3">
                <label for="soldToContactNo">Sold To Contact No.</label>
                <Field
                  className="form-control form-control-lg"
                  name="soldToContactNo"
                  type="number"
                  onWheel={numberInputOnWheelPreventChange}
                />
                <ErrorMessage
                  component="div"
                  style={{ color: "red" }}
                  name="soldToContactNo"
                />
              </div>

              <div className="form-group mt-3">
                <label for="soldPrice">Sold Price</label>
                <Field
                  className="form-control form-control-lg"
                  name="soldPrice"
                  type="number"
                  onWheel={numberInputOnWheelPreventChange}
                  maxLength={10}
                  onChange={(e) => {
                    // Update value1 field
                    setFieldValue("soldPrice", parseInt(e.target.value || 0));
                    if (!(values.purchaseCost && e.target.value)) return;
                    // Calculate and update calculatedValue field
                    setFieldValue(
                      "profit",
                      parseInt(e.target.value) - values.purchaseCost
                    );
                  }}
                />
                <ErrorMessage
                  component="div"
                  style={{ color: "red" }}
                  name="soldPrice"
                />
              </div>

              <div className="form-group mt-3">
                <label for="soldDate">Sold Date</label>
                <Field
                  className="form-control form-control-lg"
                  name="soldDate"
                  type="date"
                />
                <ErrorMessage
                  component="div"
                  style={{ color: "red" }}
                  name="soldDate"
                />
              </div>

              <div className="form-group mt-3">
                <label for="profit">Profit</label>
                <Field
                  className="form-control form-control-lg"
                  name="profit"
                  type="number"
                  readOnly={true}
                  disabled={true}
                />
                <ErrorMessage
                  component="div"
                  style={{ color: "red" }}
                  name="profit"
                />
              </div>
              <div className="d-flex align-items-center justify-content-between mt-3 mb-3">
                <div className="">
                  <button
                    className="btn btn-primary btn-lg"
                    type="submit"
                    disabled={isSubmitting || !dirty}
                  >
                    Submit
                  </button>
                </div>
                <div className="">
                  <button
                    className="btn btn-secondary btn-lg"
                    type="reset"
                    disabled={isSubmitting}
                    onClick={resetForm}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default DeviceForm;
