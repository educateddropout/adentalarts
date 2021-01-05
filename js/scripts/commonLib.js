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


function teethObject(){

    return {
                upperRightTeeth : {
                    "status" : [0,0,0,0,0,0,0,0],
                    "teeth" : [
                        { "top" : 0, "left" : 0, "right" : 0, "bottom" : 0, "middle" : 0},
                        { "top" : 0, "left" : 0, "right" : 0, "bottom" : 0, "middle" : 0},
                        { "top" : 0, "left" : 0, "right" : 0, "bottom" : 0, "middle" : 0},
                        { "top" : 0, "left" : 0, "right" : 0, "bottom" : 0, "middle" : 0},
                        { "top" : 0, "left" : 0, "right" : 0, "bottom" : 0, "middle" : 0},
                        { "top" : 0, "left" : 0, "right" : 0, "bottom" : 0, "middle" : 0},
                        { "top" : 0, "left" : 0, "right" : 0, "bottom" : 0, "middle" : 0},
                        { "top" : 0, "left" : 0, "right" : 0, "bottom" : 0, "middle" : 0}
                    ]
                },
                upperLeftTeeth : {
                    "status" : [0,0,0,0,0,0,0,0],
                    "teeth" : [
                        { "top" : 0, "left" : 0, "right" : 0, "bottom" : 0, "middle" : 0},
                        { "top" : 0, "left" : 0, "right" : 0, "bottom" : 0, "middle" : 0},
                        { "top" : 0, "left" : 0, "right" : 0, "bottom" : 0, "middle" : 0},
                        { "top" : 0, "left" : 0, "right" : 0, "bottom" : 0, "middle" : 0},
                        { "top" : 0, "left" : 0, "right" : 0, "bottom" : 0, "middle" : 0},
                        { "top" : 0, "left" : 0, "right" : 0, "bottom" : 0, "middle" : 0},
                        { "top" : 0, "left" : 0, "right" : 0, "bottom" : 0, "middle" : 0},
                        { "top" : 0, "left" : 0, "right" : 0, "bottom" : 0, "middle" : 0}
                    ]
                },
                lowerLeftTeeth : {
                    "status" : [0,0,0,0,0,0,0,0],
                    "teeth" : [
                        { "top" : 0, "left" : 0, "right" : 0, "bottom" : 0, "middle" : 0},
                        { "top" : 0, "left" : 0, "right" : 0, "bottom" : 0, "middle" : 0},
                        { "top" : 0, "left" : 0, "right" : 0, "bottom" : 0, "middle" : 0},
                        { "top" : 0, "left" : 0, "right" : 0, "bottom" : 0, "middle" : 0},
                        { "top" : 0, "left" : 0, "right" : 0, "bottom" : 0, "middle" : 0},
                        { "top" : 0, "left" : 0, "right" : 0, "bottom" : 0, "middle" : 0},
                        { "top" : 0, "left" : 0, "right" : 0, "bottom" : 0, "middle" : 0},
                        { "top" : 0, "left" : 0, "right" : 0, "bottom" : 0, "middle" : 0}
                    ]
                },
                lowerRightTeeth : {
                    "status" : [0,0,0,0,0,0,0,0],
                    "teeth" : [
                        { "top" : 0, "left" : 0, "right" : 0, "bottom" : 0, "middle" : 0},
                        { "top" : 0, "left" : 0, "right" : 0, "bottom" : 0, "middle" : 0},
                        { "top" : 0, "left" : 0, "right" : 0, "bottom" : 0, "middle" : 0},
                        { "top" : 0, "left" : 0, "right" : 0, "bottom" : 0, "middle" : 0},
                        { "top" : 0, "left" : 0, "right" : 0, "bottom" : 0, "middle" : 0},
                        { "top" : 0, "left" : 0, "right" : 0, "bottom" : 0, "middle" : 0},
                        { "top" : 0, "left" : 0, "right" : 0, "bottom" : 0, "middle" : 0},
                        { "top" : 0, "left" : 0, "right" : 0, "bottom" : 0, "middle" : 0}
                    ]
                }
            }
}

