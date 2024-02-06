import { createContext, useReducer, useEffect, useMemo } from 'react';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'PATIENT_LOGIN':
      return { patient: action.payload };
    case 'PATIENT_LOGOUT':
      return { patient: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    patient: null,
  });

  useEffect(() => {
    const patient = JSON.parse(localStorage.getItem('patient'));

    if (patient) {
      dispatch({ type: 'PATIENT_LOGIN', payload: patient });
    }
  }, [dispatch]);

  console.log('AuthContext state: ', state);

  const auth_obj = useMemo(() => ({ ...state, dispatch }), [state]); // value is cached by useMemo
  return (
    <AuthContext.Provider value={auth_obj}>{children}</AuthContext.Provider>
  );
};
