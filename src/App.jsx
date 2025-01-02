// src/App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Step1 from './Components/Step1';
import Step2 from './Components/Step2';
import Step3 from './Components/Step3';
import Step4 from './Components/Step4';
import EmergencyPage from './Components/EmergencyPage';





function App() {
  return (
    
    <Router>
      <Routes>
      
          <Route path="/" element={<Step1/>}/>
          <Route path="/Step2" element={<Step2/>}/>
          <Route path="/Step3" element={<Step3/>}/>
          <Route path="/Step4" element={<Step4/>}/>
          <Route path="/EmergencyPage" element={<EmergencyPage/>}/>
          


   </Routes>
    </Router> 
     );
}

export default App;

