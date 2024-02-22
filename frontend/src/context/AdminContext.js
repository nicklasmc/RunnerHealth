import { createContext, useReducer } from 'react';

export const AdminsContext = createContext();

export const adminsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ADMINS':
      return {
        admins: action.payload,
      };
    case 'CREATE_ADMIN':
      return {
        admins: [action.payload, ...state.admins],
      };
    case 'DELETE_ADMIN':
      return {
        admins: state.admins.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const AdminsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(adminsReducer, {
    admins: null,
  });

  return (
    <AdminsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AdminsContext.Provider>
  );
};
