"use client"
import React, { useState } from "react";
import { signIn } from 'next-auth/react';
import { Tabs, Tab, Input, Link, Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import axios from "axios";

export default function () {
  const [selected, setSelected] = useState<string>('login');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = form.email.value;
    const password = form.password.value;

    const result = await signIn<'credentials'>('credentials', {
      email,
      password,
    });

    if (result?.ok) {
      // router.push(selected === 'login' ? '/home' : '/install');
    } else {
      setErrorMessage('Failed to authenticate. Please check your credentials and try again.');
    }
  };

  const handleForgotPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
  };

  return (
    <div className="flex flex-col w-full ">
      <Card className="max-w-full w-[440px] ">
        <CardBody className="overflow-hidden">
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
                    type="submit"
                    fullWidth color="primary">
                    Login
                  </Button>
                </div>
              </form>
            </Tab>
            <Tab key="sign-up" title="Sign up">
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
                  Already have an account?{" "}
                  <Link size="sm" onPress={() => setSelected("login")}>
                    Login
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button
                    type="submit"
                    fullWidth color="primary">
                    Sign up
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
                  <Button type="submit" fullWidth color="primary">
                    Reset Password
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
