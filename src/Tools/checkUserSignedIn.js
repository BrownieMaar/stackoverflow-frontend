export const isUserSignedIn = () => {
    return !!window.currentUser
}

export const getSignedInUserObject = () => {
    return window.currentUser
}

export const setSignedInUser = userDTO => {
    window.currentUser = userDTO;
}