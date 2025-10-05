import { Sparkles, Zap, Shield, MessageSquare } from 'lucide-react'
import { useChatContext } from '../../contexts/ChatContext'

const WelcomeScreen = () => {
  const { createNewConversation } = useChatContext()

  const features = [
    {
      icon: Sparkles,
      title: 'Advanced AI Models',
      description: 'Access to GPT-4, Claude, and other cutting-edge models'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Get instant responses with our optimized infrastructure'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your conversations are encrypted and never shared'
    },
    {
      icon: MessageSquare,
      title: 'Smart Context',
      description: 'Maintains conversation context for better responses'
    }
  ]

  const examplePrompts = [
    "Explain quantum computing in simple terms",
    "Help me write a Python script for data analysis",
    "Create a healthy meal plan for the week",
    "Brainstorm creative marketing ideas for a startup"
  ]

  const handlePromptClick = (prompt) => {
    const id = createNewConversation()
    // In a real app, we would send this prompt
    console.log('Starting conversation with:', prompt)
  }

  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-dark-100">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary-500 to-purple-600 rounded-2xl flex items-center justify-center text-white">
            <Sparkles className="w-10 h-10" />
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Welcome to AI Assistant
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Experience the power of advanced AI models. Ask questions, generate content, solve problems, and explore ideas with intelligent assistance.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white dark:bg-dark-200 rounded-xl border border-gray-200 dark:border-dark-400 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-lg flex items-center justify-center text-primary-600 dark:text-primary-400 flex-shrink-0">
                  <feature.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Example Prompts */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Try these examples
          </h2>
          <div className="grid gap-3">
            {examplePrompts.map((prompt, index) => (
              <button
                key={index}
                onClick={() => handlePromptClick(prompt)}
                className="text-left p-4 bg-white dark:bg-dark-200 rounded-lg border border-gray-200 dark:border-dark-400 hover:border-primary-500 dark:hover:border-primary-400 hover:shadow-md transition-all group"
              >
                <span className="text-gray-700 dark:text-gray-200 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {prompt}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={() => createNewConversation()}
            className="px-8 py-3 bg-gradient-to-r from-primary-500 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all"
          >
            Start New Conversation
          </button>
        </div>
      </div>
    </div>
  )
}

export default WelcomeScreen;