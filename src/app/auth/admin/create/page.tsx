'use client'

import { useState } from 'react'

export default function CreateAdminPage() {
  const [status, setStatus] = useState<string>('')

  const handleCreateAdmin = async () => {
    try {
      const response = await fetch('/api/create-admin', {
        method: 'POST',
      })
      const data = await response.json()
      setStatus(`Result: ${JSON.stringify(data, null, 2)}`)
    } catch (error) {
      setStatus(`Error: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Create Admin User</h1>
      <button
        onClick={handleCreateAdmin}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Create Admin User
      </button>
      <pre className="mt-4 p-4 bg-gray-100 rounded">
        {status}
      </pre>
    </div>
  )
} 