<?php

namespace App\Http\Controllers;

use App\Ingredient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class IngredientController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $ingredients = Ingredient::paginate(10);
        return response()->json([
            'concluded' => true,
            'ingredients' => $ingredients,
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
            'type' => ['required', 'in:bread,blend,cheese,salad,side_dishes'],
            'price' => ['required', 'numeric']
        ]);
    
        if($validation->fails()){
            return [
                'concluded' => false,
                'message' => 'Não foi possível cadastrar o ingrediente!',
                'validation' => $validation->errors()
            ];
        }

        $ingredient = Ingredient::create([
            'name' => $request->name,
            'status' => $request->status,
            'type' => $request->type,
            'price' => $request->price,
        ]);

        return response()->json([
            'concluded' => true,
            'ingredient' => $ingredient,
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
        
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update($id, Request $request)
    {
        $data = $request->all();

        $validation = Validator::make($data, [
            'name' => ['required', 'string'],
            'status' => ['required', 'in:avaliable,unavaliable,desactivated'],
            'type' => ['required', 'in:bread,blend,cheese,salad,side_dishes'],
            'price' => ['required', 'numeric']
        ]);
    
        if($validation->fails()){
            return [
                'concluded' => false,
                'message' => 'Não foi possível atualizar o ingrediente!',
                'validation' => $validation->errors()
            ];
        }

        $ingredient = Ingredient::find($id);
        
        $ingredient->name = $request->name;
        $ingredient->status = $request->status;
        $ingredient->type = $request->type;
        $ingredient->price = $request->price;

        $ingredient->save();

        return response()->json([
            'concluded' => true,
            'ingredient' => $ingredient
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
        $ingredient = Ingredient::find($id);

        if ($ingredient) {
            $ingredient->delete();
            return response()->json([
                'concluded' => true,
                'message' => 'Ingrediente excluído com sucesso!'
            ]);
        }
        
        return response()->json([
            'concluded' => false,
            'message' => 'Ingrediente não encontrado!'
        ]);
    }
}
