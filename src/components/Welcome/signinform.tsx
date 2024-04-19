"use client"
import React, { useState } from "react";
import { signIn } from 'next-auth/react';
import { Tabs, Tab, Input, Link, Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function () {
  const router = useRouter()
  const [selected, setSelected] = useState<string>('login');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [buttonloading, setbuttonloading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setbuttonloading(true);
    const form = event.currentTarget;
    const email = form.email.value;
    const password = form.password.value;

    const result = await signIn<'credentials'>('credentials', {
      email,
      password,
      redirect: false
    });
    setbuttonloading(false)

    if (result?.error) {
      // router.push(selected === 'login' ? '/home' : '/install');
      setErrorMessage(result.error)
    }
    else if(result?.ok){
      router.push('/home')
    }
    else {
      setErrorMessage('Failed to authenticate. Please check your credentials and try again.');
    }
  };

  const habdleSignUpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setbuttonloading(true);
    const form = e.currentTarget;
    const email = form.email.value;
    const password = form.password.value;
    const shopifyDomain = form.shopifyDomain.value;
    // console.log(shopifyDomain)s
    try {
      const resp = await axios.post('/api/auth/signup', { email, password, shopifyDomain })
      if (resp) {
        alert('Account created successfully');
        setSelected('login');
      }
      else {
        alert('Failed to create account. Please try again.');
      }
    } catch (error) {
      console.error('Error creating account:', error);
      alert('An error occurred. Please try again later.');
    }
    setbuttonloading(false);
  }

  const handleForgotPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setbuttonloading(true);
    const form = event.currentTarget;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const response = await axios.post('/api/change-password', { email, password });

      if (response) {
        // Display success message to the user
        alert('Password reset successfull');
      } else {
        // Display error message to the user
        alert('Failed to send password reset email. Please try again.');
      }
    } catch (error) {
      console.error('Error sending password reset email:', error);
      alert('An error occurred. Please try again later.');
    }
    setbuttonloading(false)
  };

  return (
    <div className="flex flex-col w-full ">
      <Card className="max-w-full w-[440px] ">
        <CardBody className="overflow-hidden">
          <div className="text-3xl text-black text-center pb-4 font-bold justify-center align-center ">
            <h1>Let's Get Started</h1>
          </div>
          <Tabs
            fullWidth
            size="lg"
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={(key) => setSelected(key as string)}
          >
            <Tab key="login" title="Login">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4">
                {errorMessage && <div className="text-center text-small text-red-500">{errorMessage}</div>}
                <Input isRequired label="Email" placeholder="Enter your email" type="email" name="email" />
                <Input
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  name="password"
                />
                <p className="text-center text-small">
                  <Link size="sm" onPress={() => setSelected("forgot-password")}>
                    Forgot Password?
                  </Link>
                </p>
                <p className="text-center text-small">
                  Need to create an account?{" "}
                  <Link size="sm" onPress={() => setSelected("sign-up")}>
                    Sign up
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button
                    isLoading={buttonloading}
                    spinner={
                      <div className="flex flex-row">
                        <svg
                          className="animate-spin h-5 w-5 text-current"
                          fill="none"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            fill="currentColor"
                          />
                        </svg>
                        <h1>Authenticating</h1>
                      </div>
                    }
                    type="submit"
                    fullWidth color="primary">
                    {buttonloading ? "" : "Signin"}
                  </Button>
                </div>
              </form>
            </Tab>
            <Tab key="sign-up" title="Sign up">
              <form
                onSubmit={habdleSignUpSubmit}
                className="flex flex-col gap-4">
                {errorMessage && <div className="text-center text-small text-red-500">{errorMessage}</div>}
                <Input isRequired label="Email" placeholder="Enter your email" type="email" name="email" />
                <Input
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  name="password"
                />
                <Input isRequired label="Shopify Domain" placeholder="Enter your Shopify Domain" type="string" name="shopifyDomain" />

                <p className="text-center text-small">
                  Already have an account?{" "}
                  <Link size="sm" onPress={() => setSelected("login")}>
                    Login
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button
                    isLoading={buttonloading}
                    spinner={
                      <div className="flex flex-row">
                        <svg
                          className="animate-spin h-5 w-5 text-current"
                          fill="none"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            fill="currentColor"
                          />
                        </svg>
                        <h1>Creating account</h1>
                      </div>
                    }
                    type="submit"
                    fullWidth color="primary">
                    {buttonloading ? "" : "SignUp"}
                  </Button>
                </div>
              </form>
            </Tab>
            <Tab key="forgot-password" title="Change Password">
              <form onSubmit={handleForgotPassword} className="flex flex-col gap-4">
                <Input isRequired label="Email" placeholder="Enter your email" type="email" name="email" />
                <Input
                  isRequired
                  label="Change Password"
                  placeholder="Enter your new password"
                  type="password"
                  name="password"
                />
                <p className="text-center text-small">
                  Remember your password?{" "}
                  <Link size="sm" onPress={() => setSelected("login")}>
                    Login
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button
                    isLoading={buttonloading}
                    spinner={
                      <div className="flex flex-row">
                        <svg
                          className="animate-spin h-5 w-5 text-current"
                          fill="none"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            fill="currentColor"
                          />
                        </svg>
                        <h1>Resetting your password</h1>
                      </div>
                    }
                    type="submit"
                    fullWidth color="primary">
                    {buttonloading ? "" : "Reset Password"}
                  </Button>
                </div>
              </form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
