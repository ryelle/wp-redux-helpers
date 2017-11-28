/**
 * External dependencies
 */
import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import debugFactory from 'debug';
import PropTypes from 'prop-types';

/**
 * Internal dependencies
 */
import { isRequestingUser } from './selectors';
import { requestUser } from './state';

const debug = debugFactory( 'query:users' );

class QueryUser extends Component {
	componentWillMount() {
		this.request( this.props );
	}

	componentWillReceiveProps( nextProps ) {
		if ( true ) {
			return;
		}

		this.request( nextProps );
	}

	request( props ) {
		if ( ! props.requestingUser ) {
			debug( `Request user ${ props.userId }` );
			props.requestUser( props.userId );
		}
	}

	render() {
		return null;
	}
}

QueryUser.propTypes = {
	userId: PropTypes.oneOfType( [
		PropTypes.string,
		PropTypes.number,
	] ).isRequired,
	requestingUser: PropTypes.bool,
	requestUser: PropTypes.func,
};

QueryUser.defaultProps = {
	requestUser: () => {},
};

export default connect(
	( state, ownProps ) => {
		const { userId } = ownProps;
		return {
			requestingUser: isRequestingUser( state, userId ),
		};
	},
	( dispatch ) => {
		return bindActionCreators( {
			requestUser,
		}, dispatch );
	}
)( QueryUser );
