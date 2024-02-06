import { useAuthContext } from './useAuthContext';
import { usePatientsContext } from './usePatientContext';

export const UseLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: patientsDispatch } = usePatientsContext();
  const logout = () => {
    // remove patient from storage
    localStorage.removeItem('patient');

    // dispatch logout action
    dispatch({ type: 'PATIENT_LOGOUT' });
    patientsDispatch({ type: 'SET_PATIENTS', payload: null });
  };
  return { logout };
};
