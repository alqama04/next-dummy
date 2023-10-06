'use client'

import Link from "next/link"
import { useState } from "react"

export default function Page() {
    const [location, setLocation] = useState([])

    async function getData() {
        let data = await fetch('http://localhost:3000/api/user')
        data = await data.json()
        if (data.result) {
            setLocation(data.result)
        }
    }


    console.log(location)
    return (
        <>
            <h2>All Locations</h2>
            <div className="userBox">
                <button onClick={getData}>get Locations </button>
                <div>
                <br/>
                
                    <Link href='/'>Home</Link>
                </div>
                {
                    location.length ? location.map((item, key) => {
                        return (
                            <div key={key} className="locateBox">
                                <p>Latitude : {item.latitude}</p>
                                <p>logitude : {item.long}</p>
                                <p>Username : {item.name}</p>
                            </div>
                        )
                    })
                        : <div>
                            <br />
                            <br />
                            <p> <b>No Location Found</b></p>
                        </div>
                }


            </div>
        </>
    )

}