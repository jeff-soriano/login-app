/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import LoginForm from '../../../components/LoginForm'

// Mock the global fetch function
global.fetch = jest.fn()

describe('LoginForm', () => {
  test('it shows error messages when input fields are empty', async () => {
    render(<LoginForm />)
    fireEvent.click(screen.getByRole('button', { name: /log in/i }))
    expect(
      await screen.findByText(/Email cannot be empty/i)
    ).toBeInTheDocument()
    expect(
      await screen.findByText(/Password cannot be empty/i)
    ).toBeInTheDocument()
  })

  test('clicking submit does not fetch the api when there are errors', async () => {
    render(<LoginForm />)
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'not-an-email' },
    })
    fireEvent.click(screen.getByRole('button', { name: /log in/i }))
    expect(global.fetch).not.toHaveBeenCalled()
  })

  test('trying to log in with incorrect credentials shows error message', async () => {
    ;(global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ error: 'Incorrect credentials' }),
      })
    )

    render(<LoginForm />)
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'user@example.com' },
    })
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'wrong-password' },
    })
    fireEvent.click(screen.getByRole('button', { name: /log in/i }))

    await waitFor(() => {
      expect(
        screen.getByText(/Login failed: Incorrect credentials/i)
      ).toBeInTheDocument()
    })
  })

  test('trying to log in with correct credentials shows success message', async () => {
    ;(global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ token: '12345' }),
      })
    )

    render(<LoginForm />)
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'user@example.com' },
    })
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'correct-password' },
    })
    fireEvent.click(screen.getByRole('button', { name: /log in/i }))

    await waitFor(() => {
      expect(screen.getByText(/Login successful!/i)).toBeInTheDocument()
    })
  })
})
