export const linkedinAuth = () => {
  try {
    const clientID = import.meta.env.VITE_LINKEDIN_CLIENT_ID;
    const redirectURI = encodeURIComponent(import.meta.env.VITE_LINKEDIN_REDIRECT_URI);
    const scope = encodeURIComponent('email openid profile w_member_social');

    const linkedinAuthUrl =
      `https://www.linkedin.com/oauth/v2/authorization?` +
      `response_type=code&` +
      `client_id=${clientID}&` +
      `redirect_uri=${redirectURI}&` +
      `state=foobar&` +
      `scope=${scope}`;

    window.location.href = linkedinAuthUrl;
  } catch (error) {
    console.error('Error constructing LinkedIn auth URL:', error);
    throw error;
  }
};
