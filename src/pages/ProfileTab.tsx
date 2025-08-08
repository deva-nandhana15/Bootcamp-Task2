import { useState } from "react";

export default function ProfileTab() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      alert(`Signing up with Username: ${username}`);
      // Add your sign-up logic here
    } else {
      alert(`Signing in with Username: ${username}`);
      // Add your sign-in logic here
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-[#4c3428] rounded shadow text-center text-gray-900 dark:text-white max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">{isSignUp ? "🔐 Sign Up" : "🔓 Sign In"}</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none dark:bg-[#5a3b2f] dark:border-[#8b6b5a]"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none dark:bg-[#5a3b2f] dark:border-[#8b6b5a]"
        />

        <button
          type="submit"
          className="w-full bg-[#8b5e3c] text-white py-2 rounded hover:bg-[#a8744f] transition"
        >
          {isSignUp ? "Create Account" : "Login"}
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-700 dark:text-gray-200">
        {isSignUp ? "Already have an account?" : "Don’t have an account?"}{" "}
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-blue-600 dark:text-blue-300 underline hover:opacity-80"
        >
          {isSignUp ? "Sign In" : "Sign Up"}
        </button>
      </p>
    </div>
  );
}