function populateTeethData(teethFromDatabase){
    

    let retVal = {
            upperRightTeeth : segregateToothStatus(teethFromDatabase.t18,teethFromDatabase.t17,teethFromDatabase.t16,teethFromDatabase.t15,teethFromDatabase.t14,teethFromDatabase.t13,teethFromDatabase.t12,teethFromDatabase.t11),
            upperLeftTeeth : segregateToothStatus(teethFromDatabase.t21,teethFromDatabase.t22,teethFromDatabase.t23,teethFromDatabase.t24,teethFromDatabase.t25,teethFromDatabase.t26,teethFromDatabase.t27,teethFromDatabase.t28),
            lowerRightTeeth : segregateToothStatus(teethFromDatabase.t48,teethFromDatabase.t47,teethFromDatabase.t46,teethFromDatabase.t45,teethFromDatabase.t44,teethFromDatabase.t43,teethFromDatabase.t42,teethFromDatabase.t41),
            lowerLeftTeeth : segregateToothStatus(teethFromDatabase.t31,teethFromDatabase.t32,teethFromDatabase.t33,teethFromDatabase.t34,teethFromDatabase.t35,teethFromDatabase.t36,teethFromDatabase.t37,teethFromDatabase.t38)
        }

    
    return retVal;
}

function segregateToothStatus(t1,t2,t3,t4,t5,t6,t7,t8){

    return {
                "status" : [t1.substring(6, 7),
                                t2.substring(6, 7),
                                t3.substring(6, 7),
                                t4.substring(6, 7),
                                t5.substring(6, 7),
                                t6.substring(6, 7),
                                t7.substring(6, 7),
                                t8.substring(6, 7)
                            ],
                "teeth" : [
                    { "top" : t1.substring(0, 1), "left" : t1.substring(1, 2), "bottom" : t1.substring(2, 3), "right" : t1.substring(3, 4), "middle" : t1.substring(4, 5)},
                    { "top" : t2.substring(0, 1), "left" : t2.substring(1, 2), "bottom" : t2.substring(2, 3), "right" : t2.substring(3, 4), "middle" : t2.substring(4, 5)},
                    { "top" : t3.substring(0, 1), "left" : t3.substring(1, 2), "bottom" : t3.substring(2, 3), "right" : t3.substring(3, 4), "middle" : t3.substring(4, 5)},
                    { "top" : t4.substring(0, 1), "left" : t4.substring(1, 2), "bottom" : t4.substring(2, 3), "right" : t4.substring(3, 4), "middle" : t4.substring(4, 5)},
                    { "top" : t5.substring(0, 1), "left" : t5.substring(1, 2), "bottom" : t5.substring(2, 3), "right" : t5.substring(3, 4), "middle" : t5.substring(4, 5)},
                    { "top" : t6.substring(0, 1), "left" : t6.substring(1, 2), "bottom" : t6.substring(2, 3), "right" : t6.substring(3, 4), "middle" : t6.substring(4, 5)},
                    { "top" : t7.substring(0, 1), "left" : t7.substring(1, 2), "bottom" : t7.substring(2, 3), "right" : t7.substring(3, 4), "middle" : t7.substring(4, 5)},
                    { "top" : t8.substring(0, 1), "left" : t8.substring(1, 2), "bottom" : t8.substring(2, 3), "right" : t8.substring(3, 4), "middle" : t8.substring(4, 5)},
                ]
            };
}

function combineTeethData(teeth){
    let retVal = [];

    teeth.teeth.forEach(function(tooth,index){

        combinedTeeth = String(tooth.top) + String(tooth.left) + String(tooth.bottom) + String(tooth.right) + String(tooth.middle) + "-" + String(teeth.status[index]);
        retVal.push(combinedTeeth);

    });

    return retVal;

}