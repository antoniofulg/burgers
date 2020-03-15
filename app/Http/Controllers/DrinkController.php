<?php

namespace App\Http\Controllers;

use App\Drink;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DrinkController extends Controller
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
        $drinks = Drink::orderBy('category', 'ASC')->orderBy('name', 'ASC')->get();
        return response()->json([
            'concluded' => true,
            'items' => $drinks,
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
            'category' => ['required', 'in:beer,juice,soda,water'],
            'price' => ['required', 'numeric'],
            'volume' => ['required', 'numeric']
        ]);

        $validation->setAttributeNames($this->attributeNames);
    
        if($validation->fails()){
            return [
                'concluded' => false,
                'message' => 'Não foi possível cadastrar a bebida!',
                'validation' => $validation->errors()
            ];
        }

        Drink::create([
            'name' => $request->name,
            'category' => $request->category,
            'status' => $request->status,
            'price' => $request->price,
            'volume' => $request->volume,
        ]);

        return response()->json([
            'concluded' => true,
            'message' => 'Bebida cadastrada com sucesso!',
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
        $drink = Drink::find($id);

        if ($drink) {
            return response()->json([
                'concluded' => true,
                'item' => $drink
            ]);
        }
        return response()->json([
            'concluded' => true,
            'message' => 'Bebida não encontrada!'
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
            'category' => ['required', 'in:beer,juice,soda,water'],
            'status' => ['required', 'in:avaliable,unavaliable,desactivated'],
            'price' => ['required', 'numeric'],
            'volume' => ['required', 'numeric', 'between:0,20000']
        ]);

        $validation->setAttributeNames($this->attributeNames);
    
        if($validation->fails()){
            return [
                'concluded' => false,
                'message' => 'Não foi possível atualizar a bebida!',
                'validation' => $validation->errors()
            ];
        }

        $drink = Drink::find($id);
        
        $drink->name = $request->name;
        $drink->category = $request->category;
        $drink->status = $request->status;
        $drink->price = $request->price;
        $drink->volume = $request->volume;

        $drink->save();

        return response()->json([
            'concluded' => true,
            'message' => 'Bebida atualizada com sucesso!',
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
        $drink = Drink::find($id);

        if ($drink) {
            $drink->delete();
            return response()->json([
                'concluded' => true,
                'message' => 'Bebida excluída com sucesso!'
            ]);
        }
        
        return response()->json([
            'concluded' => false,
            'message' => 'Bebida não encontrada!'
        ]);
    }
}
