<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CursoController;
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

Route::apiResource('estudiantes', EstudianteController::class)->names('estudiantes');
Route::post('estudiantesa/{id}', [EstudianteController::class, 'update']);
Route::post('asignar', [EstudianteController::class, 'asignar']);

Route::apiResource('cursos', CursoController::class)->names('cursos');
Route::post('cursosa/{id}', [CursoController::class, 'update']);


