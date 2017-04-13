/**
 * PDF Annotator
 */
var moduleLocation = 'annotator/';
var fontAwesomeLocation = 'font-awesome-4.5.0/css/font-awesome.min.css';
//var fontAwesomeLocation = '../../styles/vendor/vendor.css'; // for built version only

var guardian = null;
var annotationData = {};
var uiElements = {};

var error = {}; // TODO Error Handler
window.onerror = function (msg, url, line) {
    if (url.split('/').pop() == 'annotator.js') {
        console.error('error in annotator module');
        alert(msg);
        init.error();
        if (guardian)
            guardian.annotatorAPI = null;
    }
};

var state = {
    annotator: {
        connected: false,
        error: null,
        activeAnnotationId: null
    },
    viewer: {
        available: false,
        active: false,
        activate: function (activate, apiCall) {
            activate = (typeof activate !== 'undefined') ? activate : !state.viewer.active;
            if (state.viewer.active != activate) {
                state.viewer.active = activate;
                state.editor.activate(state.editor.available && state.viewer.active);
                if (typeof apiCall === 'undefined')
                    guardian.annotationAPI.settings.activateAnnotationsInPDF(activate, true);
                if (state.viewer.active) {
                    uiElements.btn.annotator.primary.title = uiElements.btn.annotator.secondary.title = 'Hide Annotations';
                    uiElements.btn.annotator.primary.classList.remove('annotator-off');
                    uiElements.btn.annotator.primary.classList.add('annotator-on');
                    uiElements.btn.annotator.secondary.classList.remove('annotator-off');
                    uiElements.btn.annotator.secondary.classList.add('annotator-on');
                    annotator.pdfWorker.rerender();
                } else {
                    uiElements.btn.annotator.primary.title = uiElements.btn.annotator.secondary.title = 'Show Annotations';
                    uiElements.btn.annotator.primary.classList.remove('annotator-on');
                    uiElements.btn.annotator.primary.classList.add('annotator-off');
                    uiElements.btn.annotator.secondary.classList.remove('annotator-on');
                    uiElements.btn.annotator.secondary.classList.add('annotator-off');
                    annotator.pdfWorker.clearAllMarkers();
                }
            }
        }
    },
    editor: {
        available: false,
        active: false,
        activate: function (activate) {
            if (state.editor.active = (activate && state.editor.available)) {
                state.viewer.activate(true);
                uiElements.btn.annotate.primary.classList.remove('hidden');
                uiElements.btn.annotate.secondary.classList.remove('hidden');
            } else {
                uiElements.btn.annotate.primary.classList.add('hidden');
                uiElements.btn.annotate.secondary.classList.add('hidden');
            }
        }
    },
    annotatorBar: {
        active: false,
        name: null,
        closer: null
    }
};

