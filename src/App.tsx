import React, { useState } from 'react'
import { Plus, Minus, X, Divide, Equal } from 'lucide-react'

function App() {
  const [display, setDisplay] = useState('0')
  const [firstOperand, setFirstOperand] = useState<number | null>(null)
  const [operator, setOperator] = useState<string | null>(null)
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false)

  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplay(digit)
      setWaitingForSecondOperand(false)
    } else {
      setDisplay(display === '0' ? digit : display + digit)
    }
  }

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay('0.')
      setWaitingForSecondOperand(false)
      return
    }

    if (!display.includes('.')) {
      setDisplay(display + '.')
    }
  }

  const clear = () => {
    setDisplay('0')
    setFirstOperand(null)
    setOperator(null)
    setWaitingForSecondOperand(false)
  }

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(display)

    if (firstOperand === null) {
      setFirstOperand(inputValue)
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator)
      setDisplay(String(result))
      setFirstOperand(result)
    }

    setWaitingForSecondOperand(true)
    setOperator(nextOperator)
  }

  const calculate = (firstOperand: number, secondOperand: number, operator: string) => {
    switch (operator) {
      case '+':
        return firstOperand + secondOperand
      case '-':
        return firstOperand - secondOperand
      case '*':
        return firstOperand * secondOperand
      case '/':
        return firstOperand / secondOperand
      default:
        return secondOperand
    }
  }

  const Button = ({ onClick, children, className = '' }: { onClick: () => void, children: React.ReactNode, className?: string }) => (
    <button
      onClick={onClick}
      className={`w-16 h-16 m-1 text-xl font-bold rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
    >
      {children}
    </button>
  )

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4 text-right bg-gray-200 p-2 rounded">
          <span className="text-3xl">{display}</span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          <Button onClick={clear} className="col-span-2 bg-red-500 text-white hover:bg-red-600">AC</Button>
          <Button onClick={() => performOperation('/')} className="bg-gray-300 hover:bg-gray-400"><Divide size={24} /></Button>
          <Button onClick={() => performOperation('*')} className="bg-gray-300 hover:bg-gray-400"><X size={24} /></Button>
          {[7, 8, 9].map(num => (
            <Button key={num} onClick={() => inputDigit(num.toString())} className="bg-gray-200 hover:bg-gray-300">{num}</Button>
          ))}
          <Button onClick={() => performOperation('-')} className="bg-gray-300 hover:bg-gray-400"><Minus size={24} /></Button>
          {[4, 5, 6].map(num => (
            <Button key={num} onClick={() => inputDigit(num.toString())} className="bg-gray-200 hover:bg-gray-300">{num}</Button>
          ))}
          <Button onClick={() => performOperation('+')} className="bg-gray-300 hover:bg-gray-400"><Plus size={24} /></Button>
          {[1, 2, 3].map(num => (
            <Button key={num} onClick={() => inputDigit(num.toString())} className="bg-gray-200 hover:bg-gray-300">{num}</Button>
          ))}
          <Button onClick={() => performOperation('=')} className="bg-blue-500 text-white hover:bg-blue-600"><Equal size={24} /></Button>
          <Button onClick={() => inputDigit('0')} className="col-span-2 bg-gray-200 hover:bg-gray-300">0</Button>
          <Button onClick={inputDecimal} className="bg-gray-200 hover:bg-gray-300">.</Button>
        </div>
      </div>
    </div>
  )
}

export default App