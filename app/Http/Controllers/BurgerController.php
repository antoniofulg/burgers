<?php

namespace App\Http\Controllers;

use App\Burger;
use App\IngredientBurger;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BurgerController extends Controller
{

    protected $attributeNames = [
        'name' => 'nome',
        'status' => 'estado',
        'price' => 'preço',
    ];

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $burger = Burger::all();
        
        return response()->json([
            'concluded' => true,
            'items' => $burger
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

        $validation->setAttributeNames($this->attributeNames);
    
        if($validation->fails()){
            return [
                'concluded' => false,
                'message' => 'Não foi possível cadastrar o ingrediente!',
                'validation' => $validation->errors()
            ];
        }

        $burger = Burger::create([
            'name' => $request->name,
            'status' => $request->status,
            'price' => $request->price,
        ]);

        foreach ($request->ingredients as $ingredient) {
            $burger->ingredient()->save(
                new IngredientBurger([
                    'ingredient_id' => $ingredient['ingredient_id'] ? $ingredient['ingredient_id'] : null,
                    'category' => $ingredient['category'], 
                    'amount' => $ingredient['amount'], 
                ])
            );
        }

        return response()->json([
            'concluded' => true,
            'message' => 'Hambúrguer cadastrado com sucesso!'
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

        // return response()->json([
        //     "data" => $data
        // ]);

        $validation = Validator::make($data, [
            'name' => ['required', 'string'],
            'status' => ['required', 'in:avaliable,unavaliable,desactivated'],
            'price' => ['required', 'numeric'],
            'ingredients.*.id' => ['exists:ingredients,id', 'nullable'],
            'ingredients.*.category' => ['in:bread,beef,cheese,salad,sauce,side_dishes', 'nullable']
        ]);

        $validation->setAttributeNames($this->attributeNames);
    
        if($validation->fails()){
            return [
                'concluded' => false,
                'message' => 'Não foi possível atualizarr o ingrediente!',
                'validation' => $validation->errors(),
                'data' => $data
            ];
        }

        $burger = Burger::find($id);
        
        $burger->name = $request->name;
        $burger->status = $request->status;
        $burger->price = $request->price;
        
        $burger->save();
        
        $updated = [];

        // Pega os ids dos ingredientes vinculados ao hambúrguer
        foreach ($burger->ingredients as $ingredient) {
            if ($ingredient->id) {
                array_push($updated, $ingredient->id);
            }
        }

        // Verificar se o id o ingrediente será editado ou serão criado
        foreach ($request->ingredients as $ingredient) {
            if (isset($ingredient['id'])) {
                $ingredientBurger = IngredientBurger::find($ingredient['id']);
                if ($ingredientBurger) {
                    $ingredientBurger->ingredient_id = $ingredient['ingredient_id'];
                    $ingredientBurger->category = $ingredient['category'];
                    $ingredientBurger->amount = $ingredient['amount'];
                    $ingredientBurger->save();
                    //Remover item atualizado da lista
                    if (($key = array_search($ingredient['id'], $updated)) !== false) {
                        unset($updated[$key]);
                    }
                }
            } else {
                $burger->ingredient()->save(
                    new IngredientBurger([
                        'ingredient_id' => $ingredient['ingredient_id'] ? $ingredient['ingredient_id'] : null,
                        'category' => $ingredient['category'],
                        'amount' => $ingredient['amount'],
                    ])
                );
            }
        }

        // Ids que não foram utilizados, mas que estão vinculados ao hambúrguer, serão excluídos
        foreach ($updated as $id) {
            IngredientBurger::find($id)->delete();
        }

        return response()->json([
            'concluded' => true,
            'message' => 'Hambúrguer atualizado com sucesso!'
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
        $burger = Burger::find($id);

        if ($burger) {
            $burger->delete();
            return response()->json([
                'concluded' => true,
                'message' => 'Hambúrguer excluído com sucesso!'
            ]);
        }
        
        return response()->json([
            'concluded' => false,
            'message' => 'Hambúrguer não encontrado!'
        ]);
    }
}
