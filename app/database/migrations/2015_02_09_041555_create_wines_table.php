<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateWinesTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('wines', function(Blueprint $table)
		{
            $table->increments('id');
            $table->string('name');
            $table->string('product_code')->unique();
            $table->decimal('price', 8, 2);
            $table->integer('package_size');
            $table->decimal('discount_price', 8, 2);
            $table->string('image_path');
            $table->enum('availability', array('InStock', 'LimitedStock', 'OutOfStock', 'Pre-order'));
            //$table->enum('wine_type', array('red', 'white', 'sparkling', 'mix', 'others'));
            $table->integer('country_id')->unsigned()->index();
            $table->foreign('country_id')->references('id')->on('countries')->onDelete('cascade');
            $table->integer('type_id')->unsigned()->index();
            $table->foreign('type_id')->references('id')->on('types')->onDelete('cascade');
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
		Schema::drop('wines');
	}

}
