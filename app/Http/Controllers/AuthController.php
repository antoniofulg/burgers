<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Auth;
use App\User;

class AuthController extends Controller
{
    public function login(Request $request) {

        $data = $request->all();

        $validation = Validator::make($data, [
            'email' => ['required', 'string', 'email', 'max:255'],
            'password' => ['required', 'string', 'min:8'],
        ]);
    
        if($validation->fails()){
            return [
                'concluded' => false,
                'message' => 'Preencha os campos corretamente!',
                'validation' => $validation->errors()
            ];
        }
    
        if (Auth::attempt(['email' => $data['email'], 'password' => $data['password']])) {
            $user = auth()->user();
            $user->token = $user->createToken($user->email)->accessToken; 
            return [
                'concluded' => true,
                'user' => $user
            ];
        }
    
        return response()->json([
            'concluded' => false,
            'message' => "Email ou senha não coincidem!",
        ]);
    }

    public function register(Request $request) {
        $data = $request->all();

        $validation = Validator::make($data, [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);
    
        if($validation->fails()){
            return [
                'concluded' => false,
                'message' => 'Preencha os campos corretamente!',
                'validation' => $validation->errors()
            ];
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $user->token = $user->createToken($user->email)->accessToken; 

        return response()->json([
            'concluded' => true,
            'user' => $user,
        ]);
    }
}
