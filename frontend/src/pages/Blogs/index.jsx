import React, { Fragment, useRef } from 'react'
import { useState } from 'react'
import items from './data'
import './index.css'
import { Categories } from './Category'
import { Post } from './Post'
import { ThreeColumns } from '../../layout'
import { useEffect } from 'react'
import { axiosInstance } from '../../utils'
import { Link, useSearchParams } from 'react-router-dom'

const mainUrl = '/blogs/post/'
const tagUrl = 'blogs/tag/'
export const Blogs = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useState([])
  const [tags, setTags] = useState([])
  const [page, setPage] = useState(1)
  const [isNext, setNext] = useState(null)
  const [query, setQuery] = useState('')
  const [querypub, setQueryPub] = useState('')
  const mounted = useRef(false)
  const [newPosts, setNewPosts] = useState(false)
  const [draftFlag, setDraftFlag] = useState(false)

  let res
  let url = `${mainUrl}`
  const fetchPosts = async () => {
    setLoading(true)
    const urlPage = `?page=${page}`
    const urlQuery = `&tags=${query}`
    const urlPub = `&published=${querypub}`
    if (query || querypub) {
      url = `${mainUrl}${urlPage}${urlPub}${urlQuery}`
    } else {
      url = `${mainUrl}${urlPage}`
    }
    try {
      const restag = await axiosInstance.get(tagUrl)
      setTags(restag.data)
      res = await axiosInstance.get(url)
      setPosts((oldPosts) => {
        setNext(res.data.next)
        if (page === 1) {
          return res.data.results
        } else {
          return [...oldPosts, ...res.data.results]
        }
      })

      setNewPosts(false)
      setLoading(false)
    } catch (error) {
      setNewPosts(false)

      setLoading(false)
    }
  }
  useEffect(() => {
    if (searchParams.get('tags') == undefined) {
      fetchPosts()
    }
  }, [page])
  useEffect(() => {
    if (searchParams.get('tags') == undefined) {
      setPage(1)
      fetchPosts()
    }
  }, [query, querypub])
  useEffect(() => {
    document.title = "Aum Peerapat"
    if (searchParams.get('tags') != undefined) {
      setPage(1)
      setNext(null)
      setQuery(searchParams.get('tags'))
      setSearchParams('')
    }
  }, [])

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    if (!newPosts) return
    if (loading) return
    if (isNext != null) setPage((oldPage) => oldPage + 1)
  }, [newPosts, query, querypub])

  const event = () => {
    if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
      setNewPosts(true)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', event)
    return () => window.removeEventListener('scroll', event)
  }, [])

  const handleClickTags = (tag) => {
    setQuery((oldtag) => {
      if (tag == 'All') {
        setQuery('')
        setQueryPub('')
        return ''
      }
      if (oldtag == '') return tag
      if (oldtag.includes(tag))
        return oldtag
          .split(',')
          .filter((item) => item != tag)
          .join(',')
      // console.log(oldtag)
      return `${oldtag},${tag}`
    })
    if (!query) return
    if (page === 1) {
      fetchPosts()
    }
    setPage(1)
  }

  const handleDraft = (e) => {
    e.preventDefault()
    setDraftFlag(!draftFlag)
    if (draftFlag) {
      setQueryPub('False')
      if (!query) return
      if (page === 1) {
        fetchPosts()
      }
      setPage(1)
    } else setQueryPub('')
  }
  return (
    <ThreeColumns>
      <main>
        <section className='section'>
          <div className='title'>
            <h2>Blog</h2>
            <div className='underline'></div>
            {localStorage.getItem('user') && (
              <>
                <Link to={'post/write'}>
                  <span
                    className='rgb'
                    style={{ color: '#A3C', marginRight: '5px' }}
                  >
                    Write
                  </span>
                </Link>
                <a href='' onClick={handleDraft}>
                  <span
                    className={querypub && 'rgb'}
                    style={{ color: 'var(--clr-font)', marginLeft: '5px' }}
                  >
                    Draft
                  </span>
                </a>
              </>
            )}
          </div>
          <Categories tags={tags} clickTags={handleClickTags} query={query} />
          <div className='section-center'>
            <article>
              {posts.map((post, index) => {
                return (
                  <React.Fragment key={index}>
                    <Post post={post} /> <br />
                  </React.Fragment>
                )
              })}
              {loading && <h2 className='loading'>Loading...</h2>}
              {!isNext && !loading?<h4>No more older posts...</h4>:null}
            </article>
          </div>
        </section>
      </main>
    </ThreeColumns>
  )
}
