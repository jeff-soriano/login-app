'use client'

import React, { useState } from 'react'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const validateEmail = (email: string) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
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
    return password.length === 0
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
        console.log(data)
      } catch (error) {
        console.error('Login failed:', error)
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
    </form>
  )
}

export default LoginForm
