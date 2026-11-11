interface Props {
  message: string
  className?: string
}

function ErrorAlert({ message, className = '' }: Props) {
  return (
    <p role="alert" className={`rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 ${className}`}>
      {message}
    </p>
  )
}

export default ErrorAlert
