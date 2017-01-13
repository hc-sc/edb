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
};