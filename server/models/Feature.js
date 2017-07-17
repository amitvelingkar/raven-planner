import mongoose from 'mongoose';
import slug from 'limax';

const Schema = mongoose.Schema;

const FeatureSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter a feature name',
  },
  slug: String,
  description: {
    type: String,
    trim: true,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
  cuid: {
    type: 'String',
    required: true,
  },
  stackrank: {
    type: Number,
    min: 0,
  },
  dependency: {
    type: Boolean,
    default: false,
  },
  /*
  targetMilestone: {
    type: mongoose.Schema.ObjectId,
    ref: 'Milestone'
  },
  cost: {
    type: mongoose.Schema.ObjectId,
    ref: 'Cost'
  },
  growth: {
    type: mongoose.Schema.ObjectId,
    ref: 'Growth'
  },
  sentiment: {
    type: mongoose.Schema.ObjectId,
    ref: 'Sentiment'
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'you must always supply an author',
  },
  */
});

FeatureSchema.pre('save', async function UniqueSlug(next) {
  if (!this.isModified('name')) {
    next();
    return;
  }

  this.slug = slug(this.name);

  // make slug unique
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
  const featuresWithSlug = await this.constructor.find({ slug: slugRegEx });
  if (featuresWithSlug.length) {
    this.slug = `${this.slug}-${featuresWithSlug.length + 1}`;
  }

  next();
});

export default mongoose.model('Feature', FeatureSchema);
