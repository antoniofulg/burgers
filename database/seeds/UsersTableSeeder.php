<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'Antonio Fulgêncio',
            'access_level' => 'master',
            'email' => 'antoniofulg@gmail.com',
            'password' => Hash::make('123456789'),
        ]);
    }
}
