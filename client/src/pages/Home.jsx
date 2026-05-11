import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import OfferBanner from "../components/OfferBanner";
import Brands from "../components/Brands";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";


function Home(){

    return(
        <>
            <Navbar />

            <Hero />

            <Categories />

            <OfferBanner />

            <Brands />

            <Newsletter />

            <Footer />
        </>
    );
}

export default Home;