var annotator = {
    newAnnotation: function () {
        var reference = annotator.pdfWorker.getSelectionObject();
        if (reference) {
            if (annotationData.hasOwnProperty('0')) {
                if (PDFViewerApplication.pdfViewer.getPageView(annotationData['0'].reference.pageIndex).canvas) {
                    var parentElement = PDFViewerApplication.pdfViewer.getPageView(
                        annotationData['0'].reference.pageIndex).canvas.parentElement;
                    var markers = parentElement.getElementsByClassName('tempMarker');
                    for (var i = markers.length - 1; i >= 0; i--) {
                        parentElement.removeChild(markers[i]);
                    }
                }
            }
            annotationData['0'] = {id: 'temp', reference: reference};
            annotator.pdfWorker.markAnnotation(annotationData['0']);
            guardian.annotationAPI.addAnnotation(reference);
        } else {
            alert('Please mark a part of the text to create a PDF Annotation.');
        }
    },
    updateData: function (annotation) {
        if (annotationData.hasOwnProperty('0') && (annotationData['0'].reference == annotation.reference)) {
            if (PDFViewerApplication.pdfViewer.getPageView(annotationData['0'].reference.pageIndex).canvas) {
                var parentElement = PDFViewerApplication.pdfViewer.getPageView(
                    annotationData['0'].reference.pageIndex).canvas.parentElement;
                var markers = document.querySelectorAll('.tempMarker');
                for (var i = markers.length - 1; i >= 0; i--) {
                    if (annotation.id == 'canceled') {
                        parentElement.removeChild(markers[i]);
                    } else {
                        markers[i].classList.remove('tempMarker');
                        if (annotation.id == state.annotator.activeAnnotationId)
                            markers[i].classList.add('active');
                        markers[i].setAttribute('data-id', annotation.id);
                        annotator.pdfWorker.setMarkerListeners(markers[i], annotation);
                    }
                }
            }
            delete annotationData['0'];
            if (annotation.id != 'canceled')
                annotationData[annotation.id] = annotation;
        } else if (annotation.id != 'temp' && annotation.id != 'canceled') {
            if (!annotationData.hasOwnProperty(annotation.id)) {
                annotator.pdfWorker.markAnnotation(annotation);
            }
            annotationData[annotation.id] = annotation;
        }
    },
    deleteData: function (annotationID) {
        if (annotationData.hasOwnProperty(annotationID)) {
            if (PDFViewerApplication.pdfViewer.getPageView(annotationData[annotationID].reference.pageIndex).canvas) {
                var parentElement = PDFViewerApplication.pdfViewer.getPageView(
                    annotationData[annotationID].reference.pageIndex).canvas.parentElement;
                var markers = document.querySelectorAll('[data-id="' + annotationID + '"]');
                for (var i = markers.length - 1; i >= 0; i--) {
                    parentElement.removeChild(markers[i]);
                }
            }
            delete annotationData[annotationID];
        }
    },
    viewer: {
        open: function () {
            if (state.annotatorBar.active)
                state.annotatorBar.closer();
            state.annotatorBar.active = true;
            state.annotatorBar.name = 'viewer';
            uiElements.annotatorBar.viewer.classList.remove('hidden');
            state.annotatorBar.closer = annotator.viewer.close;
        },
        close: function () {
            uiElements.annotatorBar.viewer.classList.add('hidden');
            state.annotatorBar.closer = null;
            state.annotatorBar.name = null;
            state.annotatorBar.active = false;
        }
    },
    pdfWorker: {
        rerender: function () {
            /* to get indices of currently shown pages, 'pagerendered'-events are needed
             * and to force PDFjs to fire them again if needed, you have to force it to redraw pages,
             * that can be done by zooming in and reset immediately */
            var scaleValue = PDFViewerApplication.pdfViewer.currentScaleValue;
            PDFViewerApplication.zoomIn();
            PDFViewerApplication.pdfViewer.currentScaleValue = scaleValue;
        },
        getSelectionObject: function () {
            // TODO: check if location is already marked to avoid intensification of color
            var selection = window.getSelection();
            if (!selection.isCollapsed) {
                var pageIndex = PDFViewerApplication.pdfViewer.currentPageNumber - 1;
                var page = PDFViewerApplication.pdfViewer.getPageView(pageIndex);
                var pageRect = page.canvas.getClientRects()[0];
                var selectionRects = selection.getRangeAt(0).getClientRects();
                var viewport = page.viewport;
                // adjust coordinates to fit in page's viewport
                var markerRects = [];
                for (var i = 0; i < selectionRects.length; i++) {
                    markerRects.push(
                        viewport.convertToPdfPoint(
                                    selectionRects[i].left - pageRect.left,
                                    selectionRects[i].top - pageRect.top)
                                .concat(
                                    viewport.convertToPdfPoint(
                                        selectionRects[i].right - pageRect.left,
                                        selectionRects[i].bottom - pageRect.top)
                                ));
                }

                if (selection.empty)
                    selection.empty();
                else if (selection.removeAllRanges)
                    selection.removeAllRanges();

                return {pageIndex: pageIndex, coordinates: markerRects};
            }
            return false;
        },
        markPageAnnotations: function (pageIndex) {
            annotator.pdfWorker.clearPageMarkers(pageIndex);
            for (var annoId in annotationData) {
                if (annotationData.hasOwnProperty(annoId) && annotationData[annoId].id) {
                    if (annotationData[annoId].reference.pageIndex == pageIndex) {
                        annotator.pdfWorker.markAnnotation(annotationData[annoId]);
                    }
                }
            }
        },
        markAnnotation: function (annotation, color) {
            if (annotation.id != 'temp' && annotation.author != guardian.annotationAPI.settings.getUserSlug() &&
                annotation.addressee.indexOf(guardian.annotationAPI.settings.getUserOrg()) < 0)
                return false;

            var page = PDFViewerApplication.pdfViewer.getPageView(annotation.reference.pageIndex);
            if (page.canvas) {
                var parentElement = page.canvas.parentElement;
                var viewport = page.viewport;
                var heightTolerance = 10 * PDFViewerApplication.pdfViewer.currentScale;
                var markerAdjustment = {
                    left: -3 * PDFViewerApplication.pdfViewer.currentScale,
                    top: -1 * PDFViewerApplication.pdfViewer.currentScale
                };
                markerAdjustment.width = -2 * markerAdjustment.left;
                markerAdjustment.height = -2 * markerAdjustment.top;

                // preparing markers and connect the neighbours to a continuous line
                var markerPartialBounds = viewport.convertToViewportRectangle(
                    annotation.reference.coordinates[0]);
                var markerBounds = [{
                    left: Math.min(markerPartialBounds[0], markerPartialBounds[2]),
                    top: Math.min(markerPartialBounds[1], markerPartialBounds[3]),
                    width: Math.abs(markerPartialBounds[0] - markerPartialBounds[2]),
                    height: Math.abs(markerPartialBounds[1] - markerPartialBounds[3])
                }];
                for (var i = 1; i < annotation.reference.coordinates.length; i++) {
                    markerPartialBounds = viewport.convertToViewportRectangle(annotation.reference.coordinates[i]);
                    if (Math.abs(markerBounds[markerBounds.length - 1].top -
                            Math.min(markerPartialBounds[1], markerPartialBounds[3]))
                        < heightTolerance) {
                        markerBounds[markerBounds.length - 1].left =
                            Math.min(markerBounds[markerBounds.length - 1].left,
                                Math.min(markerPartialBounds[0], markerPartialBounds[2]));
                        markerBounds[markerBounds.length - 1].width = Math.abs(
                            markerBounds[markerBounds.length - 1].left
                            - Math.max(markerPartialBounds[0], markerPartialBounds[2])
                        );
                        markerBounds[markerBounds.length - 1].height = Math.abs(
                            markerBounds[markerBounds.length - 1].top
                            - Math.max(markerPartialBounds[1], markerPartialBounds[3])
                        );
                    } else {
                        markerBounds.push({
                            left: Math.min(markerPartialBounds[0], markerPartialBounds[2]),
                            top: Math.min(markerPartialBounds[1], markerPartialBounds[3]),
                            width: Math.abs(markerPartialBounds[0] - markerPartialBounds[2]),
                            height: Math.abs(markerPartialBounds[1] - markerPartialBounds[3])
                        });
                    }
                }

                // drawing markers on canvas
                if (typeof color !== 'undefined') {
                    color = 'background-color: ' + color + ';';
                } else {
                    color = '';
                }
                markerBounds.forEach(function (markerBound) {
                    var marker = document.createElement('div');
                    marker.setAttribute('class', 'marker zindex');
                    marker.setAttribute('style',
                        'left:' + (markerBound.left + markerAdjustment.left) + 'px;' +
                        'top:' + (markerBound.top + markerAdjustment.top) + 'px;' +
                        'width:' + (markerBound.width + markerAdjustment.width) + 'px;' +
                        'height:' + (markerBound.height + markerAdjustment.height) + 'px;' +
                        color);
                    if (annotation.id != 'temp') {
                        if (annotation.id == state.annotator.activeAnnotationId)
                            marker.classList.add('active');
                        marker.setAttribute('data-id', annotation.id);
                        annotator.pdfWorker.setMarkerListeners(marker, annotation);
                    } else {
                        marker.classList.add('tempMarker');
                    }
                    parentElement.appendChild(marker);
                });
            }
        },
        setMarkerListeners: function (marker, annotation) {
            // mouse observation needed to compensate blocking behaviour of markers while user's text selection
            marker.addEventListener('mousedown', function (mousedownEvent) {
                // shift marker to background to select textLayer
                marker.classList.remove('zindex');
                // check how far the cursor moves after pressing the mouse button
                marker.parentElement.nextSibling.addEventListener('mouseup',
                    function analyseCursorMovement(mouseupEvent) {
                        if ((Math.abs(mouseupEvent.clientX - mousedownEvent.clientX) < 10)
                            && (Math.abs(mouseupEvent.clientY - mousedownEvent.clientY) < 10)) {
                            // user clicks at annotation
                            guardian.annotationAPI.activateAnnotation(annotation.pid, true, false);
                        }
                        // else { /* user is selecting text */ }
                        marker.classList.add('zindex');
                        marker.parentElement.nextSibling.removeEventListener('mouseup', analyseCursorMovement);
                    });
            });

            var meta = guardian.annotationAPI.meta.prepareMeta(annotation);
            meta.date = meta.date || 'unknown';
            meta.author.name = meta.author.name || 'unknown';
            meta.author.org.name = meta.author.org.name || 'unknown';
            marker.addEventListener('mouseover', function () {
                uiElements.field.output.viewer.author.innerText = meta.author.name;
                uiElements.field.output.viewer.org.innerText = meta.author.org.name;
                if (meta.author.org.abbr) {
                    uiElements.field.output.viewer.orgAbbr.innerText = meta.author.org.abbr;
                    uiElements.field.output.viewer.orgAbbr.classList.remove('hidden');
                }
                uiElements.field.output.viewer.date.innerText = meta.date;
                uiElements.field.output.viewer.annotation.innerText = annotation.annotation;
                uiElements.field.output.viewer.commentCount.innerText = annotation.comments.length;
                annotator.viewer.open();
            });
            marker.addEventListener('mouseout', function () {
                annotator.viewer.close();
                uiElements.field.output.viewer.author.innerText = null;
                uiElements.field.output.viewer.org.innerText = null;
                uiElements.field.output.viewer.orgAbbr.innerText = null;
                uiElements.field.output.viewer.orgAbbr.classList.add('hidden');
                uiElements.field.output.viewer.date.innerText = null;
                uiElements.field.output.viewer.annotation.innerText = null;
                uiElements.field.output.viewer.commentCount.innerText = null;
            });
        },
        clearAllMarkers: function () {
            for (var pageIndex = 0; pageIndex < PDFViewerApplication.pdfViewer.pagesCount; pageIndex++) {
                annotator.pdfWorker.clearPageMarkers(pageIndex);
            }
        },
        clearPageMarkers: function (pageIndex) {
            if (PDFViewerApplication.pdfViewer.getPageView(pageIndex).canvas) {
                var parentElement = PDFViewerApplication.pdfViewer.getPageView(pageIndex).canvas.parentElement;
                var markers = parentElement.getElementsByClassName('marker');
                for (var i = markers.length - 1; i >= 0; i--) {
                    parentElement.removeChild(markers[i]);
                }
            }
        },
        jumpToAnnotation: function () {
            PDFViewerApplication.pdfViewer.scrollPageIntoView(
                annotationData[state.annotator.activeAnnotationId].reference.pageIndex + 1,
                [
                    null,
                    {name: 'XYZ'},
                    annotationData[state.annotator.activeAnnotationId].reference.coordinates[0][0],
                    annotationData[state.annotator.activeAnnotationId].reference.coordinates[0][1]
                    + (PDFViewerApplication.pdfViewer.container.clientHeight / 3),
                    ((PDFViewerApplication.pdfViewer.currentScaleValue == 'page-fit') ? 'page-fit' : 'page-width')
                ]
            );
        },
        activateAnnotation: function (id, jumpTo) {
            jumpTo = (typeof jumpTo !== 'undefined') ? jumpTo : false;
            if (state.annotator.activeAnnotationId != id) {
                state.annotator.activeAnnotationId = id;
                var markers = document.querySelectorAll('[data-id]');
                for (var i = 0; i < markers.length; i++) {
                    if (markers[i].getAttribute('data-id') == state.annotator.activeAnnotationId) {
                        markers[i].classList.add('active');
                    } else {
                        markers[i].classList.remove('active');
                    }
                }
            }
            if (jumpTo)
                annotator.pdfWorker.jumpToAnnotation();
        }
    },
    errorHandler: function () {
        // TODO: nicer error message
        // TODO: try to reconnect before showing error message again
        console.error('annotator module unavailable');
        console.error(state.annotator.error);
        //alert('Sorry, but the annotator module is unavailable for this document!');
    }
};

