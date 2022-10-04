import React from 'react'
import { FaArrowAltCircleLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'
const posts = [
  {
    id: 1,
    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
    desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!',
    img: 'https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 2,
    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
    desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!',
    img: 'https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    id: 3,
    title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
    desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!',
    img: 'https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
]
export const MiniPostMenu = () => {
  return (
    <>
      <hr />
      {/* <div className='d-flex flex-column mb-1'>
        <div className='p-2'>
          <h1 className='h1-mini'>Other posts you may like</h1>
        </div>
        <div className='p-2'>
          <div className='row align-items-start'>
            {posts.map((post) => (
              <div className='minipost col' key={post.id}>
                <img src={post.img} alt='' className='img-mini' />
                <h2 className='h2-mini'>{post.title}</h2>
                <div className='d-flex justify-content-end rgb'>
                  <button className='btn-mini'>Read more</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}
      <Link to={-1}>
        <button className='btn rgb btn-mini btn-primary'>
          <FaArrowAltCircleLeft style={{ paddingBottom: '4px' }} />
          Go back
        </button>
      </Link>
    </>
  )
}
