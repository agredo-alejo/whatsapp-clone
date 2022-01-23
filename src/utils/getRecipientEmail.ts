const getRecipientEmail = (users: any[], userLoggedIn: any) => {
    return users.filter(email => email !== userLoggedIn?.email)[0]
}
export default getRecipientEmail