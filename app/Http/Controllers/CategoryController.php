<?php

namespace App\Http\Controllers;

use App\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $category = Category::all();
        return response()->json([
            'concluded' => true,
            'items' => $category,
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
            'name' => ['required', 'string']
        ]);
    
        if($validation->fails()){
            return [
                'concluded' => false,
                'message' => 'Não foi possível cadastrar a categoria!',
                'validation' => $validation->errors()
            ];
        }

        Category::create([
            'name' => $request->name,
            'description' => $request->description,
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
        $category = Category::find($id);

        if ($category) {
            return response()->json([
                'concluded' => true,
                'item' => $category
            ]);
        }
        return response()->json([
            'concluded' => true,
            'message' => 'Categoria não encontrada!'
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
        ]);
    
        if($validation->fails()){
            return [
                'concluded' => false,
                'message' => 'Não foi possível atualizar o lanche!',
                'validation' => $validation->errors()
            ];
        }

        $category = Category::find($id);
        
        $category->name = $request->name;
        $category->description = $request->description;

        $category->save();

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
        $category = Category::find($id);

        if ($category) {
            $category->delete();
            return response()->json([
                'concluded' => true,
                'message' => 'Categoria excluída com sucesso!'
            ]);
        }
        
        return response()->json([
            'concluded' => false,
            'message' => 'Categoria não encontrada!'
        ]);
    }
}
