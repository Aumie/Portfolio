import { useEffect, useRef, useState } from 'react'
import { FaRegArrowAltCircleLeft } from 'react-icons/fa'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { Loading } from '../../components/ui/Loding'
import { ThreeColumns } from '../../layout'
import { axiosInstance } from '../../utils'
import { Editor } from './Editor'
import QuillEditor from './Editor3'
import moment from 'moment'
import './index.css'
import { Editor2 } from './Editor2'
const tagState = { name: '' }
const errState = { error: '' }
var timeoutHandle
export const Write = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const inputCoverImage = useRef(null)
  const [tags, setTags] = useState([])
  const [post, setPost] = useState({})
  const [postMsg, setPostMsg] = useState('')
  /////////// cover image ///////////////////
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)

  ////////////////////////////////
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const { slug } = useParams(undefined)
  const [err, setErr] = useState(null)
  const [lastUpdateLabel, setLastUpdateLabel] = useState('')
  /////////////// Tag////////////////////////////////
  const [tagInputBox, setTagInputBox] = useState(tagState)
  const [tagMsg, setTagMsg] = useState('')
  const [tagEventFlag, setTagEventFlag] = useState(false)
  const tagInputRef = useRef()
  const tagCheckRef = useRef([])
  const handletagInputBox = (e) => {
    setTagInputBox((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const fetchData = async (t, p) => {
    if (p) {
      const fetchPost = async () => {
        const resp = await axiosInstance.get(`/blogs/post/${slug}/`)
        setPost(resp.data)
      }
      fetchPost()
    }
    if (t) {
      const fetchTag = async () => {
        const rest = await axiosInstance.get('/blogs/tag/')
        setTags(rest.data)
      }
      fetchTag()
    }
    setLoading(false)
    setTagEventFlag(false)
  }
  /////////////////////////////// handleClicks//////////////////
  const handleTagSubmit = async (e) => {
    e.preventDefault()
    setTagEventFlag(true)
    //reset timeout for msg
    clearTimeout(timeoutHandle)
    if (tagInputBox.name == '') {
      setTagMsg('Tag name must be filled!')
      return
    }
    try {
      await axiosInstance.post('/blogs/tag/', tagInputBox)
      setTagInputBox(tagState)
      tagInputRef.current.value = ''
      setTagMsg('Tag has been created.')
      setTagEventFlag(false)
    } catch (e) {
      setErr(e.response.data)
      setTagMsg(e.response.data.error)
    }
  }
  const handleTagDelete = async (e) => {
    e.preventDefault()
    //reset timeout for msg
    clearTimeout(timeoutHandle)
    setTagEventFlag(true)
    tagInputRef.current.value = ''
    const deleteTags = async (id) => {
      try {
        await axiosInstance.delete(`/blogs/tag/${id}/`)
        setTagInputBox(tagState)
      } catch (e) {
        setErr(e.response.data)
        setTagMsg(e.response.data.error)
      }
      setTagMsg('Tag has been deleted.')

      setTagEventFlag(false)
    }
    // name = index, id = tag.id for tagCheckRef
    tags.map((tag, index) => {
      if (tagCheckRef.current[index].checked) {
        deleteTags(tagCheckRef.current[index].id)
        //then uncheck the box at the same index
        tagCheckRef.current[index].checked = false
      }
    })
  }
  const handleTagCheck = (e) => {
    // console.log(e.target.id, tagCheckRef.current[e.target.name].checked)
    // console.log(e.target.id, tagCheckRef.current[e.target.name].checked)
    // console.log(tagCheckRef.current[0].checked)
    // tagCheckRef.current[e.target.name].checked =
    //   !tagCheckRef.current[e.target.name].checked
    // setCheckBoxList((oldlist) => [
    //   ...oldlist,
    //   ...oldlist.filter((obj) => {
    //     obj.id != e.target.id
    //   }),
    // ])
  }
  ////////////////////// Posting ////////////////////////////
  const handleUpdate = async (e) => {
    e.preventDefault()

    let r1,
      r2,
      r3,
      r4 = null

    if (title != post.title) {
      try {
        r4 = await axiosInstance.patch(`/blogs/post/${slug}/`, {
          title: title,
        })
        navigate(`/blog/post/${title.toLowerCase().split(' ').join('-')}/edit`)
        // navaigate(0)
      } catch (error) {
        setPostMsg(error.response.data.title)
        return
      }
    }
    if (image) {
      const body = new FormData()
      body.append('cover_image', image)
      // console.log(image)
      axiosInstance.defaults.headers.common['Content-Type'] =
        'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
      r1 = await axiosInstance.patch(`/blogs/post/${slug}/`, body)
    }

    setTagEventFlag(true)
    const updateTags = async (pl) => {
      try {
        // clear old tags
        await axiosInstance.patch(`/blogs/post/${slug}/`, { tags: [] })
        // add tags
        await axiosInstance.patch(`/blogs/post/${slug}/`, pl)
      } catch (e) {
        setErr(e.response.data)
        setTagMsg(e.response.data.error)
      }
      setTagMsg('')
      setTagEventFlag(false)
    }

    // name = index, id = tag.id for tagCheckRef
    let tags_payload = []
    tags.map((tag, index) => {
      if (tagCheckRef.current[index].checked) {
        tags_payload.push({ name: tagCheckRef.current[index].value })
      }
    })
    // console.log(tags_payload)
    let payload = { tags: tags_payload }
    let checkp = payload.tags.map((t) => t.name)
    let checkpt = post.tags.map((t) => t.name).sort()
    function arraysEqual(a1, a2) {
      /* WARNING: arrays must not contain {objects} or behavior may be undefined */
      return JSON.stringify(a1) == JSON.stringify(a2)
    }
    if (!arraysEqual(checkp, checkpt)) updateTags(payload)

    if (content != post.content) {
      r2 = await axiosInstance.patch(`/blogs/post/${slug}/`, {
        content: content,
      })
    }
    if (desc != post.desc) {
      r3 = await axiosInstance.patch(`/blogs/post/${slug}/`, {
        desc: desc,
      })
    }

    if (r1 || r2 || r3 || r4) {
      fetchData(1, 1)
      setPostMsg('Post has been updated.')
    }
    setLastUpdateLabel(moment(post.updated_at).local().fromNow())
  }

  const handleSavePost = async (isPublish) => {
    if (!title) {
      setPostMsg('Title must not be blank')
      return
    }
    try {
      const res = await axiosInstance.patch(`/blogs/post/${title}/`, {
        title: title,
      })
      if (title == res.data.title) {
        if (res.data.published) {
          setPostMsg('Title must be unique.')
          return
        }
      }
    } catch (error) {
      setPostMsg(error.response.data.title)
    }

    let tags_payload = []
    tags.map((tag, index) => {
      if (tagCheckRef.current[index].checked) {
        tags_payload.push({ name: tagCheckRef.current[index].value })
      }
    })
    const payload = {
      title: title,
      desc: desc,
      content: content,
      tags: tags_payload,
      published: isPublish,
    }

    const patchImage = (res) => {
      if (image) {
        const body = new FormData()
        body.append('cover_image', image)
        axiosInstance.defaults.headers.common['Content-Type'] =
          'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
        axiosInstance.patch(`/blogs/post/${res.data.slug}/`, body)
      }
    }

    if (slug) {
      axiosInstance.patch(`/blogs/post/${slug}/`, payload).then((res) => {
        patchImage(res)
        navigate(0, {
          state: { from: `/blogs/post/${slug}/`, isPublish: isPublish },
        })
      })
    } else {
      axiosInstance.post('/blogs/post/', payload).then((res) => {
        patchImage(res)
      })

      navigate(
        `../blog/post/${title.toLowerCase().split(' ').join('-')}/edit`,
        {
          replace: true,
          state: { from: '/blog/post/write', isPublish: isPublish },
        }
      )
      navigate(0)
    }
  }

  const handleDeletePost = () => {
    axiosInstance.delete(`/blogs/post/${slug}/`)
    navigate('/blog')
  }
  ///////////////////////////// useEffect //////////////////////////////////////
  useEffect(() => {
    if (tagMsg != '') {
      timeoutHandle = setTimeout(() => {
        setTagMsg('')
      }, 3000)
    }
  }, [tagMsg])

  useEffect(() => {
    fetchData(1, 0)
  }, [tagEventFlag])
  //////////////////////////////////////////////////////////////////////
  useEffect(() => {
    if (localStorage.getItem('user') == null) {
      //so we can redirect to the correct path before logging in
      if (slug != null)
        navigate('/login', { state: { from: `blog/post/${slug}/edit` } })
      else navigate('/login', { state: { from: `blog/post/write` } })
    }
    ///////////////////////////////////////////////////////////////////////////////
    // this blog was a bug, twice refresh when redirect from login
    // solved by addding naviate(0) after another navigate in login.jsx
    // if (location.state) {
    //   // if (location.state.from == '/login') {
    //   // below, reload twice
    //   // window.history.replaceState({}, '')
    //   // navigate(0, {
    //   //   state: { from: window.location.pathname },
    //   //   replace: true,
    //   // })
    //   // console.log(location.state.from, 'from')
    //   // console.log(window.location.pathname, 'here')
    //   // navigate(0, { state: { from: window.location.pathname } })
    //   // window.location.reload()
    //   // }
    // }
    //
    ///////////////////////////////////////////////////////////////////////////
    //if not from a spesific post fetch only tag
    if (slug == undefined) {
      fetchData(1, 0)
      return
    }
    if (location.state) {
      if (location.state.isPublish) setPostMsg('Post has been published.')
      else setPostMsg('Post has been created.')
    }

    fetchData(1, 1)
  }, [])
  /////////////////////// upload cover ////////////////////////////////////

  ////////////////post useeffect/////////////////////////////////////////////////
  useEffect(() => {
    setLastUpdateLabel(moment(post.updated_at).local().fromNow())
  }, [post, lastUpdateLabel, fetchData])
  // refresh time every 1 min.
  useEffect(() => {
    setTimeout(() => {
      setLastUpdateLabel(moment(post.updated_at).local().fromNow())
    }, 60000)
  }, [lastUpdateLabel])
  useEffect(() => {
    setTitle(post?.title)
    setDesc(post?.desc)
    setContent(post?.content)
  }, [post])
  useEffect(() => {
    setTimeout(() => {
      setPostMsg('')
    }, 5000)
  }, [postMsg])
  /////////////////////////////cover img useeffect////////////////////////
  useEffect(() => {
    if (image) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(image)
    } else {
      setPreview(null)
    }
  }, [image])
  ///////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  if (slug == undefined) {
    if (loading) {
      return <Loading />
    }
  } else if ((slug != undefined && loading) || post['tags'] == undefined) {
    return <Loading />
  }

  return (
    <ThreeColumns>
      {/* {console.log(post.tags)} */}
      <div className='add'>
        <div className='content'>
          <div className='menu'>
            <div className='item'>
              <h1>Publish</h1>
              <span>
                <b>Status: </b>{' '}
                {post.published ? <span>Published</span> : <span>Draft</span>}
              </span>
              <span>
                Created on: {moment(post.created_at).local().calendar()}
              </span>

              <input
                accept='image/*'
                type='file'
                id='file'
                style={{ display: 'none' }}
                ref={inputCoverImage}
                onChange={(event) => {
                  const file = event.target.files[0]
                  if (file && file.type.slice(0, 5) === 'image') {
                    setImage(file)
                  } else {
                    setImage(null)
                  }
                }}
              />
              <label>
                <span
                  className='file'
                  htmlFor='file'
                  onClick={() => inputCoverImage.current.click()}
                >
                  Upload
                </span>{' '}
                <span
                  style={{ cursor: 'pointer' }}
                  onClick={(e) => {
                    e.preventDefault()
                    setPreview(null)
                    setImage(null)
                  }}
                >
                  Clear
                </span>{' '}
                {inputCoverImage.current?.files[0]
                  ? inputCoverImage.current.files[0].name
                  : 'cover_image max 760x300px'}
              </label>

              <div className='buttons'>
                {post.published ? (
                  `Last update: ${lastUpdateLabel}`
                ) : post.title ? (
                  <button onClick={handleUpdate}>Update as a draft</button>
                ) : (
                  <button
                    onClick={(e) => {
                      handleSavePost(false)
                    }}
                  >
                    Save as a draft
                  </button>
                )}
                {post.published ? (
                  <>
                    <button
                      onClick={handleUpdate}
                      style={{ paddingRight: '-100px' }}
                    >
                      Update
                    </button>
                    <button onClick={handleDeletePost}>Delete</button>
                  </>
                ) : slug ? (
                  <>
                    <button onClick={(e) => handleSavePost(true)}>Post</button>
                    <button onClick={handleDeletePost}>Delete</button>
                  </>
                ) : (
                  <button onClick={(e) => handleSavePost(true)}>Post</button>
                )}
              </div>
            </div>
            <div className='item'>
              <h1>Tags</h1>
              <div className='d-flex align-content-start flex-wrap'>
                {tags.map((tag, index) => {
                  if (slug) {
                    var tag_ids = post.tags.map(({ id }) => id)
                    var checked = tag_ids.includes(tag.id)
                  }
                  return (
                    <div className='tag px-1' key={index}>
                      <input
                        type='checkbox'
                        name={index}
                        ref={(el) => (tagCheckRef.current[index] = el)}
                        id={tag.id}
                        value={tag.name}
                        onChange={handleTagCheck}
                        defaultChecked={slug ? checked : false}
                      />
                      <label htmlFor={tag.id}>{tag.name}</label>
                    </div>
                  )
                })}
              </div>
              <div>
                <span style={{ color: '#b83' }}>
                  &nbsp;
                  {tagMsg && tagMsg}
                </span>
              </div>
              <div className='buttons'>
                <input
                  type='text'
                  style={{ width: '60%' }}
                  placeholder='Create a tag here.'
                  onChange={handletagInputBox}
                  value={`${tagInputBox.name}`}
                  ref={tagInputRef}
                  onKeyDown={(e) => {
                    e.key === 'Enter'
                      ? document.getElementById('tagCreate').click()
                      : {}
                  }}
                  name='name'
                />
                <button id='tagCreate' onClick={handleTagSubmit}>
                  Create
                </button>
                <button onClick={handleTagDelete}>Delete</button>
              </div>
            </div>
          </div>
          <span style={{ alignSelf: 'center', fontSize: '1.35em' }}>
            &nbsp;{postMsg && postMsg}
          </span>

          <div>
            <img
              src={
                preview
                  ? preview
                  : post.cover_image
                  ? post.cover_image
                  : '/images/default.jpg'
              }
              alt='coverImage'
              className='cover_image'
              style={{ height: '300px', width: '760px', objectFit: 'cover' }}
            />
          </div>
          <input
            placeholder='Title'
            style={{ color: 'black' }}
            onChange={(e) => setTitle(e.target.value)}
            defaultValue={title}
          />

          <input
            placeholder='Description'
            style={{ color: 'black' }}
            onChange={(e) => setDesc(e.target.value)}
            defaultValue={desc}
          />
          <div
            className='editorContainer'
            style={{ background: 'white', color: 'black' }}
          >
            <Editor content={content} setContent={setContent} />
          </div>
          {/* <div
            className='editorContainer'
            style={{ background: 'white', color: 'black' }}
          >
            <Editor2 />
          </div> */}
          {/* <div
            className='editorContainer'
            style={{ background: 'white', color: 'black' }}
          >
            <QuillEditor
              placeholder={'something..'}
              onEditorChange={onEditorChange}
              onFilesChange={onFilesChange}
            />
          </div> */}
        </div>
      </div>
      <Link to={slug ? `/blog/post/${slug}` : '/blog'}>
        <button className='btn rgb btn-mini btn-primary'>
          <FaRegArrowAltCircleLeft style={{ paddingBottom: '4px' }} />
          Go back
        </button>
      </Link>
    </ThreeColumns>
  )
}
