export interface Template {
  id: string
  name: string
  content: string
  category: string
  tags: string[]
  lastUsed: Date
  useCount: number
  isDefault: boolean
}

export interface PhraseRelationship {
  phrase1: string
  phrase2: string
  weight: number
  lastUsed: Date
  context: string[]
}

