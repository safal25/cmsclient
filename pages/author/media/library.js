import AuthorLayout from "../../../components/layouts/AuthorLayout"
import FeaturedImage from "../../../components/FeaturedImages/FeaturedImage"

const library=()=>{
    return (
        <AuthorLayout>
            <div>
                <FeaturedImage page="author"/>
            </div>
        </AuthorLayout>
    );
}

export default library;