"use client"
import { useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Page = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    document.title = "Login – Fan Pulse";
    if (session) {
      router.push("/dashboard");
    }
  }, [session, router]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4">
      <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center drop-shadow-lg">
        Welcome to <span className="text-purple-400">Fan Pulse</span>
      </h2>
      <p className="text-gray-400 mt-3 mb-8 text-center">
        Sign in to continue to your workspace
      </p>

      <div className=" bg-slate-900 shadow-xl shadow-slate-800 rounded-2xl p-8 w-full max-w-md">
        <div className="flex flex-col gap-4">
          
          <button
            onClick={() => signIn("google")}
            className="cursor-pointer flex items-center justify-center gap-3 bg-white text-gray-800 px-6 py-3 rounded-xl font-medium shadow-md hover:bg-gray-200 transition"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="h-6 w-6"
            />
            Continue with Google
          </button>

          <button
            onClick={() => signIn("github")}
            className="cursor-pointer flex items-center justify-center gap-3 bg-white text-gray-800 px-6 py-3 rounded-xl font-medium shadow-md hover:bg-gray-200 transition"
          >
            <img
              src="https://www.svgrepo.com/show/512317/github-142.svg"
              alt="GitHub"
              className="h-6 w-6"
            />
            Continue with GitHub
          </button>

          {/* Guest */}
          <button
            onClick={() => signIn("credentials", { callbackUrl: "/about"  })}
            className="cursor-pointer flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 py-3 rounded-xl font-medium shadow-md hover:opacity-90 transition"
          >
            <svg
              className="h-6 w-6 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M12 2a5 5 0 100 10 5 5 0 000-10zm-7 18a7 7 0 1114 0H5z"
                clipRule="evenodd"
              />
            </svg>
            Continue as Guest
          </button>
        </div>
      </div>

      {/* Footer */}
      <p className="text-gray-500 text-sm mt-6">
        By signing in, you agree to our{" "}
        <span className="text-blue-400 hover:underline cursor-pointer">
          Terms of Service
        </span>{" "}
        &{" "}
        <span className="text-blue-400 hover:underline cursor-pointer">
          Privacy Policy
        </span>
      </p>
    </div>
  );
};

export default Page;
