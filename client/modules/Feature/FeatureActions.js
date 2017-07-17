import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_FEATURE = 'ADD_FEATURE';
export const ADD_FEATURES = 'ADD_FEATURES';
export const DELETE_FEATURE = 'DELETE_FEATURE';

// Export Actions
export function addFeature(feature) {
  return {
    type: ADD_FEATURE,
    feature,
  };
}

export function addFeatureRequest(feature) {
  return (dispatch) => {
    return callApi('features', 'feature', {
      feature: {
        name: feature.name,
      },
    }).then(res => dispatch(addFeature(res.feature)));
  };
}

export function addFeatures(features) {
  return {
    type: ADD_FEATURES,
    features,
  };
}

export function fetchFeatures() {
  return (dispatch) => {
    return callApi('features').then(res => {
      dispatch(addFeatures(res.features));
    });
  };
}

export function fetchFeature(cuid) {
  return (dispatch) => {
    return callApi(`features/${cuid}`).then(res => dispatch(addFeature(res.feature)));
  };
}

export function deleteFeature(cuid) {
  return {
    type: DELETE_FEATURE,
    cuid,
  };
}

export function deleteFeatureRequest(cuid) {
  return (dispatch) => {
    return callApi(`features/${cuid}`, 'delete').then(() => dispatch(deleteFeature(cuid)));
  };
}
