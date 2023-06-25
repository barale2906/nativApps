import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Index(){

    return(
        <div className="row">
            <div className="col-sm-6 mb-3 mb-sm-0">
                <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Modulo de Cursos</h5>
                    <p className="card-text">Describe todos los cursos registrados en el sistema.</p>
                    <NavLink to="/cursos"><button type="button" className="btn btn-success">Ir al modulo</button></NavLink>
                </div>
                </div>
            </div>
            <div className="col-sm-6">
                <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Modulo Estudiantes</h5>
                    <p className="card-text">Permite gestionar todos los estudiantes registrados</p>
                    <NavLink to="/estudiantes"><button type="button" className="btn btn-info">Ir al modulo</button></NavLink>
                </div>
                </div>
            </div>
        </div>
    )

}