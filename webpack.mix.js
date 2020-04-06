const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
   /** Jquery */
   .js('node_modules/jquery/dist/jquery.min.js', 'public/js/jquery')
   .js('node_modules/jquery.easing/jquery.easing.min.js', 'public/js/jquery')
   
   /** Charts */
   .js('node_modules/chart.js/dist/Chart.min.js', 'public/js/charts')
   
   /** SB Admin 2 */
   .sass('resources/sass/sb-admin-2/sb-admin-2.scss', 'public/css/sb-admin-2')
   .js('resources/js/assets/sb-admin-2.js', 'public/js/sb-admin-2')
   
   /** DataTables */
   .js('node_modules/datatables.net/js/jquery.dataTables.min.js', 'public/js/datatables')
   .js('node_modules/datatables.net-bs4/js/dataTables.bootstrap4.min.js', 'public/js/datatables')
   .copy('node_modules/datatables.net-bs4/css/dataTables.bootstrap4.min.css', 'public/css/datatables')
   
   /** Fontawesome for template */
   // .copy('node_modules/@fortawesome/fontawesome-free/css/all.min.css', 'public/css/fontawesome/fontawesome.min.css')
   
   /** Originals */
   .js('resources/js/app.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css');
