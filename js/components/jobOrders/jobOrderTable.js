Vue.component('jobOrderTable', {
	props: ['data', 'dateFrom', 'dateTo', 'dateLabel', 'userData'],
	template: `
		
		<div >
            
			<div class="w3-row">
                <table class="table is-fullwidth is-hoverable is-striped w3-border w3-round ">
                    <thead>
                        <tr class="">
                            <th colspan="12" class="w3-right-align">
                            <button class='button is-outlined is-dark' @click="printTable" :disabled="isLoadingDL">
                                Download PDF &nbsp<i class="fas fa-file-pdf"></i> 
                                &nbsp <span v-show="isLoadingDL"> <i class="fas fa-spinner fa-pulse"></i> </span>
                            </button></th>
                        </tr>
                        <tr class="has-background-info w3-center">
                            <th colspan="12" class="w3-center">{{dateLabel}}</th>
                        </tr>
                        <tr class="has-background-link">
                            <th colspan="12" class=" has-text-white ">Job Orders &nbsp<i class="fas fa-sign-language" ></i></th>
                        </tr>
                        <tr class="has-background-dark">
                            <th class=" has-text-white ">#</th>
                            <th class=" has-text-white ">J.O. Number</th>
                            <th class=" has-text-white ">Client Name</th>
                            <th class=" has-text-white ">Client Address</th>
                            <th class=" has-text-white ">Client Contact Number</th>
                            
                            <th class=" has-text-white ">Patient Name</th>
                            <th class=" has-text-white ">Total Price</th>
                            <th class=" has-text-white ">Technician Name</th>
                            <th class=" has-text-white w3-center">Technician %</th>
                            <th class=" has-text-white ">Status</th>
                            <th class=" has-text-white w3-border-left w3-center"></th>
                            <th class=" has-text-white w3-border-left w3-center"></th>
                        </tr>
                        <tr class="has-background-grey">
                            <th colspan="6"></th>
                            <th colspan="6">₱ {{convertMoney(jTotalPrice)}}</th>
                        </tr>

                    </thead>
                    <tfoot>
                        <tr class="has-background-grey">
                            <th colspan="6"></th>
                            <th colspan="6">₱ {{convertMoney(jTotalPrice)}}</th>
                        </tr>
                    </tfoot>
                    <tbody>
                        <tr v-for="c,index in data">
                            <td @click="viewJobOrder(index, c.job_order_id)" class="pointer">{{index+1}}</td>
                            <td @click="viewJobOrder(index, c.job_order_id)" class="pointer">{{c.job_order_id}}</td>

                            <td @click="viewJobOrder(index, c.job_order_id)" class="pointer">{{c.client_name}}</td>
                            <td @click="viewJobOrder(index, c.job_order_id)" class="pointer">{{c.address}}</td>
                            <td @click="viewJobOrder(index, c.job_order_id)" class="pointer">{{c.contact_number}}</td>
                            
                            <td @click="viewJobOrder(index, c.job_order_id)" class="pointer">{{c.patient_name}}</td>

                            <td @click="viewJobOrder(index, c.job_order_id)" class="pointer">₱ {{convertMoney(c.total_price)}}</td>
                            <td @click="viewJobOrder(index, c.job_order_id)" class="pointer">{{c.technician_name}}</td>
                            <td @click="viewJobOrder(index, c.job_order_id)" class="w3-center pointer">{{c.technician_percentage}}%</td>
                            <td @click="viewJobOrder(index, c.job_order_id)">
                                <span class="has-text-success" v-if="c.status == 'O'">OPEN</span>
                                <span class="has-text-danger" v-else>CLOSED</span>
                            </td>
                            <td class="w3-center has-text-danger w3-border-left pointer" @click="showVoidTransactionModal(c.job_order_id)"><i class="fas fa-trash-alt"></i></td>
                            <td class='pointer w3-border-left' @click="printReceipt(c)"><i class="fas fa-receipt"></i></td>
                        </tr>
                    </tbody>
                </table>
            </div>
			
            <!-- Error message -->
            <div class="modal" :class="{'is-active' : isShowVoidTransaction }">
                <div class="modal-background"></div>
                <div class="modal-card">

                    <section class="modal-card-body">
                        <div class="w3-row">
                            <br>
                            <p class="w3-center has-text-danger">{{authenticationError}}</p>
                        </div>
                        <div class="field" v-show="userData.userType != 3">
                            <br>
                            <div class="control">
                                <label><b>Please provide SA account</b></label>
                                <input class="input" type="text" placeholder="username" v-model="username" autocomplete="username"  />
                                <p class="help has-text-danger">{{usernameError}}</p>
                            </div>
                        </div>
                        
                        <div class="field">
                            <div class="control">
                                <label><b>Password</b></label>
                                <input class="input" type="password" placeholder="**********" v-model="password" @keyup.enter="submitAuthentication" autocomplete="current-password" />
                                <p class="help has-text-danger">{{passwordError}}</p>
                            </div>
                        </div>
                    </section>

                    <footer class="modal-card-foot">
                        <button class="button is-success" @click="submitAuthentication" >Continue</button>
                        <button class="button" @click="closeVoidTransactionModal">Cancel</button>
                    </footer>

                </div>
            </div>

		</div>

	`,

	data(){

		return{
			isDisableSaveButton : false,
            isShowVoidTransaction : false,
            username : "",
            usernameError : "",
            password : "",
            passwordError : "",

            authenticationError : "",
            isLoadingDL : false
		}

	},

	computed : {


		jTotalPrice(){

			return this.data.reduce(function (accumulator, p) {
                return accumulator + Number(p.total_price);

            }, 0);

		}

	},

	methods : {

		convertMoney(n){

            return (Number(n)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

        },

        viewJobOrder(index, id){
        	this.$emit('view-job-order', index, id);
        },

        archiveJobOrder(id){

			let self = this;

			axios.post('../php/api/archiveJobOrder.php',{
            	
            	jobOrderId : id
                
            })
            .then(function (response){

                console.log(response.data);

                if(response.data.status == "SUCCESS"){

                	self.$emit('fetch-job-orders', self.dateFrom, self.dateTo);
                    self.closeVoidTransactionModal();
                    //self.fetchJobOrders();
                    
                }

            })
            .catch(function (error) {
                console.log(error);
            });

		},

        printReceipt(data){

            var self = this;
            
            axios.post('../php/api/printReceipt.php', {
                data : data,
            })
            .then(function (response){

                console.log(response.data);
                window.open('../php/pdf/receipt.pdf','_newtab');

            })
            .catch(function (error) {
                alert(error);
            });

        },

        printTable(){

            var self = this;
            this.isLoadingDL = true;

            axios.post('../php/api/printJobOrderTable.php', {
                data : this.data,
                dateLabel : this.dateLabel
            })
            .then(function (response){

                self.isLoadingDL = false;
                console.log(response.data);
                window.open('../php/pdf/jobOrdersTable.pdf','_newtab');

            })
            .catch(function (error) {
                alert(error);
            });

        },

        showVoidTransactionModal(id){

            this.selectedId = id;
            this.isShowVoidTransaction = true;

        },

        closeVoidTransactionModal(){

            this.isShowVoidTransaction = false;

        },


        submitAuthentication(){
            
            let self = this;

            this.passwordError = validateLoginInput(this.password);
            if(this.userData.userType != 3) this.usernameError = validateLoginInput(this.username);
            else{
                this.username = this.userData.userName;
            }

            if(this.usernameError == '' && this.passwordError   == ''){

                axios.post('../php/api/authenticateForDeletion.php', {
                    username: this.username,
                    password: this.password
                })
                .then(function (response){

                    console.log(response.data);
                    if(response.data.status == "SUCCESS"){

                        self.archiveJobOrder(self.selectedId);
                        self.username = "";
                        self.usernameError = "";
                        self.password = "";
                        self.passwordError = "";
                        self.authenticationError = "";
                    
                    }
                    else{
                        self.authenticationError = response.data.message;
                    }

                    

                })
                .catch(function (error) {
                    console.log(error);
                });
            }

        }



	}

});

