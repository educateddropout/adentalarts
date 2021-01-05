

var ps = new Vue({

	el: '#manageParticulars',


	data: {
		
		pageCounter : 42,
		search : "",
		userData : {
			userId : -1,
			userName : "",
			userType : -1,
			allowedAccess : 0
		},
		particulars : [],
		form : {
			description : { value : "", error : ""},
			price : { value : "", error : ""}
		},

		isShowForm : false,
		forUpdating : false,

		showModal : false,
		modalMessage : "",
		modalLoadingCtr : false,

		mMessage : "",
		mMessageType : "",

		particularId : ""

	},

	created(){
		
		this.fetchParticulars();

	},

	methods: {


		copyUserData(userData){

			this.userData = userData;

		},

		changeDescription(){

			this.form.description.error = validateInput(this.form.description.value);

		},


		changePrice(){

			this.form.price.error = validatePrice(this.form.price.value);

		},

		showForm(ctr){

			if(ctr == 1) this.forUpdating = true;
			else this.forUpdating = false;

			this.isShowForm = true;

		},

		closeForm(){
			this.isShowForm = false;

			this.form.description.value = "";
			this.form.description.error = "";

			this.form.price.value = "";
			this.form.price.error = "";

		},

		saveParticulars(){

			let self = this;
			
			if(this.validateFormInputs()){

				this.mMessageType = "";
				this.mMessage = "Saving particular details. Please wait! . . .";
				

				axios.post('../php/api/saveParticulars.php',{
	            
	                particularDetails : this.form
	                
	            })
	            .then(function (response){

	                console.log(response.data);
	                self.closeForm();

	                if(response.data.status == "SUCCESS"){
	                    self.mMessage = "Successfully saved particular details. Thank you!";
	                    self.mMessageType = "has-text-success";
	                } else {
	                    self.mMessage = "Error in saving. Please contact your system administrator.";
	                    self.mMessageType = "has-text-danger";
	                }

	                self.fetchParticulars();


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

			this.changeDescription();
			this.changePrice();

			if(this.form.description.error == '' && this.form.price.error == '') {
				retVal = true;
			}

			return retVal;

		},

		fetchParticulars(){

			let self = this;

			axios.post('../php/api/fetchParticulars.php',{
            
                
            })
            .then(function (response){

                console.log(response.data);

                if(response.data.status == "SUCCESS"){

                    self.particulars = response.data.message;
                }

            })
            .catch(function (error) {
                console.log(error);
            });


		},

		openUpdateParticularDetailsForm(index){

			this.form.description.value = this.particulars[index].description;
			this.form.price.value = this.particulars[index].price;
			this.particularId = this.particulars[index].particular_id;
			this.showForm(1);

		},

		updateParticulars(){

			let self = this;

			if(this.validateFormInputs()){

				this.mMessageType = "";
				this.mMessage = "Updating particular details. Please wait! . . .";
				

				axios.post('../php/api/updateParticulars.php',{
	            
	                particularDetails : this.form,
	                particularId : this.particularId
	                
	            })
	            .then(function (response){

	                console.log(response.data);
	                self.closeForm();
	                if(response.data.status == "SUCCESS"){
	                    self.mMessage = "Successfully updated particular details. Thank you!";
	                    self.mMessageType = "has-text-success";
	                } else {
	                    self.mMessage = "Error in updating. Please contact your system administrator.";
	                    self.mMessageType = "has-text-danger";
	                }

	                self.fetchParticulars();

	            })
	            .catch(function (error) {
	                console.log(error);
	            });
	        }

		},

		archiveParticulars(id){

			let self = this;

			
			this.mMessageType = "";
			this.mMessage = "Archiving particular details. Please wait! . . .";

			axios.post('../php/api/archiveParticulars.php',{
            
                particularId : id
                
            })
            .then(function (response){

                console.log(response.data);

                if(response.data.status == "SUCCESS"){
                    self.mMessage = "Successfully archived particular details. Thank you!";
                    self.mMessageType = "has-text-success";
                } else {
                    self.mMessage = "Error in archiving. Please contact your system administrator.";
                    self.mMessageType = "has-text-danger";
                }
                self.fetchParticulars();

            })
            .catch(function (error) {
                console.log(error);
            });

		},

		convertMoney(n){

            return (Number(n)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

        },

	}

});
