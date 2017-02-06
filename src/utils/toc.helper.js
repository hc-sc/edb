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
    let nodeKey = documents ? 'toc2doc' : 'toc2DOC';

    if (tree) {
      if (tree.tocnodepid) {
        if (keys.indexOf(tree.tocnodepid) >= 0) {
          if (!tree[nodeKey])
            tree[nodeKey] = [];
          toc2doc[tree.tocnodepid].map(docId => {
            if (!documents) { /// For generate Jsonix Obj
              tree[nodeKey].push({
                TYPE_NAME: 'GHSTS.TYPETOCNODE.TOC2DOC',
                toDocumentId: docId
              });
            } else {  ///For front-end display
              if (_.findIndex(tree[nodeKey], doc => { return doc.document._id = docId;}) < 0) {
                tree[nodeKey].push({
                  document: {
                    _id: docId,
                    documenttitle: documents[docId]
                  }
                });
              }
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