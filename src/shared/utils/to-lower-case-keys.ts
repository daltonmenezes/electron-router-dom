export function toLowerCaseKeys<T extends Record<string, unknown>>(
  target: T
): T {
  const transformedObject = Object.keys(target).reduce(
    (acc, key) => ({
      ...acc,
      [key.toLowerCase()]: target[key],
    }),
    {}
  )

  return transformedObject as T
}
