<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models;
use App\Services;

class VacantController extends Controller
{
	/**
	 * 空席情報を問い合わせ
	 * 
	 * @param Request $request
	 * @return array
	 */
	public function reqVacantConfirm(Request $request)
	{
		$vacant = new Services\Vacant;
		$result = $vacant->reqVacantConfirm($request);

		return response()
			->json($result, 200);
	}

	/**
	 * 空室情報を返答
	 *
	 * @param Request $request
	 * @return array
	 */
	public function resVacant(Request $request)
	{
		$vacant = new Services\Vacant;
		$result = $vacant->resVacant($request);

		return response()->json($result, 200);
	}

	// androidから返答を監視
	public function getVacantConfirm()
	{
		// check_seatsのフラグを確認
		$vacant = new Services\Vacant;
		$result = $vacant->getVacantConfirm();

		return response()->json($result, 200);
	}
}