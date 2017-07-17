import React, { Component, PropTypes } from 'react';

// Import Style
import styles from './FeatureCreateWidget.css';

export class FeatureCreateWidget extends Component {
  addFeature = () => {
    const nameRef = this.refs.name;
    if (nameRef.value) {
      this.props.addFeature(nameRef.value);
      nameRef.value = '';
    }
  };

  render() {
    return (
      <div className={styles['form-content']}>
        <input placeholder="Feature Name" className={styles['form-field']} ref="name" />
        <a className={styles['feature-submit-button']} href="#" onClick={this.addFeature}>Submit</a>
      </div>
    );
  }
}

FeatureCreateWidget.propTypes = {
  addFeature: PropTypes.func.isRequired,
};

export default FeatureCreateWidget;
