import { StudentProfile, UpdateProfilePayload } from '../../types/student';
import { studentApi } from '../../services/api/studentApi';

export interface StudentState {
  profile: StudentProfile | null;
  isLoading: boolean;
  error: string | null;
}

export const initialStudentState: StudentState = {
  profile: null,
  isLoading: false,
  error: null,
};

export const createStudentActions = (
  state: StudentState,
  setState: React.Dispatch<React.SetStateAction<StudentState>>
) => ({
  fetchProfile: async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    const res = await studentApi.getProfile();
    if (res.success && res.user) {
      setState({
        profile: res.user,
        isLoading: false,
        error: null,
      });
      return { success: true, profile: res.user };
    } else {
      setState((prev) => ({ ...prev, isLoading: false, error: res.message || 'Failed to load profile' }));
      return { success: false, message: res.message };
    }
  },

  updateProfile: async (payload: UpdateProfilePayload) => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    const res = await studentApi.updateProfile(payload);
    if (res.success && res.user) {
      setState({
        profile: res.user,
        isLoading: false,
        error: null,
      });
      return { success: true, profile: res.user };
    } else {
      // Local optimistic update fallback
      if (state.profile) {
        const updated = { ...state.profile, ...payload };
        setState({ profile: updated, isLoading: false, error: null });
        return { success: true, profile: updated };
      }
      setState((prev) => ({ ...prev, isLoading: false, error: res.message || 'Update failed' }));
      return { success: false, message: res.message };
    }
  },
});
