<?php

// Composer: "fzaninotto/faker": "v1.3.0"
use Faker\Factory as Faker;

class TypesTableSeeder extends Seeder {

	public function run()
	{
        DB::table('types')->insert([
            'name' => 'red'
        ]);

        DB::table('types')->insert([
            'name' => 'white'
        ]);

        DB::table('types')->insert([
            'name' => 'sparkling'
        ]);

        DB::table('types')->insert([
            'name' => 'others'
        ]);
	}
}