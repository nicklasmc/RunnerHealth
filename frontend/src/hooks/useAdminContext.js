import { AdminsContext } from '../context/AdminContext';
import { useContext } from 'react';

export const useAdminsContext = () => {
  const context = useContext(AdminsContext);

  if (!context) {
    throw Error('useAdminsContext must be used inside a AdminsContextProvider');
  }

  return context;
};
