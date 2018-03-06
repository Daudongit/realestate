-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Mar 06, 2018 at 01:50 PM
-- Server version: 5.6.17
-- PHP Version: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `realestate`
--

-- --------------------------------------------------------

--
-- Table structure for table `enquire`
--

CREATE TABLE IF NOT EXISTS `enquire` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `property_id` int(11) NOT NULL,
  `agent_id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `message` text COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE IF NOT EXISTS `migrations` (
  `migration` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`migration`, `batch`) VALUES
('2014_10_12_000000_create_users_table', 1),
('2014_10_12_100000_create_password_resets_table', 1),
('2015_12_10_065428_create_settings_table', 1),
('2015_12_25_133843_create_enquire_table', 1),
('2015_12_25_134328_create_partners_table', 1),
('2015_12_25_134629_create_properties_table', 1),
('2015_12_25_142242_create_slider_table', 1),
('2015_12_25_142436_create_subscriber_table', 1),
('2015_12_25_142619_create_testimonials_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `partners`
--

CREATE TABLE IF NOT EXISTS `partners` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `url` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `partner_image` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE IF NOT EXISTS `password_resets` (
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  KEY `password_resets_email_index` (`email`),
  KEY `password_resets_token_index` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `properties`
--

CREATE TABLE IF NOT EXISTS `properties` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `featured_property` int(11) NOT NULL DEFAULT '0',
  `property_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `property_slug` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `property_type` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `property_purpose` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `sale_price` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `rent_price` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `address` text COLLATE utf8_unicode_ci NOT NULL,
  `map_latitude` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `map_longitude` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `bathrooms` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `bedrooms` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `area` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8_unicode_ci NOT NULL,
  `featured_image` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `property_images1` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT ' ',
  `property_images2` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT ' ',
  `property_images3` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT ' ',
  `property_images4` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT ' ',
  `property_images5` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT ' ',
  `status` int(11) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=5 ;

--
-- Dumping data for table `properties`
--

INSERT INTO `properties` (`id`, `user_id`, `featured_property`, `property_name`, `property_slug`, `property_type`, `property_purpose`, `sale_price`, `rent_price`, `address`, `map_latitude`, `map_longitude`, `bathrooms`, `bedrooms`, `area`, `description`, `featured_image`, `property_images1`, `property_images2`, `property_images3`, `property_images4`, `property_images5`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 0, 'Parad', 'parad', 'House', 'Sale', '2000', '', 'London', NULL, NULL, '4', '5', 'London', 'Home sweet home<br>', 'parad-bd2ded9a76eb6188a534fdf0a34b448a', ' ', ' ', ' ', ' ', ' ', 1, '2018-02-27 10:47:35', '2018-02-27 10:47:35'),
(2, 1, 0, 'Conta', 'conta', 'Apartment', 'Sale', '3000', '', 'London', NULL, NULL, '4', '6', 'London', 'Home alone<br>', 'conta-79117024a2c4c487582a404ffe5e139c', ' ', ' ', ' ', ' ', ' ', 1, '2018-02-27 10:49:32', '2018-02-27 10:49:32'),
(3, 1, 0, 'Hera', 'hera', 'Apartment', 'Sale', '2500', '', 'London', NULL, NULL, '3', '4', 'London', 'Home away<br>', 'hera-4baf54f36935058bcc696fcef3f4689b', ' ', ' ', ' ', ' ', ' ', 1, '2018-02-27 10:51:18', '2018-02-27 10:51:18'),
(4, 1, 0, 'Tara', 'tara', 'Apartment', 'Sale', '2800', '', 'London', NULL, NULL, '4', '5', 'London', 'London<br>', 'tara-264862fa5cec3f799dd4739ce5eafce9', ' ', ' ', ' ', ' ', ' ', 1, '2018-02-27 10:52:57', '2018-02-27 10:52:57');

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE IF NOT EXISTS `settings` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `site_style` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `site_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `site_email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `site_logo` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `site_favicon` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `site_description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `site_header_code` text COLLATE utf8_unicode_ci NOT NULL,
  `site_footer_code` text COLLATE utf8_unicode_ci NOT NULL,
  `site_copyright` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `footer_widget1` text COLLATE utf8_unicode_ci NOT NULL,
  `footer_widget2` text COLLATE utf8_unicode_ci NOT NULL,
  `footer_widget3` text COLLATE utf8_unicode_ci NOT NULL,
  `addthis_share_code` text COLLATE utf8_unicode_ci NOT NULL,
  `disqus_comment_code` text COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=2 ;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `site_style`, `site_name`, `site_email`, `site_logo`, `site_favicon`, `site_description`, `site_header_code`, `site_footer_code`, `site_copyright`, `footer_widget1`, `footer_widget2`, `footer_widget3`, `addthis_share_code`, `disqus_comment_code`) VALUES
(1, 'green', 'AJ Investment - Real Estate', 'admin@admin.com', 'logo.png', 'favicon.png', 'Easy Real Estates provide you with a quick and easy way to own house and properties.\r\nEasy Real Estates provide you with a quick and easy way to own house and properties.', '', '', 'Copyright © 2018 AJ Investment - Real Estate. All rights reserved.', 'Easy Real Estates provide you with a quick and easy way to own house and properties.\r\nEasy Real Estates provide you with a quick and easy way to own house and properties.', 'Easy Real Estates provide you with a quick and easy way to own house and properties.\r\nEasy Real Estates provide you with a quick and easy way to own house and properties.', 'Easy Real Estates provide you with a quick and easy way to own house and properties.\r\nEasy Real Estates provide you with a quick and easy way to own house and properties.', 'addthis_share_code', '');

-- --------------------------------------------------------

--
-- Table structure for table `slider`
--

CREATE TABLE IF NOT EXISTS `slider` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `image_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=4 ;

--
-- Dumping data for table `slider`
--

INSERT INTO `slider` (`id`, `name`, `image_name`) VALUES
(1, 'New Home', 'new-home-1cdd50050497b9c2dc4b5d10b97c5d06'),
(2, 'Sweet home', 'sweet-home-9691b66a7d625891f6eca6ef69b85065'),
(3, 'Home', 'home-14378e86486ea62a58032a4c5df0c1d7');

-- --------------------------------------------------------

--
-- Table structure for table `subscriber`
--

CREATE TABLE IF NOT EXISTS `subscriber` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `ip` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `testimonials`
--

CREATE TABLE IF NOT EXISTS `testimonials` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `testimonial` text COLLATE utf8_unicode_ci NOT NULL,
  `t_user_image` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `usertype` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `fax` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `about` text COLLATE utf8_unicode_ci,
  `facebook` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `twitter` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `gplus` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `linkedin` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `image_icon` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `remember_token` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `updated_at` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci AUTO_INCREMENT=2 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `usertype`, `name`, `email`, `password`, `phone`, `fax`, `about`, `facebook`, `twitter`, `gplus`, `linkedin`, `image_icon`, `status`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'admin', 'admin@gmail.com', '$2y$10$GQKEL.4.XEHxhrBHCLLcf.hpE6MeNh/2Biz/NSuwkUFmeAfdOJZ/i', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 'CEVmURhhHr', '2018-02-27 09:25:02', '2018-02-27 09:25:02');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
