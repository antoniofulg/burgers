<?php

namespace App\Http\Controllers;

use App\Snack;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SnackController extends Controller
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
        $snack = Snack::all();
        return response()->json([
            'concluded' => true,
            'items' => $snack,
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
            'category_id' => ['required', 'exists:categories,id'],
            'status' => ['required', 'in:avaliable,unavaliable,desactivated'],
            'price' => ['required', 'numeric']
        ]);

        $validation->setAttributeNames($this->attributeNames);
    
        if($validation->fails()){
            return [
                'concluded' => false,
                'message' => 'Não foi possível cadastrar a categoria!',
                'validation' => $validation->errors()
            ];
        }

        Snack::create([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'status' => $request->status,
            'category_id' => $request->category_id,
        ]);

        return response()->json([
            'concluded' => true,
            'message' => 'Categoria cadastrada com sucesso!',
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
        $snack = Snack::find($id);

        if ($snack) {
            return response()->json([
                'concluded' => true,
                'item' => $snack
            ]);
        }
        return response()->json([
            'concluded' => true,
            'message' => 'Lanche não encontrado!'
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
            'category_id' => ['required', 'exists:categories,id'],
            'status' => ['required', 'in:avaliable,unavaliable,desactivated'],
            'price' => ['required', 'numeric']
        ]);

        $validation->setAttributeNames($this->attributeNames);
    
        if($validation->fails()){
            return [
                'concluded' => false,
                'message' => 'Não foi possível atualizar o lanche!',
                'validation' => $validation->errors()
            ];
        }

        $snack = Snack::find($id);
        
        $snack->name = $request->name;
        $snack->description = $request->description;
        $snack->category_id = $request->category_id;
        $snack->price = $request->price;

        $snack->save();

        return response()->json([
            'concluded' => true,
            'message' => 'Alimento atualizado com sucesso!',
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
        $snack = Snack::find($id);

        if ($snack) {
            $snack->delete();
            return response()->json([
                'concluded' => true,
                'message' => 'Lanche excluído com sucesso!'
            ]);
        }
        
        return response()->json([
            'concluded' => false,
            'message' => 'Lanche não encontrado!'
        ]);
    }
}
