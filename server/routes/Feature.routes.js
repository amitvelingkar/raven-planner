import { Router } from 'express';
import * as FeatureController from '../controllers/Feature.controller';

const router = new Router();

// Get all Features
router.route('/features').get(FeatureController.getFeatures);

// Get one feature by cuid
router.route('/features/:cuid').get(FeatureController.getFeature);

// Add a new Feature
router.route('/features').feature(FeatureController.addFeature);

// Delete a feature by cuid
router.route('/features/:cuid').delete(FeatureController.deleteFeature);


export default router;
