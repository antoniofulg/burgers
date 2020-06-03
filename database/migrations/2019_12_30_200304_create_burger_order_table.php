<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBurgerOrderTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('burger_order', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('burger_id');
            $table->unsignedBigInteger('order_id');
            $table->longText('notes');
            $table->timestamps();

            $table->foreign('burger_id')->references('id')->on('burgers');
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
        Schema::dropIfExists('burger_order');
    }
}
