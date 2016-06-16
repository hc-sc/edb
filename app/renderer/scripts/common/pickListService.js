import angular from 'angular';
import {ValueStruct} from '../common/sharedModel';

class PickListService {
    constructor() {
    }

    getMetadataStatusOptions() {
        return [
            {VALUE_DECODE: "New", VALUE: "New"},		 	
            {VALUE_DECODE: "No Change", VALUE: "No Change"},
            {VALUE_DECODE: "Modified", VALUE: "Modified"}
        ];
    }
	
    getYesNoOptions() {
        return [
            {VALUE_DECODE: "Yes", VALUE: "Y"},		 	
		 	{VALUE_DECODE: "No", VALUE: "N"},
			{VALUE_DECODE: "Open", VALUE: "O"}
		 	
        ];
    }
	
	getSpecificRaIdOptions(){
		return [
            {VALUE_DECODE: "ID_RECEIVER_BVL", VALUE: "ID_RECEIVER_BVL"},		 	
		 	{VALUE_DECODE: "ID_RECEIVER_PMRA", VALUE: "ID_RECEIVER_PMRA"},
			{VALUE_DECODE: "ID_RECEIVER_APVMA", VALUE: "ID_RECEIVER_APVMA"},
			{VALUE_DECODE: "ID_RECEIVER_IBAMA", VALUE: "ID_RECEIVER_IBAMA"}
		 	
        ];
	}
	
	getGEDocReferenceTypeOptions() {
        return [
            {VALUE_DECODE: "document to replaced document", VALUE: "document to replaced document"},		 	
		 	{VALUE_DECODE: "document to submitted document", VALUE: "document to submitted document"},
			{VALUE_DECODE: "document to unchanged predecessor document", VALUE: "document to unchanged predecessor document"},
			{VALUE_DECODE: "translation to document", VALUE: "translation to document"}	
        ];
    }

	
    getGEDocNumberTypeOptions() {
        return [
            {VALUE_DECODE: "Company ID", VALUE: "COMPID"},
			{VALUE_DECODE: "Company ID 1", VALUE: "COMPID_1"},
			{VALUE_DECODE: "Company ID 2", VALUE: "COMPID_2"},
			{VALUE_DECODE: "other", VALUE: "other"}		
        ];
    }
	
	getGEDocContentStatusTypeOptions() {
        return [
            {VALUE_DECODE: "New", VALUE: "New"},
			{VALUE_DECODE: "Modified", VALUE: "Modified"},
			{VALUE_DECODE: "No Change", VALUE: "No Change"},
			{VALUE_DECODE: "Replace", VALUE: "Replace"},
			{VALUE_DECODE: "Retired", VALUE: "Retired"}	
        ];
    }
	
	
	
    getRADocNumberTypeOptions() {
        return [
            {VALUE_DECODE: "MRID", VALUE: "MRID"},
			{VALUE_DECODE: "PRMA", VALUE: "PRMA"},
			{VALUE_DECODE: "other", VALUE: "other"}		
        ];
    }
    
    getLegalEntityIdentifierTypeOptions() {
        return [
            {VALUE_DECODE: "DUNS-number", VALUE: "DUNS-number"},		 	
            {VALUE_DECODE: "REACH", VALUE: "REACH"},
            {VALUE_DECODE: "SAP", VALUE: "SAP"},
            {VALUE_DECODE: "VAT-number", VALUE: "VAT-number"},
            {VALUE_DECODE: "other", VALUE: "other"}
        ];
    }
    
    getLegalEntityTypeOptions(){
        return [
            {VALUE_DECODE: "Company", VALUE: "Company"},
            {VALUE_DECODE: "Consultant", VALUE: "Consultant"},
            {VALUE_DECODE: "other", VALUE: "other"},
            {VALUE_DECODE: "Regulatory Authority", VALUE: "Regulatory Authority"},
            {VALUE_DECODE: "Test House", VALUE: "Test House"},
            {VALUE_DECODE: "Third Party", VALUE: "Third Party"},
            {VALUE_DECODE: "University", VALUE: "University"}
        ];
    }
	
    getAdminNumberTypeOptions() {
        return [
			{VALUE_DECODE: "Application Number", VALUE: "Application Number"},
			{VALUE_DECODE: "BVL Kenn-Nr.", VALUE: "BVL Kenn-Nr."},
			{VALUE_DECODE: "EPA Decision No", VALUE: "EPA Decision No"},
			{VALUE_DECODE: "Experimental Use Permit", VALUE: "Experimental Use Permit"},
			{VALUE_DECODE: "Inert Ingredient clearence request", VALUE: "Inert Ingredient clearence request"},
			{VALUE_DECODE: "other", VALUE: "other"},
			{VALUE_DECODE: "PRMA Decision No", VALUE: "PMRA Decision No"},
			{VALUE_DECODE: "PRIA Pre-application", VALUE: ""},
			{VALUE_DECODE: "Section 3 product", VALUE: "Section 3 product"},
			{VALUE_DECODE: "Tolerance Petition", VALUE: "Tolerance Petition"}
        ];
    }
	
