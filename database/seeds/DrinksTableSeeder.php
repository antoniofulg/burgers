<?php

use Illuminate\Database\Seeder;

class DrinksTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('drinks')->insert([
            'name' => 'Suco de abacaxi',
            'status' => 'avaliable',
            'category' => 'juice',
            'volume' => 300,
            'price' => 3
        ]);
        DB::table('drinks')->insert([
            'name' => 'Suco de acerola',
            'status' => 'avaliable',
            'category' => 'juice',
            'volume' => 300,
            'price' => 3
        ]);
        DB::table('drinks')->insert([
            'name' => 'Suco de cajá',
            'status' => 'avaliable',
            'category' => 'juice',
            'volume' => 300,
            'price' => 3
        ]);
        DB::table('drinks')->insert([
            'name' => 'Suco de goiaba',
            'status' => 'avaliable',
            'category' => 'juice',
            'volume' => 300,
            'price' => 3
        ]);
        DB::table('drinks')->insert([
            'name' => 'Suco de laranja',
            'status' => 'avaliable',
            'category' => 'juice',
            'volume' => 300,
            'price' => 3
        ]);
        DB::table('drinks')->insert([
            'name' => 'Suco de manga',
            'status' => 'avaliable',
            'category' => 'juice',
            'volume' => 300,
            'price' => 3
        ]);
        DB::table('drinks')->insert([
            'name' => 'Guaraná lata',
            'status' => 'avaliable',
            'category' => 'soda',
            'volume' => 355,
            'price' => 3.5
        ]);
        DB::table('drinks')->insert([
            'name' => 'Coca-cola lata',
            'status' => 'avaliable',
            'category' => 'soda',
            'volume' => 355,
            'price' => 3.5
        ]);
        DB::table('drinks')->insert([
            'name' => 'Coca-cola zero lata',
            'status' => 'avaliable',
            'category' => 'soda',
            'volume' => 355,
            'price' => 3.5
        ]);
    }
}
