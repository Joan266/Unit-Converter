import { useState, useEffect } from 'react';

function UnitConverter() {
  const conversionOperations = [
    { initialUnit: 'km', finalUnit: 'miles', conversionType: 'km_to_miles', conversionFactor: 0.621371 },
    { initialUnit: 'miles', finalUnit: 'km', conversionType: 'miles_to_km', conversionFactor: 1.60934 },
    { initialUnit: 'm', finalUnit: 'feet', conversionType: 'm_to_feet', conversionFactor: 3.28084 },
    { initialUnit: 'feet', finalUnit: 'm', conversionType: 'feet_to_m', conversionFactor: 0.3048 },
    { initialUnit: 'cm', finalUnit: 'inches', conversionType: 'cm_to_inches', conversionFactor: 0.393701 },
    { initialUnit: 'inches', finalUnit: 'cm', conversionType: 'inches_to_cm', conversionFactor: 2.54 }
  ];
  const [ conversionOperation, setConversionOperation ] = useState(conversionOperations[0]);
  const [ initialNumber,setInitialNumber ] = useState(0);
  const [ finalNumber,setFinalNumber ] = useState(0);

  const handleConversionOperationChange = (event) => {
    const conversionOperationIndex = event.target.value;
    setConversionOperation(conversionOperations[conversionOperationIndex]);
  };
  
  const handleInitialNumberChange = (event) => {
    const initialNumber = event.target.value;
    setInitialNumber(initialNumber);
  };

  useEffect(() => {
    function unitConversion() {
      const finalNumber = initialNumber * conversionOperation.conversionFactor;
      setFinalNumber(Math.floor(finalNumber*100)/100);
    }
    unitConversion()
  }, [conversionOperation,initialNumber]);

  return (
    <div className="unitConverter">
      <div className="title">
        <h1>convert</h1>
      </div>
      <div className="machine">
        <select onChange={handleConversionOperationChange}>
          <option value={0}>km → miles</option>
          <option value={1}>miles → km</option>
          <option value={2}>m → feet</option>
          <option value={3}>feet → m</option>
          <option value={4}>cm → inches</option>
          <option value={5}>inches → cm</option>
        </select>
        <img src="icons/white_arrows.svg" alt="White arrows icon" />
        <input type="number" name="distance_to_convert" value={initialNumber} onChange={handleInitialNumberChange} />
      </div>
      <div className="results">
        <img src="icons/heart.svg" alt="Heart icon" />
        <div>
          <span className="num">
            {finalNumber}
          </span>
          <span className="units">
            {conversionOperation.finalUnit}
          </span>
        </div>
      </div>
    </div>
  );
}

export default UnitConverter;
