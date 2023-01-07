import React from 'react';
import classes from './error.module.scss';

export default function Custom404() {
  return (
    <div id='error-page' className={classes['error-wrap']}>
      <div className={classes['error-page-body']}>
        <div className={classes['notfound-404']}>
          <h3>Oops! Page not found</h3>
          <h1>
            <span>4</span>
            <span>0</span>
            <span>4</span>
          </h1>
        </div>
        <h2>we are sorry, but the page you requested was not found</h2>
        <div className={classes['redirect-homepage-link-wrapper']}>
          <span className={classes['link-icon']}>
            <i className='fa fa-home' aria-hidden='true'></i>
          </span>
          <a href='/' className={classes['redirect-homepage-link']}>
            Redirect to homepage
          </a>
        </div>
      </div>
    </div>
  );
}
