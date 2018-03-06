<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePropertiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('properties', function (Blueprint $table) {
            $table->increments('id');                 
            $table->integer('user_id')->length(11);
            $table->integer('featured_property')->length(1)->default(0);
            $table->string('property_name'); 
            $table->string('property_slug');
            $table->string('property_type');
            $table->string('property_purpose'); 
            $table->string('sale_price'); 
            $table->string('rent_price'); 
            $table->text('address');
            $table->string('map_latitude')->nullable();
            $table->string('map_longitude')->nullable();
            $table->string('bathrooms');
            $table->string('bedrooms');
            $table->string('area');
            $table->longtext('description');
            $table->string('featured_image');
            $table->string('property_images1')->default(' ');
            $table->string('property_images2')->default(' ');;
            $table->string('property_images3')->default(' ');;
            $table->string('property_images4')->default(' ');;
            $table->string('property_images5')->default(' ');; 
            $table->integer('status')->length(1)->default(1);          
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
        Schema::drop('properties');
    }
}
