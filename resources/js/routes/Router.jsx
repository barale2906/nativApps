import React from 'react';
import { Route, Routes } from "react-router-dom";
import Index from '../components/Index';
import IndexEstudiante from '../estudiantes/IndexEstudiante';
import IndexCursos from '../cursos/IndexCursos';
import Nuevocurso from '../cursos/NuevoCurso';

export default function Router(){
    return(        
        <Routes>              
            <Route path="/home" element={<Index/>}/>
            <Route path="/estudiante" element={<IndexEstudiante/>}/>
            <Route path="/curso" element={<IndexCursos/>}/>
            <Route path="/curso/nuevo" element={<Nuevocurso/>}/>
        </Routes>
    )
}