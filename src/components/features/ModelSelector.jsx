import { ChevronDown, Zap, Brain, Sparkles, Gauge } from 'lucide-react'
import { useState } from 'react'
import { useChatContext } from '../../contexts/ChatContext'

const ModelSelector = () => {
  const { selectedModel, setSelectedModel, models } = useChatContext()
  const [isOpen, setIsOpen] = useState(false)
  
  const currentModel = models.find(m => m.id === selectedModel)

  const getModelIcon = (modelId) => {
    switch(modelId) {
      case 'gpt-4': return Brain
      case 'gpt-3.5-turbo': return Zap
      case 'claude-3': return Sparkles
      default: return Gauge
    }
  }

  const getModelColor = (modelId) => {
    switch(modelId) {
      case 'gpt-4': return 'text-purple-600 dark:text-purple-400'
      case 'gpt-3.5-turbo': return 'text-green-600 dark:text-green-400'
      case 'claude-3': return 'text-blue-600 dark:text-blue-400'
      default: return 'text-gray-600 dark:text-gray-400'
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-dark-300 hover:bg-gray-100 dark:hover:bg-dark-400 rounded-lg transition-colors border border-gray-200 dark:border-dark-400"
      >
        {currentModel && (
          <>
            {(() => {
              const Icon = getModelIcon(currentModel.id)
              return <Icon className={`w-4 h-4 ${getModelColor(currentModel.id)}`} />
            })()}
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {currentModel.name}
            </span>
          </>
        )}
        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          <div className="absolute top-full mt-2 right-0 w-80 bg-white dark:bg-dark-200 rounded-lg shadow-xl border border-gray-200 dark:border-dark-400 z-50 overflow-hidden">
            <div className="p-3 border-b border-gray-200 dark:border-dark-400">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                Select Model
              </h3>
            </div>
            
            <div className="max-h-96 overflow-y-auto">
              {models.map(model => {
                const Icon = getModelIcon(model.id)
                const isSelected = model.id === selectedModel
                
                return (
                  <button
                    key={model.id}
                    onClick={() => {
                      setSelectedModel(model.id)
                      setIsOpen(false)
                    }}
                    className={`w-full text-left p-3 hover:bg-gray-50 dark:hover:bg-dark-300 transition-colors ${
                      isSelected ? 'bg-primary-50 dark:bg-primary-900/20' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Icon className={`w-5 h-5 mt-0.5 ${getModelColor(model.id)}`} />
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-gray-900 dark:text-gray-100">
                            {model.name}
                          </h4>
                          {model.badge && (
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              model.badge === 'Most Capable' 
                                ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'
                                : model.badge === 'Fastest'
                                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                            }`}>
                              {model.badge}
                            </span>
                          )}
                        </div>
                        
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                          {model.description}
                        </p>
                        
                        <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-500">
                          <div className="flex items-center gap-1">
                            <Gauge className="w-3 h-3" />
                            <span>{model.speed}</span>
                          </div>
                          <div>
                            Context: {model.contextWindow}
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ModelSelector;