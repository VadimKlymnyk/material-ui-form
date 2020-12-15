import { put, call, takeEvery } from "redux-saga/effects";
import { getAllClients, getApplicantsById } from "../../api/request";
import {
    GET_APPLICANTS,
    GET_APPLICANTS_REQUESTED,
    GET_CLIENTS,
    GET_CLIENTS_REQUESTED,
} from "../action/action";

function* getClients() {
  const clients = yield call(getAllClients);
  yield put({ type: GET_CLIENTS, payload: clients.items });
}

function* getApplicants({ payload }) {
  const user = yield call(getApplicantsById, payload);
  yield put({ type: GET_APPLICANTS, payload: user.items });
}


export default function* todoSaga() {
  yield takeEvery(GET_CLIENTS_REQUESTED, getClients);
  yield takeEvery(GET_APPLICANTS_REQUESTED, getApplicants);
}