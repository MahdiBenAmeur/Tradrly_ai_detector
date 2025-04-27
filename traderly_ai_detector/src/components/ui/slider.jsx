export function Slider({ defaultValue = [0], max = 100, step = 1, disabled = false, className = "", ...props }) {
  const percentage = (defaultValue[0] / max) * 100

  return (
    <div className={`relative w-full h-2 ${className}`} {...props}>
      <div className="absolute h-2 bg-gray-200 rounded-full w-full"></div>
      <div className="absolute h-2 bg-purple-600 rounded-full" style={{ width: `${percentage}%` }}></div>
      {!disabled && (
        <div
          className="absolute w-4 h-4 bg-white border-2 border-purple-600 rounded-full -mt-1 transform -translate-y-1/4"
          style={{ left: `${percentage}%` }}
        ></div>
      )}
    </div>
  )
}
