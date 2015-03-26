<?php

class DatabaseSeeder extends Seeder {

    private $tables=[
        'countries',
        'wines',
        'varieties',
        'variety_wine',
        'wine_details'
    ];
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		Eloquent::unguard();

        $this->cleanDatabase();

        $this->call('TypesTableSeeder');
        $this->call('CountriesTableSeeder');
        $this->call('WinesTableSeeder');
        $this->call('VarietiesTableSeeder');
        $this->call('VarietyWineTableSeeder');
        $this->call('WineDetailsTableSeeder');
        $this->call('UsersTableSeeder');
	}

    /**
     */
    private function cleanDatabase()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0');

        foreach ($this->tables as $table)
        {
            DB::table($table)->truncate();
        }

        DB::statement('SET FOREIGN_KEY_CHECKS=1');
    }

}
