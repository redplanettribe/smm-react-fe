import { linkedinAuth } from './linkedin';

let isAuthenticating = false;

export const authenticateTo = (platformId: string) => {
  if (isAuthenticating) return;
  isAuthenticating = true;

  switch (platformId) {
    case 'linkedin':
      linkedinAuth();
      break;
    default:
      console.error('Platform not supported:', platformId);
      isAuthenticating = false;
  }
};
