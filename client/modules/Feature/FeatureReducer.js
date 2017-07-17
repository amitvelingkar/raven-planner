// Import Actions
import { ADD_FEATURE, ADD_FEATURES, DELETE_FEATURE } from './FeatureActions';

// Initial State
const initialState = { data: [] };

const FeatureReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_FEATURE :
      return {
        data: [action.feature, ...state.data],
      };

    case ADD_FEATURES :
      return {
        data: action.features,
      };

    case DELETE_FEATURE :
      return {
        data: state.data.filter(feature => feature.cuid !== action.cuid),
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all features
export const getFeatures = state => state.features.data;

// Get feature by cuid
export const getFeature = (state, cuid) => state.features.data.filter(feature => feature.cuid === cuid)[0];

export default FeatureReducer;
