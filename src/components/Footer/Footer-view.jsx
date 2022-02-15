import React from 'react'
import { MDBFooter } from 'mdb-react-ui-kit';

const View = () => {
    return (
      <footer className='footer'>
    <MDBFooter  className='text-center text-lg-start text-muted'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'
      style={{backgroundColor: 'rgba(0, 0, 0, 0.05)'}}>
        <div className='me-5 d-none d-lg-block'>
          <span style={{ color:'tomato' }} >Get connected with us on social networks:</span>
        </div>

        <div style={{ color:'tomato' }}>
          <a href='/' className='me-4 text-reset'>
            <i className='fab fa-facebook-f' ></i>
          </a>
          <a href='/' className='me-4 text-reset'>
            <i className='fab fa-twitter'></i>
          </a>
          <a href='/' className='me-4 text-reset'>
            <i className='fab fa-google'></i>
          </a>
          <a href='/' className='me-4 text-reset'>
            <i className='fab fa-instagram'></i>
          </a>
          <a href='/' className='me-4 text-reset'>
            <i className='fab fa-linkedin'></i>
          </a>
          <a href='/' className='me-4 text-reset'>
            <i className='fab fa-github'></i>
          </a>
        </div>
      </section>

      <section className=''>
        <div className='container text-center text-md-start mt-5'style={{ color:'tomato' }}>
          <div className='row mt-3'>
            <div className='col-md-3 col-lg-4 col-xl-3 mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <i className='fas fa-gem me-3'></i>Juit Olx
              </h6>
              <p>
                Here you can use rows and columns to organize your footer content. Lorem ipsum dolor sit amet,
                consectetur adipisicing elit.
              </p>
            </div>

            <div className='col-md-2 col-lg-2 col-xl-2 mx-auto mb-4'style={{ color:'tomato' }}>
              <h6 className='text-uppercase fw-bold mb-4'>Products</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Books
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Buckets
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Ball
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Bucket
                </a>
              </p>
            </div>

            <div className='col-md-3 col-lg-2 col-xl-2 mx-auto mb-4'style={{ color:'tomato' }}>
              <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
              <p>
                <a href='#!' className='text-reset'>
                  About Us
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Pricing
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Orders
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Help
                </a>
              </p>
            </div>

            <div className='col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4' style={{ color:'tomato' }}>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <i className='fas fa-home me-3'></i> Himachal Pradesh
              </p>
              <p>
                <i className='fas fa-envelope me-3'></i>
                mohitmayank26@gmail.com
              </p>
              <p>
                <i className='fas fa-phone me-3'></i> + 01 234 567 88
              </p>
              <p>
                <i className='fas fa-print me-3'></i> + 01 234 567 89
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className='text-center p-4' style={{backgroundColor: 'rgba(0, 0, 0, 0.05)',color:'tomato'}}>
        © 2022 Copyright:
        <a className='text-reset fw-bold' href='https://mdbootstrap.com/'>
          Juit Olx.com
        </a>
      </div>
    </MDBFooter>
    </footer>
   
  )
}

export default View;