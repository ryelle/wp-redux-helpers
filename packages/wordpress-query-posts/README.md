WordPress Query Posts
=====================

This package contains a query component, along with redux state & selectors for posts pulled from a WordPress site. This uses the [`node-wpapi`](https://github.com/WP-API/node-wpapi) package to get your site's data via Query Components ([inspired by calypso](https://github.com/Automattic/wp-calypso/blob/master/docs/our-approach-to-data.md#query-components)). The Query Components call the API, which via actions set your site's data into the state.

To use any of these helpers, you'll need to set your Site URL in a global (`SiteSettings`), so that the API knows what site to connect to. For example:

```js
window.SiteSettings = {
	endpoint: 'url.com/path-to-wordpress',
};
```

As of version 1.1, the URL should _not_ include `/wp_json` – `wordpress-rest-api-oauth-1` adds that for us.

Query Posts
===========

Query Posts is a React component used in managing the fetching of posts queries, or single posts by the post slug.

## Usage

Used to request a single post, or list of posts, based on either a query object, or post slug.

Render the component, passing in the `query` or a single `postSlug`. It does not accept any children, nor does it render any elements to the page. You can use it adjacent to other sibling components which make use of the fetched data made available through the global application state.

```jsx
import React from 'react';
import QueryPosts from 'wordpress-query-posts';
import MyPostsListItem from './list-item';

export default function MyPostsList( { posts } ) {
	return (
		<div>
			<QueryPosts query={ { search: 'Themes' } } />
			{ posts.map( ( post ) => {
				return (
					<MyPostsListItem
						key={ post.id }
						post={ post } />
				);
			} }
		</div>
	);
}
```

or for a single post:

```jsx
import React from 'react';
import QueryPosts from 'wordpress-query-posts';
import SinglePost from './single';

export default function MyPostsList( { post } ) {
	return (
		<div>
			<QueryPosts postSlug="local-development-for-wordcamp-websites" />
			<SinglePost post={ post } />
		</div>
	);
}
```

## Props

### `query`

<table>
	<tr><th>Type</th><td>Object</td></tr>
	<tr><th>Required</th><td>No</td></tr>
	<tr><th>Default</th><td><code>null</code></td></tr>
</table>

The query to be used in requesting posts.

### `postSlug`

<table>
	<tr><th>Type</th><td>String</td></tr>
	<tr><th>Required</th><td>No</td></tr>
	<tr><th>Default</th><td><code>null</code></td></tr>
</table>

The post slug of the post to request.

Post Selectors
==============

You can import these into your project by grabbing them from the `selectors` file:

```jsx
import { getPost, isRequestingPost } from 'wordpress-query-posts/lib/selectors';
```

#### `getPost( state, globalId )`

#### `getPostsForQuery( state, query )`

#### `isRequestingPostsForQuery( state, query )`

#### `getTotalPagesForQuery( state, query )`

#### `isRequestingPost( state, postSlug )`

#### `getPostIdFromSlug( state, slug )`

Post State
==========

If you need access to the reducers, action types, or action creators, you can import these from the `state` file. For example, to use this in your global redux state, mix it into your reducer tree like this:

```jsx
import posts from 'wordpress-query-posts/lib/state';

let reducer = combineReducers( { ...otherReducers, posts } );
```

If you need to call an action (the query component should take care of this most of the time), you can pull the action out specifically:

```jsx
import { requestPost } from 'wordpress-query-posts/lib/state';
```

[View the file itself](src/state.js) to see what else is available.
