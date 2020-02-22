<?php

namespace App\Http\Controllers;

use App\Snack;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SnackController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $snack = Snack::paginate(10);
        return response()->json([
            'concluded' => true,
            'snack' => $snack,
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
            'description' => ['alpha_num'],
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

        $snack = Snack::create([
            'name' => $request->name,
            'status' => $request->status,
            'price' => $request->price,
        ]);

        return response()->json([
            'concluded' => true,
            'message' => 'Alimento cadastrado com sucesso!',
            'snack' => $snack,
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

        $snack = Snack::find($id);
        
        $snack->name = $request->name;
        $snack->status = $request->status;
        $snack->price = $request->price;

        $snack->save();

        return response()->json([
            'concluded' => true,
            'message' => 'Alimento atualizado com sucesso!',
            'snack' => $snack
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
                'message' => 'Alimento excluído com sucesso!'
            ]);
        }
        
        return response()->json([
            'concluded' => false,
            'message' => 'Alimento não encontrado!'
        ]);
    }
}
