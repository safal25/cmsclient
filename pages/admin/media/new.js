import AdminLayout from "../../../components/layouts/AdminLayout"
import UploadImage from "../../../components/FeaturedImages/UploadImage";

const newpost=()=>{
    return (
        <AdminLayout>

            <div style={{padding : '100px', textAlign : 'center'}}>
                <UploadImage redirectToLibrary={true} />
            </div>
            
        </AdminLayout>
    );
}

export default newpost;