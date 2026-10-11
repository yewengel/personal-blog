import { atom } from 'jotai'

function loadBookmarks() {
  if (typeof window === 'undefined') {
    return []
  }

  try {
    const saved = localStorage.getItem('myBookmarks')
    const parsed = saved ? JSON.parse(saved) : []

    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export const bookmarksAtom = atom(loadBookmarks())

bookmarksAtom.onMount = (setAtom) => {
  if (typeof window === 'undefined') {
    return
  }

  const handleStorage = (event) => {
    if (event.key === 'myBookmarks') {
      try {
        const parsed = event.newValue
          ? JSON.parse(event.newValue)
          : []

        setAtom(Array.isArray(parsed) ? parsed : [])
      } catch {
        setAtom([])
      }
    }
  }

  window.addEventListener('storage', handleStorage)

  return () => {
    window.removeEventListener('storage', handleStorage)
  }
}

export const persistentBookmarksAtom = atom(
  (get) => get(bookmarksAtom),
  (get, set, update) => {
    const nextValue =
      typeof update === 'function'
        ? update(get(bookmarksAtom))
        : update

    set(bookmarksAtom, nextValue)

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(
          'myBookmarks',
          JSON.stringify(nextValue)
        )
      } catch (error) {
        console.error('Unable to save bookmarks:', error)
      }
    }
  }
)
