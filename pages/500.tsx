import React from 'react';
import classes from './error.module.scss';

export default function Custom500() {
  return (
    <div id='error-page'>
      <div className={classes['error-page-body']}>
        <div className={classes['notfound-404']}>
          <h3>Oops! Something went wrong</h3>
          <h1>
            <span>5</span>
            <span>0</span>
            <span>0</span>
          </h1>
        </div>
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
