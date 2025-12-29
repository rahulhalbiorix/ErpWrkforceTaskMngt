export function useDateFormat() {
  /**
   * Format ISO date to: 10 Dec 2025, 08:42 PM
   */
  const formatDateTime = (
    date: string | Date | null,
    locale = 'en-IN'
  ): string => {
    if (!date) return '-'

    return new Intl.DateTimeFormat(locale, {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(new Date(date))
  }

  return {
    formatDateTime
  }
}