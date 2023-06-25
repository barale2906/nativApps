<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Curso>
 */
class CursoFactory extends Factory
{
    
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nombre' => fake()->name(),
            'horario' => fake()->randomElement($array=['8-10','10-12','12-14','14-16','16-18']),
            'fechaInicio' => fake()->dateTimeBetween($startDate = '-5 months', $endDate = '+1 years', $timezone = 'America/Bogota'),
            'fechaFin' => fake()->dateTimeBetween($startDate = '-5 months', $endDate = '+1 years', $timezone = 'America/Bogota'),
        ];
    }
}
