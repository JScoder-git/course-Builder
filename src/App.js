
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import NewModule from './Components/Newmodule';
import AddLink from './Components/Addlink';
import UploadFiles from './Components/Uploadfiles';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/new-module" element={<NewModule />} />
          <Route path="/add-link" element={<AddLink />} />
          <Route path="/upload-files" element={<UploadFiles />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
