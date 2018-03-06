<?php

use App\Events\Inst;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->truncate();
        DB::table('settings')->truncate();

        // Create admin account
        DB::table('users')->insert([
            'usertype' => 'Admin',
            'name' => 'admin',            
            'email' => 'admin@gmail.com',
            'password' => bcrypt('admin'),
            'image_icon' => null,
            'remember_token' => str_random(10),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        
        
        
        DB::table('settings')->insert([
            //'site_style' => 'blue',
            'site_style' => 'green',
            'site_name' => 'AJ Investment - Real Estate',
            'site_email' => 'admin@admin.com',
            'site_logo' => 'logo.png',
            'site_favicon' => 'favicon.png',
            'site_description' => 'Easy Real Estates provide you with a quick and easy way to own house and properties.',
            'site_copyright' => 'Copyright © 2018 AJ Investment - Real Estate. All rights reserved.',
            'site_header_code'=>'site_header_code', 
            'site_footer_code'=>'site_header_footer',
            'footer_widget1'=>'footer_widget1',
            'footer_widget2'=>'footer_widget2',
            'footer_widget3'=>'footer_widget3',
            'addthis_share_code'=>'addthis_share_code',
            'disqus_comment_code'=>'disqus_comment_code'
        ]);
         

       // factory('App\User', 20)->create();
    }
}
