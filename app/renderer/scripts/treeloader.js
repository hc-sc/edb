(function () {
    var _timer;
    var counter = 0;

    checkangular();

    function checkangular() {
        if (!window.angular) {
            _timer = setTimeout(function () { checkangular(); }, 100);
        }
        else {
            clearTimeout(_timer);
            //registerToc();
            require('scripts/toc/contextMenu.js');
            require('scripts/toc/main.js');
            require('scripts/toc/controllers/tocCtrl.js');
            require('scripts/toc/controllers/handleCtrl.js');
            require('scripts/toc/controllers/nodeCtrl.js');
            require('scripts/toc/controllers/nodesCtrl.js');
            require('scripts/toc/controllers/treeCtrl.js');
            require('scripts/toc/directives/uiTree.js');
            require('scripts/toc/directives/uiTreeHandle.js');
            require('scripts/toc/directives/uiTreeNode.js');
            require('scripts/toc/directives/uiTreeNodes.js');
            require('scripts/toc/services/helper.js');
        }
    }

    function require(file, callback) {
        var head = document.getElementsByTagName("head")[0];
        var script = document.createElement('script');
        script.src = file;
        script.type = 'text/javascript';
        
        if (callback) {
            script.onload = callback;
        }
        head.appendChild(script);
    }


})();