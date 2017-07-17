import Feature from '../models/feature';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all features
 * @param req
 * @param res
 * @returns void
 */
export function getFeatures(req, res) {
  Feature.find().sort('-dateAdded').exec((err, features) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ features });
  });
}

/**
 * Save a feature
 * @param req
 * @param res
 * @returns void
 */
export function addFeature(req, res) {
  if (!req.body.feature.name) {
    res.status(403).end();
  }

  const newFeature = new Feature(req.body.feature);

  // Let's sanitize inputs
  newFeature.name = sanitizeHtml(newFeature.name);

  newFeature.slug = slug(newFeature.title.toLowerCase(), { lowercase: true });
  newFeature.cuid = cuid();
  newFeature.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ feature: saved });
  });
}

/**
 * Get a single feature
 * @param req
 * @param res
 * @returns void
 */
export function getFeature(req, res) {
  Feature.findOne({ cuid: req.params.cuid }).exec((err, feature) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ feature });
  });
}

/**
 * Delete a feature
 * @param req
 * @param res
 * @returns void
 */
export function deleteFeature(req, res) {
  Feature.findOne({ cuid: req.params.cuid }).exec((err, feature) => {
    if (err) {
      res.status(500).send(err);
    }

    feature.remove(() => {
      res.status(200).end();
    });
  });
}
