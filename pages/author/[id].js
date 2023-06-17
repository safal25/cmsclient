import AuthorLayout from "../../components/layouts/AuthorLayout";
import ProfileUpdate from "../../components/ProfileUpdate";

const UserProfile=()=>{

    return (
        <AuthorLayout>
            <ProfileUpdate page="user" />
        </AuthorLayout>
    );
}

export default UserProfile;