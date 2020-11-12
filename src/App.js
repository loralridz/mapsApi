
import './App.css';
import {Search} from './components/Search';

const markerLatLng = { lat: 33.6843, lng: 72.9885 }; // lat lng for markers, this can be array for multiple markers
const centerLatLng = { lat: 33.6844, lng: 73.0479 }; // center lat lng for center of map where map should focus when loads

function App() {
  return (
    <div className="App">
     <Search/>
    
    </div>
  );
}

export default App;
