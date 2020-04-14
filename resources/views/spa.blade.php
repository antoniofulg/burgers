<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Burguers</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
        
        <!-- CSS Bootstrap -->
        <link rel="stylesheet" href="{{ asset('css/sb-admin-2/sb-admin-2.css')}}">
    </head>
    <body>
        <div id="app">
            <app></app>
        </div>

        <!-- JS Import -->
        <script src="{{ asset('js/app.js') }}"></script>

        <!-- Core plugin JavaScript -->
        <script src="{{ asset('js/jquery/jquery.easing.min.js') }}"></script>
        
        <script src="{{ asset('js/sb-admin-2/sb-admin-2.js') }}"></script>
    </body>
</html>
