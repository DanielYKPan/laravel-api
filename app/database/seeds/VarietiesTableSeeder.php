<?php

// Composer: "fzaninotto/faker": "v1.3.0"
use Faker\Factory as Faker;

class VarietiesTableSeeder extends Seeder {

	public function run()
	{
		$faker = Faker::create();

        $types = Type::lists('id');

		foreach(range(1, 50) as $index)
		{
			Variety::create([
                'name' => $faker->unique()->word,
                'type_id' =>  $faker->randomElement($types)
			]);
		}
	}

}