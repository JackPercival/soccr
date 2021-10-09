import React, { useState, useEffect } from 'react';
import Header from '../Header/header';
import * as sessionActions from '../../store/session';
import { NavLink, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Footer from '../Footer/footer';

function ExplorePage() {
    const sessionUser = useSelector(state => state.session.user);
    console.log(sessionUser, "*********")

    
    return (
        <div className="container">
            <Header />
            <main>
                <h1>Explore Page</h1>
            </main>
            <Footer />
        </div>
    )
}

export default ExplorePage;