    getApplicationTypeOptions() {
        return [
			{VALUE_DECODE: "6(a)(2) submission", VALUE: "6(a)(2) submission"},
			{VALUE_DECODE: "A1 - New active", VALUE: "A1 - New active"},
			{VALUE_DECODE: "A2 - Known active", VALUE: "A2 - Known active"},
			{VALUE_DECODE: "ACVM Registration", VALUE: "ACVM Registration"},
			{VALUE_DECODE: "Amendment", VALUE: "Amendment"},
			{VALUE_DECODE: "B1 - Identical", VALUE: "B1 - Identical"},
			{VALUE_DECODE: "B2 - Similar", VALUE: "B2 - Similar"},
			{VALUE_DECODE: "C1 - Formulation", VALUE: "C1 - Formulation"},
			{VALUE_DECODE: "C10 - Reassessment", VALUE: "C10 - Reassessment"},
			{VALUE_DECODE: "C11 - Refilling/Se", VALUE: "C11 - Refilling/Se"},
			{VALUE_DECODE: "C12 - Registration Condition Change", VALUE: "C12 - Registration Condition Change"},
			{VALUE_DECODE: 'C2 - Manufacturing', VALUE: 'C2 - Manufacturing'},
			{VALUE_DECODE: 'C3 - Shelf life/pa', VALUE: 'C3 - Shelf life/pa'},
			{VALUE_DECODE: 'C4 - Target host', VALUE: 'C4 - Target host'},
			{VALUE_DECODE: 'C5 - Pest/disease', VALUE: 'C5 - Pest/disease'},
			{VALUE_DECODE: 'C6 - Dose/rate', VALUE: 'C6 - Dose/rate'},
			{VALUE_DECODE: 'C7 - Admin method', VALUE: 'C7 - Admin method'},
			{VALUE_DECODE: 'C8 - WHP', VALUE: 'C8 - WHP'},
			{VALUE_DECODE: 'C9 - Admin change', VALUE: 'C9 - Admin change'},
			{VALUE_DECODE: 'C9 - Reg Renewal', VALUE: 'C9 - Reg Renewal'},
			{VALUE_DECODE: 'Cat A: Similar product already registered (cite approval number of precedent product in the cover letter), EPA  approval', VALUE: 'Cat A: Similar product already registered (cite approval number of precedent product in the cover letter), EPA  approval'},
			{VALUE_DECODE: 'Cat B: New or amended label statements, EPA  approval', VALUE: 'Cat B: New or amended label statements, EPA  approval'},
			{VALUE_DECODE: 'Cat B: New or amended product chemistry, EPA approval', VALUE: 'Cat B: New or amended product chemistry, EPA approval'},
			{VALUE_DECODE: 'Cat B: Other (specify in the cover letter), EPA approval', VALUE: 'Cat B: Other (specify in the cover letter), EPA approval'},
			{VALUE_DECODE: 'Cat C: New active ingredient, EPA approval', VALUE: 'Cat C: New active ingredient, EPA approval'},
			{VALUE_DECODE: 'Category A: New Active Ingredient, Canadian Registration', VALUE: 'Category A: New Active Ingredient, Canadian Registration'},
			{VALUE_DECODE: 'Category A: New Active Ingredient, Import MRL only', VALUE: 'Category A: New Active Ingredient, Import MRL only'},
			{VALUE_DECODE: 'Category A: New Active Ingredient, Minor New Use', VALUE: 'Category A: New Active Ingredient, Minor New Use'},
			{VALUE_DECODE: 'Category A: New Active Ingredient, URMUR', VALUE: 'Category A: New Active Ingredient, URMUR'},
			{VALUE_DECODE: 'Category B: Conversion/Renewal of Conditional Registration', VALUE: 'Category B: Conversion/Renewal of Conditional Registration'},
			{VALUE_DECODE: 'Category B: Emergency Registration', VALUE: 'Category B: Emergency Registration'},
			{VALUE_DECODE: 'Category B: New MRL(s) for previously assessed active ingredient', VALUE: 'Category B: New MRL(s) for previously assessed active ingredient'},
			{VALUE_DECODE: 'Category B: New or amended label statements', VALUE: 'Category B: New or amended label statements'},
			{VALUE_DECODE: 'Category B: New or amended product chemistry', VALUE: 'Category B: New or amended product chemistry'},
			{VALUE_DECODE: 'Category B: Other (specify in the cover letter)', VALUE: 'Category B: Other (specify in the cover letter)'},
			{VALUE_DECODE: 'Category C: New or amended label statements', VALUE: 'Category C: New or amended label statements'},
			{VALUE_DECODE: 'Category C: New or amended product chemistry', VALUE: 'Category C: New or amended product chemistry'},
			{VALUE_DECODE: 'Category C: Reinstatement of Previously Registered Product', VALUE: 'Category C: Reinstatement of Previously Registered Product'},
			{VALUE_DECODE: 'Category C: Similar product or use already registered (cite Registration number of precedent product in the cover letter)', VALUE: 'Category C: Similar product or use already registered (cite Registration number of precedent product in the cover letter)'},
			{VALUE_DECODE: 'Category D: IMEP', VALUE: 'Category D: IMEP'},
			{VALUE_DECODE: 'Category D: Label Improvement Program', VALUE: 'Category D: Label Improvement Program'},
			{VALUE_DECODE: 'Category D: New Master Copy based on Master Product (specify in the cover letter)', VALUE: 'Category D: New Master Copy based on Master Product (specify in the cover letter)'},
			{VALUE_DECODE: 'Category D: New Minor Use', VALUE: 'Category D: New Minor Use'},
			{VALUE_DECODE: 'Category D: New Private Label', VALUE: 'Category D: New Private Label'},
			{VALUE_DECODE: 'Category D: Renewal', VALUE: 'Category D: Renewal'},
			{VALUE_DECODE: 'Category E: Research Authorization', VALUE: 'Category E: Research Authorization'},
			{VALUE_DECODE: 'Category F: Administrative changes: Change in source of registered active ingredient', VALUE: 'Category F: Administrative changes: Change in source of registered active ingredient'},
			{VALUE_DECODE: 'Category F: Administrative changes: Other (specify in the cover letter)', VALUE: 'Category F: Administrative changes: Other (specify in the cover letter)'},
			{VALUE_DECODE: 'Category F: Administrative changes: Registration or addition of minor use', VALUE: 'Category F: Administrative changes: Registration or addition of minor use'},
			{VALUE_DECODE: 'Category F: Discontinue a registered product', VALUE: 'Category F: Discontinue a registered product'},
			{VALUE_DECODE: 'Category G: Submit Information as a Third Party', VALUE: 'Category G: Submit Information as a Third Party'},
			{VALUE_DECODE: 'Category G: Voluntary Submission of Data', VALUE: 'Category G: Voluntary Submission of Data'},
			{VALUE_DECODE: 'Category H: Submit a Notice of Objection', VALUE: 'Category H: Submit a Notice of Objection'},
			{VALUE_DECODE: 'Category R: Data for Re-evaluation', VALUE: 'Category R: Data for Re-evaluation'},
			{VALUE_DECODE: 'Category R: Request a Special Review', VALUE: 'Category R: Request a Special Review'},
			{VALUE_DECODE: 'Category S: Sales Report', VALUE: 'Category S: Sales Report'},
			{VALUE_DECODE: 'Category X: Incident Report', VALUE: 'Category X: Incident Report'},
			{VALUE_DECODE: 'Change in source of registered active ingredient', VALUE: 'Change in source of registered active ingredient'},
			{VALUE_DECODE: 'Containment', VALUE: 'Containment'},
			{VALUE_DECODE: 'DAS', VALUE: 'DAS'},
			{VALUE_DECODE: 'EPA OPPTS', VALUE: 'EPA OPPTS'},
			{VALUE_DECODE: 'EU OECD dRR', VALUE: 'EU OECD dRR'},
			{VALUE_DECODE: 'Joint Review, other', VALUE: 'Joint Review, other'},
			{VALUE_DECODE: 'New application', VALUE: 'New application'},
			{VALUE_DECODE: 'OECD Annex II', VALUE: 'OECD Annex II'},
			{VALUE_DECODE: 'OECD Annex II Joint Review', VALUE: 'OECD Annex II Joint Review'},
			{VALUE_DECODE: 'OECD Annex III', VALUE: 'OECD Annex III'},
			{VALUE_DECODE: 'other', VALUE: 'other'},
			{VALUE_DECODE: 'PMRA DACO', VALUE: 'PMRA DACO'},
			{VALUE_DECODE: 'Provisional', VALUE: 'Provisional'},
			{VALUE_DECODE: 'Rapid: lesser degree of hazard than an approved substance', VALUE: 'Rapid: lesser degree of hazard than an approved substance'},
			{VALUE_DECODE: 'Rapid: low hazard', VALUE: 'Rapid: low hazard'},
			{VALUE_DECODE: 'Rapid: similar substance', VALUE: 'Rapid: similar substance'},
			{VALUE_DECODE: 'Research Approval', VALUE: 'Research Approval'}
        ];
    }
	
