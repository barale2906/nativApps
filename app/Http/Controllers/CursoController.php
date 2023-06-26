<?php

namespace App\Http\Controllers;

use App\Models\Curso;
use Illuminate\Http\Request;

class CursoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $cursos =  Curso::orderBy('id','Desc')->get();

        return response()->json([
            'cursos'=>$cursos
        ], 200);
    }    

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nombre'        => 'required',
            'horario'       => 'required',
            'fechaInicio'   => 'required',
            'fechaFin'      => 'required',      
        ]);

        $curso = Curso::create($request->all());

        return response()->json([
            'curso'=>$curso
        ], 200);
    }
    

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Curso $curso)
    {
        $request->validate([
            'nombre'        => 'required',
            'horario'       => 'required',
            'fechaInicio'   => 'required',
            'fechafin'      => 'required',      
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Curso $curso)
    {
        //
    }
}
