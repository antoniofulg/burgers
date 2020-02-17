<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDrinksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('drinks', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name');
            $table->enum('type', ['beer', 'juice', 'soda', 'water']); //Tipos da bebida [cerveja, suco, refrigerante, agua];
            $table->enum('status', ['avaliable', 'unavaliable', 'desactivated']); //Status do hamburguer, se está disponível / indisponível / ou se não deve aparecer no cardápio;
            $table->integer('volume'); //Volume em ml
            $table->double('price', 8, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('drinks');
    }
}
