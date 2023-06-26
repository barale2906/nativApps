<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CursoController;
use App\Http\Controllers\EstudianteController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

/* Route::middleware(['auth'])->group(function(){
    
}); */
Route::post('cursos', [CursoController::class, 'store']);
Route::get('cursos', [CursoController::class, 'index']);
Route::get('cursos/{id}', [CursoController::class, 'show']);
Route::get('cursosa/{id}', [CursoController::class, 'destroy']);
Route::post('cursosa/{id}', [CursoController::class, 'update']);


Route::apiResource('estudiantes', EstudianteController::class)->names('estudiantes');
