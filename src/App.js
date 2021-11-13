import './App.css';
import Home from './Home';

import Mydata from './Mydata';
import {Route, Routes} from 'react-router-dom'
function App() {
  return (
    <>
    <Routes>
    <Route exact path="/" element={<Home/>}/>
      <Route path="/mydata" element={<Mydata/>} />
    </Routes>
    </>
  );
}

export default App;