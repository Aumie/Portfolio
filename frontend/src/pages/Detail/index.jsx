import React from 'react'
import { ThreeColumns } from '../../layout'
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import { MiniPostMenu } from '../../components/ui/MiniPostMenu'
import { useState } from 'react'
import { useEffect } from 'react'
import { axiosInstance } from '../../utils'
import moment from 'moment'
import { Loading } from '../../components/ui/Loding'
import parse from 'html-react-parser'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.bubble.css'
import './index.scss'
export const Detail = () => {
  const { slug } = useParams()
  const [data, setData] = useState({ post: [] })

  const handleDelete = async () => {
    axiosInstance.delete(`blogs/post/${slug}`)
    // .then((res) => console.log(res))
  }
  const setdata = async () => {
    await axiosInstance.get(`blogs/post/${slug}`).then((res) => {
      setData({ post: res.data })
      // console.log(res.data)
    })
  }

  useEffect(() => {
    setdata()
  }, [setData])

  if (data.post.author === undefined) {
    return <Loading />
  }
  return (
    <ThreeColumns>
      <div className='detail-page'>
        <div className='content'>
          {data.post.cover_image && (
            <img
              className='img-cover'
              src={data.post.cover_image}
              alt=''
              style={{ width: '760px', height: '300px' }}
            />
          )}
          <div className='user'>
            <img
              src={
                data.post.author.user_image
                  ? data.post.author.user_image
                  : '/images/user.jpg'
              }
              alt='user-img'
            />
            <div className='info'>
              <span>{data.post.author.name}</span>
              <p>
                Last update:&nbsp;
                {moment(data.post.updated_at).utc().local().fromNow()}
                <br />
                Posted on:&nbsp;
                {moment(data.post.updated_at)
                  .utc()
                  .local()
                  .subtract('days')
                  .calendar()}
              </p>
            </div>
            {localStorage.getItem('user') && (
              <div className='edit'>
                <Link to={'edit'}>
                  <FaPencilAlt className='icon' />
                </Link>
                <Link to={-1} onClick={handleDelete}>
                  <FaTrashAlt className='icon' />
                </Link>
              </div>
            )}
          </div>
          <h1>{data.post.title}</h1>
          {data.post.content && parse(data.post.content)}
          {/* <ReactQuill
            value={data.post.content}
            readOnly={true}
            theme={'bubble'}
          /> */}
          {/* <div dangerouslySetInnerHTML={{ __html: data.post.content }}></div> */}
        </div>
      </div>
      <MiniPostMenu />
    </ThreeColumns>
  )
}
