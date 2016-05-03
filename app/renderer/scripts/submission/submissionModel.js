class Submission {
    constructor(json){  
        if(arguments.length === 1){
            // load from json
            Object.assign(this, json);
        }else{            
            this.SUBMISSION_NUMBER = null;  
            this.SUBMISSION_VERSION_DATE = null;
            this.SUBMISSION_TITLE = null;
            this.INCREMENTAL = null;
        }     
    }
    
    set incremental(is_incremental){
        this.INCREMENTAL = "TRUE"; // override for now
    }
 
    toGHSTSJson() {     
      return {
            SUBMISSION_NUMBER       : this.SUBMISSION_NUMBER,  
            SUBMISSION_VERSION_DATE : this.SUBMISSION_VERSION_DATE,
            SUBMISSION_TITLE        : this.SUBMISSION_TITLE,
            INCREMENTAL             : this.INCREMENTAL
        };               
    }          
}    

export {Submission}