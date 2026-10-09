import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

import authService from "../appwrite/auth";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "./index.js";

function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [error, setError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const create = async (data) => {
        setError("");

        try {
            // Create the account and log in.
            const session = await authService.createAccount(data);

            if (session) {
                const userData = await authService.getCurrentUser();

                if (userData) {
                    dispatch(login({ userData }));
                    navigate("/");
                } else {
                    setError("Account created, but unable to fetch user details.");
                }
            }
        } catch (error) {
            setError(error.message || "Unable to create your account.");
        }
    };

    return (
        <div className="flex min-h-[80vh] items-center justify-center bg-gray-950 px-4 py-12">
            <div className="w-full max-w-md rounded-2xl border border-gray-800 bg-gray-900 p-6 shadow-2xl sm:p-8">

                {/* Logo */}
                <div className="mb-6 flex justify-center">
                    <div className="w-36">
                        <Logo width="100%" />
                    </div>
                </div>

                {/* Heading */}
                <h2 className="text-center text-2xl font-bold text-white sm:text-3xl">
                    Create Your Account
                </h2>

                <p className="mt-2 text-center text-sm text-gray-400">
                    Join WordNest and start sharing your stories.
                </p>

                {/* Login link */}
                <p className="mt-5 text-center text-sm text-gray-400">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="font-semibold text-pink-400 transition hover:text-pink-300 hover:underline"
                    >
                        Sign in
                    </Link>
                </p>

                {/* Error message */}
                {error && (
                    <p
                        role="alert"
                        className="mt-5 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-center text-sm text-red-400"
                    >
                        {error}
                    </p>
                )}

                {/* Signup form */}
                <form onSubmit={handleSubmit(create)} className="mt-8">
                    <div className="space-y-5">

                        {/* Full name */}
                        <div>
                            <Input
                                label="Full name"
                                type="text"
                                placeholder="Enter your full name"
                                autoComplete="name"
                                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20"
                                {...register("name", {
                                    required: "Full name is required",
                                    minLength: {
                                        value: 2,
                                        message: "Name must contain at least 2 characters",
                                    },
                                })}
                            />

                            {errors.name && (
                                <p className="mt-1 text-sm text-red-400">
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <Input
                                label="Email address"
                                type="email"
                                placeholder="you@example.com"
                                autoComplete="email"
                                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Please enter a valid email address",
                                    },
                                })}
                            />

                            {errors.email && (
                                <p className="mt-1 text-sm text-red-400">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div>
                            <Input
                                label="Password"
                                type="password"
                                placeholder="Create a password"
                                autoComplete="new-password"
                                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 8,
                                        message: "Password must be at least 8 characters",
                                    },
                                })}
                            />

                            {errors.password && (
                                <p className="mt-1 text-sm text-red-400">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Submit button */}
                        <Button
                            type="submit"
                            className="w-full rounded-lg bg-pink-600 py-3 font-semibold text-white transition duration-200 hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 focus:ring-offset-gray-900"
                        >
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;