<?php

namespace App\Http\Controllers;

use App\Ingredient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class IngredientController extends Controller
{

    protected $attributeNames = [
        'name' => 'nome',
        'status' => 'estado',
        'category' => 'categoria',
        'price' => 'preço',
    ];

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $ingredients = Ingredient::orderBy('category', 'ASC')->orderBy('name', 'ASC')->get();
        return response()->json([
            'concluded' => true,
            'items' => $ingredients,
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
            'category' => ['required', 'in:bread,beef,cheese,salad,side_dishes'],
            'price' => ['required', 'numeric']
        ]);

        $validation->setAttributeNames($this->attributeNames);
    
        if($validation->fails()){
            return [
                'concluded' => false,
                'message' => 'Não foi possível cadastrar o ingrediente!',
                'validation' => $validation->errors()
            ];
        }

        Ingredient::create([
            'name' => $request->name,
            'status' => $request->status,
            'category' => $request->category,
            'price' => $request->price,
        ]);

        return response()->json([
            'concluded' => true,
            'message' => 'Ingrediente cadastrado com sucesso!'
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
        $ingredient = Ingredient::find($id);

        if ($ingredient) {
            return response()->json([
                'concluded' => true,
                'item' => $ingredient
            ]);
        }
        return response()->json([
            'concluded' => true,
            'message' => 'Ingrediente não encontrado!'
        ]);
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
            'category' => ['required', 'in:bread,beef,cheese,salad,sauce,side_dishes'],
            'price' => ['required', 'numeric']
        ]);

        $validation->setAttributeNames($this->attributeNames);
    
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
        $ingredient->category = $request->category;
        $ingredient->price = $request->price;

        $ingredient->save();

        return response()->json([
            'concluded' => true,
            'message' => 'Ingrediente atualizado com sucesso!'
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
