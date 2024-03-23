import ConvertionsList from "./components/convertionsList";
import UnitConverter from "./components/unitConverter";

function App() {
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
      <ConvertionsList />
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
