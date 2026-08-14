import { StudentState } from './studentSlice';

export const selectStudentProfile = (state: StudentState) => state.profile;
export const selectStudentLoading = (state: StudentState) => state.isLoading;
export const selectStudentError = (state: StudentState) => state.error;
