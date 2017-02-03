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

  static assignToc2DocNodes(tree, toc2doc, documents) {
    let keys = Object.keys(toc2doc);
    let nodeKey = documents ? 'toc2doc' : 'toc2TOC';

    if (tree) {
      if (tree.tocnodepid) {
        if (keys.indexOf(tree.tocnodepid) >= 0) {
          if (!tree[nodeKey])
            tree[nodeKey] = [];
          tree[nodeKey] = toc2doc[tree.tocnodepid].map(docId => {
            if (!documents) { /// For generate Jsonix Obj
              return {
                TYPE_NAME: 'TYPETOCNODE.TOC2DOC',
                toDocumentId: docId
              };
            } else {  ///For front-end display
              return {
                document: {
                  _id: docId,
                  documenttitle: documents[docId]
                }
              };
            }
          });
        }
      }

      if (tree.tocnode) {
        tree.tocnode.forEach(node => TocTreeHelper.assignToc2DocNodes(node, toc2doc, documents));
      }
    }
  }
};