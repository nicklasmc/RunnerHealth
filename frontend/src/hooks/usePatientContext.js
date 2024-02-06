import { PatientsContext } from '../context/PatientContext';
import { useContext } from 'react';

export const usePatientsContext = () => {
  const context = useContext(PatientsContext);

  if (!context) {
    throw Error(
      'usePatientsContext must be used inside a PatientsContextProvider'
    );
  }

  return context;
};
