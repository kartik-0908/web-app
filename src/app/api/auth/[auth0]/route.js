import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";

export const GET = handleAuth({
  login: handleLogin({
    authorizationParams: {
      prompt: "login",
    },
    returnTo: "/home",
  }),
  signup: handleLogin({
    authorizationParams: {
      prompt: "login",
      screen_hint: "signup",
    },
    returnTo: "/home", // This is the default behavior
  }),
});