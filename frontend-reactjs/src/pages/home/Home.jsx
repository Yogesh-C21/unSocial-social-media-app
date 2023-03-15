import React, { Fragment } from 'react';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import './Home.css';

function Home() {
    return (
        <>
            <Topbar />
            <div className="homeContainer">
                <Sidebar />
                <Feed home={true}/>
                <Rightbar home={true} />
            </div>
        </>
    );
}

export default Home;
