const Schema = require('mongoose').Schema;

module.exports = exports = function TocPlugin(schema, options) {
    schema.remove('structure');
    schema.add({
        structure: [{type: Schema.Types.Mixed, required: true}]
    });
};