    getFormulationTypeOptions() {
        return [
			{VALUE_DECODE: 'AE', VALUE: 'AE'},
			{VALUE_DECODE: 'AL', VALUE: 'AL'},
			{VALUE_DECODE: 'BB', VALUE: 'BB'},
			{VALUE_DECODE: 'BR', VALUE: 'BR'},
			{VALUE_DECODE: 'CB', VALUE: 'CB'},
			{VALUE_DECODE: 'CG', VALUE: 'CG'},
			{VALUE_DECODE: 'CS', VALUE: 'CS'},
			{VALUE_DECODE: 'DC', VALUE: 'DC'},
			{VALUE_DECODE: 'DP', VALUE: 'DP'},
			{VALUE_DECODE: 'DS', VALUE: 'DS'},
			{VALUE_DECODE: 'EC', VALUE: 'EC'},
			{VALUE_DECODE: 'ED', VALUE: 'ED'},
			{VALUE_DECODE: 'EO', VALUE: 'EO'},
			{VALUE_DECODE: 'ES', VALUE: 'ES'},
			{VALUE_DECODE: 'EW', VALUE: 'EW'},
			{VALUE_DECODE: 'FD', VALUE: 'FD'},
			{VALUE_DECODE: 'FG', VALUE: 'FG'},
			{VALUE_DECODE: 'FK', VALUE: 'FK'},
			{VALUE_DECODE: 'FP', VALUE: 'FP'},
			{VALUE_DECODE: 'FR', VALUE: 'FR'},
			{VALUE_DECODE: 'FS', VALUE: 'FS'},
			{VALUE_DECODE: 'FT', VALUE: 'FT'},
			{VALUE_DECODE: 'FU', VALUE: 'FU'},
			{VALUE_DECODE: 'FW', VALUE: 'FW'},
			{VALUE_DECODE: 'GA', VALUE: 'GA'},
			{VALUE_DECODE: 'GB', VALUE: 'GB'},
			{VALUE_DECODE: 'GE', VALUE: 'GE'},
			{VALUE_DECODE: 'GG', VALUE: 'GG'},
			{VALUE_DECODE: 'GP', VALUE: 'GP'},
			{VALUE_DECODE: 'GR', VALUE: 'GR'},
			{VALUE_DECODE: 'GS', VALUE: 'GS'},
			{VALUE_DECODE: 'HN', VALUE: 'HN'},
			{VALUE_DECODE: 'KN', VALUE: 'KN'},
			{VALUE_DECODE: 'LA', VALUE: 'LA'},
			{VALUE_DECODE: 'LS', VALUE: 'LS'},
			{VALUE_DECODE: 'MG', VALUE: 'MG'},
			{VALUE_DECODE: 'OF', VALUE: 'OF'},
			{VALUE_DECODE: 'OL', VALUE: 'OL'},
			{VALUE_DECODE: 'OP', VALUE: 'OP'},
			{VALUE_DECODE: 'other', VALUE: 'other'},
			{VALUE_DECODE: 'PA', VALUE: 'PA'},
			{VALUE_DECODE: 'PB', VALUE: 'PB'},
			{VALUE_DECODE: 'PC', VALUE: 'PC'},
			{VALUE_DECODE: 'PR', VALUE: 'PR'},
			{VALUE_DECODE: 'PS', VALUE: 'PS'},
			{VALUE_DECODE: 'RB', VALUE: 'RB'},
			{VALUE_DECODE: 'SB', VALUE: 'SB'},
			{VALUE_DECODE: 'SC', VALUE: 'SC'},
			{VALUE_DECODE: 'SE', VALUE: 'SE'},
			{VALUE_DECODE: 'SG', VALUE: 'SG'},
			{VALUE_DECODE: 'SL', VALUE: 'SL'},
			{VALUE_DECODE: 'SO', VALUE: 'SO'},
			{VALUE_DECODE: 'SP', VALUE: 'SP'},
			{VALUE_DECODE: 'SS', VALUE: 'SS'},
			{VALUE_DECODE: 'SU', VALUE: 'SU'},
			{VALUE_DECODE: 'TB', VALUE: 'TB'},
			{VALUE_DECODE: 'TP', VALUE: 'TP'},
			{VALUE_DECODE: 'UL', VALUE: 'UL'},
			{VALUE_DECODE: 'VP', VALUE: 'VP'},
			{VALUE_DECODE: 'WG', VALUE: 'WG'},
			{VALUE_DECODE: 'WP', VALUE: 'WP'},
			{VALUE_DECODE: 'WS', VALUE: 'WS'}	
        ];
    }
	
