export async function load<T>(key: string, fallback: T): Promise<T> {
  const data = await chrome.storage.sync.get(key)
  return (data?.[key] ?? fallback) as T
}
export async function save<T>(key: string, value: T) {
  await chrome.storage.sync.set({ [key]: value })
}
