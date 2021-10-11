import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../Header/header';
import { NavLink, Link } from 'react-router-dom';
import { getAllImages } from '../../store/images';

import Footer from '../Footer/footer';

function ExplorePage() {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const images = useSelector(state => Object.values(state.images));


    useEffect(()=> {
        dispatch(getAllImages());
    }, [dispatch]);

    return (
        <div className="container">
            <Header />
            <main>
                <h1>Explore</h1>
                {images.map(image => (
                    <NavLink to={`/images/${image.id}`}>{image.title}</NavLink>
                ))}
                {/* <p>{images[1]?.id}</p>
                <p>{images[1]?.title}</p>
                <p>{images[1]?.image_url}</p> */}
            </main>
            <Footer />
        </div>
    )
}

export default ExplorePage;
