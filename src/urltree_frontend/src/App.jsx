import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from './index';
import CreateUrl from './createUrl';

function App(){

  return (

    <Router>
      <Routes>
        <Route path="/" element={<Index/>} />                              
        <Route path="/createurl/" element={<CreateUrl/>} />          
        { /* por  A rota para tela dos links*/ }      
      </Routes>
    </Router>

  );

}

export default App;