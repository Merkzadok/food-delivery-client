"use client";

import { FooterButtons } from "@/components/auth";
import { DynamicCardHeader } from "@/components/card";
import { FormInput } from "@/components/dynamic-inputs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { LoginFooter } from "./LoginFooter";
import { useState } from "react";
import { toast } from "sonner";
import { useFormik } from "formik";

export const Login = () => {
  const [email, setEmail] = useState<string>("");
  const { push } = useRouter();
  const [password, setPassword] = useState<string>("");

  const signin = async (values: { email?: string; password?: string }) => {
    try {
      const response = await fetch("http://localhost:4200/user/login", {
        method: "POST",
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
        headers: {
          "content-type": "application/json;  charset=UTF-8",
        },
      });
      const data = await response.json();
      console.log("response", data.accessToken);

      localStorage.setItem("accessToken", data.accessToken);

      if (!response.ok) {
        throw new Error("wrong password");
      }

      toast.success("succesfully login");
      // push("/");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      toast.error(errorMessage);

      console.error(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      await signin(values);
    },
  });
  const formError = formik.touched.email && formik.errors.email;
  const emailInputProps = {
    name: "email",
    placeholder: "Email",
    value: formik.values.email,
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    inputError: formError,
    inputErrorMessage: formik.errors.email,
  };
  const passwordInputProps = {
    name: "password",
    placeholder: "Password",
    value: formik.values.password,
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    inputError: formError,
    inputErrorMessage: formik.errors.password,
  };
  return (
    <Card className="w-[416px] border-none shadow-none gap-6 flex flex-col">
      <DynamicCardHeader
        title="Log in"
        description="Log in to enjoy your favorite dishes."
      />

      <CardContent className="p-0">
        <form className="flex flex-col gap-6" onSubmit={formik.handleSubmit}>
          <div className="grid items-start w-full gap-4">
            <FormInput {...emailInputProps} />
            <FormInput {...passwordInputProps} />
            <Button variant="link" className="p-0 underline w-fit">
              Forgot password ?
            </Button>
          </div>
          <FooterButtons buttonText="Let`s Go" />
        </form>
      </CardContent>
      <LoginFooter />
    </Card>
  );
};
