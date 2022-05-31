import React, { useCallback } from 'react';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import './App.css';
import particlesOptions from "./particles.json";
import Home from './pages/Home/Home.tsx';
import { Route, Routes } from 'react-router-dom';

function App() {
    const particlesInit = useCallback(main => {
        loadFull(main);
    }, [])

    return (
        <div className="App">
            <Particles options={particlesOptions} init={particlesInit}/>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </div>
    );
}

export default App;
