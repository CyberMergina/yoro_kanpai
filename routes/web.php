<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('index');
});


// きっちん
Route::get('/kitchen', function () {
    return view('kitchen');
});

// メニュー取得
Route::get('sendMenuList', 'MenuController@sendMenuList');
// オーダー
Route::get('testOrder', 'OrderController@testOrder');
Route::post('reqOrder', 'OrderController@reqOrder');
Route::get('canOrder', 'OrderController@canOrder');

// 空き確認
Route::get('reqVacantConfirm', 'VacantController@reqVacantConfirm');
Route::get('getVacantConfirm', 'VacantController@getVacantConfirm'); 
Route::get('resVacant', 'VacantController@resVacant');
// 来店通知
Route::get('reqCom', 'CommingController@reqCom');
// ステータス取得
Route::get('reqUpdate', 'UpdateController@reqUpdate');
Route::get('reqUpdateTest', 'UpdateController@reqUpdateTest');


