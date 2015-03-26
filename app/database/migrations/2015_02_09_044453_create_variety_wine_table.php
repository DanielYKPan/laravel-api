<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateVarietyWineTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('variety_wine', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('variety_id')->unsigned()->index();
			$table->foreign('variety_id')->references('id')->on('varieties')->onDelete('cascade');
			$table->integer('wine_id')->unsigned()->index();
			$table->foreign('wine_id')->references('id')->on('wines')->onDelete('cascade');
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
		Schema::drop('variety_wine');
	}

}
