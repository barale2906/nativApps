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
     * Display the specified resource.
     */
    public function show($id)
    {
        $curso=Curso::find($id);
        return response()->json([
            'curso'=>$curso
        ], 200);
    }
    

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $curso=Curso::find($id);
        $curso->update($request->all());

        return response()->json([
            'curso'=>$curso
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $curso=Curso::findOrFail($id);
        $curso->delete();

        return response()->json([
            'curso'=>$curso
        ], 200);
    }
}
