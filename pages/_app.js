//import 'antd/dist/reset.css';
import { ThemeProvider} from '../context/theme';
import Navbar from '../components/Navbar';
import "../public/css/styles.css";

export default function MyApp({ Component, pageProps }) {
    
    return (
        <ThemeProvider>
            <Navbar />
            <Component {...pageProps} />
        </ThemeProvider>
    );
    
};