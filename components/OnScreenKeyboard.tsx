'use client'

import { useState } from 'react'
import Keyboard from 'react-simple-keyboard'
import 'react-simple-keyboard/build/css/index.css'

interface OnScreenKeyboardProps {
  value: string
  onChange: (value: string) => void
  onClose: () => void
}

export default function OnScreenKeyboard({ value, onChange, onClose }: OnScreenKeyboardProps) {
  const handleKeyPress = (button: string) => {
    if (button === '{bksp}') {
      onChange(value.slice(0, -1))
    } else if (button === '{space}') {
      onChange(value + ' ')
    } else if (button === '{enter}') {
      // Could trigger search or just close
      onClose()
    } else if (button === '{shift}' || button === '{lock}') {
      // Handle shift/caps lock if needed
    } else {
      onChange(value + button)
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 p-4">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-white text-2xl font-bold px-4 py-2"
      >
        ✕
      </button>
      <Keyboard
        onChange={onChange}
        onKeyPress={handleKeyPress}
        layout={{
          default: [
            'q w e r t y u i o p {bksp}',
            'a s d f g h j k l {enter}',
            'z x c v b n m {space}'
          ]
        }}
      />
    </div>
  )
}