/*global SiteSettings */
/**
 * External dependencies
 */
import { combineReducers } from 'redux';
import API from 'wordpress-rest-api-oauth-1';
const api = new API( {
	url: SiteSettings.endpoint,
} );

/**
 * Media actions
 */
export const MEDIA_REQUEST = 'wordpress-redux/media/REQUEST';
export const MEDIA_REQUEST_SUCCESS = 'wordpress-redux/media/REQUEST_SUCCESS';
export const MEDIA_REQUEST_FAILURE = 'wordpress-redux/media/REQUEST_FAILURE';

/*
 * Tracks all known media objects, indexed by post global ID.
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action payload
 * @return {Object}        Updated state
 */
function items( state = {}, action ) {
	switch ( action.type ) {
		case MEDIA_REQUEST_SUCCESS:
			return Object.assign( {}, state, {
				[ action.media.id ]: action.media,
			} );
		default:
			return state;
	}
}

/**
 * Returns the updated media requests state after an action has been
 * dispatched. The state reflects a mapping of attachment ID to a
 * boolean reflecting whether a request for the media is in progress.
 *
 * @param  {Object} state  Current state
 * @param  {Object} action Action payload
 * @return {Object}        Updated state
 */
function requests( state = {}, action ) {
	switch ( action.type ) {
		case MEDIA_REQUEST:
		case MEDIA_REQUEST_SUCCESS:
		case MEDIA_REQUEST_FAILURE:
			return Object.assign( {}, state, { [ action.attachmentId ]: MEDIA_REQUEST === action.type } );
		default:
			return state;
	}
}

export default combineReducers( {
	items,
	requests,
} );

/**
 * Triggers a network request to fetch a specific media item from a site.
 *
 * @param  {number}   attachmentId  Attachment ID
 * @return {Function}               Action thunk
 */
export function requestMedia( attachmentId ) {
	return dispatch => {
		dispatch( {
			type: MEDIA_REQUEST,
			attachmentId,
		} );

		const query = {
			_embed: true,
		};

		api.get( '/wp/v2/media/' + attachmentId, query ).then( media => {
			dispatch( {
				type: MEDIA_REQUEST_SUCCESS,
				attachmentId,
				media,
			} );
			return null;
		} ).catch( error => {
			dispatch( {
				type: MEDIA_REQUEST_FAILURE,
				attachmentId,
				error,
			} );
		} );
	};
}
