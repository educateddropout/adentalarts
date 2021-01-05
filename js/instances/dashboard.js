


var sc = new Vue({

	el: '#dashboard',

	data: {
		
		pageCounter : 1,
		userData : {},

		products : [],
		jobOrders : []

		
	},

	mounted(){

		this.fetchOngoingJobOrders();
		this.fetchMostSoldProducts();

	},

	methods: {


		copyUserData(userData){

			this.userData = userData;

		},

		fetchOngoingJobOrders(){

			let self = this;

			axios.post('../php/api/fetchOngoingJobOrders.php',{
            	
                
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

		fetchMostSoldProducts(){

			let self = this;
			axios.post('../php/api/fetchMostSoldProducts.php',{
            })
            .then(function (response){

                console.log(response.data);
                if(response.data.status == "SUCCESS"){
                    self.products = response.data.message;                    
                }
            })
            .catch(function (error) {
                console.log(error);
            });

		},

		convertMoney(n){

            return (Number(n)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

        }

	}

});




