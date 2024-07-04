import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
}

//lógica de autenticación del usuario. Hace una solicitud POST a una ruta de inicio de sesión en 
//http://localhost:5000/login con las credenciales del usuario (correo electrónico y contraseña). Si la solicitud es exitosa, devuelve los datos del usuario.
export const LoginUser = createAsyncThunk("user/LoginUser", async(user, thunkAPI) =>{
    try {
        const response = await axios.post('http://localhost:5000/login', {
            email: user.email,
            password: user.password
        })
        return response.data;
    } catch (error) {
        if (error.response) {
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
    }
});

export const getMe = createAsyncThunk("user/getMe", async(thunkAPI) =>{
    try {
        const response = await axios.get('http://localhost:5000/me');
        return response.data;
    } catch (error) {
        if (error.response) {
            const message = error.response.data.msg;
            return thunkAPI.rejectWithValue(message);
        }
    }
});

export const Logout = createAsyncThunk("user/Logout", async() =>{
        await axios.delete('http://localhost:5000/logout');
});


export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        reset: (state) => initialState
    },
    extraReducers:(builder)=>{
        builder.addCase(LoginUser.pending, (state) =>{
          state.isLoading = true;  
        });
        builder.addCase(LoginUser.fulfilled, (state, action)=>{
            state.isLoading = false; 
            state.isSuccess = true;
            state.user = action.payload;
        });
        builder.addCase(LoginUser.rejected, (state, action) =>{
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });

        //traer usuario logueado
        builder.addCase(getMe.pending, (state) =>{
            state.isLoading = true;  
          });
          builder.addCase(getMe.fulfilled, (state, action)=>{
              state.isLoading = false; 
              state.isSuccess = true;
              state.user = action.payload;
          });
          builder.addCase(getMe.rejected, (state, action) =>{
              state.isLoading = false;
              state.isError = true;
              state.message = action.payload;
          })
    }
});

export const {reset} = authSlice.actions;
export default authSlice.reducer;