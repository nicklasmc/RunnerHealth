import { createContext, useReducer } from 'react';

export const PatientsContext = createContext();

export const patientsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PATIENTS':
      return {
        patients: action.payload,
      };
    case 'CREATE_PATIENT':
      return {
        patients: [action.payload, ...state.patients],
      };
    case 'DELETE_PATIENT':
      return {
        patients: state.patients.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const PatientsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(patientsReducer, {
    patients: null,
  });

  return (
    <PatientsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PatientsContext.Provider>
  );
};
