"use client"
import React, { useState } from "react";
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Tabs, Tab, Input, Link, Button, Card, CardBody, CardHeader } from "@nextui-org/react";

export default function () {
  const [selected, setSelected] = useState<string>('login');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.replace('/home');
    return null;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = form.email.value;
    const password = form.password.value;

    const result = await signIn<'credentials'>('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.ok) {
      router.push(selected === 'login' ? '/home' : '/install');
    } else {
      setErrorMessage('Failed to authenticate. Please check your credentials and try again.');
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
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
