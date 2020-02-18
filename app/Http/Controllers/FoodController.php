<?php

namespace App\Http\Controllers;

use App\Food;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FoodController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $food = Food::paginate(10);
        return response()->json([
            'concluded' => true,
            'food' => $food,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->all();

        $validation = Validator::make($data, [
            'name' => ['required', 'string'],
            'status' => ['required', 'in:avaliable,unavaliable,desactivated'],
            'price' => ['required', 'numeric']
        ]);
    
        if($validation->fails()){
            return [
                'concluded' => false,
                'message' => 'Não foi possível cadastrar o alimento!',
                'validation' => $validation->errors()
            ];
        }

        $food = Food::create([
            'name' => $request->name,
            'status' => $request->status,
            'price' => $request->price,
        ]);

        return response()->json([
            'concluded' => true,
            'message' => 'Alimento cadastrado com sucesso!',
            'food' => $food,
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = $request->all();

        $validation = Validator::make($data, [
            'name' => ['required', 'string'],
            'status' => ['required', 'in:avaliable,unavaliable,desactivated'],
            'price' => ['required', 'numeric']
        ]);
    
        if($validation->fails()){
            return [
                'concluded' => false,
                'message' => 'Não foi possível atualizar o alimento!',
                'validation' => $validation->errors()
            ];
        }

        $food = Food::find($id);
        
        $food->name = $request->name;
        $food->status = $request->status;
        $food->price = $request->price;

        $food->save();

        return response()->json([
            'concluded' => true,
            'message' => 'Alimento atualizado com sucesso!',
            'food' => $food
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $food = Food::find($id);

        if ($food) {
            $food->delete();
            return response()->json([
                'concluded' => true,
                'message' => 'Alimento excluído com sucesso!'
            ]);
        }
        
        return response()->json([
            'concluded' => false,
            'message' => 'Alimento não encontrado!'
        ]);
    }
}
