import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";

import { Button } from "primereact/button";

export default function Login() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState("");
  const [user, setUser] = useState(null);

  const validateForm = () => {
    let isValid = true;

    if (!username || username.length === 0) {
      setUsernameError("Username is required");
      isValid = false;
    } else {
      setUsernameError("");
    }

    if (!password || password.length === 0) {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }

    return isValid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      setLoading(true);
      axios
        .post("/api/login", {
          username: username,
          password: password,
        })
        .then((res) => {
          setLoading(false);
          if (res?.data?.user) {
            setUser(res?.data?.user);
            setAuthError("");
            router.push("/admin");
          } else {
            setAuthError(res?.response?.data?.error || "Unknown Error");
          }
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
          setAuthError(error?.response?.data?.error || "Unknown Error");
        });
    }
  };

  return (
    <div className="flex w-full m-auto h-screen justify-center items-center bg-gray-200 flex-col">
      <h1>Eshoppers | Admin Login</h1>
      <div className="xl:max-w-lg lg:max-w-lg md:w-full md:mx-4 sm:w-full sm:mx-4 md:p-6 flex flex-col m-auto">
        <form onSubmit={handleSubmit}>
          <div className="bg-white shadow-xl rounded px-12 pt-12 pb-12 mb-4">
            <div className="mb-4">
              <label
                className="block text-grey-darker text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker${
                  usernameError ? " border-red" : ""
                }`}
                id="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
              {usernameError && (
                <p className="text-red text-xs italic">{usernameError}</p>
              )}
            </div>
            <div className="mb-6">
              <label
                className="block text-grey-darker text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker${
                  passwordError ? " border-red" : ""
                }`}
                id="password"
                type="password"
                placeholder="******************"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              {passwordError && (
                <p className="text-red text-xs italic">{passwordError}</p>
              )}
            </div>
            <div className="flex items-center justify-center">
              <Button
                className="bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
                type="submit"
                label={loading ? <div className="loader"></div> : "Sign In"}
              />
            </div>{" "}
            {authError?.length > 0 ? (
              <div className="mt-4 text-color-red">{authError}</div>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
}
