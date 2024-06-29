export function getGreetings(): string {
  const now = new Date()
  const hour = now.getHours()

  let mensaje
  if (hour >= 6 && hour < 12) {
    mensaje = 'Good morning'
  } else if (hour >= 12 && hour < 18) {
    mensaje = 'Good afternoon'
  } else {
    mensaje = 'Good night'
  }
  return mensaje
}
