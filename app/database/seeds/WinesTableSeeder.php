<?php

// Composer: "fzaninotto/faker": "v1.3.0"
use Faker\Factory as Faker;

class WinesTableSeeder extends Seeder {

	public function run()
	{
		$faker = Faker::create();

        $countries = Country::all()->lists('id');
        $types = Type::all()->lists('id');

		foreach(range(1, 500) as $index)
		{
            $images = array('R5924.png', 'C190X.png', 'C601XA.png', 'C988X.png',
                'C8481.png','R0420.png','R0513.png','R0842.png','R1013.png','R1091.png','R1323.png','R1512.png',
                'R2505.png','R2963.png','R3932.png','R4262.png','R4513.png','R4601.png',
                'R4950.png','R5480.png','R5832.png');
            $price = $faker->randomFloat($nbMaxDecimals = 2, $min = 15, $max = 500);
			Wine::create([
                'name' => $faker->sentence($nbWords = 6),
                'product_code' => $faker->unique()->numerify('R####'),
                'price' => $price,
                'package_size' => $faker->randomElement($array = array(6,12)),
                'discount_price' => $faker->randomFloat($nbMaxDecimals = 2, $min = $price-10, $max = $price),
                'image_path'=> $faker->randomElement($images),
                'availability' => $faker->randomElement($array = array('InStock', 'LimitedStock', 'OutOfStock', 'Pre-order')),
                //'wine_type' => $faker->randomElement($array = array('red', 'white', 'sparkling', 'mix', 'others')),
                'country_id' => $faker->randomElement($countries),
                'type_id' => $faker->randomElement($types)
			]);
		}
	}

}