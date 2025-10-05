import { useState } from 'react'

const IconButton = ({
  icon: Icon,
  onClick,
  size = 'md',
  tooltip,
  disabled = false,
  className = '',
  type = 'button'
}) => {
  const [showTooltip, setShowTooltip] = useState(false)
  
  const sizes = {
    sm: 'p-1',
    md: 'p-2',
    lg: 'p-3'
  }
  
  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  return (
    <div className="relative">
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`
          ${sizes[size]}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-dark-300'}
          rounded-lg transition-colors
          focus:outline-none focus:ring-2 focus:ring-primary-500
          ${className}
        `}
      >
        <Icon className={iconSizes[size]} />
      </button>
      
      {tooltip && showTooltip && !disabled && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 dark:bg-gray-800 text-white text-xs rounded whitespace-nowrap z-50">
          {tooltip}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
            <div className="border-4 border-transparent border-t-gray-900 dark:border-t-gray-800" />
          </div>
        </div>
      )}
    </div>
  )
}

export default IconButton;