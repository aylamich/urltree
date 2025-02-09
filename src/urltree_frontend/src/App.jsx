import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Index from './index';
import CreateUrl from './createUrl';
import Url from './url';
import LearnMore from './learnMore';

function App(){

  return (

    <Router>
      <Routes>
        <Route path="/" element={<Index/>} />                              
        <Route path="/createurl/" element={<CreateUrl/>} />          
        <Route path="/url/:id" element={<Url/>} />     
        <Route path="/learnmore/" element={<LearnMore/>} />
      </Routes>
    </Router>

  );

}

export default App;