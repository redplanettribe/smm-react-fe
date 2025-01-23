import { linkedinAuth } from './linkedin';

export const authenticateTo = (platformId: string) => {
  switch (platformId) {
    case 'linkedin':
      linkedinAuth();
      break;
    default:
      console.error('Platform not supported:', platformId);
  }
};
