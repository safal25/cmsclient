import AuthorLayout from "../../../components/layouts/AuthorLayout";
//import TextEditor from "../../../components/TextEditor";
import NewPostComponent from "../../../components/PostComponents/NewPostComponent";

const newpost=()=>{

    return (
        <AuthorLayout>
            <NewPostComponent page="author"/>
        </AuthorLayout>
    )
}

export default newpost;