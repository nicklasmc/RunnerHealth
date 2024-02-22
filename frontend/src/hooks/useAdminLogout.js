import { useAuthContext } from './useAuthContext';
import { useAdminsContext } from './useAdminContext';

export const UseAdminLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: adminsDispatch } = useAdminsContext();
  const adminLogout = () => {
    // remove admin from storage
    localStorage.removeItem('admin');

    // dispatch logout action
    dispatch({ type: 'ADMIN_LOGOUT' });
    adminsDispatch({ type: 'SET_ADMINS', payload: null });
  };
  return { adminLogout };
};
