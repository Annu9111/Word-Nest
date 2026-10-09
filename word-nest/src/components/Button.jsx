function Button({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    ...props
}) {
    return (
        <button
            type={type}
            className={`
                inline-flex items-center justify-center gap-2
                rounded-lg px-4 py-2
                font-medium
                transition-all duration-200 ease-in-out
                hover:brightness-110
                active:scale-95
                focus:outline-none focus:ring-2
                focus:ring-blue-400 focus:ring-offset-2
                disabled:cursor-not-allowed disabled:opacity-50
                ${textColor}
                ${bgColor}
                ${className}
            `}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;