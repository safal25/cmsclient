//import 'antd/dist/reset.css';
import { ThemeProvider} from '../context/theme';
import { AuthProvider } from '../context/auth';
import { Toaster } from 'react-hot-toast';
import Navbar from '../components/Navbar';
import "../public/css/styles.css";

export default function MyApp({ Component, pageProps }) {
    
    return (
        <ThemeProvider>
            <AuthProvider>
                <Toaster />
                <Navbar />
                <Component {...pageProps} />
            </AuthProvider>
        </ThemeProvider>
    );
    
};