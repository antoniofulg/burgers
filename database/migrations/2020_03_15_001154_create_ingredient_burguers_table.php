<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateIngredientBurguersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ingredient_burguers', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('burguer_id');
            $table->unsignedBigInteger('ingredient_id')->nullable();
            $table->enum('category', ['bread', 'beef', 'cheese', 'salad', 'sauce', 'side_dishes'])->nullable();
            $table->integer('amount');
            $table->timestamps();

            $table->foreign('burguer_id')->references('id')->on('burguers')->onDelete('cascade');
            $table->foreign('ingredient_id')->references('id')->on('ingredients')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ingredient_burguers');
    }
}