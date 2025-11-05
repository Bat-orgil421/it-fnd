/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Eye, EyeClosed } from "lucide-react";
import { useContext, useState } from "react";
import { UserContext } from "../providers/UserProvider";
import { redirect } from "next/navigation";
import axios from "axios";

const SingInPage = () => {
  const { user } = useContext(UserContext);

  const [passwordShown, setPasswordShown] = useState(false);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");

  if (user) {
    return redirect("/");
  }

  const handleSignin = async () => {
    const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + "/signup", {
      credential,
      password,
      fullname,
      username,
    });

    console.log(response);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-black">
      <div className="bg-black w-68 h-140 border-1 border-gray  ">
        <div>
          <div className="flex justify-center mt-10">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwJc_f2DLp6hHWYGCqhUorKjSLYPz8YKL4Cg&s"
              alt="instagram"
              className="w-36 mb-5"
            />
          </div>
          <div className="font-bold text-gray-400 text-sm/6">
            Sign up to see photos and videos from your friends.
          </div>
        </div>
        <CardContent>
          <div className="flex flex-col gap-4">
            <Input
              placeholder="Email or phone"
              value={credential}
              className="w-full text-white"
              onChange={(e) => {
                setCredential(e.target.value);
              }}
            />
            <Input
              placeholder="Full Name"
              value={fullname}
              className="w-full text-white"
              onChange={(e) => {
                setFullname(e.target.value);
              }}
            />
            <Input
              placeholder="User Name"
              value={username}
              className="w-full text-white"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <div className="relative">
              <Input
                placeholder="Password..."
                value={password}
                className="w-full text-white"
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
            <Button onClick={handleSignin}>Sign Up</Button>
          </div>
        </CardContent>
      </div>
    </div>
  );
};

export default SingInPage;
