import React from 'react'

function StoryCard({data}) {

  return (
    <div>
        <img className='h-14 w-14 rounded-full p-[1px] border-red-500 border-2 object-fill cursor-pointer hover:scale-110 transition transform duration-200 ease-out scrollbar-thin scrollbar-thumb-black' src={data.avatar_url}/>
        <p className='text-xs w-14 truncate text-center'>{data.user_name}</p>
    </div>
  )
}

export default StoryCard