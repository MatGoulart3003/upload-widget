export function calculateProgress(uploaded: number, total: number): number {
  if (total === 0) return 0

  return Math.min(Math.round((uploaded * 100) / total), 100)
}
