(function () {
  'use strict';
  console.log('loaded toc controller');

  var app = angular.module('ghstsApp');

  app.controller('TocController', ['$scope', 'ghstsService', 'documentService', function ($scope, ghstsService, documentService) {

      $scope.remove = function (scope) {
        scope.remove();
      };

      $scope.toggle = function (scope) {
        scope.toggle();
      };

      $scope.moveLastToTheBeginning = function () {
        var a = $scope.data.pop();
        $scope.data.splice(0, 0, a);
      };

      $scope.newSubItem = function (scope) {
        var nodeData = scope.$modelValue;
        nodeData.nodes.push({
          id: nodeData.id * 10 + nodeData.nodes.length,
          title: nodeData.title + '.' + (nodeData.nodes.length + 1),
          nodes: []
        });
      };

      $scope.collapseAll = function () {

        $scope.$broadcast('angular-ui-tree:collapse-all');
      };

      $scope.expandAll = function () {
        $scope.$broadcast('angular-ui-tree:expand-all');
      };

      $scope.loadToc = function() {
        const contents = ghstsService.getGhstsJson();
        console.log(contents);
        if (contents) {

              var data = [];
              data[0] = {
                  isRoot: true,
                  NODE_NAME : contents.ghsts.TOC[0].TOC_FULL_NAME[0],
                  TOC_NODE: contents.ghsts.TOC[0].STRUCTURE[0].TOC_NODE
              };
              processNode(data[0]);
              $scope.data = data;
        }
      }

      $scope.clearToc = function () {

          $scope.data = [{

              NODE_HEADING: null,
              NODE_NAME: ["No data loaded"]
          }

          ];
      }

      $scope.clearToc();
      $scope.loadToc();

        function processNode(node) {

            node.nrDocs = 0;
            node.addDoc = function () {
                node.nrDocs++;
                if (node.parent) {
                    node.parent.addDoc();
                }
            }

            if (node.TOC_NODE) {

                for (var i = 0; i < node.TOC_NODE.length; i++) {
                    var child = node.TOC_NODE[i];
                    child.parent = node;
                    processNode(child);
                }
            }

            var toc2doc = node.TOC2DOC;
            if (toc2doc && toc2doc.length > 0) {
                var docId = toc2doc[0].attr$.To_Document_Id;

                documentService.getDocumentByDOCId(docId).then(function (doc) {
                    if (doc && doc.length > 0) {
                        var docNode = {
                            NODE_NAME: doc[0].DOCUMENT_GENERIC.DOCUMENT_TITLE,
                            isDocument: true
                        }
                        if (!node.TOC_NODE) {
                            node.TOC_NODE = [];
                        }
                        node.TOC_NODE.push(docNode);

                        node.addDoc();
                    }
                });
            }

        }

      $scope.dataold = [{
        'id': 1,
        'title': 'node1',
        'nodes': [
          {
            'id': 11,
            'title': 'node1.1',
            'nodes': [
              {
                'id': 111,
                'title': 'node1.1.1',
                'nodes': []
              }
            ]
          },
          {
            'id': 12,
            'title': 'node1.2',
            'nodes': []
          }
        ]
      }, {
        'id': 2,
        'title': 'node2',
        'nodrop': true, // An arbitrary property to check in custom template for nodrop-enabled
        'nodes': [
          {
            'id': 21,
            'title': 'node2.1',
            'nodes': []
          },
          {
            'id': 22,
            'title': 'node2.2',
            'nodes': []
          }
        ]
      }, {
        'id': 3,
        'title': 'node3',
        'nodes': [
          {
            'id': 31,
            'title': 'node3.1',
            'nodes': []
          }
        ]
      }];



    }]);

}());
