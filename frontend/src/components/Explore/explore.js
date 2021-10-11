import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';

import Header from '../Header/header';
import ImageHolder from '../ImageHolder/imageHolder';
import Footer from '../Footer/footer';

import { getAllImages } from '../../store/images';

import './explore.css'


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
                <div className="exploreHeader">
                    <h1>Explore</h1>
                </div>
                <div className="imagesContainer">
                    {images?.map(image => (
                        <ImageHolder key={image.id} image={image} />
                    ))}
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default ExplorePage;
