import { FaRegArrowAltCircleLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { ThreeColumns } from '../../layout'
import { Editor } from './editor'

export const Write = () => {
  return (
    <ThreeColumns>
      <div className='add'>
        <div className='content'>
          <div className='menu'>
            <div className='item'>
              <h1>Publish</h1>
              <span>
                <b>Status: </b> Draft
              </span>
              <span>
                <b>Visibility: </b> Public
              </span>
              <input type='file' id='file' style={{ display: 'none' }} />
              <label>
                <span className='file' htmlFor='file'>
                  Upload
                </span>{' '}
                cover image
              </label>

              <div className='buttons'>
                <button>Save as a draft</button>
                <button>Update</button>
              </div>
            </div>
            <div className='item'>
              <h1>Tags</h1>
              <div className='d-flex align-content-start flex-wrap'>
                <div className='tag px-1'>
                  <input type='checkbox' name='tag' value='art' id='art' />
                  <label htmlFor='art'>Art</label>
                </div>
                <div className='tag px-1'>
                  <input type='checkbox' name='tag' value='art' id='art' />
                  <label htmlFor='art'>Art</label>
                </div>
                <div className='tag px-1'>
                  <input type='checkbox' name='tag' value='art' id='art' />
                  <label htmlFor='art'>Art</label>
                </div>
                <div className='tag px-1'>
                  <input type='checkbox' name='tag' value='art' id='art' />
                  <label htmlFor='art'>Art</label>
                </div>
                <div className='tag px-1'>
                  <input type='checkbox' name='tag' value='art' id='art' />
                  <label htmlFor='art'>Art</label>
                </div>
                <div className='tag px-1'>
                  <input type='checkbox' name='tag' value='art' id='art' />
                  <label htmlFor='art'>Art</label>
                </div>
                <div className='tag px-1'>
                  <input type='checkbox' name='tag' value='art' id='art' />
                  <label htmlFor='art'>Art</label>
                </div>
              </div>
              <div className='buttons'>
                <input type='text' style={{ width: '60%' }} />
                <button>Create</button>
                <button>Delete</button>
              </div>
            </div>
          </div>
          <input placeholder='Title' style={{ color: 'black' }} />
          <div
            className='editorContainer'
            style={{ background: 'white', color: 'black' }}
          >
            <Editor />
          </div>
        </div>
      </div>
      <Link to={-1}>
        <button className='btn rgb btn-mini btn-primary'>
          <FaRegArrowAltCircleLeft style={{ paddingBottom: '4px' }} />
          Go back
        </button>
      </Link>
    </ThreeColumns>
  )
}
