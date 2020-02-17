<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDrinkOrderTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('drink_order', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('drink_id');
            $table->unsignedBigInteger('order_id');
            $table->longText('notes');
            $table->timestamps();

            $table->foreign('drink_id')->references('id')->on('drinks');
            $table->foreign('order_id')->references('id')->on('orders');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('drink_order');
    }
}
