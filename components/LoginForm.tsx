'use client'

import React, { useState } from 'react'

// Message that shows just before error message from login
const LOGIN_FAILED_PRE_MESSAGE = 'Login Failed'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [loginMessage, setLoginMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const validateEmail = (email: string) => {
    // Regular expression for validation comes from here:
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/email#validation
    const re =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    return re.test(email.toLowerCase())
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailVal = e.target.value
    setEmail(emailVal)

    // If email is not valid, set an error message
    if (!validateEmail(emailVal)) {
      setEmailError('Please enter a valid email address')
    } else {
      setEmailError('')
    }
  }

  const validatePassword = (password: string) => {
    return password.length > 0
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordVal = e.target.value
    setPassword(passwordVal)

    // If password is not valid, set an error message
    if (!validatePassword(passwordVal)) {
      setPasswordError('Password cannot be empty')
    } else {
      setPasswordError('')
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Reset messages
    setEmailError('')
    setPasswordError('')
    setLoginMessage('')

    // Check for empty fields and set errors accordingly
    if (!email || !password) {
      if (!email) {
        setEmailError('Email cannot be empty')
      }
      if (!password) {
        setPasswordError('Password cannot be empty')
      }
      return // Stop the function if there are empty inputs
    }

    // Start loading
    setIsLoading(true)

    if (!emailError && !passwordError && email && password) {
      try {
        const response = await fetch('https://reqres.in/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        })
        const data = await response.json()
        // Check to see if response failed
        if (response.ok) {
          setLoginMessage('Login successful!')
          console.log(data)
        } else {
          throw new Error(data.error || 'An error occurred. Please try again.')
        }
      } catch (error: any) {
        console.error('Login failed:', error)
        setLoginMessage(`${LOGIN_FAILED_PRE_MESSAGE}: ${error.message}`)
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        {emailError && (
          <p className="mt-2 text-sm text-red-600">{emailError}</p>
        )}
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        {passwordError && (
          <p className="mt-2 text-sm text-red-600">{passwordError}</p>
        )}
      </div>
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Log in
        </button>
      </div>
      {isLoading && (
        <div className="flex justify-center items-center">
          {/* Loading spinner obtained from https://flowbite.com/docs/components/spinner/ */}

          <div role="status">
            <svg
              aria-hidden="true"
              className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
      {loginMessage && (
        <div
          className={`text-sm ${
            loginMessage.startsWith(LOGIN_FAILED_PRE_MESSAGE)
              ? 'text-red-600'
              : 'text-green-600'
          }`}
        >
          <p>{loginMessage}</p>
        </div>
      )}
    </form>
  )
}

export default LoginForm
