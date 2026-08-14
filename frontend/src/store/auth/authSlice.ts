import { AuthUser, LoginCredentials, RegisterCredentials, GuestConvertPayload } from '../../types/auth';
import { authApi } from '../../services/api/authApi';

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isGuest: boolean;
  isLoading: boolean;
  error: string | null;
}

export const initialAuthState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isGuest: false,
  isLoading: false,
  error: null,
};

export const createAuthActions = (
  state: AuthState,
  setState: React.Dispatch<React.SetStateAction<AuthState>>
) => ({
  login: async (credentials: LoginCredentials) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    const res = await authApi.login(credentials);
    if (res.success && res.user && res.accessToken) {
      setState({
        user: res.user,
        token: res.accessToken,
        isAuthenticated: true,
        isGuest: res.user.isGuest,
        isLoading: false,
        error: null,
      });
      return { success: true, user: res.user };
    } else {
      const errorMsg = res.message || 'Login failed. Operating in offline/guest mode.';
      setState((prev) => ({ ...prev, isLoading: false, error: errorMsg }));
      return { success: false, message: errorMsg };
    }
  },

  register: async (credentials: RegisterCredentials) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    const res = await authApi.register(credentials);
    if (res.success && res.user && res.accessToken) {
      setState({
        user: res.user,
        token: res.accessToken,
        isAuthenticated: true,
        isGuest: false,
        isLoading: false,
        error: null,
      });
      return { success: true, user: res.user };
    } else {
      const errorMsg = res.message || 'Registration failed.';
      setState((prev) => ({ ...prev, isLoading: false, error: errorMsg }));
      return { success: false, message: errorMsg };
    }
  },

  guestLogin: async (grade?: string) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    const res = await authApi.guestLogin(grade);
    if (res.success && res.user && res.accessToken) {
      setState({
        user: res.user,
        token: res.accessToken,
        isAuthenticated: true,
        isGuest: true,
        isLoading: false,
        error: null,
      });
      return { success: true, user: res.user };
    } else {
      // Fallback guest user for seamless offline support
      const fallbackGuest: AuthUser = {
        id: `guest_${Date.now()}`,
        role: 'guest',
        name: 'Guest Scholar',
        grade: grade || 'Nursery',
        gradeBand: 'nursery_1',
        isGuest: true,
      };
      setState({
        user: fallbackGuest,
        token: 'offline_guest_token',
        isAuthenticated: true,
        isGuest: true,
        isLoading: false,
        error: null,
      });
      return { success: true, user: fallbackGuest };
    }
  },

  convertGuest: async (payload: GuestConvertPayload) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    const res = await authApi.convertGuest(payload);
    if (res.success && res.user) {
      setState((prev) => ({
        ...prev,
        user: res.user!,
        isGuest: false,
        isLoading: false,
        error: null,
      }));
      return { success: true, user: res.user };
    } else {
      setState((prev) => ({ ...prev, isLoading: false, error: res.message || 'Guest conversion failed' }));
      return { success: false, message: res.message };
    }
  },

  logout: () => {
    authApi.logout();
    setState(initialAuthState);
  },

  clearError: () => {
    setState((prev) => ({ ...prev, error: null }));
  },
});
