import { useState } from 'react'
import './App.css'
import Navbar from './components/navbar'
import UIManager from './components/uiManager';
import Footer from './components/footer';

function App() {
  return (
    <>
      <Navbar />
      <div className='min-h-[80vh] bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]'>
      <UIManager/>
      </div>
      <Footer/>
    </>
  );
}

export default App
