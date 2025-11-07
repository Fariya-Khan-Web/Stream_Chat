import { create } from "zustand"

export const useThemeStore = create((set) => ({
    theme: localStorage.getItem('Stream-theme') || 'business',
    setTheme: (theme) => {
        localStorage.setItem('Stream-theme', theme)
        set({ theme })
    }
})) 