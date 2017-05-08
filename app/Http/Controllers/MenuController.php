<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;


/**
 * メニューを操作するクラス
 */
class MenuController extends Controller
{
	/**
	 * メニューリストを取得
	 * @return Json
	 */
	public function sendMenuList()
	{
    	$menuList = DB::select('select * from menu');
   		return response()->json([
   			'type' => 'sendMenuList',
   			'data' => [
   				'menu' => $menuList
   			]
	    ], 200);
	}
}
