import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";

console.log('the AUTH0_SECRET env var is set: ', !!process.env.AUTH0_SECRET);

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