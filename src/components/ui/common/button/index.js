export default function Button({
    children, 
    className,
    hoverable = true,
    variant = 'indigo',
    ...rest
}) {

    const variants = {
        indigo: `text-white bg-indigo-600 ${hoverable && 'hover:bg-indigo-700'}`,
        red: `text-white bg-red-600 ${hoverable && 'hover:bg-red-700'}`,
        green: `text-white bg-green-600 ${hoverable && 'hover:bg-green-700'}`,
        blue: `text-white bg-blue-600 ${hoverable && 'hover:bg-blue-700'}`,
        yellow: `text-white bg-yellow-600 ${hoverable && 'hover:bg-yellow-700'}`,
        gray: `text-white bg-gray-600 ${hoverable && 'hover:bg-gray-700'}`,
        white: `text-gray-700 bg-white ${hoverable && 'hover:bg-gray-100'}`,
        black: `text-white bg-black ${hoverable && 'hover:bg-gray-900'}`,
    }

    return (
        <>
            <button
                {...rest}
                className={`disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3 border rounded-md text-base font-medium ${className} ${variants[variant]}`}
            >
                {children}
            </button>
        </>
    )
}
