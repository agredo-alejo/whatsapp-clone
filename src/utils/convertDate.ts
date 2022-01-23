export const getTime = (dateObject: Date = new Date()) => {
    let hour = dateObject.getHours()
    let minutes = dateObject.getMinutes()
    let ampm = "a.m."
    if (hour > 12) {
        hour -= 12
        ampm = "p.m."
    }
    if(hour == 0) hour = 12

    return `${hour}:${minutes < 10? "0" + minutes : minutes} ${ampm}`
}
// export default getTime
export const getDate = (dateObject: Date = new Date()) => {
    let day = dateObject.getDate()
    let month = dateObject.getMonth()
    let months = ['January', 'February', 'March', 'Aril', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    return ` ${day} ${months[month]}`
}
