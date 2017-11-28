/**
 * External dependencies
 */
import { expect } from 'chai';
import deepFreeze from 'deep-freeze';
import { keyBy } from 'lodash';

/**
 * Internal dependencies
 */
import * as selectors from '../src/selectors';
import users from './fixtures/users';

const usersById = keyBy( users, 'id' );

const state = deepFreeze( {
	users: {
		items: usersById,
		requests: {
			robin: false,
			2: false,
			3: false,
			4: true,
		},
		names: {
			robin: 1,
			ava: 2,
		}
	}
} );

describe( 'User selectors', function() {
	it( 'should contain isRequestingUser method', function() {
		expect( selectors.isRequestingUser ).to.be.a( 'function' );
	} );

	it( 'should contain getUser method', function() {
		expect( selectors.getUser ).to.be.a( 'function' );
	} );

	it( 'should contain getUsers method', function() {
		expect( selectors.getUsers ).to.be.a( 'function' );
	} );

	it( 'should contain getUserIdFromName method', function() {
		expect( selectors.getUserIdFromName ).to.be.a( 'function' );
	} );

	describe( 'isRequestingUser', function() {
		it( 'Should get `false` if the user has not been requested yet', function() {
			expect( selectors.isRequestingUser( state, 'author' ) ).to.be.false;
		} );

		it( 'Should get `false` if this user has already been fetched (by name)', function() {
			expect( selectors.isRequestingUser( state, 'robin' ) ).to.be.false;
		} );

		it( 'Should get `false` if this user has already been fetched (by ID)', function() {
			expect( selectors.isRequestingUser( state, 3 ) ).to.be.false;
		} );

		it( 'Should get `false` if all users in list have already been fetched (by IDs)', function() {
			expect( selectors.isRequestingUser( state, [ 2, 3 ] ) ).to.be.false;
		} );

		it( 'Should get `true` if this user is being fetched', function() {
			expect( selectors.isRequestingUser( state, 4 ) ).to.be.true;
		} );

		it( 'Should get `true` if any users in list are being fetched (by IDs)', function() {
			expect( selectors.isRequestingUser( state, [ 3, 4 ] ) ).to.be.false;
		} );
	} );

	describe( 'getUser', function() {
		it( 'Should get `undefined` if the user has not been requested yet', function() {
			expect( selectors.getUser( state, 'author' ) ).to.be.undefined;
		} );

		it( 'Should get the user object if the user is in our state (by name)', function() {
			expect( selectors.getUser( state, 'robin' ) ).to.eql( usersById[ '1' ] );
		} );

		it( 'Should get the user object if the user is in our state (by ID)', function() {
			expect( selectors.getUser( state, 3 ) ).to.eql( usersById[ 3 ] );
		} );
	} );

	describe( 'getUsers', function() {
		it( 'Should get an empty array if the users have not been requested yet', function() {
			expect( selectors.getUsers( state, [ 5, 6 ] ) ).to.eql( [] );
		} );

		it( 'Should get a list of user objects if the users are in our state', function() {
			expect( selectors.getUsers( state, [ 1, 2 ] ) ).to.eql( [ usersById[ '1' ], usersById[ '2' ] ] );
		} );
	} );

	describe( 'getUserIdFromName', function() {
		it( 'Should get `false` if the user has not been requested yet', function() {
			expect( selectors.getUserIdFromName( state, 'author' ) ).to.be.false;
		} );

		it( 'Should get the user ID if this user is in our state', function() {
			expect( selectors.getUserIdFromName( state, 'robin' ) ).to.eql( 1 );
		} );
	} );
} );
