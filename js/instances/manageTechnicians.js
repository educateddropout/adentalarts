

var ps = new Vue({

	el: '#manageTechnicians',


	data: {
		
		pageCounter : 43,
		search : "",
		userData : {
			userId : -1,
			userName : "",
			userType : -1,
			allowedAccess : 0
		},
		technicians : [],
		form : {
			name : { value : "", error : ""},
		},

		isShowForm : false,
		forUpdating : false,

		showModal : false,
		modalMessage : "",
		modalLoadingCtr : false,

		mMessage : "",
		mMessageType : "",

		technicianId : ""

	},

	created(){
		
		this.fetchTechnicians();

	},

	methods: {


		copyUserData(userData){

			this.userData = userData;

		},

		changeName(){

			this.form.name.error = validateInput(this.form.name.value);

		},

		showForm(ctr){

			if(ctr == 1) this.forUpdating = true;
			else this.forUpdating = false;

			this.isShowForm = true;

		},

		closeForm(){
			this.isShowForm = false;

			this.form.name.value = "";
			this.form.name.error = "";

		},

		saveTechnicians(){

			let self = this;
			
			if(this.validateFormInputs()){

				this.mMessageType = "";
				this.mMessage = "Saving technician details. Please wait! . . .";
				

				axios.post('../php/api/saveTechnicians.php',{
	            
	                technicianDetails : this.form
	                
	            })
	            .then(function (response){

	                console.log(response.data);
	                self.closeForm();

	                if(response.data.status == "SUCCESS"){
	                    self.mMessage = "Successfully saved technician details. Thank you!";
	                    self.mMessageType = "has-text-success";
	                } else {
	                    self.mMessage = "Error in saving. Please contact your system administrator.";
	                    self.mMessageType = "has-text-danger";
	                }

	                self.fetchTechnicians();


	            })
	            .catch(function (error) {
	                console.log(error);
	            });
	        }

		},

		closeModalMessage(){

			if(this.mMessageType != '') this.mMessage = "";

		},

		validateFormInputs(){

			retVal = false;

			this.changeName();

			if(this.form.name.error == '') {
				retVal = true;
			}

			return retVal;

		},

		fetchTechnicians(){

			let self = this;

			axios.post('../php/api/fetchTechnicians.php',{
            
                
            })
            .then(function (response){

                console.log(response.data);

                if(response.data.status == "SUCCESS"){

                    self.technicians = response.data.message;
                }

            })
            .catch(function (error) {
                console.log(error);
            });


		},

		openUpdateTechnicianDetailsForm(index){

			this.form.name.value = this.technicians[index].technician_name;
			this.technicianId = this.technicians[index].technician_id;

			this.showForm(1);

		},

		updateTechnicians(){

			let self = this;

			if(this.validateFormInputs()){

				this.mMessageType = "";
				this.mMessage = "Updating technician details. Please wait! . . .";
				

				axios.post('../php/api/updateTechnicians.php',{
	            
	                technicianDetails : this.form,
	                technicianId : this.technicianId
	                
	            })
	            .then(function (response){

	                console.log(response.data);
	                self.closeForm();
	                if(response.data.status == "SUCCESS"){
	                    self.mMessage = "Successfully updated technician details. Thank you!";
	                    self.mMessageType = "has-text-success";
	                } else {
	                    self.mMessage = "Error in updating. Please contact your system administrator.";
	                    self.mMessageType = "has-text-danger";
	                }

	                self.fetchTechnicians();

	            })
	            .catch(function (error) {
	                console.log(error);
	            });
	        }

		},

		archiveTechnicians(id){

			let self = this;

			
			this.mMessageType = "";
			this.mMessage = "Archiving technician details. Please wait! . . .";

			axios.post('../php/api/archiveTechnicians.php',{
            
                technicianId : id
                
            })
            .then(function (response){

                console.log(response.data);

                if(response.data.status == "SUCCESS"){
                    self.mMessage = "Successfully archived technician details. Thank you!";
                    self.mMessageType = "has-text-success";
                } else {
                    self.mMessage = "Error in archiving. Please contact your system administrator.";
                    self.mMessageType = "has-text-danger";
                }
                self.fetchTechnicians();

            })
            .catch(function (error) {
                console.log(error);
            });

		}

	}

});
