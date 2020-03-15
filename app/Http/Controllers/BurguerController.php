<?php

namespace App\Http\Controllers;

use App\Burguer;
use App\IngredientBurguer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BurguerController extends Controller
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
        $burguer = Burguer::all();
        
        return response()->json([
            'concluded' => true,
            'items' => $burguer
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

        // return response()->json([
        //     "data" => $data
        // ]);

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

        Burguer::create([
            'name' => $request->name,
            'status' => $request->status,
            'price' => $request->price,
        ]);

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

        $burguer = Burguer::find($id);

        // return response()->json([
        //     "burguer" => $burguer,
        //     "data" => $request->ingredients
        // ]);

        foreach ($request->ingredients as $key => $value) {
            return response()->json([
                "value" => $value,
                "key" => $key
            ]);
        }

        $burguer->name = $request->name;
        $burguer->status = $request->status;
        $burguer->price = $request->price;

        $burguer->save();

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
        //
    }
}