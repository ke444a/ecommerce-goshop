interface IAuth {
    token: string;
}

interface ILoginCredentials {
    email: string;
    password: string;
}

interface IRegisterCredentials extends ILoginCredentials {
    fullName: string;
}

interface IRegisterWithGoogleCredentials {
    firebaseId: string;
    email: string;
    fullName: string;
}
