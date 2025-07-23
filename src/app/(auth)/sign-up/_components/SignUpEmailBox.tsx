"use client";

import { FooterButtons } from "@/components/auth";
import { DynamicCardHeader } from "@/components/card";
import { Card, CardContent } from "@/components/ui/card";
import { FormInput } from "../../../../components/dynamic-inputs";
import { SignUpFooter } from "./SignUpFooter";
import { useState } from "react";
import { toast } from "sonner";

type EmailBoxProps = {
  values: { email: string; password: string };
  errors: { email?: string; password: string };
  touched: { email?: boolean; password: boolean };
  handleChange: (_event: React.ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (_event: React.FocusEvent<HTMLInputElement>) => void;
  handleNext: () => void;
};

export const SignUpEmailBox = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleNext,
  onSubmit,
}: EmailBoxProps) => {
  const formError = touched.email && errors.email;

  const emailInputProps = {
    name: "email",
    placeholder: "Email",
    value: values.email,
    onChange: handleChange,
    onBlur: handleBlur,
    inputError: formError,
    inputErrorMessage: errors.email,
  };
  const passwordInputProps = {
    name: "password",
    placeholder: "Password",
    value: values.password,
    onChange: handleChange,
    onBlur: handleBlur,
    inputError: formError,
    inputErrorMessage: errors.password,
  };
  return (
    <Card className="w-[416px] border-none shadow-none gap-6 flex flex-col">
      <DynamicCardHeader
        title="Create your account"
        description="Sign up to explore your favorite dishes."
      />
      <CardContent className="p-0">
        <form onSubmit={onSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid items-center w-full gap-6">
              <FormInput {...emailInputProps} />
              <FormInput {...passwordInputProps} />
            </div>
            <FooterButtons buttonText="Let`s Go" />
          </div>
        </form>
      </CardContent>
      <SignUpFooter />
    </Card>
  );
};
