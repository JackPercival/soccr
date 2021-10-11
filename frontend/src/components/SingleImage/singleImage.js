import { useParams } from 'react-router-dom';
import Header from '../Header/header';
import Footer from '../Footer/footer';

function SingleImage() {
    const { imageId } = useParams();
    console.log(imageId)

    return (
        <div className="container">
            <Header />
            <main>
                <h1>Single Image {imageId}</h1>
            </main>
            <Footer />
        </div>
    )
}

export default SingleImage;
