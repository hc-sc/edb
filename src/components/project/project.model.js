const fs = require('fs');

const EDITABLE = 'EDITABLE';
const REVIEWED = 'REVIEWED';
const PACKAGED = 'PACKAGED';
const SENT = 'SENT';

// Project has the meta-data associated with it, it's folder name, etc.'
export class Project {
  constructor(path) {
    this.name = name;
    this.submissions = [];
    this.locals = new ProjectLocals();
  }

  getSubmissions() {
    return this.submissions;
  }

  isPackaged(submission) {
    return submission.state === PACKAGED;
  }

  lastIsPackaged() {
    return this.isPackaged(this.submissions[this.submissions.length - 1]);
  }

  createSubmission() {
    this.submissions.push(new ProjectSubmission());
  }

  reviewSubmission() {
    this.submissions[this.submissions.length].state = REVIEWED;
  }

  packageSubmission() {
    this.submissions[this.submissions.length - 1].state = PACKAGED;
  }

  sendSubmission() {
    this.submissions[this.submissions.length - 1].state = SENT;
  }

  validSubmission() {
    this.submissions[this.submissions.length - 1].setValid(true);
  }

  invalidSubmission() {
    this.submissions[this.submissions.length - 1].setValid(false);
  }
}

// Submission contains info like authors, reviewers, senders, and whether
export class ProjectSubmission {
  constructor() {
    this.state = EDITABLE;
    this.isValid = false;
    this.authoredBy = [];
    this.reviewedBy = [];
    this.sentBy = null;
  }

  setValid(validity) {
    if (validity === true) {
      this.isValid = true;
    }
    else this.isValid = false;
  }
}

export class ProjectLocals {
  constructor() {
    this.locals = null;
  }

  loadLocals() {
    if (this.locals === null) {
      fs.readFileSync()
    }
  }
}