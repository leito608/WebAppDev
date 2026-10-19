<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * Localized language
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'local' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', 'root' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',          '}3:b1f!|NPS;orwOoJ(oZ@^FZl; iAty4>^eV%)uMJ-fA+Ui|nVx4 G03xBpKg/!' );
define( 'SECURE_AUTH_KEY',   'U:qae; }]vzNOS!kzJB^/rj-RbaJn/hCc#0agkk5mSVU0`U9`FE[#2#4)|.]vMA+' );
define( 'LOGGED_IN_KEY',     'Q6g<qU?YV-+@nCBjVc=DS|SHlq#igCH.Raq)(|^;7C<Qjc5BF5:PHC0koj#%k/K%' );
define( 'NONCE_KEY',         '-rg7;X@<mc.eo7E`E&}yG)]bTcuuNmjm{=2/#N0{$K[=w P}4g3Q8%GUT%x)c[tn' );
define( 'AUTH_SALT',         ',zy>TfVP|M`x([#9KN2E~Zz&_MR=iUdR5!<CR]X;WEQEBDAX|<;cFY=x/[lypoW.' );
define( 'SECURE_AUTH_SALT',  ',Le,L0T*6MRSl:O_Qu,`<QNZ0+xQ%)k 6uH7EN[evP#P(1Pr1RaJBt?!3QQ[v=E&' );
define( 'LOGGED_IN_SALT',    'QV.,pv/ >.J~LH%BJ3u3K1{?C*71k?Kv=}X9+z!#ie&o0I9o2jC^Z@K%r7$ubxRJ' );
define( 'NONCE_SALT',        '*{=U,s^7>{gICt}*g$d8[XhbO,w0a4xK4TC@;gLUKe%I()~d!QdcbOu!fi2a_SKT' );
define( 'WP_CACHE_KEY_SALT', 'gIYqIfoa5Zyq/Aa?*f`yTP*Hum7P`J_I~Te)F**zBOy@8;##4I*hLIl)P)14>( *' );


/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';


/* Add any custom values between this line and the "stop editing" line. */



/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
if ( ! defined( 'WP_DEBUG' ) ) {
	define( 'WP_DEBUG', false );
}

define( 'WP_ENVIRONMENT_TYPE', 'local' );
/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
