import { openDB, type DBSchema } from "idb"

interface TherapyNoteDB extends DBSchema {
  notes: {
    key: string
    value: {
      id: string
      name: string
      sections: any
      createdAt: string
      updatedAt: string
    }
  }
}

let dbPromise: Promise<any> | null = null

const getDB = () => {
  if (typeof window === "undefined") {
    return null
  }
  if (!dbPromise) {
    dbPromise = openDB<TherapyNoteDB>("therapyNoteDB", 1, {
      upgrade(db) {
        db.createObjectStore("notes", { keyPath: "id" })
      },
    })
  }
  return dbPromise
}

export const saveNote = async (note: TherapyNoteDB["notes"]["value"]) => {
  const db = await getDB()
  if (!db) return
  await db.put("notes", note)
}

export const getNote = async (id: string) => {
  const db = await getDB()
  if (!db) return null
  return await db.get("notes", id)
}

export const getAllNotes = async () => {
  const db = await getDB()
  if (!db) return []
  return await db.getAll("notes")
}

export const deleteNote = async (id: string) => {
  const db = await getDB()
  if (!db) return
  await db.delete("notes", id)
}

