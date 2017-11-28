/*global SiteSettings */
/**
 * External dependencies
 */
import { combineReducers } from 'redux';
import { isArray, keyBy } from 'lodash';
import API from 'wordpress-rest-api-oauth-1';
const api = new API( {
	url: SiteSettings.endpoint,
} );

/**
 * Term actions
 */
export const USER_REQUEST = 'wordpress-redux/users/REQUEST';
export const USER_REQUEST_SUCCESS = 'wordpress-redux/users/REQUEST_SUCCESS';
export const USER_REQUEST_FAILURE = 'wordpress-redux/users/REQUEST_FAILURE';

/**
 * Tracks all known post objects, indexed by post global ID.
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action payload
 * @return {Object}        Updated state
 */
export function items( state = {}, action ) {
	switch ( action.type ) {
		case USER_REQUEST_SUCCESS:
			const terms = keyBy( [ action.user ], 'id' );
			return Object.assign( {}, state, terms );
		default:
			return state;
	}
}

/**
 * Returns the updated post requests state after an action has been
 * dispatched. The state reflects a mapping of post ID to a
 * boolean reflecting whether a request for the post is in progress.
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action payload
 * @return {Object}        Updated state
 */
export function requests( state = {}, action ) {
	switch ( action.type ) {
		case USER_REQUEST:
		case USER_REQUEST_SUCCESS:
		case USER_REQUEST_FAILURE:
			return Object.assign( {}, state, { [ action.userId ]: USER_REQUEST === action.type } );
		default:
			return state;
	}
}

/**
 * Tracks the name->ID mapping for users
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action payload
 * @return {Object}        Updated state
 */
export function names( state = {}, action ) {
	switch ( action.type ) {
		case USER_REQUEST_SUCCESS:
			const userName = action.user.slug;
			const userId = action.user.id;
			return Object.assign( {}, state, {
				[ userName ]: userId,
			} );
		default:
			return state;
	}
}

export default combineReducers( {
	items,
	requests,
	names,
} );

/**
 * Triggers a network request to fetch a specific post from a site.
 *
 * @param  {string|number}  userId  User name or user ID
 * @return {Function}           Action thunk
 */
export function requestUser( userId ) {
	return ( dispatch ) => {
		dispatch( {
			type: USER_REQUEST,
			userId,
		} );

		// If we're looking for a user ID, we can request it directly
		let url = `/wp/v2/users/${ userId }`;
		const query = {};
		// If we're looking for a user name, we need to tweak the request slightly
		if ( 'string' === typeof userId ) {
			url = '/wp/v2/users/';
			query.slug = userId;
		}

		api.get( url, query ).then( data => {
			let user = data;
			if ( isArray( data ) ) {
				user = data[ 0 ];
			}
			dispatch( {
				type: USER_REQUEST_SUCCESS,
				userId,
				user,
			} );
			return null;
		} ).catch( ( error ) => {
			dispatch( {
				type: USER_REQUEST_FAILURE,
				userId,
				error,
			} );
		} );
	};
}
