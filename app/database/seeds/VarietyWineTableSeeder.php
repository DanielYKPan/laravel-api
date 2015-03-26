<?php

use Faker\Factory as Faker;

class VarietyWineTableSeeder extends DatabaseSeeder {

    public function run()
    {
        $faker = Faker::create();

        $red_varieties = Variety::whereHas('type', function($q)
        {
            $q->where('name', '=', 'red');

        })->lists('id');

        $white_varieties = Variety::whereHas('type', function($q)
        {
            $q->where('name', '=', 'white');

        })->lists('id');

        $sparkling_varieties = Variety::whereHas('type', function($q)
        {
            $q->where('name', '=', 'sparkling');

        })->lists('id');

        $others_varieties = Variety::whereHas('type', function($q)
        {
            $q->where('name', '=', 'others');

        })->lists('id');

        $red_wines = Wine::whereHas('type', function($q){
            $q->where('name', '=', 'red');
        })->lists('id');

        $white_wines = Wine::whereHas('type', function($q){
            $q->where('name', '=', 'white');
        })->lists('id');

        $sparkling_wines = Wine::whereHas('type', function($q){
            $q->where('name', '=', 'sparkling');
        })->lists('id');

        $others_wines = Wine::whereHas('type', function($q){
            $q->where('name', '=', 'others');
        })->lists('id');

        foreach($red_wines as $red_wine)
        {
            DB::table('variety_wine')->insert([
                'variety_id' => $faker->randomElement($red_varieties),
                'wine_id' => $red_wine
            ]);
        }

        foreach($white_wines as $white_wine)
        {
            DB::table('variety_wine')->insert([
                'variety_id' => $faker->randomElement($white_varieties),
                'wine_id' => $white_wine
            ]);
        }

        foreach($sparkling_wines as $sparkling_wine)
        {
            DB::table('variety_wine')->insert([
                'variety_id' => $faker->randomElement($sparkling_varieties),
                'wine_id' => $sparkling_wine
            ]);
        }

        foreach($others_wines as $others_wine)
        {
            DB::table('variety_wine')->insert([
                'variety_id' => $faker->randomElement($others_varieties),
                'wine_id' => $others_wine
            ]);
        }

        foreach(range(1, 50) as $index)
        {
            DB::table('variety_wine')->insert([
                'variety_id' => $faker->randomElement($red_varieties),
                'wine_id' => $faker->randomElement($red_wines)
            ]);
        }

        foreach(range(1, 50) as $index)
        {
            DB::table('variety_wine')->insert([
                'variety_id' => $faker->randomElement($white_varieties),
                'wine_id' => $faker->randomElement($white_wines)
            ]);
        }

        foreach(range(1, 50) as $index)
        {
            DB::table('variety_wine')->insert([
                'variety_id' => $faker->randomElement($sparkling_varieties),
                'wine_id' => $faker->randomElement($sparkling_wines)
            ]);
        }

        foreach(range(1, 50) as $index)
        {
            DB::table('variety_wine')->insert([
                'variety_id' => $faker->randomElement($others_varieties),
                'wine_id' => $faker->randomElement($others_wines)
            ]);
        }

    }
}