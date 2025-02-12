import { linkedinAuth } from './linkedin';
import { xAuth } from './x';

let isAuthenticating = false;

export const authenticateTo = (platformId: string) => {
  if (isAuthenticating) return;
  isAuthenticating = true;

  switch (platformId) {
    case 'linkedin':
      linkedinAuth();
      break;
    case 'x':
      xAuth();
      break;
    default:
      console.error('Platform not supported:', platformId);
      isAuthenticating = false;
  }
};
