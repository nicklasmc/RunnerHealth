import { useAuthContext } from './useAuthContext';
import { useDoctorsContext } from './useDoctorContext';

export const UseDoctorLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: doctorsDispatch } = useDoctorsContext();
  const doctorLogout = () => {
    // remove doctor from storage
    localStorage.removeItem('doctor');
    localStorage.removeItem('userID');
    localStorage.removeItem('orgID');

    // dispatch logout action
    dispatch({ type: 'DOCTOR_LOGOUT' });
    doctorsDispatch({ type: 'SET_DOCTORS', payload: null });
  };
  return { doctorLogout };
};
