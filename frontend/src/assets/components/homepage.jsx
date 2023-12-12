// HomePage.js
import React, { useState } from 'react';
import Menu from './Menu';
import './homepage.css';
import { AiOutlineSwapRight } from 'react-icons/ai';
import { MdLocationPin } from 'react-icons/md'; 
import { BsFillCreditCardFill} from 'react-icons/bs';
import { FaClock } from 'react-icons/fa';
import { BiSearchAlt} from 'react-icons/bi'
import Video from '../../assets/video.mp4';
import Middle from "../../assets/components/Middle/Middle";
import Footer from "../../assets/components/Footer/Footer";


const Coupon = ({ title, description, imageSrc }) => (
  <div className="coupon">
    {imageSrc && <img src={imageSrc} alt={title} />} {/* Conditionally render the image */}
    <h3>{title}</h3>
    <p>{description}</p>

    <button className="btn flex">
      Get Discount <AiOutlineSwapRight className="icon" />
    </button>
  </div>
);

const ReviewPreview = ({ author, text, imageSrc, onLikeClick, onDislikeClick }) => (
  <div className="review-preview">
    {imageSrc && <img src={imageSrc} alt={`${author}'s photo`} className="review-image" />}
    <p>{text}</p>

    <div className="interaction-buttons">
      <button onClick={onLikeClick}>
        <span role="img" aria-label="like-icon">
          👍
        </span>
      </button>
      <button onClick={onDislikeClick}>
        <span role="img" aria-label="dislike-icon">
          👎
        </span>
      </button>
    </div>
    <span>- {author}</span>
  </div>
);
const HomePage = () => {
  const [visibleReviews, setVisibleReviews] = useState(3);

  const handleSeeMoreClick = () => {
    setVisibleReviews(prevVisibleReviews => prevVisibleReviews + 3);
  };


  return (
    <div className="Home">
      <Menu />
      <div className="videoBg">
        <video src={Video} autoPlay loop muted></video>
      </div>
      <header className="header-content">
        <h1>Visitara <br />Unlock the Experience, <br />Embrace the Moment</h1>
        <p>Your Trusted Partner for Everything</p>
      </header>

      <section className="business-of-the-week">
  <div className='secContainer'>
    <span className="redText"> Business of the week</span>
    
    <img src="photos/stellar.jpeg" alt="Business of the Week" className="business-image" />
    <p className="business-week-text">
      Visit Stellar Coffee at 278a Wyndham Street, Shepparton and enjoy a delicious coffee in their inviting atmosphere.<br/> Sit. Sip. Stay.
    </p>
  </div>
  <div className="searchField grid">
  <div className="inputField flex">
    <MdLocationPin className="icon" /> 
    <div>278a Wyndham Street<br></br>Shepparton VIC<br></br>3630
    </div>
  </div>

  <div className="searchField grid">
    <div className="inputField flex">
      <BsFillCreditCardFill className="icon" /> 
      <div>$ Coffee & Tea, Breakfast & Brunch</div>
    </div>

    <div className="searchField grid">
      <div className="inputField flex">
        <FaClock className="icon" />
        <div>7:00 AM - 8:00 PM</div>
      </div>
    </div>
  </div>
</div>

<div className="btn-container flex-center">
  <button className='btn flex'><BiSearchAlt className='icon'/> Search</button>
</div>

              </section>

   
      <div className="categories">
  <h2>Categories</h2>
  <table className="category-table">
    <tbody>
      <tr>
      <td>
          <div className="icon-container">
            <img src="/photos/icons/icon1.png" alt="Category 5" />
            <p>Fast Food</p>
          </div>
        </td>
        <td>
          <div className="icon-container">
            <img src="/photos/icons/icon2.png" alt="Category 1" />
            <p>Fine Dining</p>
          </div>
        </td>
        <td>
          <div className="icon-container">
            <img src="/photos/icons/icon3.png" alt="Category 3" />
            <p>Pub</p>
          </div>
        </td>
        <td>
          <div className="icon-container">
            <img src="/photos/icons/icon4.png" alt="Category 2" />
            <p>Vegan</p>
          </div>
        </td>
        </tr>
      <tr>
        <td>
          <div className="icon-container">
            <img src="/photos/icons/icon5.png" alt="Category 4" />
            <p>Bakery</p>
          </div>
        </td>
        <td>
          <div className="icon-container">
            <img src="/photos/icons/icon6.png" alt="Category 6" />
            <p>Cafe</p>
          </div>
        </td>
        <td>
          <div className="icon-container">
            <img src="/photos/icons/icon7.png" alt="Category 7" />
            <p>Food Truck</p>
          </div>
        </td>
        <td>
          <div className="icon-container">
            <img src="/photos/icons/icon8.png" alt="Category 8" />
            <p>More</p>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</div>


      <section className="reviews">
        <h2>Recent Activity</h2>
        <div className="review-previews">
          {Array.from(Array(visibleReviews)).map((_, index) => (
            <ReviewPreview
              key={index}
              author={`Author`}
              text={`★★★★☆`}
              imageSrc={`/photos/img${index + 1}.jpeg`}
              onLikeClick={() => console.log(`Liked by Author ${index}`)}
              onDislikeClick={() => console.log(`Disliked by Author ${index}`)}
              
            />
          ))}
        </div>

        {visibleReviews < 8 && (
          <button className="see-more-btn" onClick={handleSeeMoreClick}>
            See More Activity
          </button>
        )}
      </section>

      <section className="promotions">
  <h2>Unlock Special Promotions</h2>
  <div className="promotions-container">
    <Coupon title="Special Dining Offer" description="Enjoy 20% off at top restaurants!" imageSrc="/photos/icons/special.jpeg" />
    <Coupon title="McDonalds" description="Get FREE Fries When the Raptors Score 12 Threes!!" imageSrc="/photos/icons/fries.jpeg" />
    <Coupon title="Crave Combo" description="XL 3-topping pizza with drinks/dips and get crave for 2 months on us" imageSrc="/photos/icons/crave.jpeg" />
  </div>
</section>

    


      <Middle />
      <Footer />
    </div>
    
  );
};

export default HomePage;
