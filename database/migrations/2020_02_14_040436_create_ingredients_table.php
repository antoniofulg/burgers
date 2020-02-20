<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateIngredientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ingredients', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->enum('status', ['avaliable', 'unavaliable', 'desactivated']); //Status do ingrediente, se está disponível / indisponível / ou se não deve aparecer no cardápio;
            $table->enum('category', ['bread', 'blend', 'cheese', 'salad', 'side_dishes']); // Tipo do ingrediente: [pão, carne, queijo, salada, acompanhamento]
            $table->double('price', 8, 2);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ingredients');
    }
}
