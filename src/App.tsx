import { BrowserRouter, Routes, Route } from "react-router-dom";
import Encoder from './components/Encoder.js'
import Decoder from './components/Decoder.js'
import Footer from './components/Footer.js'


function App() {
  return (
    <>
          <BrowserRouter>
          <Routes>
            <Route path="/" element={<Encoder />} />
            <Route path="/encoder" element={<Encoder />} />
            <Route path="/decoder/:name/:email/:phone/:occupation" element={<Decoder />} />
          </Routes>
        </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;