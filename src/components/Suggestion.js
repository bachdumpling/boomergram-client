import React, { useEffect, useState } from 'react'
import { faker } from '@faker-js/faker';
// import faker from 'faker'

function Suggestion() {
  const [suggestion, setSuggestion] = useState([])

  useEffect(() => {
    const suggestions = [...Array(5)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i
    }))
    setSuggestion(suggestions)
  }, [])

  return (
    <div className='mt-4 ml-10'>
      <div className='flex justify-between text-sm mb-5'>
        <h3 className='text-sm font-bold text-gray-400'>Suggestion for you</h3>
        <button className='text-gray-600 font-semibold'>See All</button>
      </div>
    </div>
  )
}

export default Suggestion