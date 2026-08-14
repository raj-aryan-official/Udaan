export type ScreenStep =
  | 'splash'
  | 'login'
  | 'otp'
  | 'category'
  | 'classSetup'
  | 'nurseryHome'
  | 'nurseryRhymes'
  | 'nurseryCelebration'
  | 'stickerBook';

export type BottomTabType = 'home' | 'quiz' | 'profile';

export interface UserStateData {
  studentName: string;
  phoneNumber: string;
  category: string;
  childName: string;
  selectedClass: string;
}
