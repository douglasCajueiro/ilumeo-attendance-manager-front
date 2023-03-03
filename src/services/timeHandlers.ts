export const formatDateDDMMYY = (date: Date) => {
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear().toString().slice(-2)
    return `${day >= 10 ? day : "0" + day}/${month >= 10 ? month : "0" + month}/${year}`
}

export const calculateWorkDayTime = (startTime: Date, endTime: Date) => {
    const elapsedMiliseconds = endTime.getTime() - startTime.getTime()
    const inMinutes = (elapsedMiliseconds / 1000) / 60
    if (inMinutes < 10) return `0h 0${Math.floor(inMinutes)}m`
    if (inMinutes < 60) return `0h ${Math.floor(inMinutes)}m`
    const totalHours = Math.floor(inMinutes / 60)
    const totalMinutes = Math.floor(inMinutes - (totalHours * 60))
    const getTotalMinutes = totalMinutes < 10 ? "0" + totalMinutes : totalMinutes
    return `${totalHours}h ${getTotalMinutes}m`
}