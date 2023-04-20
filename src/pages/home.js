import React from 'react';
import Card from "../components/card.js";
import Welcome from '../components/welcome.js';

const Home = () => {
    return (
   <>
   <Welcome/>
   <Card 
   className="home-page"
   hdrcolor="#ACADAF"
   hdrtext="black"
   bodycolor="#40485d"
   bodytext="white"
   header="Welcome to Sushma's Bank"
   title="Banking Made Easy"
   text="For all your internet Bankings needs!"
   body={( <div className='d-flex justify-content-center align-items-center'>
   <img src="bank.png" 
           className="d-flex justify-content-center img-fluid w-75" 
           alt="Bank"/>
   </div>)}
   />
   </>
    );
}
export default Home;