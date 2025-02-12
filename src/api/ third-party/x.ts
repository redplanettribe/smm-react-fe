import { supportApi } from '../support/support-api';

export const xAuth = async () => {
  try {
    const oAuthRequestToken = await supportApi.getXRequestToken();
    const authorizeURL = `https://api.twitter.com/oauth/authorize?oauth_token=${oAuthRequestToken.oauthToken}`;
    window.location.href = authorizeURL;
  } catch (error) {
    console.error('Error during X authentication:', error);
    throw error;
  }
};
