import React, { createContext, useContext, useState } from 'react'

export type Currency = 'RON' | 'EUR' | 'USD'

interface CurrencyContextType {
  currency: Currency
  setCurrency: (c: Currency) => void
  formatPrice: (amountNumeric: number) => string
  symbol: string
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: 'RON',
  setCurrency: () => {},
  formatPrice: (amount: number) => `${Math.round(amount)} RON`,
  symbol: 'RON',
})

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>('RON')

  const setCurrency = (c: Currency) => {
    setCurrencyState(c)
  }

  const formatPrice = (amount: number): string => {
    const val = Math.round(Number(amount))
    return `${val} RON`
  }

  const symbol = 'RON'

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, symbol }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  return useContext(CurrencyContext)
}
