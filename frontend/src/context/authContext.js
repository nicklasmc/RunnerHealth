import { createContext, useReducer, useEffect, useMemo } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'PATIENT_LOGIN':
      return { patient: action.payload };
    case 'PATIENT_LOGOUT':
      return { patient: null };
    case 'ADMIN_LOGIN':
      return { admin: action.payload };
    case 'ADMIN_LOGOUT':
      return { admin: null };
    case 'DOCTOR_LOGIN':
      return { doctor: action.payload };
    case 'DOCTOR_LOGOUT':
      return { doctor: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    patient: null,
    admin: null,
    doctor: null,
  });

  useEffect(() => {
    const patient = JSON.parse(localStorage.getItem('patient'));
    const admin = JSON.parse(localStorage.getItem('admin'));
    const doctor = JSON.parse(localStorage.getItem('doctor'));

    if (patient) {
      dispatch({ type: 'PATIENT_LOGIN', payload: patient });
    }
    if (admin) {
      dispatch({ type: 'ADMIN_LOGIN', payload: admin });
    }
    if (doctor) {
      dispatch({ type: 'DOCTOR_LOGIN', payload: doctor });
    }
  }, [dispatch]);

  console.log('AuthContext state: ', state);

  const auth_obj = useMemo(() => ({ ...state, dispatch }), [state]); // value is cached by useMemo
  return (
    <AuthContext.Provider value={auth_obj}>{children}</AuthContext.Provider>
  );
};