/* Init Procedure */
var init = {
    dependencies: {
        connectionPing: false,
        ui: false,
        api: false
    },
    annotator: function () {
        if (init.connectionCheck()) {
            init.ui.init();
            annotatorAPI();
            guardian.annotationAPI.connect();
        } else {
            init.error();
        }
    },
    connectionCheck: function () {
        var found = false;
        if (typeof parent !== "undefined") {
            if (typeof parent.annotationAPI !== "undefined") {
                guardian = parent;
                found = true;
            } else if ((typeof parent.parent !== "undefined") &&
                (typeof parent.parent.annotationAPI !== "undefined")) {
                guardian = parent.parent;
                found = true;
            } else {
                state.annotator.error = 'annotation api is unreachable';
            }
        } else {
            state.annotator.error = 'I\'m an orphan - annotator could not find a parent';
        }
        if (found) {
            if (found = (typeof guardian.viewerAPI !== "undefined")) {
                guardian.annotationAPI.announceData();
            } else {
                state.annotator.error = 'No Desktop-Viewer recognized. - Annotation Module';
            }
        }
        return found;
    },
    ui: {
        init: function () {
            init.ui.importCSSFile(moduleLocation + fontAwesomeLocation);
            init.ui.importCSSFile(moduleLocation + 'annotator.css');
            init.ui.insertUIElements();
            init.ui.registerUIElements();
        },
        importCSSFile: function (cssFile) {
            var link = document.createElement('link');
            link.setAttribute('rel', 'stylesheet');
            link.setAttribute('type', 'text/css');
            link.setAttribute('href', cssFile);
            document.getElementsByTagName('head')[0].appendChild(link);
        },
        insertUIElements: function () {
            if (state.annotator.error)
                return false;
            /* Toolbar */
            document.getElementById('toolbarViewerRight')
                    .insertAdjacentHTML('afterbegin',
                        annotatorTemplates.toolbar.btn.annotate.primary +
                        annotatorTemplates.toolbar.btn.annotator.primary
                    );
            document.getElementById('secondaryToolbarButtonContainer')
                    .insertAdjacentHTML('afterbegin',
                        annotatorTemplates.toolbar.btn.annotate.secondary +
                        annotatorTemplates.toolbar.btn.annotator.secondary +
                        annotatorTemplates.toolbar.btn.secondarySeparator
                    );
            /* Annotator Bar */
            document.getElementById('outerContainer')
                    .insertAdjacentHTML('beforeend',
                        annotatorTemplates.annotatorBar.containerOpen +
                        annotatorTemplates.annotatorBar.viewer +
                        annotatorTemplates.annotatorBar.containerClose
                    );
        },
        registerUIElements: function () {
            uiElements = {
                btn: {
                    secondarySeparator: document.getElementById('secondaryAnnotatorSeparator'),
                    annotator: {
                        primary: document.getElementById('annotatorBtn'),
                        secondary: document.getElementById('secondaryAnnotatorBtn')
                    },
                    annotate: {
                        primary: document.getElementById('annotateBtn'),
                        secondary: document.getElementById('secondaryAnnotateBtn')
                    }
                },
                field: {
                    input: {},
                    output: {
                        viewer: {
                            author: document.getElementById('annoViewerAuthor'),
                            org: document.getElementById('annoViewerOrg'),
                            orgAbbr: document.getElementById('annoViewerOrgAbbr'),
                            date: document.getElementById('annoViewerDate'),
                            annotation: document.getElementById('annoViewerAnnotation'),
                            commentCount: document.getElementById('annoViewerCommentCount')
                        }
                    }
                },
                annotatorBar: {
                    viewer: document.getElementById('annotatorViewer')
                }
            };
        }
    },
    error: function () {
        if (document.getElementById('annotatorBtn'))
            document.getElementById('annotatorBtn').classList.add('hidden');
        if (document.getElementById('secondaryAnnotatorBtn'))
            document.getElementById('secondaryAnnotatorBtn').classList.add('hidden');
        if (document.getElementById('secondaryAnnotatorSeparator'))
            document.getElementById('secondaryAnnotatorSeparator').classList.add('hidden');

        var annoErrorPrimary = document.createElement('button');
        annoErrorPrimary.setAttribute('class', 'toolbarButton hiddenSmallView font-awesome warn');
        annoErrorPrimary.setAttribute('title', 'Annotations Unavailable');
        annoErrorPrimary.setAttribute('id', 'annotationErrorBtn');
        annoErrorPrimary.addEventListener('click', annotator.errorHandler);

        var toolbarPrimary = document.getElementById('toolbarViewerRight');
        toolbarPrimary.insertBefore(annoErrorPrimary, toolbarPrimary.firstChild);

        var separator = document.createElement('div');
        separator.setAttribute('class', 'horizontalToolbarSeparator');
        var annoErrorSecondary = document.createElement('button');
        annoErrorSecondary.setAttribute('class', 'secondaryToolbarButton titleContent font-awesome warn');
        annoErrorSecondary.setAttribute('title', 'Annotations Unavailable');
        annoErrorSecondary.setAttribute('id', 'secondaryAnnotationErrorBtn');
        annoErrorSecondary.addEventListener('click', annotator.errorHandler);

        var toolbarSecondary = document.getElementById('secondaryToolbarButtonContainer');
        toolbarSecondary.appendChild(separator);
        toolbarSecondary.appendChild(annoErrorSecondary);

        annotator.errorHandler();
    },
    setMainEventListeners: function () {
        document.addEventListener('pagerendered', function (event) {
            if (state.viewer.active) {
                annotator.pdfWorker.markPageAnnotations(event.detail.pageNumber - 1);
            }
        });
        document.getElementById('outerContainer').addEventListener('click', function () {
            // to enable annotation adding in pdf while another reference object is selected
            guardian.annotationAPI.returnToCurrentDocument();
        });
    }
};

