import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import Home from './components/home';
import EventGallery from './components/event_gallery';
import EventGalleryPhoto from './components/event_gallery_photo';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={Home} />
    <Route path="/events/:event_id/photos" component={EventGallery}>
      <Route path="/events/:event_id/photos/:photo_id" component={EventGalleryPhoto} />
    </Route>
  </Route>
);
