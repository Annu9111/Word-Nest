import { useId, forwardRef } from "react";

const Select = forwardRef(function Select(
    {
        options = [],
        label,
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
                    htmlFor={id}
                    className="mb-2 block text-sm font-medium text-gray-300"
                >
                    {label}
                </label>
            )}

            <select
                id={id}
                ref={ref}
                className={`
                    w-full rounded-xl
                    border border-gray-700
                    bg-gray-900/80
                    px-4 py-3
                    text-sm text-white
                    outline-none
                    transition-all duration-200
                    focus:border-pink-500
                    focus:ring-2 focus:ring-pink-500/20
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                    ${className}
                `}
                {...props}
            >
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
});

export default Select;