    getUnitTypeOptions() {
        return [
			{VALUE_DECODE: '%(v/v)', VALUE: '%(v/v)'},
			{VALUE_DECODE: '%(w/w)', VALUE: '%(w/w)'},
			{VALUE_DECODE: 'B cells/ml', VALUE: 'B cells/ml'},
			{VALUE_DECODE: 'B CFU/g', VALUE: 'B CFU/g'},
			{VALUE_DECODE: 'BTTU/g', VALUE: 'BTTU/g'},
			{VALUE_DECODE: 'CFU/g', VALUE: 'CFU/g'},
			{VALUE_DECODE: 'CFU/L', VALUE: 'CFU/L'},
			{VALUE_DECODE: 'DBMU/mg', VALUE: 'DBMU/mg'},
			{VALUE_DECODE: 'g/kg', VALUE: 'g/kg'},
			{VALUE_DECODE: 'g/kg (as CU)', VALUE: 'g/kg (as CU)'},
			{VALUE_DECODE: 'g/kg (as S)', VALUE: 'g/kg (as S)'},
			{VALUE_DECODE: 'g/L', VALUE: 'g/L'},
			{VALUE_DECODE: 'g/L (as CU)', VALUE: 'g/L (as CU)'},
			{VALUE_DECODE: 'g/L (as S)', VALUE: 'g/L (as S)'},
			{VALUE_DECODE: 'granules/L', VALUE: 'granules/L'},
			{VALUE_DECODE: 'IU/mg', VALUE: 'IU/mg'},
			{VALUE_DECODE: 'M cells/g', VALUE: 'M cells/g'},
			{VALUE_DECODE: 'M CFU/g', VALUE: 'M CFU/g'},
			{VALUE_DECODE: 'M CFU/ml', VALUE: 'M CFU/ml'},
			{VALUE_DECODE: 'M Units/dowel', VALUE: 'M Units/dowel'},
			{VALUE_DECODE: 'mg/kg', VALUE: 'mg/kg'},
			{VALUE_DECODE: 'mg/L', VALUE: 'mg/L'},
			{VALUE_DECODE: 'ml/L', VALUE: 'ml/L'},
			{VALUE_DECODE: 'other', VALUE: 'other'},
			{VALUE_DECODE: 'qs', VALUE: 'qs'},
			{VALUE_DECODE: 'spores/kg', VALUE: 'spores/kg'},
			{VALUE_DECODE: 'thou IU/mg', VALUE: 'thou IU/mg'},
			{VALUE_DECODE: 'to pH', VALUE: 'to pH'},
			{VALUE_DECODE: 'trace', VALUE: 'trace'}
        ];
    }
	
