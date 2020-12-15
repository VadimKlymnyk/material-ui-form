import React, { useEffect, useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_APPLICANTS_REQUESTED,
  GET_CLIENTS_REQUESTED,
  REMOVE_APPLICANTS,
  SAVE_CLIENT_ID,
} from "../redux/action/action";

const Client = () => {
  const [selectedClient, setSelectedClient] = useState({});
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.store.clients);

  useEffect(() => {
    dispatch({ type: GET_CLIENTS_REQUESTED })
  }, []);

  useEffect(() => {
    if (selectedClient?.id) {
      dispatch({ type: GET_APPLICANTS_REQUESTED, payload: selectedClient.id });
      dispatch({ type: SAVE_CLIENT_ID, payload: selectedClient.id });
    } else {
      dispatch({ type: REMOVE_APPLICANTS });
    }
  }, [selectedClient]); 

  return (
    <div className="container">
      <h1>Клієнт</h1>
      <Autocomplete
        id="client"
        className="input-country"
        options={clients}
        getOptionLabel={(option) => option.name}
        onChange={(event, newValue) => {
          setSelectedClient(newValue);
        }}
        renderInput={(params) => (
          <TextField {...params} label="Клієнт" margin="normal" />
        )}
      />
      {selectedClient?.id ? (
        <div>
          <h3>{selectedClient.name}</h3>
          <p>{"Email. " + selectedClient.email}</p>
          <p>{"Телефон. " + selectedClient.phone}</p>
        </div>
      ) : null}
      <Button variant="contained" color="primary">ЗБЕРЕГТИ ЗАЯВКУ</Button>
    </div>
  );
};

export { Client };
