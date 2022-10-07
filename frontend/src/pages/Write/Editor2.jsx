import React, { useState, useEffect } from 'react'
import ReactQuill, { Quill } from 'react-quill'
import ImageResize from 'quill-image-resize-module-react'

import 'react-quill/dist/quill.snow.css'
import './index.css'

import hljs from 'highlight.js'
import 'react-quill/dist/quill.core.css'
import 'react-quill/dist/quill.bubble.css'

Quill.register('modules/imageResize', ImageResize)

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
const imageHandler = () => {
  console.log('wooho')
}
const modules = {
  syntax: {
    highlight: (text) => hljs.highlightAuto(text).value,
  },
  toolbar: {
    container: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ color: [] }, { background: [] }],
      [{ script: 'sub' }, { script: 'super' }],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }, { align: [] }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
    handlers: {
      image: imageHandler,
    },
  },
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
  imageResize: {
    parchment: Quill.import('parchment'),
    modules: ['Resize', 'DisplaySize'],
  },
}
const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
  'code-block',
]

export const Editor2 = () => {
  const [value, setValue] = useState('')
  console.log(value)

  return (
    <>
      <ReactQuill
        className='editor'
        theme='snow'
        placeholder='Content goes here...'
        modules={modules}
        value={value}
        onChange={setValue}
        formats={formats}
      />
    </>
  )
}
