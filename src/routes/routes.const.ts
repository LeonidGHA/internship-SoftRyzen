type AllowedPath = string;

interface Routes {
  [key: string]: AllowedPath;
}

export const ROUTES: Routes = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASS: '/forgot-password',
  TEST: '/test',
  TESTING: '/testing',
  TASK: '/task',
  // MATERIALS: '/materials',
  // INTERVIEW: '/interview',
  // OFFER: '/offer',
  // NOTIFICATIONS: '/notifications',
  // PROFILE: '/profile',
  // PROFILE_SETTINGS: '/profile-settings',
};
