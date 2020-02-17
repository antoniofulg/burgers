<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBurguerOrderTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('burguer_order', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('burguer_id');
            $table->unsignedBigInteger('order_id');
            $table->longText('notes');
            $table->timestamps();

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
        Schema::dropIfExists('burguer_order');
    }
}
