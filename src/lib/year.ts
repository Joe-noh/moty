export function currentYear() {
  const now = new Date()

  if (now.getMonth() === 0) {
    return now.getFullYear() - 1
  } else {
    return now.getFullYear()
  }
}
