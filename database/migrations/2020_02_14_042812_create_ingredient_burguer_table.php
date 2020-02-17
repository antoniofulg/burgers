<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateIngredientBurguerTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ingredient_burguer', function (Blueprint $table) {
            $table->unsignedBigInteger('burguer_id');
            $table->unsignedBigInteger('ingredient_id');
            $table->timestamps();

            $table->primary(['burguer_id', 'ingredient_id']);
            // $table->foreign('burguer_id')->references('id')->on('burguers');
            // $table->foreign('ingredient_id')->references('id')->on('ingredients');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ingredient_burguer');
    }
}
