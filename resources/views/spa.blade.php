<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Burgers</title>

        <link rel="icon" href="{{ asset('img/brand/favicon.png') }}">

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
        
        <!-- Argon -->
        <link rel="stylesheet" href="{{ asset('static/css/nucleo-icons.css') }}" rel="stylesheet" type="text/css">
        <link rel="stylesheet" href="{{ mix('css/app.css') }}">
    </head>
    <body>
        <div id="app"></div>

        <!-- JS Import -->
        <script src="{{ mix('js/app.js') }}"></script>
    </body>
</html>
