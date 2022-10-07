import React, { useEffect, useState } from 'react'
import ImageResize from 'quill-image-resize-module-react'
import { Quill as RQuil } from 'react-quill'
import { useQuill } from 'react-quilljs'
import hljs from 'highlight.js'
// or const { useQuill } = require('react-quilljs');
import Qimage from 'quill/formats/image'
import 'quill/dist/quill.snow.css' // Add css for snow theme
import { axiosInstance } from '../../utils'
// or import 'quill/dist/quill.bubble.css'; // Add css for bubble theme

export const Editor = ({
  content,
  setContent,
  images,
  setImages,
  previews,
  setPreviews,
  index,
  setIndex,
}) => {
  const theme = 'snow'
  // const theme = 'bubble';
  hljs.configure({
    languages: [
      'javascript',
      'python',
      'sql',
      'cpp',
      'csharp',
      'css',
      'html',
      'dockerfile',
    ],
  })
  const modules = {
    syntax: {
      highlight: (text) => hljs.highlightAuto(text).value,
    },
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }, { align: [] }],
      [{ direction: 'rtl' }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
    imageResize: {
      parchment: RQuil.import('parchment'),
      modules: ['Resize', 'DisplaySize'],
    },
  }

  const placeholder = 'Compose an epic...'

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
    'code-block',
    'color',
    'background',
    'align',
    'underline',
    'strike',
    'code',
    'direction',
  ]

  const { quill, quillRef, Quill } = useQuill({
    theme,
    modules,
    formats,
    placeholder,
  })
  if (Quill && !quill) {
    // For execute this line only once.
    Quill.register('modules/imageResize', ImageResize)
    // Quill.register('modules/formats', Qimage)
  }

  const [uploaded, setUploaded] = useState(null)

  // useEffect(() => {
  //   console.log(uploaded)
  //   // insertToEditor(uploaded)
  //   let range = quill.getSelection()
  //   let position = range ? range.index : 0
  //   quill.insertEmbed(position, 'image', {
  //     src: uploaded.image,
  //     alt: uploaded.path,
  //   })
  //   quill.setSelection(position + 1)
  // }, [uploaded])
  // Upload Image to Image Server such as AWS S3, Cloudinary, Cloud Storage, etc..
  const saveToServer = async (file) => {
    const body = new FormData()
    body.append('image', file)
    // console.log(file)
    // console.log(body)
    axiosInstance.defaults.headers.common['Content-Type'] =
      'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
    // axiosInstance.defaults.headers.common['Accept'] =
    //   'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'

    // const res = await axiosInstance.post('/blogs/image/', body)
    axiosInstance.post('/blogs/image/', body).then((res) => {
      let range = quill.getSelection()
      let position = range ? range.index : 0
      quill.insertEmbed(position, 'image', {
        src: res.data.image,
        alt: res.data.path,
      })
    })
    // console.log(res)
    // setUploaded(res.data)
  }

  // Open Dialog to select Image File
  const selectLocalImage = () => {
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()

    input.onchange = () => {
      const file = input.files[0]
      // console.log(file)
      saveToServer(file)
    }
  }

  useEffect(() => {
    if (quill) {
      // Add custom handler for Image Upload
      quill.getModule('toolbar').addHandler('image', selectLocalImage)
      quillRef.current.firstChild.innerHTML =
        content != undefined ? content : null
      quill.on('text-change', (delta, oldDelta, source) => {
        // console.log('Text change!')
        // console.log(quill.getText()) // Get text only
        // console.log(quill.getContents()) // Get delta contents
        // console.log(quill.root.innerHTML) // Get innerHTML using quill
        // console.log(quillRef.current.firstChild.innerHTML) // Get innerHTML using quillRef
        setContent(quillRef.current.firstChild.innerHTML)
      })
    }
  }, [quill])

  return (
    <div className='editor'>
      <div ref={quillRef} />
    </div>
  )
}
