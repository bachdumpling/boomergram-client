import React, { useState } from 'react'
import Feed from './Feed'
import Modal from './Modal';

function Home({user}) {

    return (
        <div className="bg-gray-50 h-screen overflow-y-scroll scroll-bar-hide">
            <div>
                {/* Feed */}
                <Feed user={user} />
                
            </div>
        </div>
    )
}

export default Home