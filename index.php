<?php

/**
 * Plugin Name: Gutenberg Block - Bootstrap 4 Slider
 * Version: 1.0.0
 * Plugin URI: https://github.com/WordPress/gutenberg-examples
 * Description: This is a Gutenberg block for creating sliders when using Twitter Bootstrap (v4) It does not include Bootstrap core CSS or JS files, these need to be loaded via your theme or another plugin.
 * Author: themattroyal
 * Author URI: https://mattroyal.co.za/
 *
 * @package WordPress
 * @author Matt Royal
 * @since 1.0.0
 */

defined( 'ABSPATH' ) || exit;

/**
 * Load translations from the MO file.
*/
function royality_tb4_slider_load_textdomain() {
	load_plugin_textdomain( 'royality', false, basename( __DIR__ ) . '/languages' );
}

add_action( 'init', 'royality_tb4_slider_load_textdomain' );

/**
 * Register block assets & pass translations to JavaScript.
 */
function royality_tb4_slider_register_block() {

	if ( ! function_exists( 'register_block_type' ) ) 
		return;

	wp_register_script(
		'royality-gutenberg-tb4-slider',
		plugins_url( 'block.js', __FILE__ ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'underscore' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'block.js' )
	);

	wp_register_style(
		'royality-gutenberg-tb4-slider',
		plugins_url( 'style.css', __FILE__ ),
		array( ),
		filemtime( plugin_dir_path( __FILE__ ) . 'style.css' )
	);

	register_block_type( 'royality/tb4-slider', array(
		'editor_style' => 'royality-gutenberg-tb4-slider',
		'editor_script' => 'royality-gutenberg-tb4-slider',
	) );
	

	if ( function_exists( 'wp_set_script_translations' ) )
	{
		wp_set_script_translations( 'royality-gutenberg-tb4-slider', 'royality' );
	}

}

add_action( 'init', 'royality_tb4_slider_register_block' );
