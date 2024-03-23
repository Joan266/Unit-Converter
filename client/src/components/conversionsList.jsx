import { useStoreContext } from "../StoreContext";
function ConversionsList() {
  const { state } = useStoreContext()
  return (
    <div className="conversionsList">
      <label htmlFor="saved conversion" className="medium-text">saved</label>
      <div className="conversionsContainer">
        {state && state.length > 0 && state.map((conversion,index) => { return (
          <div key={index}>
            <span>
              {conversion.initialNumber} {conversion.initialUnit} → {conversion.finalNumber} {conversion.finalUnit}
            </span>
            <div className="xmark-container">
              <img src="icons/xMark.svg" alt="X mark" />
            </div>
          </div>
          )})
        }
      </div>
    </div>
  );
}

export default ConversionsList;