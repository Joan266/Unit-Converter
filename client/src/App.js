import ConvertionsList from "./components/convertionsList";
import UnitConverter from "./components/unitConverter";

function App() {
  return (
    <div className="App">
      <header>
        <div>
          <img src="icons/purple_arrows.svg" alt="Arrows icon"/>
          unit converter
        </div>
      </header>
     <main>
      <UnitConverter />
      <ConvertionsList />
     </main>
      <footer>
        <div>
          <p>Terms of service</p>      
          <p>Privacy policy</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
