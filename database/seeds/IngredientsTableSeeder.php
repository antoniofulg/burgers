<?php

use Illuminate\Database\Seeder;

class IngredientsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('ingredients')->insert([
            'name' => 'Pão artesanal',
            'status' => 'avaliable',
            'category' => 'bread',
            'price' => 0
        ]);
        DB::table('ingredients')->insert([
            'name' => 'Alface',
            'status' => 'avaliable',
            'category' => 'salad',
            'price' => 0
        ]);
        DB::table('ingredients')->insert([
            'name' => 'Tomate',
            'status' => 'avaliable',
            'category' => 'salad',
            'price' => 0
        ]);
        DB::table('ingredients')->insert([
            'name' => 'Cebola roxa',
            'status' => 'avaliable',
            'category' => 'salad',
            'price' => 0
        ]);
        DB::table('ingredients')->insert([
            'name' => 'Blend de boi (120g)',
            'status' => 'avaliable',
            'category' => 'beef',
            'price' => 4
        ]);
        DB::table('ingredients')->insert([
            'name' => 'Carne de sol desfiada na nata',
            'status' => 'avaliable',
            'category' => 'beef',
            'price' => 2
        ]);
        DB::table('ingredients')->insert([
            'name' => 'Cheddar',
            'status' => 'avaliable',
            'category' => 'cheese',
            'price' => 2
        ]);
        DB::table('ingredients')->insert([
            'name' => 'Muçarela',
            'status' => 'avaliable',
            'category' => 'cheese',
            'price' => 2
        ]);
        DB::table('ingredients')->insert([
            'name' => 'Bacon',
            'status' => 'avaliable',
            'category' => 'side_dishes',
            'price' => 2
        ]);
        DB::table('ingredients')->insert([
            'name' => 'Ovo',
            'status' => 'avaliable',
            'category' => 'side_dishes',
            'price' => 1.5
        ]);
        DB::table('ingredients')->insert([
            'name' => 'Cebola caramelizada',
            'status' => 'avaliable',
            'category' => 'side_dishes',
            'price' => 2
        ]);
        DB::table('ingredients')->insert([
            'name' => 'Molho da casa',
            'status' => 'avaliable',
            'category' => 'sauce',
            'price' => 2
        ]);
        DB::table('ingredients')->insert([
            'name' => 'Molho chipotle',
            'status' => 'avaliable',
            'category' => 'sauce',
            'price' => 2
        ]);
        DB::table('ingredients')->insert([
            'name' => 'Molho parmesão',
            'status' => 'avaliable',
            'category' => 'sauce',
            'price' => 2
        ]);
        DB::table('ingredients')->insert([
            'name' => 'Molho orégano',
            'status' => 'avaliable',
            'category' => 'sauce',
            'price' => 2
        ]);
    }
}
