<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Auth routes
Route::post('/login', 'AuthController@login');
Route::post('/register', 'AuthController@register');

Route::middleware(['auth:api'])->group(function() {
    //Logout
    Route::post('/logout', 'AuthController@logout');
    Route::apiResource('/ingredients', 'IngredientController')->except('show');
    Route::apiResource('/foods', 'FoodController')->except('show');
    Route::apiResource('/drinks', 'DrinkController')->except('show');
    // Route::apiResource('/questions.answers', 'Api\AnswersController')->except('index');
    // Route::post('/questions/{question}/vote', 'Api\VoteQuestionController');
    // Route::post('/answers/{answer}/vote', 'Api\VoteAnswerController');
    // Route::post('/answers/{answer}/accept', 'Api\AcceptAnswerController');
    // Route::post('/questions/{question}/favorites', 'Api\FavoritesController@store');
    // Route::delete('/questions/{question}/favorites', 'Api\FavoritesController@destroy');
    // Route::get('/my-posts', 'Api\MyPostsController');
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
