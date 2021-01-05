

var ps = new Vue({

	el: '#jobOrders',


	data: {
		
		pageCounter : 2,
		search : "",
		userData : {
			userId : -1,
			userName : "",
			userType : -1,
			allowedAccess : 0
		},
		jobOrders : [],
		clients : [],
		technicians : [],
		particulars : [],
		jobOrderHistory : [],
		form : {
			client : { value : -1, error : ""},
			technician : { value : -1, error : ""},
			tPercentage : { value : 0, error : ""},
			patientName : { value : "", error : ""},
			particulars : [],
			totalPrice : 0
		},

		form2 : {
			particular : { value : -1, error : ""},
			currentPrice : { value : 0, error : ""},
			quantity : {value : 0, error : ""}
		},

		form3 : {
			remarks : { value : "", error : ""},
			transactionType : { value : "", error : ""}
		},

		isShowForm : false,
		forUpdating : false,

		showModal : false,
		modalMessage : "",
		modalLoadingCtr : false,

		isOpenConfirmation : false,

		isOpenMessage : false,
		messageCtr : 0, // 0 loading, 1 success, -1 failed
		isOpenAddHistory : false,

		selectedJobOrder : "",
		selectedJobOrderStatus : "",

		isOpenChangeStatusModal : false,
		changeStatusError : false,

		dateLabel : "",
		dateTo : "",
		dateFrom : "",
		searchInput: "",

		statusTypes : { 'value' : ['C','O'] },
        technicianTypes : { 'value' : [] },

        teethObject : teethObject()
	},

	created(){
		
		//this.fetchJobOrders();
		this.fetchTechnicians();
		this.fetchClients();
		this.fetchParticulars();

	},

	computed : {

		showParticulars(){
			let retVal = true;

			if(this.form.client.value == -1 || this.form.technician.value == -1 || this.form.patientName.value == ''){
				retVal = false;
			}

			return retVal;
		},

		totalPrice(){

			return this.form.particulars.reduce(function (accumulator, p) {
                return accumulator + (Number(p.price)*Number(p.quantity));

            }, 0);
		},

		filteredJobOrders(){

            return this.jobOrders.filter(p => {

            	let searchHash = p.job_order_id + p.client_name + p.patient_name;

                return this.technicianTypes.value.includes(p.technician_id) && 
                        this.statusTypes.value.includes(p.status) &&
                		searchHash.toUpperCase().includes(this.searchInput.toUpperCase());

            });
            
        },
	},

	methods: {


		copyUserData(userData){

			this.userData = userData;

		},

		configDateLabel(dateLabel){

			this.dateLabel = dateLabel;
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

		fetchTechnicians(){

			let self = this;

			axios.post('../php/api/fetchTechnicians.php',{
            
                
            })
            .then(function (response){

                console.log(response.data);

                if(response.data.status == "SUCCESS"){

                    self.technicians = response.data.message;
                    response.data.message.forEach(function (s){
                        self.technicianTypes.value.push(s.technician_id);
                    });  
                    
                }

            })
            .catch(function (error) {
                console.log(error);
            });


		},

		fetchJobOrders(date_from, date_to){
			let self = this;

			this.dateFrom = date_from;
			this.dateTo = date_to;

			axios.post('../php/api/fetchJobOrders.php',{
            	
            	dateFrom : date_from,
				dateTo : date_to
                
            })
            .then(function (response){

                console.log(response.data);

                if(response.data.status == "SUCCESS"){

                    self.jobOrders = response.data.message;
                }

            })
            .catch(function (error) {
                console.log(error);
            });

		},

		viewJobOrder(index, id){

			this.showForm(1);

			this.form.client.value = this.jobOrders[index].client_id;
			this.form.technician.value = this.jobOrders[index].technician_id;
			this.form.patientName.value = this.jobOrders[index].patient_name;
			this.selectedJobOrder = id;
			this.selectedJobOrderStatus = this.jobOrders[index].status;
			this.changeStatusError = false;
			let self = this;

			this.fetchJobOrderHistory(id);
			this.fetchDentalRecord(id);
			this.fetchParticularsPerJobOrder(id);
		},

		fetchParticularsPerJobOrder(id){

			let self = this;

			axios.post('../php/api/fetchParticularsPerJobOrder.php',{
            
                jobOrderId : id

            })
            .then(function (response){

                console.log(response.data);

                if(response.data.status == "SUCCESS"){

                    self.form.particulars = response.data.message;

                }

            })
            .catch(function (error) {
                console.log(error);
            });

		},

		fetchJobOrderHistory(id){

			let self = this;

			axios.post('../php/api/fetchJobOrderHistory.php',{
            
                jobOrderId : id

            })
            .then(function (response){

                console.log(response.data);

                if(response.data.status == "SUCCESS"){

                    self.jobOrderHistory = response.data.message;

                }

            })
            .catch(function (error) {
                console.log(error);
            });

		},

		fetchDentalRecord(id){

			let self = this;

			axios.post('../php/api/fetchDentalRecord.php',{
            
                jobOrderId : id

            })
            .then(function (response){

                console.log(response.data);

                if(response.data.status == "SUCCESS"){

                    self.teethObject = populateTeethData(response.data.message[0]);

                }

            })
            .catch(function (error) {
                console.log(error);
            });

		},

		
		showForm(ctr){

			this.form = {
				client : { value : -1, error : ""},
				technician : { value : -1, error : ""},
				tPercentage : { value : 0, error : ""},
				patientName : { value : "", error : ""},
				particulars : [],
				totalPrice : 0
			}

			this.form2 = {
				particular : { value : -1, error : ""},
				currentPrice : { value : 0, error : ""},
				quantity : {value : 0, error : ""}
			}

			this.teethObject = teethObject();


			if(ctr == 1) this.forUpdating = true;
			else this.forUpdating = false;

			this.isShowForm = true;

		},

		closeForm(){
			this.isShowForm = false;
		},

		openConfirmation(){
			this.isOpenConfirmation = true;
		},

		closeConfirmation(){
			this.isOpenConfirmation = false;
		},

		closeModalMessage(){

			if(this.mMessageType != '') this.mMessage = "";

		},

		convertMoney(n){

            return (Number(n)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

        },

        changeTPercentage(){

        	this.form.tPercentage.error = validatePercentage(this.form.tPercentage.value);

        },

        changePatientName(){

        	this.form.patientName.error = validateInput(this.form.patientName.value);

        },

        changeTechnician(){
        	this.form.technician.error = validateSelect(this.form.technician.value);
        },

        changeClient(){
        	this.form.client.error = validateSelect(this.form.client.value);
        },

        changeParticular(){

        	this.form2.particular.error = "";
        	this.form2.currentPrice.value = this.particulars[this.form2.particular.value].price;
        	

        },

        validateParticular(){

        	this.form2.particular.error = "";
        	if(this.form2.particular.value == -1) this.form2.particular.error = "This is required";

        },

        changeQuantity(){

        	this.form2.quantity.error = "";
        	if(this.form2.quantity.value < 1){
        		this.form2.quantity.error = "Quantity cannot be less than 1";
        	}

        },

        addParticular(){

        	this.form2.particular.error = "";
        	this.changeQuantity();
        	this.validateParticular();

        	if(this.form2.particular.error == "" && this.form2.quantity.error == ''){
	        	this.form.particulars.push({ id : this.particulars[this.form2.particular.value].particular_id,
	        						price : this.form2.currentPrice.value,
	        						description : this.particulars[this.form2.particular.value].description,
	        						quantity : this.form2.quantity.value,});

	        	this.form2.particular.value = -1;
	        	this.form2.particular.error = "";
	        	this.form2.currentPrice.value = "";
	        	this.form2.currentPrice.error = "";
	        	this.form2.quantity.value = "";
	        	this.form2.quantity.error = "";


	        }


        },

        removeParticular(index){

        	this.form.particulars.splice(index,1);

        },

        openMessage(){
        	this.isOpenMessage = true;
        },

        closeMessage(){
        	if(this.messageCtr != 0) this.isOpenMessage = false;
        },

		saveJobOrder(){
			
			let self = this;

			this.changeClient();
			this.changeTechnician();
			this.changePatientName();
			this.changeTPercentage();

			if(this.form.patientName.error == "" && this.form.client.error == "" && this.form.technician.error == "" && this.form.tPercentage.error == ""){

				this.form.totalPrice = this.totalPrice;

				this.closeForm();
				this.closeConfirmation();
				this.openMessage();

				this.messageCtr = 0;

				axios.post('../php/api/saveJobOrder.php',{

	            	form : this.form
                	
	            })
	            .then(function (response){

	                console.log(response.data);
	                if(response.data.status == "SUCCESS"){
	                	self.messageCtr = 1;
	                } else {
	                	self.messageCtr = -1;
	                }

	                self.fetchJobOrders(self.dateFrom, self.dateTo);

	            })
	            .catch(function (error) {
	                console.log(error);
	            });

			}


		},

		archiveJobOrderHistory(id){

        	let self = this;

			axios.post('../php/api/archiveJobOrderHistory.php',{
            	
            	id : id
                
            })
            .then(function (response){

                console.log(response.data);

                if(response.data.status == "SUCCESS"){

                    self.fetchJobOrderHistory(self.selectedJobOrder);
                    
                }

            })
            .catch(function (error) {
                console.log(error);
            });

        },

		updateJobOrderStatus(){

			let self = this;
			
			axios.post('../php/api/updateJobOrderStatus.php',{
        	
            	jobOrderId : this.selectedJobOrder
                
            })
            .then(function (response){

                console.log(response.data);

                if(response.data.status == "SUCCESS"){

                    self.fetchJobOrders(self.dateFrom, self.dateTo);
                    self.closeForm();
                    self.closeChangeStatusModal();
                    
                }

            })
            .catch(function (error) {
                console.log(error);
            });

		},

		openChangeStatusModal(){
			this.isOpenChangeStatusModal = true;

			if(this.jobOrderHistory[this.jobOrderHistory.length-1].transaction_type != "RELEASED") this.changeStatusError = true;
			else this.changeStatusError = false;
		},

		closeChangeStatusModal(){
			this.isOpenChangeStatusModal = false;
		},


		openAddHistory(){
			this.isOpenAddHistory = true;
			
			this.form3.transactionType.value = "";
			this.form3.transactionType.error = "";
			this.form3.remarks.value = "";
			this.form3.remarks.error = "";
		},

		closeAddHistory(){
			this.isOpenAddHistory = false;
		},

		changeTransactionType(){
			this.form3.transactionType.error = validateInput(this.form3.transactionType.value);
		},

		changeRemarks(){
			this.form3.remarks.error = validateInput(this.form3.remarks.value);
		},

		saveJobOrderHistory(){
			
			let self = this;

			this.changeTransactionType();
			this.changeRemarks();

			if(this.form3.transactionType.error == "" && this.form3.remarks.error == ""){

				axios.post('../php/api/saveJobOrderHistory.php',{

	            	form : this.form3,
	            	id : this.selectedJobOrder
                	
	            })
	            .then(function (response){

	                console.log(response.data);
	                if(response.data.status == "SUCCESS"){
	                }

	                self.closeAddHistory();
	                self.fetchJobOrderHistory(self.selectedJobOrder);

	            })
	            .catch(function (error) {
	                console.log(error);
	            });

			}


		},

	}

});
