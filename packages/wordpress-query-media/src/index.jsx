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
import { isRequestingMedia } from './selectors';
import { requestMedia } from './state';

const debug = debugFactory( 'query:media' );

class QueryMedia extends Component {
	componentWillMount() {
		this.request( this.props );
	}

	componentWillReceiveProps( nextProps ) {
		if ( this.props.attachmentId === nextProps.attachmentId ) {
			return;
		}

		this.request( nextProps );
	}

	request( props ) {
		if ( ! props.requestingMedia ) {
			debug( 'Request media item ' + props.attachmentId );
			props.requestMedia( props.attachmentId );
		}
	}

	render() {
		return null;
	}
}

QueryMedia.propTypes = {
	attachmentId: PropTypes.number.isRequired,
	requestingMedia: PropTypes.bool,
	requestMedia: PropTypes.func,
};

QueryMedia.defaultProps = {
	requestMedia: () => {},
};

export default connect(
	( state, ownProps ) => {
		const attachmentId = ownProps.attachmentId;
		return {
			requesting: isRequestingMedia( state, attachmentId ),
		};
	},
	( dispatch ) => bindActionCreators( { requestMedia }, dispatch )
)( QueryMedia );
