import React, { useEffect } from 'react'
import { useState } from 'react'
import { dummyPostsData } from '../assets/assets'
import Loading from '../components/Loading'
import Layout from './Layout'

const Feed = () => {
  <Layout/>
  const [feeds, setFeeds] = useState([])
  const [loading, seLoading] = useState(true)

  const fetchFeeds = async () => {
    setFeeds(dummyPostsData)
  }

  useEffect(() => {
    fetchFeeds()
  }, [])

  return !loading ? (
    <div className='h-full overflow-y-scroll no-scrollbar py-10 xl:pr-5 flex items-start justify-center xl:gap-8'>
      <Layout/>
      {/* Stories and Post List */}
      <div>
        <h1>Stories here</h1>
        <div>
          List of post
        </div>
      </div>
      {/* right side bar */}
      <div>
          
      </div>
    </div>
  ) : <Loading/>;
}

export default Feed