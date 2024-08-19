const getGoogleOauthURL = () => {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

  const options = {
    // eslint-disable-next-line no-undef
    redirect_uri: "http://localhost:8000/api/sessions/oauth/google",

    // eslint-disable-next-line no-undef
    client_id:
      "797856909510-okvi206hktftr3o5gn7h4ima815otjrg.apps.googleusercontent.com",

    access_type: "online",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };
  const qs = new URLSearchParams(options);

  return `${rootUrl}?${qs.toString()}`;
};
export default getGoogleOauthURL;
