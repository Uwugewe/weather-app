import logo from './logo.svg';
import './App.css';
import WeatherApp from './WeatherApp';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <WeatherApp />
    </div>
  );
}

export default App;
