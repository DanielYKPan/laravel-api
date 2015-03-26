<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateWineDetailsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('wine_details', function(Blueprint $table)
		{
            $table->increments('id');
            $table->integer('wine_id')->unsigned()->index();
            $table->foreign('wine_id')->references('id')->on('wines')->onDelete('cascade');
            $table->string('vintage',4)->nullable();
            $table->string('region')->nullable();
            $table->string('drink_until', 4)->nullable();
            $table->decimal('alcohol', 4, 2)->nullable();
            $table->string('food')->nullable();
            $table->string('oak')->nullable();
            $table->string('colour')->nullable();
            $table->string('nose')->nullable();
            $table->text('background')->nullable();
            $table->text('palate')->nullable();
            $table->text('description')->nullable();
            $table->string('usp_1')->nullable();
            $table->string('usp_2')->nullable();
            $table->string('usp_3')->nullable();
            $table->string('award')->nullable();
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
		Schema::drop('wine_details');
	}

}
