<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('user_id')->nullable(); //Id do cliente
            $table->enum('type', ['delivery', 'on_site', 'to_go']); //Tipo de pedido [entrega, consumo local, para viagem];
            $table->unsignedBigInteger('address_id')->nullable(); //Endereço do cliente
            $table->enum('status', ['pending', 'production', 'sented', 'concluded', 'declined']); //Status do pedido [pendente, sendo produzido, enviado, concluído, recusado];
            $table->double('price', 8, 2);
            $table->double('discount', 8, 2);
            $table->double('total', 8, 2);
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('set null');
            $table->foreign('address_id')->references('id')->on('addresses')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
