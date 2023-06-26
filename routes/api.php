<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CursoController;
//use App\Http\Controllers\EstudianteController;
use App\Http\Controllers\Api\EstudianteController;

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

/* Route::post('estudiantes', [EstudianteController::class, 'store']);
Route::get('estudiantes', [EstudianteController::class, 'index']);
Route::get('estudiantes/{id}', [EstudianteController::class, 'show']);
Route::get('estudiantesa/{id}', [EstudianteController::class, 'destroy']);
Route::post('estudiantesa/{id}', [EstudianteController::class, 'update']); */

Route::apiResource('estudiantes', EstudianteController::class)->names('estudiantes');


