import React from 'react';
import { Route, Routes } from "react-router-dom";
import Index from '../components/Index';

export default function Router(){
    return(        
        <Routes>              
            <Route path="/home" element={<Index/>}/> 
        </Routes>
    )
}