import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from './index';
import CreateUrl from './createUrl';
import Url from './url';

function App(){

  return (

    <Router>
      <Routes>
        <Route path="/" element={<Index/>} />                              
        <Route path="/createurl/" element={<CreateUrl/>} />          
        <Route path="/url/:id" element={<Url/>} />     
      </Routes>
    </Router>

  );

}

export default App;