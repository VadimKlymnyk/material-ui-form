import {
  GET_APPLICANTS,
  GET_CLIENTS,
  REMOVE_APPLICANTS,
  SAVE_CLIENT_ID,
  SAVE_APPLICANTS,
  ADD_NEW_APPLICANT,
  REMOVE_NEW_APPLICANT,
} from "../action/action";

const initialState = {
  clients: [],
  applicants: [],
  clientId: "",
  applicantsIds: [],
  newApplicants: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CLIENTS:
      return { ...state, clients: action.payload };

    case GET_APPLICANTS:
      return { ...state, applicants: action.payload };

    case REMOVE_APPLICANTS:
      return { ...state, applicants: [], clientId: '', applicantsIds: [] };

    case SAVE_CLIENT_ID:
      return { ...state, clientId: action.payload, applicantsIds: [], newApplicants: [] };

    case SAVE_APPLICANTS:
      const newApplicantsIds = state.applicantsIds.find(id => id === action.payload)
        ? state.applicantsIds.filter(id => id !== action.payload)
        : [...state.applicantsIds, action.payload];
      return { ...state, applicantsIds: newApplicantsIds };
    
    case ADD_NEW_APPLICANT:
        return { ...state, newApplicants: [...state.newApplicants, action.payload] };
    
    case REMOVE_NEW_APPLICANT:
      return { ...state, newApplicants: state.newApplicants.filter(applicant => applicant.id !== action.payload) };
    
    default:
      return state;
  }
};

export default reducer;
