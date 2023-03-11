//import 'antd/dist/reset.css';
import { ThemeProvider} from '../context/theme';
import { AuthProvider } from '../context/auth';
import { PostProvider } from '../context/post';
import { Toaster } from 'react-hot-toast';
import Navbar from '../components/Navbar';
import "../public/css/styles.css";

export default function MyApp({ Component, pageProps }) {
    
    return (
        <ThemeProvider>
            <AuthProvider>
                <PostProvider>
                    <Toaster />
                    <Navbar />
                    <Component {...pageProps} />
                </PostProvider>
            </AuthProvider>
        </ThemeProvider>
    );
    
};