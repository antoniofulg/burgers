<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOptionBurguerOrderTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('option_burguer_order', function (Blueprint $table) {
            $table->unsignedBigInteger('burguer_order_id');
            $table->unsignedBigInteger('burguer_id');
            $table->unsignedBigInteger('order_id');
            $table->enum('option', ['add', 'remove']);
            $table->timestamps();

            $table->primary(['burguer_order_id', 'burguer_id', 'order_id'], 'option_burguer_order_primary');
            $table->foreign('burguer_order_id')->references('id')->on('burguer_order');
            $table->foreign('burguer_id')->references('id')->on('burguers');
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
        Schema::dropIfExists('option_burguer_order');
    }
}