function annotatorAPI() {
    guardian.annotatorAPI = {
        connect: function (annotatorData) {
            state.annotator.connected = true;

            if (annotatorData.error) {
                // loading annotatorData failed
                // TODO show error
                console.error(annotatorData.error);
            } else {
                state.viewer.available = true;
                annotationData = annotatorData.data;
            }

            init.setMainEventListeners();
            state.viewer.activate(guardian.annotationAPI.settings.isActivated());
            state.editor.available = guardian.annotationAPI.settings.isEditable();
            state.editor.activate(state.editor.available && state.viewer.active);
            return true;
        },
        updateData: annotator.updateData,
        deleteData: annotator.deleteData,
        activateAnnotation: annotator.pdfWorker.activateAnnotation,
        activateAnnotatorModule: function (activate) {
            state.viewer.activate(activate, true);
        }
    };
    console.info('annotator api loaded');
}

var annotatorTemplates = {
    toolbar: {
        btn: {
            secondarySeparator: '<div id="secondaryAnnotatorSeparator" class="horizontalToolbarSeparator"></div>',
            annotator: {
                primary: '<button id="annotatorBtn" title="Show Annotations" class="toolbarButton font-awesome annotator-off" onclick="state.viewer.activate()"></button>',
                secondary: '<button id="secondaryAnnotatorBtn" title="Show Annotations" class="secondaryToolbarButton titleContent font-awesome annotator-off" onclick="state.viewer.activate()"></button>'
            },
            annotate: {
                primary: '<button id="annotateBtn" title="Add Annotation" class="toolbarButton font-awesome add hidden" onclick="annotator.newAnnotation()"></button>',
                secondary: '<button id="secondaryAnnotateBtn" title="Add Annotation" class="secondaryToolbarButton titleContent font-awesome add hidden" onclick="annotator.newAnnotation()"></button>'
            }
        }
    },
    annotatorBar: {
        containerOpen: '<div id="annotatorBarContainer">',
        containerClose: '</div>',
        viewer: '<div id="annotatorViewer" class="annotatorBar hidden">' +
        '<div class="annoMetaContainer">' +
        '<span id="annoViewerAuthor"></span>' +
        '<span id="annoViewerOrg" class="hiddenSmallView"></span>' +
        '<span id="annoViewerOrgAbbr" class="hidden"></span>' +
        '<span id="annoViewerDate" class="pull-right"></span>' +
        '</div>' +
        '<div class="annoAnnotationContainer">' +
        '<div id="annoViewerAnnotation"></div>' +
        '<div id="annoViewerCommentCount"></div>' +
        '</div>' +
        '</div>'
    }
};

document.addEventListener("DOMContentLoaded", function (event) {
    console.log('annotator activated');
    init.annotator();
    console.info('annotator loaded');
});