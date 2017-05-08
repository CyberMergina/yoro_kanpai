<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;


class UpdateController extends Controller
{

	public function reqUpdateTest()
	{

      return response()->json([
        'type' => 'resUpdate',
        'data' => [
          "vacantList" => [ 
            [
              "id" => 1, # 予約ID
              "name" => "山田", # 予約名
              "commingFlg" => true, # 来店フラグ
              "date" => "YYYY-MM-DD H:i:s", # 予約日時
              "orderList" => [
                [
                  "menuId" => 1,
                  "cnt" =>  1
                ], 
                [
                  "menuId" => 3,
                  "cnt" => 1
                ]
              ] # 注文リスト
            ],
            [
              "id" => 2, # 予約ID
              "name" => "鈴木", # 予約名
              "commingFlg" => false, # 来店フラグ
              "date" => "YYYY-MM-DD H:i:s", # 予約日時
              "orderList" => [
                [
                  "menuId" => 1,
                  "cnt" =>  1
                ], 
                [
                  "menuId" => 3,
                  "cnt" => 1
                ]
              ] # 注文リスト
            ]
          ],
          "vacantConfList" => [
            [
              "id" => 3, # 予約ID
              "name" => "鈴木", # 予約名
              "date" => "YYYY-MM-DD H:i:s" # 問い合わせ日時
            ],
            [
              "id" => 4, # 予約ID
              "name" => "阿部", # 予約名
              "date" => "YYYY-MM-DD H:i:s" # 問い合わせ日時
            ]
          ]
        ]
      ], 200);
	
	}

  public function reqUpdate()
  {
    $inqueryListRet = DB::select('select * from inquery ORDER BY id desc LIMIT 1');
    $inqueryList = $inqueryListRet[0];
    $orderListRet = DB::select('select * from order_detail');

    $vacantConfList = DB::select('select * from check_seats WHERE empty_flag = 0 || empty_flag IS NULL ORDER BY id desc LIMIT 1');

    $orderList = [];
    foreach ($orderListRet as $val) {
      $orderList[] = 
        [
          "menuId" => $val->food_id,
          "count" => $val->count
        ];
    }
    return response()->json([
        'type' => 'resUpdate',
        'data' => [
          "vacantList" => [ 
            [
              "id" => $inqueryList->id, # 予約ID
              "name" => "瀧", # 予約名
              "num" => 2,
              "commingFlg" => ($inqueryList->visit_flag === 1) ? true : false, # 来店フラグ
              "date" => $inqueryList->visit_time, # 予約日時
              "orderList" => $orderList
            ]
          ],
          "vacantConfList" => [
            [
              "id" => $vacantConfList[0]->id, # 予約ID
              "name" => "瀧", # 予約名
              "date" => $vacantConfList[0]->date # 問い合わせ日時
            ]
          ]
        ]
      ], 200);
  }
}