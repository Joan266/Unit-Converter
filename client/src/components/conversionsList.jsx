import { useStoreContext } from "../StoreContext";
function ConversionsList() {
  const { state, dispatch } = useStoreContext()
  function handleClickXmark(index) {
    dispatch({ type: 'DELETE_CONVERSION', payload: index });
  }
  return (
    <div className="conversionsList">
      <label htmlFor="saved conversion" className="text-medium">saved</label>
      <div className="conversions-container text-small">
        {state && state.length > 0 && state.map((conversion,index) => { return (
          <div key={index} className="conversion-container">
            <span>
              {conversion.initialNumber} {conversion.initialUnit} → {conversion.finalNumber} {conversion.finalUnit}
            </span>
            <div className="xmark-container" onClick={() => handleClickXmark(index)}>
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