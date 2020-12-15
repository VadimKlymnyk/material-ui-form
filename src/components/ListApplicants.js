import React from "react";
import {
  FormGroup,
  Checkbox,
  FormControlLabel,
  IconButton,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux";
import { REMOVE_NEW_APPLICANT, SAVE_APPLICANTS } from "../redux/action/action";

const ListApplicants = () => {
  const dispatch = useDispatch();
  const applicantsIds = useSelector((state) => state.store.applicantsIds);
  const applicants = useSelector((state) => state.store.applicants);
  const newApplicants = useSelector((state) => state.store.newApplicants);

  const handleChangeApplicants = (applicantId) => {
    dispatch({ type: SAVE_APPLICANTS, payload: applicantId });
  };

  const handleRemoveNewApplicant = (id) => {
    dispatch({ type: REMOVE_NEW_APPLICANT, payload: id });
  };

  return (
    <>
      <FormGroup>
        {applicants?.map((applicant) => {
          return (
            <FormControlLabel
              key={applicant.id}
              control={
                <Checkbox
                  name={applicant.id}
                  checked={!!applicantsIds.find((id) => id === applicant.id)}
                  onChange={() => handleChangeApplicants(applicant.id)}
                  color="primary"
                />
              }
              label={
                <p style={{ margin: "0" }}>
                  <b>{applicant.name}, </b> {applicant.address.address}
                </p>
              }
            />
          );
        })}
      </FormGroup>
      <FormGroup>
        {newApplicants?.map((applicant) => {
          return (
            <FormControlLabel
              key={applicant.id}
              control={<Checkbox color="primary" />}
              label={
                <div className="checkbox-container">
                  <p style={{ margin: "0" }}>
                    <b>{applicant.name}, </b> {applicant.address}
                  </p>
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleRemoveNewApplicant(applicant.id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </div>
              }
            />
          );
        })}
      </FormGroup>
    </>
  );
};

export { ListApplicants };
