<?php

// Composer: "fzaninotto/faker": "v1.3.0"
use Faker\Factory as Faker;

class UsersTableSeeder extends Seeder {

    public function run()
    {
        $faker = Faker::create();
        User::create([
            'first_name'  => $faker->firstName($gender='male'),
            'last_name' => $faker->lastName,
            'email' => 'example@example.com',
            'password' => '123456',
            'user_role' => 'developer'
        ]);

        User::create([
            'first_name'  => $faker->firstName($gender='male'),
            'last_name' => $faker->lastName,
            'email' => 'good@good.com',
            'password' => '123456',
            'user_role' => 'developer'
        ]);
    }
}