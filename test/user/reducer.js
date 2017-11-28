/**
 * External dependencies
 */
import { expect } from 'chai';
import deepFreeze from 'deep-freeze';

/**
 * Internal dependencies
 */
import {
	// action-types
	USER_REQUEST,
	USER_REQUEST_SUCCESS,
	USER_REQUEST_FAILURE,
	// reducers
	items,
	requests,
	names
} from '../src/state';

import users from './fixtures/users';

describe( 'User reducer', () => {
	describe( 'items', () => {
		it( 'should have no change by default', () => {
			const newState = items( undefined, {} );
			expect( newState ).to.eql( {} );
		} );

		it( 'should store the new users in state', () => {
			const newState = items( undefined, { type: USER_REQUEST_SUCCESS, user: users[ 0 ] } );
			const usersById = { 1: users[ 0 ] };
			expect( newState ).to.eql( usersById );
		} );

		it( 'should add new users onto the existing user array', () => {
			const originalState = deepFreeze( { 1: users[ 0 ] } );
			const newState = items( originalState, { type: USER_REQUEST_SUCCESS, user: users[ 1 ] } );
			expect( newState ).to.eql( { ...originalState, 2: users[ 1 ] } );
		} );
	} );

	describe( 'requests', () => {
		it( 'should have no change by default', () => {
			const newState = requests( undefined, {} );
			expect( newState ).to.eql( {} );
		} );

		it( 'should track the requesting state of a new user', () => {
			const action = {
				type: USER_REQUEST,
				userId: 'robin'
			};
			const newState = requests( undefined, action );
			expect( newState ).to.eql( { robin: true } );
		} );

		it( 'should track the requesting state of successful user requests', () => {
			const originalState = deepFreeze( { robin: true } );
			const action = {
				type: USER_REQUEST_SUCCESS,
				userId: 'robin'
			};
			const newState = requests( originalState, action );
			expect( newState ).to.eql( { robin: false } );
		} );

		it( 'should track the requesting state of failed user requests', () => {
			const originalState = deepFreeze( { robin: true } );
			const action = {
				type: USER_REQUEST_FAILURE,
				userId: 'robin'
			};
			const newState = requests( originalState, action );
			expect( newState ).to.eql( { robin: false } );
		} );

		it( 'should track the requesting state of additional user requests', () => {
			const originalState = deepFreeze( { robin: false } );
			const action = {
				type: USER_REQUEST,
				userId: 2
			};
			const newState = requests( originalState, action );
			expect( newState ).to.eql( { ...originalState, 2: true } );
		} );
	} );

	describe( 'names', () => {
		it( 'should have no change by default', () => {
			const newState = names( undefined, {} );
			expect( newState ).to.eql( {} );
		} );

		it( 'should track the name->id relationship of users', () => {
			const action = {
				type: USER_REQUEST_SUCCESS,
				userId: 'robin',
				user: users[ 0 ]
			};
			const newState = names( undefined, action );
			expect( newState ).to.eql( { robin: 1 } );
		} );

		it( 'should track the name->id relationship of additional users', () => {
			const originalState = deepFreeze( { robin: 1 } );
			const action = {
				type: USER_REQUEST_SUCCESS,
				userId: 2,
				user: users[ 1 ]
			};
			const newState = names( originalState, action );
			expect( newState ).to.eql( { robin: 1, ava: 2 } );
		} );
	} );
} );
