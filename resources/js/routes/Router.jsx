import React from 'react';
import { Route, Routes } from "react-router-dom";
import Index from '../components/Index';
import IndexEstudiante from '../estudiantes/IndexEstudiante';
import IndexCursos from '../cursos/IndexCursos';
import Nuevocurso from '../cursos/NuevoCurso';
import EditarCurso from '../cursos/EditarCurso';
import BorrarCurso from '../cursos/BorrarCurso';
import NuevoEstudiante from '../estudiantes/NuevoEstudiante';
import EditarEstudiante from '../estudiantes/EditarEstudiante';
import BorrarEstudiante from '../estudiantes/BorrarEstudiante';
import AsignarCursos from '../estudiantes/AsignarCursos';
import AsignarEstudiante from '../cursos/AsignarEstudiante';

export default function Router(){
    return(        
        <Routes>              
            <Route path="/home" element={<Index/>}/>            
            <Route path="/curso" element={<IndexCursos/>}/>
            <Route path="/curso/nuevo" element={<Nuevocurso/>}/>
            <Route path="/curso/editar/:id" element={<EditarCurso/>}/>
            <Route path="/curso/borrar/:id" element={<BorrarCurso/>}/>

            <Route path="/estudiante" element={<IndexEstudiante/>}/>
            <Route path="/estudiante/nuevo" element={<NuevoEstudiante/>}/>
            <Route path="/estudiante/editar/:id" element={<EditarEstudiante/>}/>
            <Route path="/estudiante/borrar/:id" element={<BorrarEstudiante/>}/>
            <Route path="/estudiante/asignar/:id" element={<AsignarCursos/>}/>
            <Route path="/estudiante/asignarEstudiante/:id" element={<AsignarEstudiante/>}/>
        </Routes>
    )
}