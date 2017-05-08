<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services;
use App\Models\Menu;
use GuzzleHttp\Client;

/**
 * 注文を操作するクラス
 */
class OrderController extends Controller
{

	public function testOrder()
	{
		$order = [
			'uuid' => 'hoge',
			'order' => [
				['menu_id' => 1, 'count' => 4],
				['menu_id' => 2, 'count' => 1]
			]
		];

		$client = new Client;
		$result = $client->post('http://54.249.14.213/reqOrder', [
			'json' => $order
		]);

		dd($result);
	}

	/**
	 * 事前注文を登録
	 *
	 * @param Request $request
	 * @return Json
	 */
	public function reqOrder(Request $request)
	{
		$order = new Services\Order;
		$result = $order->reqOrder($request);

		return response()->json($result, 200);
	}

	/**
	 * 事前注文をキャンセルする
	 *
	 * @param Request $request
	 * @return Json
	 */
	public function canOrder(Request $request)
	{
		$order = new Services\Order;
		$result = $order->canOrder($request);

		return response()->json($result, 200);
	}
}