    getRegulatoryTypeOptions() {
        return [
			{VALUE_DECODE: '1107/2009/EG', VALUE: '1107/2009/EG'},
			{VALUE_DECODE: '21 CFR Part 11', VALUE: '21 CFR Part 11'},
			{VALUE_DECODE: '91/414/EEC', VALUE: '91/414/EEC'},
			{VALUE_DECODE: '98/8/EG', VALUE: '98/8/EG'},
			{VALUE_DECODE: 'Agricultural Compounds and Veterinary Medicines Act 1997', VALUE: 'Agricultural Compounds and Veterinary Medicines Act 1997'},
			{VALUE_DECODE: 'FIFRA', VALUE: 'FIFRA'},
			{VALUE_DECODE: 'Food Quality Protection Act', VALUE: 'Food Quality Protection Act'},
			{VALUE_DECODE: 'Hazardous Substances and New Organisms Act 1996', VALUE: 'Hazardous Substances and New Organisms Act 1996'},
			{VALUE_DECODE: 'other', VALUE: 'other'},
			{VALUE_DECODE: 'PCPA-Pest Control Products Act', VALUE: 'PCPA-Pest Control Products Act'},
			{VALUE_DECODE: 'Pesticide Registration Improvement Act', VALUE: 'Pesticide Registration Improvement Act'}
        ];
    }
	
    getContentStatusOptions() {
        return [
			{VALUE_DECODE: 'Modified', VALUE: 'Modified'},
			{VALUE_DECODE: 'New', VALUE: 'New'},
			{VALUE_DECODE: 'No Change', VALUE: 'No Change'},
			{VALUE_DECODE: 'Replace', VALUE: 'Replace'},
			{VALUE_DECODE: 'Retired', VALUE: 'Retired'}
        ];
    }
    
