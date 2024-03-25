import { createContext, useReducer, useEffect, useContext } from 'react';

const StoreContext = createContext();

const initialState = [];

const storeReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_CONVERSION':
      return [ action.payload, ...state ];
    case 'DELETE_CONVERSION':
      return state.filter((_, index) => index !== action.payload);
    case 'CLEAR_CONVERSIONS':
      return [];
    case 'SET_CONVERSIONS':
      return action.payload;
    default:
      return state;
  }
};

export const StoreContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(storeReducer, initialState);

  useEffect(() => {
    const fetchConversions = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/conversions");
        if (!response.ok) {
          throw new Error("Failed to fetch conversions");
        }
        const conversions = await response.json();
        dispatch({ type: 'SET_CONVERSIONS', payload: conversions });
      } catch (error) {
        console.error("Error fetching conversions:", error);
      }
    };
  
    fetchConversions();
  }, []);
  
  // useEffect(() => {
  //   const storedConversions = localStorage.getItem('conversions');
  //   if (storedConversions) {
  //     const conversions = JSON.parse(storedConversions);
  //     dispatch({ type: 'SET_CONVERSIONS', payload: conversions });
  //   }
  // }, []);
  useEffect(() => {
    console.log(state)
  }, [state]);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStoreContext = () => {
  const context = useContext(StoreContext);

  if (!context) {
    throw Error('useStoreContext must be used inside a StoreContextProvider');
  }

  return context;
};
