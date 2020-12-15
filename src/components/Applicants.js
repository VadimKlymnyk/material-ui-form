import React, { useState } from "react";
import {
  Button,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
  TextField,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete } from "@material-ui/lab";
import { useFormik } from "formik";
import * as yup from "yup";
import { ADD_NEW_APPLICANT } from "../redux/action/action";
import { countries } from "../utils/utils";
import { ListApplicants } from "./ListApplicants";

const validationSchema = yup.object({
  country: yup.string().required("Виберіть країну!"),
  innCode: yup.string().required("Код обов'язковий!"),
  name: yup.string().required("Ім'я обов'язкове!"),
  address: yup.string().required("Адреса обов'язкова!"),
});

const Applicants = () => {
  const [visibleForm, setVisibleForm] = useState(false);
  const [visibleInputs, setVisibleInputs] = useState(false);
  const [visibleJson, setVisibleJson] = useState(false);
  const dispatch = useDispatch();
  const applicantsIds = useSelector((state) => state.store.applicantsIds);
  const clientId = useSelector((state) => state.store.clientId);
  const applicants = useSelector((state) => state.store.applicants);
  const newApplicants = useSelector((state) => state.store.newApplicants);

  const formik = useFormik({
    initialValues: {
      fis: "true",
      country: "UA",
      innCode: "",
      name: "",
      address: "",
      originalName: "",
      originalAddress: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch({
        type: ADD_NEW_APPLICANT,
        payload: { ...values, id: Date.now() },
      });
      setVisibleForm(false);
    },
  });

  const changeCountry = (country) => {
    formik.setFieldValue("country", country?.code ? country.code : "");
    if (country && country.code === "UA") {
      formik.setFieldValue("originalName", "");
      formik.setFieldValue("originalAddress", "");
      setVisibleInputs(false);
    } else {
      setVisibleInputs(true);
    }
  };

  return (
    <div className="container">
      <h1>Заявники</h1>
      <ListApplicants />
      <br />
      <Button
        onClick={() => {
          if (applicants.length && !visibleForm) {
            formik.resetForm();
            setVisibleInputs(false);
            setVisibleForm(true);
          }
        }}
        color="primary"
        className="button-form"
      >
        Додати +
      </Button>
      <br />
      {visibleForm ? (
        <div className="form-new-applicant">
          <form onSubmit={formik.handleSubmit}>
            <FormLabel component="legend">Додати заявника</FormLabel>
            <RadioGroup
              name="fis"
              defaultValue="true"
              onChange={(event, newValue) =>
                formik.setFieldValue("fis", newValue)
              }
            >
              <FormControlLabel
                value="true"
                control={<Radio color="primary" />}
                label="Фізична особа"
              />
              <FormControlLabel
                value="false"
                control={<Radio color="primary" />}
                label="Юридична особа"
              />
            </RadioGroup>
            <Autocomplete
              name="country"
              className="input-country"
              options={countries}
              getOptionLabel={(option) => option.label}
              onChange={(event, newValue) => {
                changeCountry(newValue);
              }}
              defaultValue={countries[0]}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Країна"
                  margin="normal"
                  name="country"
                  error={
                    formik.touched.country && Boolean(formik.errors.country)
                  }
                  helperText={formik.touched.country && formik.errors.country}
                />
              )}
            />
            <div className="input-container">
              <TextField
                label="ЄДРПОУ"
                name="innCode"
                className="input-left"
                value={formik.values.innCode}
                onChange={formik.handleChange}
                error={formik.touched.innCode && Boolean(formik.errors.innCode)}
                helperText={formik.touched.innCode && formik.errors.innCode}
              />
            </div>
            <div className="input-container">
              <TextField
                label={`Ім'я`}
                name="name"
                className="input-left"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              {visibleInputs ? (
                <div className="input-original">
                  <TextField
                    label="Назва мовою походження"
                    name="originalName"
                    className="input-right"
                    // fullWidth
                    onChange={(event) =>
                      formik.setFieldValue("originalName", event.target.value)
                    }
                  />
                </div>
              ) : null}
            </div>
            <div className="input-container">
              <TextField
                label="Адреса"
                name="address"
                className="input-left"
                value={formik.values.address}
                onChange={formik.handleChange}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
              />
              {visibleInputs ? (
                <div className="input-original">
                  <TextField
                    label="Адреса мовою походження"
                    name="originalAddress"
                    className="input-right"
                    onChange={(event) =>
                      formik.setFieldValue(
                        "originalAddress",
                        event.target.value
                      )
                    }
                  />
                </div>
              ) : null}
            </div>
            <br />
            <Button
              variant="outlined"
              color="primary"
              className="button-form"
              type="submit"
            >
              Додати
            </Button>
          </form>
        </div>
      ) : null}
      <br />
      <Button
        variant="contained"
        color="primary"
        onClick={() =>
          clientId && applicantsIds.length
            ? setVisibleJson(true)
            : setVisibleJson(false)
        }
      >
        ЗБЕРЕГТИ ЗАЯВКУ
      </Button>
      {visibleJson && applicantsIds.length ? (
        <>
          <p>{JSON.stringify({ clientId })}</p>
          <p className="text-json">{JSON.stringify({ applicantsIds })}</p>
          <p>{JSON.stringify({ newApplicants })}</p>
        </>
      ) : null}
    </div>
  );
};

export { Applicants };
