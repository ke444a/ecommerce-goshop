interface IUser {
    firebaseId: string;
    email: string;
    fullName: string;
    role: "USER" | "ADMIN";
    avatar?: string | Blob;
}