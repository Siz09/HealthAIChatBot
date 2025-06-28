export const formatDate = (date) => {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    }
    return date.toLocaleDateString("en-US", options)
  }
  
  export const formatRelativeDate = (date) => {
    const now = new Date()
    const diffTime = now - date
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  
    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Yesterday"
    if (diffDays < 7) return `${diffDays} days ago`
  
    return formatDate(date)
  }
  
  export const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    )
  }
  
  export const getStartOfDay = (date) => {
    const start = new Date(date)
    start.setHours(0, 0, 0, 0)
    return start
  }
  
  export const getEndOfDay = (date) => {
    const end = new Date(date)
    end.setHours(23, 59, 59, 999)
    return end
  }
  