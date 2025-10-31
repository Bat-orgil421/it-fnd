/* eslint-disable @next/next/no-img-element */
"use client";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Eye, EyeClosed } from "lucide-react";
import { useContext, useState } from "react";

import { UserContext } from "../providers/UserProvider";
import { redirect } from "next/navigation";
import { toast } from "sonner";

const SingInPage = () => {
  const { user, setToken } = useContext(UserContext);

  const [passwordShown, setPasswordShown] = useState(false);

  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");

  if (user) {
    return redirect("/");
  }

  const handleSignin = async () => {
    const response = await fetch("http://localhost:3100/signin", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ credential, password }),
    });

    const data = await response.json();

    if (response.ok) {
      toast.success(data.message);
      setToken(data.body);
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-black">
      <div className="w-130 left-0">
        <img src="/images/landing-3x.png" alt="" />
      </div>
      <div className="bg-black w-68 h-100">
        <div>
          <div className="flex justify-center mt-10">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwJc_f2DLp6hHWYGCqhUorKjSLYPz8YKL4Cg&s"
              alt="instagram"
              className="w-36 mb-5"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col gap-4">
            <Input
              placeholder="Email or phone"
              value={credential}
              className="w-full"
              onChange={(e) => {
                setCredential(e.target.value);
              }}
            />
            <div className="relative">
              <Input
                placeholder="Password..."
                value={password}
                className="w-full"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type={passwordShown ? "text" : "password"}
              />
              <Button
                onClick={() => {
                  setPasswordShown(!passwordShown);
                }}
                variant="ghost"
                className="absolute right-0 top-0"
              >
                {passwordShown ? <Eye /> : <EyeClosed />}
              </Button>
            </div>
            <Button
              onClick={handleSignin}
              className="bg-blue-900 text-gray-300 h-7"
            >
              Log in
            </Button>
            <div className="text-sm/6">
              Do not have an account?{" "}
              <a href="/SignUp" className="text-blue-500">
                {" "}
                Sign up
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingInPage;
