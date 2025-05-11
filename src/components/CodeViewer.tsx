import React, { useState } from 'react'

type CodeViewerProps = {
  file: string
  maskedCode: string[]
  validatedInputs: Record<string, string>
  onValidation: (file: string, key: string, value: string) => void
}

export default function CodeViewer({ file, maskedCode, validatedInputs, onValidation }: CodeViewerProps) {
  const [userInputs, setUserInputs] = useState<Record<string, string>>({})

  const handleChange = (key: string, value: string) => {
    setUserInputs({ ...userInputs, [key]: value })
  }

  const handleValidation = (key: string, original: string) => {
    if (userInputs[key] === original) {
      onValidation(file, key, original)
      alert('Correto!')
    } else {
      alert('Tente novamente!')
    }
  }

  return (
    <div className="whitespace-pre font-mono bg-[#282a36] text-[#f8f8f2] p-4 rounded shadow mb-16 leading-loose">
      {maskedCode.map((line, i) => (
        <div key={i}>
          {line.split(/(__INPUT__\w+__)/g).map((part, j) => {
            if (part.startsWith('__INPUT__')) {
              const original = part.replace(/__INPUT__|__/g, '')
              const inputKey = `${i}-${j}`

              return validatedInputs[inputKey] ? (
                <span key={j} className="text-green-600">{original}</span>
              ) : (
                <span key={j}>
                  <input
                    value={userInputs[inputKey] || ''}
                    onChange={(e) => handleChange(inputKey, e.target.value)}
                    className="border-b border-gray-400 mx-1 w-32 text-yellow-500"
                  />
                  <button
                    className="ml-1 text-green-600 text-xl"
                    onClick={() => handleValidation(inputKey, original)}
                  >
                    ✓
                  </button>
                </span>
              )
            }
            return <span key={j}>{part}</span>
          })}
        </div>
      ))}
    </div>
  )
}