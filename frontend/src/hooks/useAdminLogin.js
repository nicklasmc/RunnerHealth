import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useAdminLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/admins/admin_login`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      }
    );
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      // save the admin to local storage
      localStorage.setItem('admin', JSON.stringify(json));

      // update the auth context
      dispatch({ type: 'ADMIN_LOGIN', payload: json });

      setIsLoading(false);
    }
  };
  return { login, isLoading, error };
};
