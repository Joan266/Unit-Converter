import React, { useEffect } from 'react';
import ConversionsList from "./components/conversionsList";
import UnitConverter from "./components/unitConverter";
import { useStoreContext } from './StoreContext';

function App() {
  const { state } = useStoreContext();
  useEffect(() => {
    const handleClose = () => {
      localStorage.setItem('conversions', JSON.stringify(state));
    };

    window.addEventListener('beforeunload', handleClose);

    return () => {
      window.removeEventListener('beforeunload', handleClose);
    };
  }, [state]);
  return (
    <div className="App">
      <header>
        <div>
          <img src="icons/purple_arrows.svg" alt="Arrows icon"/>
          <h1 className="text-big">unit converter</h1>
        </div>
      </header>
     <main>
      <UnitConverter />
      <ConversionsList />
     </main>
      <footer>
        <div>
          <p className="text-smaller">Terms of service</p>      
          <p className="text-smaller">Privacy policy</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
