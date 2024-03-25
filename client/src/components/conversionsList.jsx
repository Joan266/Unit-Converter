import { useStoreContext } from "../StoreContext";
function ConversionsList() {
  const { state, dispatch } = useStoreContext()
  async function handleClickXmark(index, _id) {
    dispatch({ type: 'DELETE_CONVERSION', payload: index });
    try {
      await fetch(`http://localhost:8000/api/delete/${_id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });
    } catch (error) {
      console.error("Error deleting conversion:", error);
    }
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
            <div className="xmark-container" onClick={() => handleClickXmark(index,conversion._id)}>
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