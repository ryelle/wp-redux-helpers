/**
 * Returns a media object by its global ID (attachment ID).
 *
 * @param  {Object} state    Global state tree
 * @param  {String} globalId Media global ID
 * @return {Object}          Media object
 */
export function getMedia( state, globalId ) {
	if ( ! state.media || ! state.media.items ) {
		return undefined;
	}

	return state.media.items[ globalId ];
}

/**
 * Returns true if a request is in progress for the specified media
 * item, or false otherwise.
 *
 * @param  {Object}  state          Global state tree
 * @param  {Number}  attachmentId   Attachment ID
 * @return {Boolean}                Whether request is in progress
 */
export function isRequestingMedia( state, attachmentId ) {
	if ( ! state.media || ! state.media.requests ) {
		return false;
	}

	return Boolean( state.media.requests[ attachmentId ] );
}
