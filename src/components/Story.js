import React, { useEffect } from 'react'
import StoryCard from './StoryCard'

function Story() {
    const data = [
        {
            "id": 1,
            "user_name": "Bach",
            "avatar_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1I642UzaVInHUzNaxWeu2Pf2-hvVZpX9FxA&usqp=CAU"
        },
        {
            "id": 1,
            "user_name": "Bach",
            "avatar_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1I642UzaVInHUzNaxWeu2Pf2-hvVZpX9FxA&usqp=CAU"
        },
        {
            "id": 1,
            "user_name": "Bach",
            "avatar_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1I642UzaVInHUzNaxWeu2Pf2-hvVZpX9FxA&usqp=CAU"
        },
        {
            "id": 1,
            "user_name": "Bach",
            "avatar_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1I642UzaVInHUzNaxWeu2Pf2-hvVZpX9FxA&usqp=CAU"
        },
        {
            "id": 1,
            "user_name": "Bach",
            "avatar_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1I642UzaVInHUzNaxWeu2Pf2-hvVZpX9FxA&usqp=CAU"
        },
        {
            "id": 1,
            "user_name": "Bach",
            "avatar_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1I642UzaVInHUzNaxWeu2Pf2-hvVZpX9FxA&usqp=CAU"
        },
        {
            "id": 1,
            "user_name": "Bach",
            "avatar_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1I642UzaVInHUzNaxWeu2Pf2-hvVZpX9FxA&usqp=CAU"
        },
        {
            "id": 1,
            "user_name": "Bach",
            "avatar_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1I642UzaVInHUzNaxWeu2Pf2-hvVZpX9FxA&usqp=CAU"
        },
        {
            "id": 1,
            "user_name": "Bach",
            "avatar_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1I642UzaVInHUzNaxWeu2Pf2-hvVZpX9FxA&usqp=CAU"
        },
        {
            "id": 1,
            "user_name": "Bach",
            "avatar_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1I642UzaVInHUzNaxWeu2Pf2-hvVZpX9FxA&usqp=CAU"
        },
        {
            "id": 1,
            "user_name": "Bach",
            "avatar_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1I642UzaVInHUzNaxWeu2Pf2-hvVZpX9FxA&usqp=CAU"
        },
        {
            "id": 1,
            "user_name": "Bach",
            "avatar_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1I642UzaVInHUzNaxWeu2Pf2-hvVZpX9FxA&usqp=CAU"
        },
        {
            "id": 1,
            "user_name": "Bach",
            "avatar_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1I642UzaVInHUzNaxWeu2Pf2-hvVZpX9FxA&usqp=CAU"
        }
    ]

    useEffect(() => {
    }, [])

    return (
        <div className='flex space-x-2 bg-white mt-8 p-6 border-gray-200 border rounded-sm overflow-x-scroll'>
            {data.map((profile) => {
                return <StoryCard key={profile.id} data={profile} />
            })}
        </div>
    )
}

export default Story