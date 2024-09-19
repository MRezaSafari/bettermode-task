import {
  Button,
  Container,
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@bettermode/components";
import { useQuery } from "@bettermode/hooks";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const VerifyPage: React.FC = () => {
  const query = useQuery();
  const email = query.get("email"); // Retrieve the 'email' query parameter
  const navigate = useNavigate();
  const [value, setValue] = useState("");

  // Redirect if email is missing
  useEffect(() => {
    if (!email) {
      navigate("/auth/signup"); // Redirect to signup page or another page
    }
  }, [email, navigate]);

  // Render the verification page if email is present
  return (
    <Container className="flex flex-col justify-center items-center gap-10">
      <div>
        <h1 className="text-center text-3xl font-bold">
          Check your email for a code
        </h1>
        <p className="text-sm text-gray-400 mt-3">
          Enter the 6-digit verification code we have sent you at{" "}
          <span className="text-indigo-500">{email}</span>{" "}
          <Link className="text-blue-300" to="/auth/signup">
            (change email)
          </Link>
        </p>
      </div>
      <div className="flex justify-center items-center flex-col gap-3">
        <InputOTP
          maxLength={6}
          value={value}
          onChange={(value) => setValue(value)}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <p className="text-xs text-gray-400">
          Can’t find your code? Check your spam folder!
        </p>
      </div>

      <Button disabled={value.length < 6} variant="success">Continue</Button>
    </Container>
  );
};

export default VerifyPage;
