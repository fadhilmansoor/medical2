import React, { Fragment } from 'react'
import Header from "@/layout/Header";
import Footer from "@/layout/Footer";
import Gallery from './_components/Gallery';
import { headerdata } from '@/constant/alldata';

const GalleryPage = () => {
    return (
        <Fragment>
            <Header />
           
            <Gallery />
            <Footer />
        </Fragment>
    )
}

export default GalleryPage
