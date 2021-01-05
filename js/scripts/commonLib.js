function validateEmail(input){

	let retVal = "";

	if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input))){
		retVal = "You have entered an invalid Email Address!";
	} else {
		if(input.trim() == ""){
			retVal = "This is required!";
		}
	}

    return retVal;

}

function validateInput(input){

	let retVal = "";

	if(input.trim() != ""){

		if (! /^[a-zA-ZÃ‘Ã±0-9'Ãƒ./\-\s]+$/.test(input)) {
		    // Validation failed
		    retVal = "Found invalid character! Please Check..";
		}

	} else {

		retVal = "This is required!";

	}

	return retVal;
}

function validatePercentage(input){

    let retVal = "";
    
    if(input !== ""){

        if(input > 100000 || input < 0){
            retVal = "Percentage should be 0 to 100000 only";
        }

        if (! /^[0-9]+$/.test(input)) {
            // Validation failed
            retVal = "Found invalid value! Please Check..";
        }

    } else {

        retVal = "This is required!";

    }

    return retVal;
}

function validateSelect(input){

    let retVal = "";

    if(input == -1){
        retVal = "This is required!";
    }

    return retVal;
}

function validateContactNumber(input){

    let retVal = "";
    inputLength = input.length;

    if(! /^[0-9]+$/.test(input)){
        retVal = "Invalid Contact Number.";
    } else{

        if(inputLength == 11 && input.substring(0,2) != '09'){
            retVal = "Cellphone number should start in '09'.";
        }else if(inputLength < 7){
            retVal = "Contact number length should be 8, 9, 10, 11. Including area code.";
        }
    }

    return retVal;

}

function validatePrice(input){

    let retVal = "";
    inputLength = input.length;

    if(! /^[0-9.]+$/.test(input)){
        retVal = "Invalid Price.";
    }

    return retVal;

}

function getLastDayOfTheMonth(month, year){
    let retVal = 0;

    if(month == '01' || month == '03' || month == '05' || month == '07' || month == '08' || month == '10' || month == '12') retVal = "31";
    else if( month == '04' || month == '06' || month == '09' || month == '11') retVal = "30";
    else if( month == '02'){
        if((year%4) == 0) retVal = "29";
        else retVal = "28";
    }

    return retVal;
}

function validateDateFrom(selectedDateFrom){

    let ans = "";
    let today = new moment(moment().toISOString(true).substring(0,10));
    let formattedDateToday = today.toISOString(true).substring(0,10);

    if(selectedDateFrom == ""){
        ans = "Please provide date";
    }
    else {
        if(selectedDateFrom > formattedDateToday){
            ans = "Cannot log future dates";
        }
    }

    return ans;

}

function validateDateTo(selectedDateFrom,selectedDateTo){

    let ans = "";
    let today = new moment(moment().toISOString(true).substring(0,10));
    let formattedDateToday = today.toISOString(true).substring(0,10);

    if(selectedDateTo == ""){
        ans = "Please provide date";
    }
    else {
        if(selectedDateTo > formattedDateToday){
            ans = "Cannot log future dates";
        }

        if(selectedDateFrom != ""){
            if(selectedDateTo < selectedDateFrom){
                ans = "DATE TO must not be greater than DATE FROM";
            }
        }
    }

    return ans;

}

function validateLoginInput(input){
    let retVal = "";

    if(input.trim().length < 1) retVal = "This is required!";

    return retVal;
}

function statusLib(){

    return [

                { 'description' : 'CLOSED', 'value' : 'C' },
                { 'description' : 'OPEN', 'value' : 'O' },

            ];


}