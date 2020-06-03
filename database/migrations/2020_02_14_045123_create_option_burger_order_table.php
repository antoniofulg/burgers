<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOptionBurgerOrderTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('option_burger_order', function (Blueprint $table) {
            $table->unsignedBigInteger('burger_order_id');
            $table->unsignedBigInteger('burger_id');
            $table->unsignedBigInteger('order_id');
            $table->enum('option', ['add', 'remove']);
            $table->timestamps();

            $table->primary(['burger_order_id', 'burger_id', 'order_id'], 'option_burger_order_primary');
            $table->foreign('burger_order_id')->references('id')->on('burger_order');
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
        Schema::dropIfExists('option_burger_order');
    }
}
