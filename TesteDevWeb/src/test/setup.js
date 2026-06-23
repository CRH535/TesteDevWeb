import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

// limpo a renderização e o localStorage entre os testes
afterEach(() => {
  cleanup()
  localStorage.clear()
})
