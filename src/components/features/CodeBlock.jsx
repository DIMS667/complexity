import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Copy, Check, Download, Maximize2, Minimize2 } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'
import IconButton from '../ui/IconButton'

const CodeBlock = ({
  code,
  language = 'javascript',
  filename,
  showLineNumbers = true,
  showActions = true,
  maxHeight = '500px',
  className = ''
}) => {
  const { isDark } = useTheme()
  const [copied, setCopied] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const extension = getFileExtension(language)
    const fileName = filename || `code.${extension}`
    const blob = new Blob([code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    a.click()
    URL.revokeObjectURL(url)
  }

  const getFileExtension = (lang) => {
    const extensions = {
      javascript: 'js',
      typescript: 'ts',
      python: 'py',
      java: 'java',
      cpp: 'cpp',
      c: 'c',
      csharp: 'cs',
      php: 'php',
      ruby: 'rb',
      go: 'go',
      rust: 'rs',
      swift: 'swift',
      kotlin: 'kt',
      scala: 'scala',
      r: 'r',
      sql: 'sql',
      html: 'html',
      css: 'css',
      scss: 'scss',
      json: 'json',
      xml: 'xml',
      yaml: 'yaml',
      markdown: 'md',
      bash: 'sh',
      powershell: 'ps1'
    }
    return extensions[lang] || 'txt'
  }

  const getLanguageLabel = (lang) => {
    const labels = {
      javascript: 'JavaScript',
      typescript: 'TypeScript',
      python: 'Python',
      java: 'Java',
      cpp: 'C++',
      c: 'C',
      csharp: 'C#',
      php: 'PHP',
      ruby: 'Ruby',
      go: 'Go',
      rust: 'Rust',
      swift: 'Swift',
      kotlin: 'Kotlin',
      scala: 'Scala',
      r: 'R',
      sql: 'SQL',
      html: 'HTML',
      css: 'CSS',
      scss: 'SCSS',
      json: 'JSON',
      xml: 'XML',
      yaml: 'YAML',
      markdown: 'Markdown',
      bash: 'Bash',
      powershell: 'PowerShell',
      jsx: 'JSX',
      tsx: 'TSX'
    }
    return labels[lang] || lang.toUpperCase()
  }

  return (
    <div className={`rounded-lg overflow-hidden border border-gray-200 dark:border-dark-400 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-dark-300 border-b border-gray-200 dark:border-dark-400">
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
            {getLanguageLabel(language)}
          </span>
          {filename && (
            <>
              <span className="text-gray-400 dark:text-gray-600">•</span>
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {filename}
              </span>
            </>
          )}
        </div>
        
        {showActions && (
          <div className="flex items-center gap-1">
            <IconButton
              icon={isExpanded ? Minimize2 : Maximize2}
              onClick={() => setIsExpanded(!isExpanded)}
              size="sm"
              tooltip={isExpanded ? 'Minimize' : 'Maximize'}
            />
            <IconButton
              icon={Download}
              onClick={handleDownload}
              size="sm"
              tooltip="Download"
            />
            <IconButton
              icon={copied ? Check : Copy}
              onClick={handleCopy}
              size="sm"
              tooltip={copied ? 'Copied!' : 'Copy'}
            />
          </div>
        )}
      </div>

      {/* Code */}
      <div 
        className="overflow-auto"
        style={{ maxHeight: isExpanded ? 'none' : maxHeight }}
      >
        <SyntaxHighlighter
          language={language}
          style={isDark ? oneDark : oneLight}
          showLineNumbers={showLineNumbers}
          customStyle={{
            margin: 0,
            padding: '1rem',
            background: isDark ? '#1e1e2e' : '#fafafa',
            fontSize: '0.875rem'
          }}
          codeTagProps={{
            style: {
              fontFamily: 'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
            }
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>

      {/* Footer (if code is truncated) */}
      {!isExpanded && code.split('\n').length > 20 && (
        <div className="px-4 py-2 bg-gray-100 dark:bg-dark-300 border-t border-gray-200 dark:border-dark-400 text-center">
          <button
            onClick={() => setIsExpanded(true)}
            className="text-xs text-primary-600 dark:text-primary-400 hover:underline"
          >
            Show more ({code.split('\n').length - 20} more lines)
          </button>
        </div>
      )}
    </div>
  )
}

export default CodeBlock