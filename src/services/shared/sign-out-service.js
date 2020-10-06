export const signOutServices = {
    signOut,
};

function signOut() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}