(function () {
  'use strict';

  window.GhstsLinker = {
    openLink: openLink,
    getLinkedDocument: getLinkedDocument,
    openGoToRLink: openGoToRLink,
    getLinkedGoToRDocument: getLinkedGoToRDocument
  };

  function openLink(ghstsLink) {
    // call API in GHSTS Html viewer
    if (window.parent && window.parent.pdfViewerAPI && window.parent.pdfViewerAPI.openPdfGhstsLink) {
      window.parent.pdfViewerAPI.openPdfGhstsLink(ghstsLink);
    }
  }

  function getLinkedDocument(ghstsLink) {
    // call API in GHSTS Html viewer
    if (window.parent && window.parent.pdfViewerAPI && window.parent.pdfViewerAPI.getPdfGhstsLinkedDocument) {
      return window.parent.pdfViewerAPI.getPdfGhstsLinkedDocument(ghstsLink);
    }
  }

  function openGoToRLink(fileUrl) {
    // call API in GHSTS Html viewer
    if (window.parent && window.parent.pdfViewerAPI && window.parent.pdfViewerAPI.openPdfGhstsGoToRLink) {
      window.parent.pdfViewerAPI.openPdfGhstsGoToRLink(fileUrl);
    }
  }

  function getLinkedGoToRDocument(fileUrl) {
    // call API in GHSTS Html viewer
    if (window.parent && window.parent.pdfViewerAPI && window.parent.pdfViewerAPI.getPdfGhstsLinkedGoToRDocument) {
      return window.parent.pdfViewerAPI.getPdfGhstsLinkedGoToRDocument(fileUrl);
    }
  }

})();