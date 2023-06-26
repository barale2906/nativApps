<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Estudiante;

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
            'nombre'        => 'required',
            'apellido'       => 'required',
            'edad'   => 'required',
            'email'      => 'required',      
        ]);

        $estudiante = Estudiante::create($request->all());

        return response()->json([
            'estudiante'=>$estudiante
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $estudiante=Estudiante::find($id);
        return response()->json([
            'estudiante'=>$estudiante
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
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
    public function destroy(string $id)
    {
        $estudiante = Estudiante::destroy($id);

        return response()->json([
            'estudiante'=>$estudiante
        ], 200);
    }
}
