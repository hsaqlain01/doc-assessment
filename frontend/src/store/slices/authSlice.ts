import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as authService from "../../services/authService";
import { User, LoginCredentials, RegisterData } from "../../types/auth.types";

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token"),
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: LoginCredentials) => {
    const response = await authService.login(credentials);
    console.log("response       ", response);
    localStorage.setItem("token", response.token);
    return response;
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (data: RegisterData) => {
    const response = await authService.register(data);
    localStorage.setItem("token", response.token);
    return response;
  }
);

// export const getProfile = createAsyncThunk(
//   'auth/getProfile',
//   async () => {
//     const response = await authService.getProfile();
//     return response;
//   }
// );

// export const updateProfile = createAsyncThunk(
//   'auth/updateProfile',
//   async (data: { name: string; email: string }) => {
//     const response = await authService.updateProfile(data);
//     return response;
//   }
// );

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Login failed";
      })
      // Register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Registration failed";
      });
    // Get Profile
    //   .addCase(getProfile.fulfilled, (state, action) => {
    //     state.user = action.payload.user;
    //   });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
