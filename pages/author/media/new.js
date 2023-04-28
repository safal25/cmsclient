import AuthorLayout from "../../../components/layouts/AuthorLayout"
import UploadImage from "../../../components/FeaturedImages/UploadImage";

const newpost=()=>{
    return (
        <AuthorLayout>

            <div style={{padding : '100px', textAlign : 'center'}}>
                <UploadImage page="author" redirectToLibrary={true} />
            </div>
            
        </AuthorLayout>
    );
}

export default newpost;