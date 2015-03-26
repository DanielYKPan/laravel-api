<?php

// Composer: "fzaninotto/faker": "v1.3.0"
use Faker\Factory as Faker;

class WineDetailsTableSeeder extends Seeder {

	public function run()
	{
		$faker = Faker::create();

		foreach(range(1, 500) as $index)
		{
			WineDetail::create([
                'wine_id' => $index,
                'vintage' => $faker->year($max = 'now'),
                'drink_until' => '2017',
                'alcohol' => 14.50,
                'food' => $faker->sentence($nbWords = 6),
                'oak' => $faker->word,
                'region' => $faker->word,
                'colour' => $faker->sentence($nbWords = 6),
                'nose' => $faker->sentence($nbWords = 6),
                'background' => $faker->text($maxNbChars = 200),
                'palate' => $faker-> paragraph($nbSentences = 3),
                'description' => $faker->text($maxNbChars = 200),
                'usp_1' => $faker->sentence($nbWords = 8),
                'usp_2' => $faker->sentence($nbWords = 8),
                'usp_3' => $faker->sentence($nbWords = 8),
                'award' => $faker->randomElement($array = array('gold','silver', 'bronze')),
			]);
		}
	}

}