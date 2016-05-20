class Submission {
    constructor(json) {
        if (arguments.length === 1) {
            this.SUBMISSION_NUMBER = json.SUBMISSION_NUMBER;
            this.SUBMISSION_VERSION_DATE = new Date(json.SUBMISSION_VERSION_DATE);
            this.SUBMISSION_TITLE = json.SUBMISSION_TITLE;
            this.INCREMENTAL = json.INCREMENTAL;
            
            this._id = json._id;
        }
        else {
            this.SUBMISSION_NUMBER = null;
            this.SUBMISSION_VERSION_DATE = null;
            this.SUBMISSION_TITLE = null;
            this.INCREMENTAL = null;
        }
    }
    
    toGhstsJson() {
        return {
            SUBMISSION_NUMBER: this.SUBMISSION_NUMBER,
            SUBMISSION_VERSION_DATE: this.SUBMISSION_VERSION_DATE.toString(),
            SUBMISSION_TITLE: this.SUBMISSION_TITLE,
            INCREMENTAL: this.INCREMENTAL
        };
    }
}

export { Submission };