<?php

namespace App\Http\Controllers;

use App\Drink;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DrinkController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $drink = Drink::paginate(10);
        return response()->json([
            'concluded' => true,
            'drink' => $drink,
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
            'type' => ['required', 'in:beer,juice,soda,water'],
            'status' => ['required', 'in:avaliable,unavaliable,desactivated'],
            'price' => ['required', 'numeric'],
            'volume' => ['required', 'numeric']
        ]);
    
        if($validation->fails()){
            return [
                'concluded' => false,
                'message' => 'Não foi possível cadastrar a bebida!',
                'validation' => $validation->errors()
            ];
        }

        $drink = Drink::create([
            'name' => $request->name,
            'type' => $request->type,
            'status' => $request->status,
            'price' => $request->price,
            'volume' => $request->volume,
        ]);

        return response()->json([
            'concluded' => true,
            'message' => 'Bebida cadastrada com sucesso!',
            'drink' => $drink,
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
            'type' => ['required', 'in:beer,juice,soda,water'],
            'status' => ['required', 'in:avaliable,unavaliable,desactivated'],
            'price' => ['required', 'numeric'],
            'volume' => ['required', 'numeric']
        ]);
    
        if($validation->fails()){
            return [
                'concluded' => false,
                'message' => 'Não foi possível atualizar a bebida!',
                'validation' => $validation->errors()
            ];
        }

        $drink = Drink::find($id);
        
        $drink->name = $request->name;
        $drink->type = $request->type;
        $drink->status = $request->status;
        $drink->price = $request->price;
        $drink->volume = $request->volume;

        $drink->save();

        return response()->json([
            'concluded' => true,
            'message' => 'Bebida atualizada com sucesso!',
            'drink' => $drink
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
