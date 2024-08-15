const baseUrl = import.meta.env.VITE_BASE_URL as string

export async function fetchData<T>(
  endpoint: string,
  params?: Record<string, string>,
  options?: RequestInit
): Promise<T> {
  // Construct URL with query parameters
  const url = new URL(`${baseUrl}${endpoint}`)
  if (params) {
    Object.entries(params).forEach(([key, value]) =>
      url.searchParams.append(key, value)
    )
  }

  // Make the fetch request
  const response = await fetch(url.toString(), options)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  // Parse and return the JSON response
  return response.json()
}
