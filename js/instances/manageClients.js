

var ps = new Vue({

	el: '#manageClients',


	data: {
		
		// patients page counter == 2
		pageCounter : 41,
		search : "",
		userData : {
			userId : -1,
			userName : "",
			userType : -1,
			allowedAccess : 0
		},
		clients : [],
		form : {
			name : { value : "", error : ""},
			address : { value : "", error : ""},
			contactNumber : { value : "", error : ""},
			emailAddress : { value : "", error : ""},
		},

		isShowForm : false,
		forUpdating : false,

		showModal : false,
		modalMessage : "",
		modalLoadingCtr : false,

		mMessage : "",
		mMessageType : "",

		clientId : ""

	},

	created(){
		
		this.fetchClients();

	},

	methods: {


		copyUserData(userData){

			this.userData = userData;

		},

		changeName(){

			this.form.name.error = validateInput(this.form.name.value);

		},

		changeAddress(){

			this.form.address.error = validateInput(this.form.address.value);

		},

		changeContactNumber(){

			this.form.contactNumber.error = validateContactNumber(this.form.contactNumber.value);

		},

		changeEmailAddress(){

			this.form.emailAddress.error = validateEmail(this.form.emailAddress.value);

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

			this.form.address.value = "";
			this.form.address.error = "";

			this.form.contactNumber.value = "";
			this.form.contactNumber.error = "";

			this.form.emailAddress.value = "";
			this.form.emailAddress.error = "";

		},

		saveClientDetails(){

			let self = this;
			
			if(this.validateFormInputs()){

				this.mMessageType = "";
				this.mMessage = "Saving client details. Please wait! . . .";
				

				axios.post('../php/api/saveClientDetails.php',{
	            
	                clientDetails : this.form
	                
	            })
	            .then(function (response){

	                console.log(response.data);
	                self.closeForm();

	                if(response.data.status == "SUCCESS"){
	                    self.mMessage = "Successfully saved client details. Thank you!";
	                    self.mMessageType = "has-text-success";
	                } else {
	                    self.mMessage = "Error in saving. Please contact your system administrator.";
	                    self.mMessageType = "has-text-danger";
	                }

	                self.fetchClients();


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
			this.changeAddress();
			this.changeContactNumber();
			this.changeEmailAddress();

			if(this.form.name.error == '' && this.form.address.error == '' && this.form.contactNumber.error == '' && this.form.emailAddress.error == '') {
				retVal = true;
			}

			return retVal;

		},

		fetchClients(){

			let self = this;

			axios.post('../php/api/fetchClientDetails.php',{
	            
                
            })
            .then(function (response){

                console.log(response.data);

                if(response.data.status == "SUCCESS"){

                    self.clients = response.data.message;
                }

            })
            .catch(function (error) {
                console.log(error);
            });


		},

		openUpdateClientDetailsForm(index){

			this.form.name.value = this.clients[index].client_name;
			this.form.address.value = this.clients[index].address;
			this.form.contactNumber.value = this.clients[index].contact_number;
			this.form.emailAddress.value = this.clients[index].email_address;
			this.clientId = this.clients[index].client_id;

			this.showForm(1);

		},

		updateClientDetails(){

			let self = this;

			if(this.validateFormInputs()){

				this.mMessageType = "";
				this.mMessage = "Updating client details. Please wait! . . .";
				

				axios.post('../php/api/updateClientDetails.php',{
	            
	                clientDetails : this.form,
	                clientId : this.clientId
	                
	            })
	            .then(function (response){

	                console.log(response.data);
	                self.closeForm();
	                if(response.data.status == "SUCCESS"){
	                    self.mMessage = "Successfully updated client details. Thank you!";
	                    self.mMessageType = "has-text-success";
	                } else {
	                    self.mMessage = "Error in updating. Please contact your system administrator.";
	                    self.mMessageType = "has-text-danger";
	                }

	                self.fetchClients();

	            })
	            .catch(function (error) {
	                console.log(error);
	            });
	        }

		},

		archiveClient(clientId){

			let self = this;


			this.mMessageType = "";
			this.mMessage = "Archiving client details. Please wait! . . .";

			axios.post('../php/api/archiveClientDetails.php',{
            
                clientId : clientId
                
            })
            .then(function (response){

                console.log(response.data);

                if(response.data.status == "SUCCESS"){
                    self.mMessage = "Successfully archived client details. Thank you!";
                    self.mMessageType = "has-text-success";
                } else {
                    self.mMessage = "Error in archiving. Please contact your system administrator.";
                    self.mMessageType = "has-text-danger";
                }
                self.fetchClients();

            })
            .catch(function (error) {
                console.log(error);
            });
        }


	}

});

