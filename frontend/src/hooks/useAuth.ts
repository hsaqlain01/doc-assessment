import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch } from "./useAppDispatch";
import { useAppSelector } from "./useAppSelector";
import {
  login as loginAction,
  logout as logoutAction,
  register as registerAction,
} from "src/store/slices/authSlice";
import { toast } from "src/components/ui/Toast";
import { RootState } from "src/store/store";
import { LoginCredentials, RegisterData } from "src/types/auth.types";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, loading } = useAppSelector((state: RootState) => state.auth);

  const login = async (credentials: LoginCredentials) => {
    try {
      await dispatch(loginAction(credentials)).unwrap();
      const from = (location.state as any)?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
      toast({
        title: "Welcome back!",
        variant: "success",
      });
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message,
        variant: "error",
      });
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      await dispatch(registerAction(data)).unwrap();
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message,
        variant: "error",
      });
    }
  };

  const logout = async () => {
    // try {
    //   await dispatch(logoutAction()).unwrap();
    //   navigate("/login");
    //   toast({
    //     title: "Logged out successfully",
    //     variant: "success",
    //   });
    // } catch (error: any) {
    //   toast({
    //     title: "Logout failed",
    //     description: error.message,
    //     variant: "error",
    //   });
    // }
  };

  return {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };
};
