"use client"

import { createContext, useContext, useState } from "react"

const TabsContext = createContext({
  selectedTab: "",
  setSelectedTab: () => {},
})

export function Tabs({ defaultValue, children, ...props }) {
  const [selectedTab, setSelectedTab] = useState(defaultValue)

  return (
    <TabsContext.Provider value={{ selectedTab, setSelectedTab }}>
      <div {...props}>{children}</div>
    </TabsContext.Provider>
  )
}

export function TabsList({ className = "", ...props }) {
  return (
    <div
      className={`inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground ${className}`}
      {...props}
    />
  )
}

export function TabsTrigger({ value, className = "", ...props }) {
  const { selectedTab, setSelectedTab } = useContext(TabsContext)
  const isSelected = selectedTab === value

  return (
    <button
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
        isSelected ? "bg-background text-foreground shadow-sm" : "hover:bg-muted hover:text-foreground"
      } ${className}`}
      onClick={() => setSelectedTab(value)}
      {...props}
    />
  )
}

export function TabsContent({ value, className = "", ...props }) {
  const { selectedTab } = useContext(TabsContext)

  if (selectedTab !== value) {
    return null
  }

  return (
    <div
      className={`mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`}
      {...props}
    />
  )
}
