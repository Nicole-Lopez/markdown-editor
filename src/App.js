import Main from './pages/Main/Main';
import './assets/globalStyles/reset.css';
import InputContextProvider from './context/inputContext';

function App() {
  return (
  	<InputContextProvider>
	    <div className="App">
	      <Main/>
	    </div>  				
  	</InputContextProvider>
  );
}

export default App;
