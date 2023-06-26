<?php

namespace App\Http\Controllers;

use App\Models\Estudiante;
use Illuminate\Http\Request;

class EstudianteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $estudiantes =  Estudiante::orderBy('id','Desc')->get();

        return response()->json([
            'estudiantes'=>$estudiantes
        ], 200);
    }    

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nombre'    => 'required|max:255',
            'apellido'  => 'required|max:255',
            'edad'      => 'required',
            'email'     => 'required|max:255|unique:estudiantes',      
        ]);

        $estudiante = Estudiante::create($request->all());

        return response()->json([
            'estudiante'=>$estudiante
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $estudiante=Estudiante::find($id);
        return response()->json([
            'estudiante'=>$estudiante
        ], 200);
    }
    

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $estudiante=Estudiante::find($id);
        $estudiante->update($request->all());

        return response()->json([
            'estudiante'=>$estudiante
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $estudiante=Estudiante::findOrFail($id);
        $estudiante->delete();

        return response()->json([
            'estudiante'=>$estudiante
        ], 200);
    }
}
