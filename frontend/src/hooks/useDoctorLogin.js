import { useState } from 'react';
import { useAuthContext } from './useAuthContext';

export const useDoctorLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/doctors/doctor_login`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      }
    );
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.message);
    }
    if (response.ok) {
      // save the doctor to local storage
      localStorage.setItem('doctor', JSON.stringify(json));

      // update the auth context
      dispatch({ type: 'DOCTOR_LOGIN', payload: json });

      setIsLoading(false);
    }
  };
  return { login, isLoading, error };
};
