Vue.component('datesSelection', {
	props: [],
	template: `
		<div class="row">
                        
            <input class="w3-radio pointer" type="radio" id="selectDate2" name="selectedHistory" value="2" v-model="selectedHistory" @click="getRecords(2)">
            <label class="pointer" for="selectDate2" @click="getRecords(2)">This Year</label>&nbsp&nbsp

            <input class="w3-radio pointer" type="radio" id="selectDate1" name="selectedHistory" value="1" v-model="selectedHistory" @click="getRecords(1)">
            <label class="pointer" for="selectDate1" @click="getRecords(1)">This Month</label>&nbsp&nbsp

            <input class="w3-radio pointer" type="radio"  id="selectDate5" name="selectedHistory" value ="5" v-model="selectedHistory">
            <label class="pointer" for="selectDate5" >Select Dates</label>
            
            <div class="row" v-show="selectedHistory == 5">
                <br>
                <div class="columns">
                    <div class="column is-3">
                        <div class="row">
                            <div class="field has-addons">
                                <p class="control">
                                    <a class="button is-static">
                                        From
                                    </a>
                                    <p class="control is-expanded">
                                        <input class="input" type="date" v-model="date_from">
                                    </p>
                                </p>
                            </div>
                            <p class="help has-text-danger">{{date_from_validation_message}}</p>
                        </div>
                    </div>
                    <div class="column is-3">
                        <div class="row">
                            <div class="field has-addons">
                                <p class="control">
                                    <a class="button is-static">
                                        To
                                    </a>
                                    <p class="control is-expanded">
                                        <input class="input" type="date" v-model="date_to">
                                    </p>
                                </p>
                            </div>
                            <p class="help has-text-danger">{{date_to_validation_message}}</p>
                        </div>
                    </div>
                    <div class="column is-3">
                        <button class="button is-outlined is-dark" @click="getRecordsWithDates(5)">Proceed</button>
                    </div>
                </div>
            </div>

            <div class="is-divider"></div>


        </div>
	`,
	data() {

		return {

			selectedHistory : 1,
			selectedDate : "",
			date_to : "",
			date_from : "",
			date_to_validation_message : "",
			date_from_validation_message : "",
			paymentsLibrary : [],


		}

	},

	created(){

		let today = new moment(moment().toISOString(true).substring(0,10));
		this.selectedDate = today;

	},

	mounted(){

		this.getRecords(1);
		this.$emit("config-date-label", this.convertedSelectedDate);
		
	},

	computed : {

		convertedSelectedDate(){

			let date = "";
			
			if(this.selectedHistory == 1) date = this.selectedDate.format("MMMM") + " " + this.selectedDate.format("Y");
			else if(this.selectedHistory == 2) date = this.selectedDate.format("Y");
			else if(this.selectedHistory == 5 && this.date_from != "" && this.date_to != ""){
				if(this.date_to_validation_message == "" && this.date_from_validation_message == ""){
					date = "From: " + this.date_from + " - To: " + this.date_to; 
				}
			}

			return date;
		}

	},




	methods : {

		getRecords(selected){


			let date_from = "";
			let date_to = "";
			let month = this.selectedDate.month() + 1;
			let year = this.selectedDate.format("Y");

			this.selectedHistory = selected;

			if(selected == 1){
				month = month > 9 ? month : "0"+ month;
				date_from = year + "-" + month + "-01";
				date_to = year + "-" + month + "-" + getLastDayOfTheMonth(month,year);
			}
			else if(selected == 2){
				date_from = year + "-01-01";
				date_to = year + "-12-31";
			}


			this.$emit("config-date-label", this.convertedSelectedDate);
			this.$emit("fetch-records", date_from, date_to);

		},

		getRecordsWithDates(selected){

			this.selectedHistory = selected;

			this.date_from_validation_message = validateDateFrom(this.date_from);
			this.date_to_validation_message	= validateDateTo(this.date_from,this.date_to);

			if(this.date_to_validation_message == "" && this.date_from_validation_message == ""){

				this.$emit("config-date-label", this.convertedSelectedDate);
				this.$emit("fetch-records", this.date_from, this.date_to);

			}

		}

	}



});