import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

// Import Style
// import styles from './Feature.css';

// Import Components
import FeatureCreateWidget from './components/FeatureCreateWidget/FeatureCreateWidget';

// Import Actions
import { addFeatureRequest, fetchFeatures } from './FeatureActions';

// Import Selectors
import { getFeatures } from './FeatureReducer';

class Feature extends Component {
  handleAddFeature = (name) => {
    this.props.dispatch(addFeatureRequest({ name }));
  };

  render() {
    return (
      <div>
        <h2>Features</h2>
        <FeatureCreateWidget addFeature={this.handleAddFeature} />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
Feature.need = [() => { return fetchFeatures(); }];

const mapStateToProps = (state) => {
  return {
    features: getFeatures(state),
  };
};
/*
const mapDispatchToProps = (dispatch) => {
  return {};
};
*/
Feature.propTypes = {
  features: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  // mapDispatchToProps
)(Feature);
