import { useState } from "react";

export default function ProfileTab() {
  const [isSignUp, setIsSignUp] = useState(false);

  // Shared fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Sign-up only fields
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validatePassword = (pwd: string) => {
    const hasLetter = /[A-Za-z]/.test(pwd);
    const hasNumber = /\d/.test(pwd);
    return hasLetter && hasNumber;
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isSignUp) {
      if (!fullName.trim()) {
        alert("Please enter your full name.");
        return;
      }
      if (!age || Number(age) <= 0) {
        alert("Please enter a valid age.");
        return;
      }
      if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
      }
      if (!validatePassword(password)) {
        alert("Password must contain at least one letter and one number.");
        return;
      }
      if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
      }
      alert(`Signing up:\nName: ${fullName}\nUsername: ${username}\nAge: ${age}\nEmail: ${email}`);
      // Sign-up logic here
    } else {
      alert(`Signing in with Username: ${username}`);
      // Sign-in logic here
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-[#4c3428] rounded shadow text-center text-gray-900 dark:text-white max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">{isSignUp ? "🔐 Sign Up" : "🔓 Sign In"}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {isSignUp && (
          <>
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none dark:bg-[#5a3b2f] dark:border-[#8b6b5a]"
            />
            <input
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none dark:bg-[#5a3b2f] dark:border-[#8b6b5a]"
            />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded focus:outline-none dark:bg-[#5a3b2f] dark:border-[#8b6b5a]"
            />
          </>
        )}

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

        {isSignUp && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded focus:outline-none dark:bg-[#5a3b2f] dark:border-[#8b6b5a]"
          />
        )}

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
          type="button"
          onClick={() => setIsSignUp(!isSignUp)}
          className="text-blue-600 dark:text-blue-300 underline hover:opacity-80"
        >
          {isSignUp ? "Sign In" : "Sign Up"}
        </button>
      </p>
    </div>
  );
}