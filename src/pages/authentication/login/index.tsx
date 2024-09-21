import { Box, Container, Input, LoginButton } from "@bettermode/components";
import {
  IconBrandApple,
  IconBrandGoogle,
  IconMail,
  IconPlayerPlay,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { load } from "recaptcha-v3";
import { z } from "zod";

const emailSchema = z.string().email("Invalid email address");

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  // Function to execute reCAPTCHA
  const handleCaptcha = async () => {
    const recaptcha = await load(import.meta.env.VITE_RECAPTCHA_PUBLIC);
    const token = await recaptcha.execute("homepage"); // 'homepage' is the action name
    setCaptchaToken(token);
  };

  useEffect(() => {
    console.log(captchaToken);
  }, [captchaToken]);

  const handleSubmit = async () => {
    await handleCaptcha(); // Call reCAPTCHA before form submission
    if (!captchaToken) {
      alert("reCAPTCHA verification failed.");
      return;
    }
    // Proceed with form submission
    console.log("Form submitted with captcha token:", captchaToken);
  };

  return (
    <Container className="h-full gap-32 mt-20 w-full md:w-[50vw] flex flex-col ">
      <div className="text-center">
        <h2 className="text-6xl font-bold tracking-wider">bettermode</h2>
        <p className="text-gray-400 tracking-wider font-light mt-2">
          Get Started! Create your account
        </p>
      </div>
      <div className="flex items-start justify-center gap-6">
        <div>
          <Input
            placeholder="Email"
            type="email"
            icon={<IconMail size={17} strokeWidth={1} />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            weight="default"
            schema={emailSchema}
            errorMessage="Please enter a valid email."
            onValidationChange={(isValid) => setIsEmailValid(isValid)}
          />
          <p className="text-gray-400 tracking-wider font-light mt-2 text-[10px] text-center">
            We'll email you a magic code for a password-free sign in.
          </p>
        </div>
        <LoginButton
          disabled={email.length < 1 || !isEmailValid}
          onClick={handleSubmit}
        />
      </div>
      <div className="flex md:grid grid-cols-12 flex-col md:flex-row gap-3 w-full">
        <Box className="col-span-3 p-4 flex flex-row md:flex-col justify-between items-center md:justify-center gap-3 cursor-pointer will-change-transform hover:scale-105 hover:bg-indigo-700 transition-all">
          <IconBrandGoogle className="md:mb-5" />

          <div>
            <p className="text-gray-400 tracking-wider font-light text-xs">
              Sign up
            </p>
            <p className="tracking-wider font-light ">with Google</p>
          </div>
        </Box>
        <Box className="col-span-3 p-4 flex flex-row md:flex-col justify-between items-center md:justify-center gap-3 cursor-pointer will-change-transform hover:scale-105 hover:bg-indigo-700 transition-all">
          <IconBrandApple fill={"#fff"} className="md:mb-5" />

          <div>
            <p className="text-gray-400 tracking-wider font-light text-xs">
              Sign up
            </p>
            <p className="tracking-wider font-light">with Apple</p>
          </div>
        </Box>
        <Box className="col-span-6 p-4 flex flex-row md:flex-col justify-between items-center md:justify-center gap-3 relative will-change-transform hover:scale-105 cursor-pointer hover:bg-indigo-700 transition-all">
          <IconPlayerPlay fill={"#fff"} className="md:mb-5" />

          <div>
            <p className="text-gray-400 tracking-wider font-light text-xs">
              Watch how bettermode
            </p>
            <p className="tracking-wider font-light">
              can help you reach millions
            </p>
          </div>

          <div className="absolute right-0 -z-30 top-0 rotate-180">
            <img
              src="/login-box-bg.png"
              width={200}
              height={200}
              alt="Video Button Background"
            />
          </div>
        </Box>
      </div>
    </Container>
  );
};

export default LoginPage;
