import angular from 'angular';

class TocController {
    constructor(tocService, ghstsService, documentService) {
        this.tocService = tocService;
        this.ghstsService = ghstsService;
        this.documentService = documentService;

        // sample data
        this.loadToc();
    }

    remove(scope){
        scope.remove();
    }

    toggle(scope){
        scope.toggle();
    }

    moveLastToTheBeginning() {
        let a = this.data.pop();
        this.data.splice(0, 0, a);
    }

    newSubItem(scope) {
        let nodeData = scope.$modelValue;
        nodeData.nodes.push({
            id: nodeData.id * 10 + nodeData.nodes.length,
            title: nodeData.title + '.' + (nodeData.nodes.length + 1),
            nodes: []
        });
    }

    collapseAll() {
        let scope = angular.element(document.body).scope();
        scope.$broadcast('angular-ui-tree:collapse-all');
    }

    expandAll() {
        let scope = angular.element(document.body).scope();
        scope.$broadcast('angular-ui-tree:expand-all');
    }

    loadToc() {
        let contents = this.ghstsService.getGhstsObject();
        if (contents && contents.ghsts) {
            var data = [];
            data[0] = {
                isRoot: true,
                NODE_NAME: contents.ghsts.TOC[0].TOC_FULL_NAME[0],
                TOC_NODE: contents.ghsts.TOC[0].STRUCTURE[0].TOC_NODE
            };
            this.processNode(data[0]);
            this.data = data;
        }
        console.log(this.data);
    }

    processNode(node) {
        node.nrDocs = 0;
        node.addDoc = () => {
            node.nrDocs++;
            if (node.parent) {
                node.parent.addDoc();
            }
        }

        if (node.TOC_NODE) {
            for (let i = 0; i < node.TOC_NODE.length; ++i) {
                let child = node.TOC_NODE[i];
                child.parent = node;
                this.processNode(child);
            }
        }

        const toc2doc = node.TOC2DOC;
        if (toc2doc && toc2doc.length > 0) {
            let docId = toc2doc[0].attr$.To_Document_Id;

            this.documentService.getDocumentByDOCId(docId)
            .then(doc => {
                if (doc && doc.length > 0) {
                    const docNode = {
                        NODE_NAME: doc[0].DOCUMENT_GENERIC.DOCUMENT_TITLE,
                        isDocument: true
                    }

                    if (!node.TOC_NODE) {
                        node.TOC_NODE = [];
                    }

                    node.TOC_NODE.push(docNode);

                    node.addDoc();
                }
            })
        }

    }
}

export {TocController};
