<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Curso;
use App\Models\Estudiante;

class EstudianteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Estudiante::factory(1000)
            ->create()
            ->each(function($estudiante){
                $cursos = Curso::all()->count();
                $cursoAsignado = mt_rand(1, $cursos);

                $cursoAs=Curso::select('id')
                    ->inRandomOrder()
                    ->limit($cursoAsignado)
                    ->distinct()
                    ->get();

                foreach($cursoAs as $cursoa){
                    DB::table('curso_estudiante')->insert([
                        'curso_id'=>$cursoa->id,
                        'estudiante_id'=>$estudiante->id,
                        'created_at'=>now(),
                        'updated_at'=>now(),
                    ]);
                }
        });
    }
}
