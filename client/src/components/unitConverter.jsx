import { useState, useEffect } from 'react';
import { useStoreContext } from '../StoreContext';

function UnitConverter() {
  const { dispatch } = useStoreContext();
  const conversionOperations = [
    { id: 0, initialUnit: 'km', finalUnit: 'miles', conversionType: 'km_to_miles', conversionFactor: 0.621371192237334 },
    { id: 1, initialUnit: 'miles', finalUnit: 'km', conversionType: 'miles_to_km', conversionFactor: 1.609344 },
    { id: 2, initialUnit: 'm', finalUnit: 'feet', conversionType: 'm_to_feet', conversionFactor: 3.280839895013123 },
    { id: 3, initialUnit: 'feet', finalUnit: 'm', conversionType: 'feet_to_m', conversionFactor: 0.3048 },
    { id: 4, initialUnit: 'cm', finalUnit: 'inches', conversionType: 'cm_to_inches', conversionFactor: 0.3937007874015748 },
    { id: 5, initialUnit: 'inches', finalUnit: 'cm', conversionType: 'inches_to_cm', conversionFactor: 2.54 }
];
  const [ conversionOperation, setConversionOperation ] = useState(conversionOperations[0]);
  const [ initialNumber, setInitialNumber ] = useState("");
  const [ finalNumber, setFinalNumber ] = useState(0);

  const handleConversionOperationChange = (event) => {
    const index = event.target.value;
    setConversionOperation(conversionOperations[index]);
  };
  
  const handleInitialNumberChange = (event) => {
    const initialNumber = event.target.value;
    setInitialNumber(initialNumber);
  };

  function handleReverseConversion()  {
    if(initialNumber !== "" && initialNumber !== 0) {
      setInitialNumber(finalNumber);
    }
    if (conversionOperation.id % 2 === 0)
      setConversionOperation(conversionOperations[conversionOperation.id + 1]);
    else
      setConversionOperation(conversionOperations[conversionOperation.id - 1]);
  };

  async function handleSaveConversion() {
    if (initialNumber === "" || initialNumber === 0) return; 
    const formattedFinalNumber = (Math.floor(finalNumber * 100) / 100).toString();
    const formattedInitialNumber = (Math.floor(initialNumber * 100) / 100).toString();
    const conversion = {
      initialNumber: formattedInitialNumber,
      finalNumber: formattedFinalNumber,
      initialUnit: conversionOperation.initialUnit,
      finalUnit: conversionOperation.finalUnit
    };
    dispatch({ type: 'ADD_CONVERSION', payload: conversion });
    try {
      await fetch("http://localhost:8000/api/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(conversion)
      });
      setInitialNumber("");
    } catch (error) {
      console.error("Error saving conversion:", error);
    }
  };
  
  useEffect(() => {
    function unitConversion() {
      const finalNumber = initialNumber * conversionOperation.conversionFactor;
      setFinalNumber(finalNumber);
    }
    unitConversion()
  }, [conversionOperation,initialNumber]);

  return (
    <div className="unitConverter">
      <div className="title">
        <h1 className='text-bigger'>convert</h1>
      </div>
      <div className="machine">
        <div className='conversion-type-container'>
          <select onChange={handleConversionOperationChange} value={conversionOperation.id} className='text-small'>
            {conversionOperations.map(operation => (
              <option key={operation.id} value={operation.id}>
                {`${operation.initialUnit} → ${operation.finalUnit}`}
              </option>
            ))}
          </select>
          <div className='reverse-conversion' onClick={handleReverseConversion}>
            <img src="icons/white_arrows.svg" alt="White arrows icon" />
          </div>
        </div>
        <div className='initial-input-container'>
          <input type="number" name="distance_to_convert" className='text-small' value={initialNumber} onChange={handleInitialNumberChange} />
          <span className="initialunit text-small">
            {conversionOperation.initialUnit}
          </span>
        </div>
      </div>
      <div className="results">
        <div className='heart-container' onClick={handleSaveConversion}>
         <img src="icons/heart.svg" alt="Heart icon" />
        </div>
        <div style={{minWidth:"84px"}}>
          <span className="num text-bigger">
            {Math.floor(finalNumber*100)/100}
          </span>
          <span className="finalunit text-medium">
            {conversionOperation.finalUnit}
          </span>
        </div>
      </div>
    </div>
  );
}

export default UnitConverter;
