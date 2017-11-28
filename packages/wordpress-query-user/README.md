WordPress Query Users
=====================

This package contains a query component, along with redux state & selectors for users pulled from a WordPress site. This uses the `wordpress-rest-api-oauth-1` package to get your site's data via Query Components ([inspired by calypso](https://github.com/Automattic/wp-calypso/blob/master/docs/our-approach-to-data.md#query-components)). The Query Components call the API, which via actions set your site's data into the state.

To use any of these helpers, you'll need to set your Site URL in a global (`SiteSettings`), so that the API knows what site to connect to. For example:

```js
window.SiteSettings = {
	endpoint: 'url.com/path-to-wordpress',
};
```

As of version 1.1, the URL should _not_ include `/wp_json` – `wordpress-rest-api-oauth-1` adds that for us.

QueryUser
==========

QueryUser is a React component used in managing the fetching of user data.

## Usage

Render the component, passing the requested `userId` (which can be a numeric ID, a string username). It does not accept any children, nor does it render any elements to the page. You can use it adjacent to other sibling components which make use of the fetched data made available through the global application state.

```jsx
import React from 'react';
import QueryUser from 'wordpress-query-user';
import MyUserItem from './user-item';

export default function MyUser( { user } ) {
	return (
		<div>
			<QueryUser userId="author" />
			<MyUserItem user={ user } />
		</div>
	);
}
```

## Props

### `userId`

<table>
	<tr><th>Type</th><td>Number, String</td></tr>
	<tr><th>Required</th><td>Yes</td></tr>
	<tr><th>Default</th><td><code>null</code></td></tr>
</table>

A numeric user ID, or a string username, of a specific user to fetch

User Selectors
==============

You can import these into your project by grabbing them from the `selectors` file:

```jsx
import { getUser, isRequestingUser } from 'wordpress-query-user/lib/selectors';
```

#### `getUser( state, globalId )`

#### `getUsers( state, globalIds )`

#### `isRequestingUser( state, user )`

#### `getUserIdFromName( state, username )`

User State
==========

If you need access to the reducers, action types, or action creators, you can import these from the `state` file. For example, to use this in your global redux state, mix it into your reducer tree like this:

```jsx
import users from 'wordpress-query-user/lib/state';

let reducer = combineReducers( { ...otherReducers, users } );
```

If you need to call an action (the query component should take care of this most of the time), you can pull the action out specifically:

```jsx
import { requestUser } from 'wordpress-query-user/lib/state';
```

[View the file itself](src/state.js) to see what else is available.
