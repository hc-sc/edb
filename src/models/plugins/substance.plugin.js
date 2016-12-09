module.exports = exports = function SubstancePlugin(schema, options) {
  schema.set('toJSON', { getters: true, virtuals: true });
  schema.set('toObject', { getters: true, virtuals: true });
  schema.virtual('valuedecode').get(function () {
    // console.log(this.substancename);
    return this.substancename;
  });
  // console.log('dossier plugin loaded');
};
