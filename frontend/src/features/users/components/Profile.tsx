import UserForm from "./UserForm";

const Profile = () => {
    return (
        <div className="mt-4 p-5 bg-white drop-shadow-custom rounded-md animate-fadeIn">
            <h3 className="font-semibold text-xl sm:text-3xl mb-8">Profile Settings</h3>
            <UserForm />
        </div>
    );
};

export default Profile;