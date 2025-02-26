export const validateNoteName = (name: string): boolean => {
  return name.trim().length > 0 && name.length <= 50
}

export const validateNoteContent = (content: string): boolean => {
  try {
    const parsedContent = JSON.parse(content)
    if (typeof parsedContent !== "object" || parsedContent === null) {
      return false
    }
    // Check if the content is not too large (e.g., 1MB)
    if (content.length > 1024 * 1024) {
      return false
    }
    return true
  } catch (error) {
    return false
  }
}

