import { createContext, useReducer } from 'react';

export const DoctorsContext = createContext();

export const doctorsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DOCTORS':
      return {
        doctors: action.payload,
      };
    case 'CREATE_DOCTOR':
      return {
        doctors: [action.payload, ...state.doctors],
      };
    case 'DELETE_DOCTOR':
      return {
        doctors: state.doctors.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const DoctorsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(doctorsReducer, {
    doctors: null,
  });

  return (
    <DoctorsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </DoctorsContext.Provider>
  );
};
