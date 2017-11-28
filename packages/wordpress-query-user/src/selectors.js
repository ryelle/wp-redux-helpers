/**
 * Returns a user object by its global ID.
 *
 * @param  {Object} state    Global state tree
 * @param  {String} globalId User ID
 * @return {Object}          User object
 */
export function getUser( state, globalId ) {
	let userId = globalId;
	if ( 'string' === typeof globalId ) {
		userId = getUserIdFromName( state, globalId );
	}

	return state.users.items[ userId ];
}

/**
 * Returns a user object by its global ID.
 *
 * @param  {Object} state     Global state tree
 * @param  {Array}  globalIds List of user IDs
 * @return {Object}           User object
 */
export function getUsers( state, globalIds ) {
	const userList = globalIds.map( globalId => getUser( state, globalId ) );
	return userList.filter( Boolean );
}

/**
 * Returns true if a request is in progress for the specified term, or
 * false otherwise.
 *
 * @param  {Object}         state   Global state tree
 * @param  {String|Number}  userId  User ID or user name
 * @return {Boolean}                Whether request is in progress
 */
export function isRequestingUser( state, userId ) {
	if ( ! state.users.requests ) {
		return false;
	}

	return !! state.users.requests[ userId ];
}

/**
 * Returns the User ID for a given username
 *
 * @param  {Object}  state     Global state tree
 * @param  {String}  userName  User name (slug)
 * @return {int}               User ID
 */
export function getUserIdFromName( state, userName ) {
	if ( ! state.users || ! state.users.names[ userName ] ) {
		return false;
	}

	return state.users.names[ userName ];
}
