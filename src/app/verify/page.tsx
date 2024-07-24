"use client";
import axios from "axios";
import Link from "next/link";
// import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function page() {
  // const router = useRouter();
  const [token, setToken] = useState("");
  const [verfied, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verfyUserEmail = async () => {
    try {
      await axios.post("/api/users/verify", {token});// not keeping token in obeject it was mistake
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
    // //second way
    // const { query } = router;
    // const urlTwo=query.token
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verfyUserEmail();
    }
  }, [token]);

  return <div className=" flex flex-col items-center justify-center min-h-screen py-2">
    <h1 className="text-4xl py-3">Verify Email</h1>
    <h2 className=" p-2 bg-orange-500 text-black">
      {token? `${token}`:"NO Token"}
    </h2>
    {verfied && (
      <div>
        <h2>verified</h2>
        <Link href={"/login"}>back to login</Link>
      </div>
    )}
    {error && (
      <div>
        <h2>Error</h2>
      </div>
    )}
  </div>;
}

export default page;
