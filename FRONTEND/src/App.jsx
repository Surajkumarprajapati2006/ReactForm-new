import './App.css'

import Render from './render.jsx'
import ContextProvider from './context/ContextProvider.jsx'
import Navbar from './components/Navbar.jsx';
import { Toaster } from 'sonner';


function App() {
  

  return (
    <ContextProvider>
      <Toaster richColors position="top-right" />
       <Navbar/>
       <Render/>
     </ContextProvider>
  );
}

export default App;
