import { useState, useEffect, useRef } from 'react'

export const useTypingEffect = (text, speed = 30, enabled = true) => {
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const indexRef = useRef(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (!enabled) {
      setDisplayedText(text)
      return
    }

    if (!text) {
      setDisplayedText('')
      return
    }

    setIsTyping(true)
    setDisplayedText('')
    indexRef.current = 0

    intervalRef.current = setInterval(() => {
      if (indexRef.current < text.length) {
        const nextChar = text[indexRef.current]
        setDisplayedText(prev => prev + nextChar)
        indexRef.current++
      } else {
        clearInterval(intervalRef.current)
        setIsTyping(false)
      }
    }, speed)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [text, speed, enabled])

  const skipTyping = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    setDisplayedText(text)
    setIsTyping(false)
  }

  return {
    displayedText,
    isTyping,
    skipTyping
  }
}

// Hook for simulating typing with word-by-word effect
export const useWordTypingEffect = (text, wordsPerSecond = 5, enabled = true) => {
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const wordIndexRef = useRef(0)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (!enabled) {
      setDisplayedText(text)
      return
    }

    if (!text) {
      setDisplayedText('')
      return
    }

    const words = text.split(' ')
    setIsTyping(true)
    setDisplayedText('')
    wordIndexRef.current = 0

    const delay = 1000 / wordsPerSecond

    intervalRef.current = setInterval(() => {
      if (wordIndexRef.current < words.length) {
        const nextWord = words[wordIndexRef.current]
        setDisplayedText(prev => {
          const separator = prev ? ' ' : ''
          return prev + separator + nextWord
        })
        wordIndexRef.current++
      } else {
        clearInterval(intervalRef.current)
        setIsTyping(false)
      }
    }, delay)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [text, wordsPerSecond, enabled])

  const skipTyping = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    setDisplayedText(text)
    setIsTyping(false)
  }

  return {
    displayedText,
    isTyping,
    skipTyping
  }
}

// Hook for cursor blinking effect
export const useCursorBlink = (enabled = true, blinkSpeed = 500) => {
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    if (!enabled) {
      setShowCursor(false)
      return
    }

    const interval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, blinkSpeed)

    return () => clearInterval(interval)
  }, [enabled, blinkSpeed])

  return showCursor
}