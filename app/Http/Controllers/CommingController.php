<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class CommingController extends Controller
{

	public function reqCom()
	{
		DB::table('inquery')
            ->update([
            	'visit_flag' => 1,
            	'visit_time' => date('Y-m-d H:i:s')
            ]);
        // とりあえず、最後のレコードのデータを返す
        $inqId = DB::select('SELECT * FROM inquery ORDER BY id desc limit 1');
   		return response()->json([
   			'type' => 'reqCom',
   			'data' => [
   				'resId' => $inqId
   			]
	    ], 200);
	}
}