import { signIn } from "next-auth/react";
import { useState } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
        });

        if (result?.error) {
            setError("Invalid credentials");
        } else {
            window.location.href = "/";
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold">Login</h1>

            {/* Google Login Button */}
            <button
                onClick={() => signIn("google")}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
            >
                Sign in with Google
            </button>

            <div className="mt-6 w-80 bg-white p-4 rounded shadow">
                <form onSubmit={handleSubmit}>
                    {error && <p className="text-red-500">{error}</p>}

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border rounded mt-2"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded mt-2"
                        required
                    />

                    <button type="submit" className="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded">
                        Sign in with Email
                    </button>
                </form>
            </div>
        </div>
    );
}