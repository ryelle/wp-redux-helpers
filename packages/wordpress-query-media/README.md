WordPress Query Media
=====================

This package contains a query component, along with redux state & selectors for media pulled from a WordPress site. This uses the [`node-wpapi`](https://github.com/WP-API/node-wpapi) package to get your site's data via Query Components ([inspired by calypso](https://github.com/Automattic/wp-calypso/blob/master/docs/our-approach-to-data.md#query-components)). The Query Components call the API, which via actions set your site's data into the state.

To use any of these helpers, you'll need to set your Site URL in a global (`SiteSettings`), so that the API knows what site to connect to. For example:

```js
window.SiteSettings = {
	endpoint: 'url.com/path-to-wordpress',
};
```

Query Media
===========

Query Media is a React component used in managing the fetching of media items.

## Usage

Render the component, passing in the `attachmentId`. It does not accept any children, nor does it render any elements to the page. You can use it adjacent to other sibling components which make use of the fetched data made available through the global application state.

```jsx
import React from 'react';
import QueryMedia from 'wordpress-query-media';
import MyMediaItem from './media-item';

export default function MyMediaComponent( { media } ) {
	return (
		<div>
			<QueryMedia attachmentId={ 32 } />
			<MyMediaItem media={ media } />
		</div>
	);
}
```

## Props

### `attachmentId`

<table>
	<tr><th>Type</th><td>Number</td></tr>
	<tr><th>Required</th><td>Yes</td></tr>
	<tr><th>Default</th><td><code>null</code></td></tr>
</table>

The attachment ID of the requested media item

Media Selectors
==============

You can import these into your project by grabbing them from the `selectors` file:

```jsx
import { getMedia, isRequestingMedia } from 'wordpress-query-media/lib/selectors';
```

#### `getMedia( state, globalId )`

#### `isRequestingMedia( state, path )`

Media State
===========

If you need access to the reducers, action types, or action creators, you can import these from the `state` file. For example, to use this in your global redux state, mix it into your reducer tree like this:

```jsx
import media from 'wordpress-query-media/lib/state';

let reducer = combineReducers( { ...otherReducers, media } );
```

If you need to call an action (the query component should take care of this most of the time), you can pull the action out specifically:

```jsx
import { requestMedia } from 'wordpress-query-media/lib/state';
```

[View the file itself](src/state.js) to see what else is available.
