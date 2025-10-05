import { User } from 'lucide-react'

const Avatar = ({
  src,
  alt,
  name,
  size = 'md',
  status,
  className = '',
  onClick
}) => {
  const sizes = {
    xs: 'w-6 h-6 text-xs',
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
    xl: 'w-16 h-16 text-xl'
  }

  const statusSizes = {
    xs: 'w-1.5 h-1.5',
    sm: 'w-2 h-2',
    md: 'w-2.5 h-2.5',
    lg: 'w-3 h-3',
    xl: 'w-4 h-4'
  }

  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    busy: 'bg-red-500',
    away: 'bg-yellow-500'
  }

  const getInitials = (name) => {
    if (!name) return ''
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2)
  }

  const initials = name ? getInitials(name) : ''
  const gradientColors = [
    'from-blue-500 to-purple-600',
    'from-green-500 to-teal-600',
    'from-purple-500 to-pink-600',
    'from-yellow-500 to-orange-600',
    'from-red-500 to-pink-600',
    'from-indigo-500 to-purple-600'
  ]
  
  // Generate consistent gradient based on name
  const gradientIndex = name ? name.charCodeAt(0) % gradientColors.length : 0
  const gradient = gradientColors[gradientIndex]

  return (
    <div 
      className={`relative inline-block ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
    >
      {src ? (
        <img
          src={src}
          alt={alt || name || 'Avatar'}
          className={`
            ${sizes[size]}
            rounded-full object-cover
            ${onClick ? 'hover:ring-2 hover:ring-primary-500 hover:ring-offset-2 dark:hover:ring-offset-dark-200' : ''}
            transition-all
          `}
        />
      ) : (
        <div className={`
          ${sizes[size]}
          rounded-full
          bg-gradient-to-br ${gradient}
          flex items-center justify-center
          text-white font-semibold
          ${onClick ? 'hover:ring-2 hover:ring-primary-500 hover:ring-offset-2 dark:hover:ring-offset-dark-200' : ''}
          transition-all
        `}>
          {initials || <User className="w-1/2 h-1/2" />}
        </div>
      )}

      {status && (
        <div className={`
          absolute bottom-0 right-0
          ${statusSizes[size]}
          ${statusColors[status]}
          rounded-full
          border-2 border-white dark:border-dark-200
        `} />
      )}
    </div>
  )
}

export default Avatar