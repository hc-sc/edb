class FileRA {
    constructor(json) {
        if (arguments.length === 1) {
            Object.assign(this, json);
        } else {
            this.METADATA_STATUS = {};
            this.CBI_DESIGNATION = null;
            this.FILE_COMMENT = null;
        }

    }
    set toSpecificForRaId(id) {
        this._toSpecificForRaId = id;
    }

    toGHSTSJson() {
        return {
            attr$: { To_Specific_for_RA_Id: this._toSpecificForRaId },
            METADATA_STATUS: this.METADATA_STATUS,
            CBI_DESIGNATION: this.CBI_DESIGNATION,
            FILE_COMMENT: this.FILE_COMMENT
        };
    }
}
/*
				<CONTENT_STATUS>
					<VALUE>New</VALUE>
					<VALUE_DECODE>New</VALUE_DECODE>
				</CONTENT_STATUS>
				<FILE_TYPE>
					<VALUE>Main</VALUE>
					<VALUE_DECODE>Main</VALUE_DECODE>
				</FILE_TYPE>
*/

class FileGeneric {
    constroctor(json) {
        if (arguments.length === 1) {
            // load from json
            Object.assign(this, json);
        } else {
            // this._identifier = null;            
            this.METADATA_STATUS = {};         // of ValueStruct
            this.FILE_PID = null;
            this.FILE_COMPANY_ID = null;
            this.CONTENT_STATUS = {};          // of ValueStruct
            this.REPLACED_FILE_PID = null;
            this.FILE_TYPE = {};
            this.FORMAT_COMMENT = null;
            this.MD5CHECKSUM = null;
            this.FILENAME = null;
        }
    }
}

class File {
    constructor(json) {
        if (arguments.length === 1) {
            // load from json
            Object.assign(this, json);
        } else {
            this._identifier = null;
            this.FILE_RA = [];
            this.FILE_GENERIC = {};             // of ContactAddress   
        }
    }
    set fileId(id) {
        this._identifier = id;
    }
    /*
    set fileRA(fileRA) { //fileRA is an array
        this.FILE_RA = fileRA;
    }
    */
    addFileRA(fileRA) {
        this.FILE_RA.push(fileRA);
    }
    set fileGeneric(fileGeneric) {
        this.FILE_GENERIC = fileGeneric;
    }

    toGHSTSJson() {
        let fileRAJson = [];
        this.FILE_RA.forEach(fileRA => fileRAJson.push(fileRA));

        return {
            attr$: { Id: this._identifier },
            FILE_GENERIC: this.FILE_GENERIC,
            FILE_RA: fileRAJson
        };
    }
}
export {FileRA, FileGeneric, File}