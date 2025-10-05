import { useState, useRef, useEffect } from 'react'

const Dropdown = ({ 
  trigger, 
  items = [], 
  align = 'left',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleItemClick = (item) => {
    if (item.onClick) {
      item.onClick()
    }
    setIsOpen(false)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={() => setIsOpen(!isOpen)}>
        {trigger}
      </div>

      {isOpen && (
        <div className={`
          absolute z-50 mt-2 min-w-[200px]
          ${align === 'right' ? 'right-0' : 'left-0'}
          bg-white dark:bg-dark-200 
          rounded-lg shadow-lg 
          border border-gray-200 dark:border-dark-400
          py-1
          ${className}
        `}>
          {items.map((item, index) => {
            if (item.divider) {
              return (
                <div 
                  key={index}
                  className="h-px bg-gray-200 dark:bg-dark-400 my-1"
                />
              )
            }

            const Icon = item.icon

            return (
              <button
                key={index}
                onClick={() => handleItemClick(item)}
                className={`
                  w-full px-3 py-2 text-left
                  flex items-center gap-3
                  hover:bg-gray-100 dark:hover:bg-dark-300
                  transition-colors
                  ${item.danger 
                    ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20' 
                    : 'text-gray-700 dark:text-gray-200'
                  }
                `}
              >
                {Icon && <Icon className="w-4 h-4" />}
                <span className="text-sm">{item.label}</span>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Dropdown;