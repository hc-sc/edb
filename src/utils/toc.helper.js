const _ = require('lodash');

module.exports = class TocTreeHelper {
  
  static sanitizeTree(tree) {
    if (tree) {
      if (tree.toc2doc) {
        tree.toc2doc = tree.toc2doc.map(doc => {
          return doc.document._id;
        });
      }

      if (tree.tocnode) {
        tree.tocnode.forEach(node => TocTreeHelper.sanitizeTree(node));
      }
    }
  }

  static sanitizeTreeHelper(tree) {
    let newTree = tree;
    TocTreeHelper.sanitizeTree(newTree);
    return newTree;
  }

  static assignToc2DocNodes(tree, toc2doc) {
    let keys = Object.keys(toc2doc);

    if (tree) {
      if (tree.tocnodepid) {
        if (keys.indexOf(tree.tocnodepid) >= 0) {
          if (!tree.toc2DOC)
            tree.toc2DOC = [];
          tree.toc2DOC = toc2doc[tree.tocnodepid].map(item => {
            return {
              TYPE_NAME: 'TYPETOCNODE.TOC2DOC',
              toDocumentId: item
            };
          });
        }
      }

      if (tree.tocnode) {
        tree.tocnode.forEach(node => TocTreeHelper.assignToc2DocNodes(node, toc2doc));
      }
    }
  }
};