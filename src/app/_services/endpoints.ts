// OAuth login box type (only recent testing with Main)
export const loginBoxType = {
  Main: 1,
  Popup: 2,
  Modal: 3
};

export const endpoints = {
  // Change this URL if you want to point the React application at another Pega server.
  //BASEURL: "http://localhost:1081/prweb/api/v1",
  BASEURL: "https://dx.pegatsdemo.com/prweb/api/v1",

    // oauth config for both loign in screen/redirect and background login with clientid/secret
    OAUTHCFG: {
      providerID: "pega",
      authorization: "https://dx.pegatsdemo.com/prweb/PRRestService/oauth2/v1/authorize",
      authority: "https://dx.pegatsdemo.com/prweb/PRRestService/oauth2/v1",
      token: "https://dx.pegatsdemo.com/prweb/PRRestService/oauth2/v1/token",
      scope: [],
      grant_type:  "client_credentials",
      // main window login
      use_pkce: true,
      loginExperience: loginBoxType.Main
    },

  AUTH: "/authenticate",
  CASES: "/cases",
  CASETYPES: "/casetypes",
  VIEWS: "/views",
  ASSIGNMENTS: "/assignments",
  ACTIONS: "/actions",
  PAGES: "/pages",
  DATA: "/data",
  REFRESH: "/refresh"
};

