import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import { getAllImages } from '../../store/images';

import Header from '../Header/header';
import Footer from '../Footer/footer';
import ImageHolder from '../ImageHolder/imageHolder';

import './search.css';

function SearchResults() {
    const dispatch = useDispatch();
    const { searchParameters } = useParams();
    const images = useSelector(state => Object.values(state.images));

    const [isLoaded, setIsLoaded] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const [stopSearch, setStopSearch] = useState(false)

    useEffect(() => {
        dispatch(getAllImages()).then(() => setIsLoaded(true));
    }, [dispatch]);

    //This is needed if you want to run another search while on the Search page
    useEffect(() => {
        setStopSearch(false)
    }, [searchParameters])

    useEffect(() => {
        //This only runs once- once the images have been loaded
        if (isLoaded && !stopSearch) {
            //Use a set to remove duplicates
            const imageResults = new Set();

            //Remove spaces and commas from the search parameters
            const cleanParams = searchParameters.toLowerCase().split(/,| /)

            //Loop through all search parameters and images
            for (const searchParam of cleanParams) {
                for (const image of images) {
                    if (image?.description?.toLowerCase().includes(searchParam) || image?.title?.toLowerCase().includes(searchParam)) {
                        imageResults.add(image)
                    }
                }
            }

            //Spreat set back into an array to map over
            setSearchResults([...imageResults])

            //Stop searching
            setStopSearch(true)
        }

    },[isLoaded, searchParameters, stopSearch, images])

    return (
        <div className="container">
            <Header />
            <main>
                <div className="exploreHeader">
                    <h1>Search Results</h1>
                </div>
            {!isLoaded && (
                <div className="loadingContainer">
                    <h3>Loading Images</h3>
                    <img src="https://res.cloudinary.com/dt8q1ngxj/image/upload/v1634015808/soccr/soccerLoading_ngtigi.png" alt="Loading" />
                </div>
            )}
            {isLoaded && (
                <ul className="imagesContainer">
                    {searchResults.map(image => {
                        if (image.id) {
                            return <ImageHolder key={`image_${image.id}`} image={image} />
                        } else {
                            return null;
                        }
                    })}
                    <li id="emptyLi"></li>
                </ul>
            )}
            </main>
            <Footer />
        </div>
    )
}

export default SearchResults;
