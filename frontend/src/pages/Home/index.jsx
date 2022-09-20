import React from 'react'
import { Card } from '../../components/ui/Card'
import { ThreeColumns } from '../../layout/ThreeColumns'
export const Home = () => {
  return (
    <React.Fragment>
      <div className='jumbotron'>
        <div className='container text-center'>
          <div className='p-5 mb-4 rounded-3'>
            <div className='py-5'>
              <h1 className='display-5 fw-bold'>Custom jumbotron</h1>
              <p className='fs-4'>
                <span className='tab'></span>Using a series of utilities, you
                can create this jumbotron, just like the one in previous
                versions of Bootstrap. Check out the examples below for how you
                can remix and restyle it to your liking.
              </p>
              <button className='btn rgb' type='button'>
                CV Download
              </button>
            </div>
          </div>
        </div>
      </div>
      <ThreeColumns>
        <section className='card-section'>
          <p>recent projects</p>
          <Card />
          <Card />
          <Card />
          <div className='d-flex justify-content-end'>
            <p>
              <a className='rgb' href='#'>
                view more
              </a>
            </p>
          </div>
        </section>
        <section className='blog-section'>
          <article>
            <div className='article-wrapper'>
              <div className='blog-label'>
                <div className='home-label rgb'>
                  <h4 className='home-label-title'>BLOGs</h4>
                </div>
              </div>
              <div className='blog-list-home'>
                <div className='blog-list-content blog-content-underline rgb'>
                  <h4>Blog Title Sample</h4>
                  <span className='fw-lighter'>
                    <span className='year rgb'>&ensp;2018&ensp;</span> November,
                    12
                  </span>

                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Doloribus nam, vero facilis sint dolorem numquam veniam
                    consequuntur repudiandae pariatur ipsa.
                  </p>
                </div>
              </div>
              <div className='blog-list-content blog-content-underline rgb'>
                <h4>Blog Title Sample</h4>
                <span className='year rgb'>&ensp;2018&ensp;</span>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Doloribus nam, vero facilis sint dolorem numquam veniam
                  consequuntur repudiandae pariatur ipsa.
                </p>
              </div>
            </div>
          </article>
        </section>
      </ThreeColumns>
    </React.Fragment>
  )
}
