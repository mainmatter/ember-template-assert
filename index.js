'use strict';

const Funnel = require('broccoli-funnel');

module.exports = {
  name: require('./package').name,

  options: {
    babel: {
      plugins: [require.resolve('ember-auto-import/babel-plugin')],
    },
  },

  setupPreprocessorRegistry(type, registry) {
    const plugin = this._buildPlugin();
    plugin.parallelBabel = {
      requireFile: __filename,
      buildUsing: '_buildPlugin',
      params: {},
    };
    registry.add('htmlbars-ast-plugin', plugin);
  },

  _buildPlugin() {
    const emberTemplateAssertTransform = require('./lib/ast-transform');

    return {
      name: 'ember-template-assert',
      plugin: emberTemplateAssertTransform,
      baseDir: emberTemplateAssertTransform.baseDir,
      cacheKey: emberTemplateAssertTransform.cacheKey,
    };
  },

  _filterAssertHelper(tree) {
    let app = this._findHost();

    if (app.isProduction) {
      tree = new Funnel(tree, {
        exclude: ['helpers/assert.js'],
      });
    }

    /*
    let log = require('broccoli-stew').log;
    return log(tree, {
      output: 'tree',
      label: `ember-template-assert ${tree.name} tree`,
    });
    */

    return tree;
  },

  treeForApp(tree) {
    return this._super.treeForApp.call(
      this,
      this._filterAssertHelper(tree, 'app tree')
    );
  },

  treeForAddon(tree) {
    return this._super.treeForAddon.call(
      this,
      this._filterAssertHelper(tree, 'addon tree')
    );
  },
};
