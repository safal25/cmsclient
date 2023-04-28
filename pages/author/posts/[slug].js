import AuthorLayout from "../../../components/layouts/AuthorLayout";
import EditPostComponent from "../../../components/PostComponents/EditPostComponent";


const editPostAuthor = ()=>{

    return (
        <AuthorLayout>
            <EditPostComponent page="author"/>
        </AuthorLayout>
    )
}

export default editPostAuthor;