    getCountryOptions(){
        return [
            {VALUE_DECODE: "Andorra", VALUE: "AD"},
			{VALUE_DECODE: "United Arab Emirates", VALUE: "AE"},
			{VALUE_DECODE: "Afghanistan", VALUE: "AF"},
			{VALUE_DECODE: "Antigua and Barbuda", VALUE: "AG"},
			{VALUE_DECODE: "Anguilla", VALUE: "AI"},
			{VALUE_DECODE: "Albania", VALUE: "AL"},
			{VALUE_DECODE: "Armenia", VALUE: "AM"},
			{VALUE_DECODE: "Angola", VALUE: "AO"},
			{VALUE_DECODE: "Antarctica", VALUE: "AQ"},
			{VALUE_DECODE: "Argentina", VALUE: "AR"},
			{VALUE_DECODE: "American Samoa", VALUE: "AS"},
			{VALUE_DECODE: "Austria", VALUE: "AT"},
			{VALUE_DECODE: "Australia", VALUE: "AU"},
			{VALUE_DECODE: "Aruba", VALUE: "AW"},
			{VALUE_DECODE: "Åland", VALUE: "AX"},
			{VALUE_DECODE: "Azerbaijan", VALUE: "AZ"},
			{VALUE_DECODE: "Bosnia and Herzegovina", VALUE: "BA"},
			{VALUE_DECODE: "Barbados", VALUE: "BB"},
			{VALUE_DECODE: "Bangladesh", VALUE: "BD"},
			{VALUE_DECODE: "Belgium", VALUE: "BE"},
			{VALUE_DECODE: "Burkina Faso", VALUE: "BF"},
			{VALUE_DECODE: "Bulgaria", VALUE: "BG"},
			{VALUE_DECODE: "Bahrain", VALUE: "BH"},
			{VALUE_DECODE: "Burundi", VALUE: "BI"},
			{VALUE_DECODE: "Benin", VALUE: "BJ"},
			{VALUE_DECODE: "Saint Barthélemy", VALUE: "BL"},
			{VALUE_DECODE: "Bermuda", VALUE: "BM"},
			{VALUE_DECODE: "Brunei Darussalam", VALUE: "BN"},
			{VALUE_DECODE: "Bolivia (Plurinational State of)", VALUE: "BO"},
			{VALUE_DECODE: "Bonaire, Sint Eustatius and Saba", VALUE: "BQ"},
			{VALUE_DECODE: "Brazil", VALUE: "BR"},
			{VALUE_DECODE: "Bahamas", VALUE: "BS"},
			{VALUE_DECODE: "Bhutan", VALUE: "BT"},
			{VALUE_DECODE: "Bouvet Island", VALUE: "BV"},
			{VALUE_DECODE: "Botswana", VALUE: "BW"},
			{VALUE_DECODE: "Belarus", VALUE: "BY"},
			{VALUE_DECODE: "Belize", VALUE: "BZ"},
			{VALUE_DECODE: "Canada", VALUE: "CA"},
			{VALUE_DECODE: "Cocos (Keeling) Islands", VALUE: "CC"},
			{VALUE_DECODE: "Democratic Republic of the Congo", VALUE: "CD"},
			{VALUE_DECODE: "Central African Republic", VALUE: "CF"},
			{VALUE_DECODE: "Congo", VALUE: "CG"},
			{VALUE_DECODE: "Switzerland", VALUE: "CH"},
			{VALUE_DECODE: "Côte d'Ivoire", VALUE: "CI"},
			{VALUE_DECODE: "Cook Islands", VALUE: "CK"},
			{VALUE_DECODE: "Chile", VALUE: "CL"},
			{VALUE_DECODE: "Cameroon", VALUE: "CM"},
			{VALUE_DECODE: "China", VALUE: "CN"},
			{VALUE_DECODE: "Colombia", VALUE: "CO"},
			{VALUE_DECODE: "Costa Rica", VALUE: "CR"},
			{VALUE_DECODE: "Cuba", VALUE: "CU"},
			{VALUE_DECODE: "Cape Verde", VALUE: "CV"},
			{VALUE_DECODE: "Curaçao", VALUE: "CW"},
			{VALUE_DECODE: "Christmas Island", VALUE: "CX"},
			{VALUE_DECODE: "Cyprus", VALUE: "CY"},
			{VALUE_DECODE: "Czech Republic", VALUE: "CZ"},
			{VALUE_DECODE: "Germany", VALUE: "DE"},
			{VALUE_DECODE: "Djibouti", VALUE: "DJ"},
			{VALUE_DECODE: "Denmark", VALUE: "DK"},
			{VALUE_DECODE: "Dominica", VALUE: "DM"},
			{VALUE_DECODE: "Dominican Republic", VALUE: "DO"},
			{VALUE_DECODE: "Algeria", VALUE: "DZ"},
			{VALUE_DECODE: "Ecuador", VALUE: "EC"},
			{VALUE_DECODE: "Estonia", VALUE: "EE"},
			{VALUE_DECODE: "Egypt", VALUE: "EG"},
			{VALUE_DECODE: "Western Sahara", VALUE: "EH"},
			{VALUE_DECODE: "Eritrea", VALUE: "ER"},
			{VALUE_DECODE: "Spain", VALUE: "ES"},
			{VALUE_DECODE: "Ethiopia", VALUE: "ET"},
			{VALUE_DECODE: "Finland", VALUE: "FI"},
			{VALUE_DECODE: "Fiji", VALUE: "FJ"},
			{VALUE_DECODE: "Micronesia (Federated States of)", VALUE: "FM"},
			{VALUE_DECODE: "Faroe Islands", VALUE: "FO"},
			{VALUE_DECODE: "France", VALUE: "FR"},
			{VALUE_DECODE: "Gabon", VALUE: "GA"},
			{VALUE_DECODE: "United Kingdom", VALUE: "GB"},
			{VALUE_DECODE: "Grenada", VALUE: "GD"},
			{VALUE_DECODE: "Georgia", VALUE: "GE"},
			{VALUE_DECODE: "French Guiana", VALUE: "GF"},
			{VALUE_DECODE: "Guernsey", VALUE: "GG"},
			{VALUE_DECODE: "Ghana", VALUE: "GH"},
			{VALUE_DECODE: "Gibraltar", VALUE: "GI"},
			{VALUE_DECODE: "Greenland", VALUE: "GL"},
			{VALUE_DECODE: "Gambia", VALUE: "GM"},
			{VALUE_DECODE: "Guinea", VALUE: "GN"},
			{VALUE_DECODE: "Guadeloupe", VALUE: "GP"},
			{VALUE_DECODE: "Equatorial Guinea", VALUE: "GQ"},
			{VALUE_DECODE: "Greece", VALUE: "GR"},
			{VALUE_DECODE: "South Georgia and the South Sandwich Islands", VALUE: "GS"},
			{VALUE_DECODE: "Guatemala", VALUE: "GT"},
			{VALUE_DECODE: "Guam", VALUE: "GU"},
			{VALUE_DECODE: "Guinea-Bissau", VALUE: "GW"},
			{VALUE_DECODE: "Guyana", VALUE: "GY"},
			{VALUE_DECODE: "Hong Kong, China", VALUE: "HK"},
			{VALUE_DECODE: "Heard Island and McDonald Islands", VALUE: "HM"},
			{VALUE_DECODE: "Honduras", VALUE: "HN"},
			{VALUE_DECODE: "Croatia", VALUE: "HR"},
			{VALUE_DECODE: "Haiti", VALUE: "HT"},
			{VALUE_DECODE: "Hungary", VALUE: "HU"},
			{VALUE_DECODE: "Indonesia", VALUE: "ID"},
			{VALUE_DECODE: "Ireland", VALUE: "IE"},
			{VALUE_DECODE: "Israel", VALUE: "IL"},
			{VALUE_DECODE: "Isle of man", VALUE: "IM"},
			{VALUE_DECODE: "India", VALUE: "IN"},
			{VALUE_DECODE: "British Indian Ocean Territory", VALUE: "IO"},
			{VALUE_DECODE: "Iraq", VALUE: "IQ"},
			{VALUE_DECODE: "Iran (Islamic Republic of)", VALUE: "IR"},
			{VALUE_DECODE: "Iceland", VALUE: "IS"},
			{VALUE_DECODE: "Italy", VALUE: "IT"},
			{VALUE_DECODE: "Jersey", VALUE: "JE"},
			{VALUE_DECODE: "Jamaica", VALUE: "JM"},
			{VALUE_DECODE: "Jordan", VALUE: "JO"},
			{VALUE_DECODE: "Japan", VALUE: "JP"},
			{VALUE_DECODE: "Kenya", VALUE: "KE"},
			{VALUE_DECODE: "Kyrgyzstan", VALUE: "KG"},
			{VALUE_DECODE: "Cambodia", VALUE: "KH"},
			{VALUE_DECODE: "Kiribati", VALUE: "KI"},
			{VALUE_DECODE: "Comoros", VALUE: "KM"},
			{VALUE_DECODE: "Saint Kitts and Nevis", VALUE: "KN"},
			{VALUE_DECODE: "Democratic People's Republic of Korea", VALUE: "KP"},
			{VALUE_DECODE: "Korea", VALUE: "KR"},
			{VALUE_DECODE: "Kuwait", VALUE: "KW"},
			{VALUE_DECODE: "Cayman Islands", VALUE: "KY"},
			{VALUE_DECODE: "Kazakhstan", VALUE: "KZ"},
			{VALUE_DECODE: "Lao People's Democratic Republic", VALUE: "LA"},
			{VALUE_DECODE: "Lebanon", VALUE: "LB"},
			{VALUE_DECODE: "Saint Lucia", VALUE: "LC"},
			{VALUE_DECODE: "Liechtenstein", VALUE: "LI"},
			{VALUE_DECODE: "Sri Lanka", VALUE: "LK"},
			{VALUE_DECODE: "Liberia", VALUE: "LR"},
			{VALUE_DECODE: "Lesotho", VALUE: "LS"},
			{VALUE_DECODE: "Lithuania", VALUE: "LT"},
			{VALUE_DECODE: "Luxembourg", VALUE: "LU"},
			{VALUE_DECODE: "Latvia", VALUE: "LV"},
			{VALUE_DECODE: "Libya", VALUE: "LY"},
			{VALUE_DECODE: "Morocco", VALUE: "MA"},
			{VALUE_DECODE: "Monaco", VALUE: "MC"},
			{VALUE_DECODE: "Moldova (Republic of)", VALUE: "MD"},
			{VALUE_DECODE: "Montenegro", VALUE: "ME"},
			{VALUE_DECODE: "Saint Martin", VALUE: "MF"},
			{VALUE_DECODE: "Madagascar", VALUE: "MG"},
			{VALUE_DECODE: "Marshall Islands", VALUE: "MH"},
			{VALUE_DECODE: "Former Yugoslav Republic of Macédoine", VALUE: "MK"},
			{VALUE_DECODE: "Mali", VALUE: "ML"},
			{VALUE_DECODE: "Myanmar", VALUE: "MM"},
			{VALUE_DECODE: "Mongolia", VALUE: "MN"},
			{VALUE_DECODE: "Macau, China", VALUE: "MO"},
			{VALUE_DECODE: "Northern Mariana Islands", VALUE: "MP"},
			{VALUE_DECODE: "Martinique", VALUE: "MQ"},
			{VALUE_DECODE: "Mauritania", VALUE: "MR"},
			{VALUE_DECODE: "Montserrat", VALUE: "MS"},
			{VALUE_DECODE: "Malta", VALUE: "MT"},
			{VALUE_DECODE: "Mauritius", VALUE: "MU"},
			{VALUE_DECODE: "Maldives", VALUE: "MV"},
			{VALUE_DECODE: "Malawi", VALUE: "MW"},
			{VALUE_DECODE: "Mexico", VALUE: "MX"},
			{VALUE_DECODE: "Malaysia", VALUE: "MY"},
			{VALUE_DECODE: "Mozambique", VALUE: "MZ"},
			{VALUE_DECODE: "Namibia", VALUE: "NA"},
			{VALUE_DECODE: "New Caledonia", VALUE: "NC"},
			{VALUE_DECODE: "Niger", VALUE: "NE"},
			{VALUE_DECODE: "Norfolk Island", VALUE: "NF"},
			{VALUE_DECODE: "Nigeria", VALUE: "NG"},
			{VALUE_DECODE: "Nicaragua", VALUE: "NI"},
			{VALUE_DECODE: "Netherlands", VALUE: "NL"},
			{VALUE_DECODE: "Norway", VALUE: "NO"},
			{VALUE_DECODE: "Nepal", VALUE: "NP"},
			{VALUE_DECODE: "Nauru", VALUE: "NR"},
			{VALUE_DECODE: "Niue", VALUE: "NU"},
			{VALUE_DECODE: "New Zealand", VALUE: "NZ"},
			{VALUE_DECODE: "Oman", VALUE: "OM"},
			{VALUE_DECODE: "other", VALUE: "other"},
			{VALUE_DECODE: "Panama", VALUE: "PA"},
			{VALUE_DECODE: "Peru", VALUE: "PE"},
			{VALUE_DECODE: "French Polynesia", VALUE: "PF"},
			{VALUE_DECODE: "Papua New Guinea", VALUE: "PG"},
			{VALUE_DECODE: "Philippines", VALUE: "PH"},
			{VALUE_DECODE: "Pakistan", VALUE: "PK"},
			{VALUE_DECODE: "Poland", VALUE: "PL"},
			{VALUE_DECODE: "Saint Pierre and Miquelon", VALUE: "PM"},
			{VALUE_DECODE: "Pitcairn", VALUE: "PN"},
			{VALUE_DECODE: "Puerto Rico", VALUE: "PR"},
			{VALUE_DECODE: "Palestinian Authority", VALUE: "PS"},
			{VALUE_DECODE: "Portugal", VALUE: "PT"},
			{VALUE_DECODE: "Palau", VALUE: "PW"},
			{VALUE_DECODE: "Paraguay", VALUE: "PY"},
			{VALUE_DECODE: "Qatar", VALUE: "QA"},
			{VALUE_DECODE: "Réunion", VALUE: "RE"},
			{VALUE_DECODE: "Romania", VALUE: "RO"},
			{VALUE_DECODE: "Serbia", VALUE: "RS"},
			{VALUE_DECODE: "Russian Federation", VALUE: "RU"},
			{VALUE_DECODE: "Rwanda", VALUE: "RW"},
			{VALUE_DECODE: "Saudi Arabia", VALUE: "SA"},
			{VALUE_DECODE: "Solomon Islands", VALUE: "SB"},
			{VALUE_DECODE: "Seychelles", VALUE: "SC"},
			{VALUE_DECODE: "Sudan", VALUE: "SD"},
			{VALUE_DECODE: "Sweden", VALUE: "SE"},
			{VALUE_DECODE: "Singapore", VALUE: "SG"},
			{VALUE_DECODE: "Saint Helena, Ascension and Tristan da Cunha", VALUE: "SH"},
			{VALUE_DECODE: "Slovenia", VALUE: "SI"},
			{VALUE_DECODE: "Svalbard and Jan Mayen", VALUE: "SJ"},
			{VALUE_DECODE: "Slovak Republic", VALUE: "SK"},
			{VALUE_DECODE: "Sierra Leone", VALUE: "SL"},
			{VALUE_DECODE: "San Marino", VALUE: "SM"},
			{VALUE_DECODE: "Senegal", VALUE: "SN"},
			{VALUE_DECODE: "Somalia", VALUE: "SO"},
			{VALUE_DECODE: "Suriname", VALUE: "SR"},
			{VALUE_DECODE: "South Sudan", VALUE: "SS"},
			{VALUE_DECODE: "Sao Tome and Principe", VALUE: "ST"},
			{VALUE_DECODE: "El Salvador", VALUE: "SV"},
			{VALUE_DECODE: "Sint Maarten", VALUE: "SX"},
			{VALUE_DECODE: "Syrian Arab Republic", VALUE: "SY"},
			{VALUE_DECODE: "Swaziland", VALUE: "SZ"},
			{VALUE_DECODE: "Turks and Caicos Islands", VALUE: "TC"},
			{VALUE_DECODE: "Chad", VALUE: "TD"},
			{VALUE_DECODE: "French Southern Territories", VALUE: "TF"},
			{VALUE_DECODE: "Togo", VALUE: "TG"},
			{VALUE_DECODE: "Thailand", VALUE: "TH"},
			{VALUE_DECODE: "Tajikistan", VALUE: "TJ"},
			{VALUE_DECODE: "Tokelau", VALUE: "TK"},
			{VALUE_DECODE: "Timor-Leste", VALUE: "TL"},
			{VALUE_DECODE: "Turkmenistan", VALUE: "TM"},
			{VALUE_DECODE: "Tunisia", VALUE: "TN"},
			{VALUE_DECODE: "Tonga", VALUE: "TO"},
			{VALUE_DECODE: "Turkey", VALUE: "TR"},
			{VALUE_DECODE: "Trinidad and Tobago", VALUE: "TT"},
			{VALUE_DECODE: "Tuvalu", VALUE: "TV"},
			{VALUE_DECODE: "Chinese Taipei", VALUE: "TW"},
			{VALUE_DECODE: "Tanzania (United Republic of)", VALUE: "TZ"},
			{VALUE_DECODE: "Ukraine", VALUE: "UA"},
			{VALUE_DECODE: "Uganda", VALUE: "UG"},
			{VALUE_DECODE: "United States Minor Outlying Islands", VALUE: "UM"},
			{VALUE_DECODE: "United States", VALUE: "US"},
			{VALUE_DECODE: "Uruguay", VALUE: "UY"},
			{VALUE_DECODE: "Uzbekistan", VALUE: "UZ"},
			{VALUE_DECODE: "Holy See", VALUE: "VA"},
			{VALUE_DECODE: "Saint Vincent and the Grenadines", VALUE: "VC"},
			{VALUE_DECODE: "Venezuela (Bolivarian Republic of)", VALUE: "VE"},
			{VALUE_DECODE: "British Virgin Islands", VALUE: "VG"},
			{VALUE_DECODE: "Virgin Islands, U.S.", VALUE: "VI"},
			{VALUE_DECODE: "Viet Nam", VALUE: "VN"},
			{VALUE_DECODE: "Vanuatu", VALUE: "VU"},
			{VALUE_DECODE: "Wallis And Futuna", VALUE: "WF"},
			{VALUE_DECODE: "Samoa", VALUE: "WS"},
			{VALUE_DECODE: "Yemen", VALUE: "YE"},
			{VALUE_DECODE: "Mayotte", VALUE: "YT"},
			{VALUE_DECODE: "South Africa", VALUE: "ZA"},
			{VALUE_DECODE: "Zambia", VALUE: "ZM"},
			{VALUE_DECODE: "Zimbabwe", VALUE: "ZW"}                        
        ];
    }
	
    getSubstanceIdentifierTypeOptions() {
        return [
			{VALUE_DECODE: "CASNO", VALUE: "CASNO"},		 	
			{VALUE_DECODE: "ECNO", VALUE: "ECNO"},
			{VALUE_DECODE: "IUBMB", VALUE: "IUBMB"},
			{VALUE_DECODE: "other", VALUE: "other"}
        ];
    }

    getOtherValue() {
        return 'other';
    }
}

export { PickListService };
