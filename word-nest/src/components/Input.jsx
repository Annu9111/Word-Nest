import { useId, forwardRef } from "react";

const Input = forwardRef(function Input(
    {
        label,
        type = "text",
        className = "",
        ...props
    },
    ref
) {
    const id = useId();

    return (
        <div className="w-full">
            {label && (
                <label
                    className="mb-2 block text-sm font-medium text-gray-300"
                    htmlFor={id}
                >
                    {label}
                </label>
            )}

            <input
                type={type}
                ref={ref}
                id={id}
                className={`
                    w-full rounded-xl
                    border border-gray-700
                    bg-gray-900/80
                    px-4 py-3
                    text-sm text-white
                    placeholder:text-gray-500
                    outline-none
                    transition-all duration-200
                    focus:border-pink-500
                    focus:ring-2 focus:ring-pink-500/20
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                    ${className}
                `}
                {...props}
            />
        </div>
    );
});

export default Input;