


var sc = new Vue({

	el: '#salesSummary',

	data: {
		
		pageCounter : 51,
		userData : {},

		numberOfMonths : 6,
		tData : [0,0,0,0,0,0],
		isLoadingDL : false
		
	},

	mounted(){

		this.fetchCostSummary();

	},

	computed : {
		nMonth(){
			return lastNMonth(this.numberOfMonths-1);
		},

		totalSales(){
			return this.tData.reduce(function(a, b){	return a+Number(b)});
		}

	},

	methods: {

		createChart(numberOfMonths, tData){
			
			const ctx = document.getElementById('myChart').getContext('2d');
			const chart =  new Chart(ctx, {
			    // The type of chart we want to create
			    type: 'line',

			    // The data for our dataset
			    data: {
			        labels: this.nMonth,
			        datasets: [{
			            label: 'Total Sales',
			            borderColor: 'rgb(255, 99, 132)',
			            data: tData
			        }]
			    },

			    // Configuration options go here
			    options: {}
			});

		},

		copyUserData(userData){

			this.userData = userData;

		},

		fetchCostSummary(){

			let self = this;
			axios.post('../php/api/salesSummary.php',{
				numberOfMonths : this.numberOfMonths
            })
            .then(function (response){

                console.log(response.data);
                if(response.data.status == "SUCCESS"){
                    self.tData = response.data.message.tData;
                    console.log(response.data.message.tData);
                    self.createChart(self.numberOfMonths, response.data.message.tData);                  
                }
            })
            .catch(function (error) {
                console.log(error);
            });

		},

		convertMoney(n){

			return (Number(n)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

        },

        printTable(){

            var self = this;
            this.isLoadingDL = true;

            axios.post('../php/api/printSalesSummary.php', {
                nMonth : this.nMonth,
                tData : this.tData
            })
            .then(function (response){

                self.isLoadingDL = false;
                console.log(response.data);
                window.open('../php/pdf/salesSummaryTable.pdf','_newtab');

            })
            .catch(function (error) {
                alert(error);
            });

        }


	}

});

function lastNMonth(ctr){

	var retVal = [];
	var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

	var today = new Date();
	var d;

	for(var i = ctr; i >= 0; i -= 1) {
	  d = new Date(today.getFullYear(), today.getMonth() - i, 1);
	  retVal.push(monthNames[d.getMonth()] + " " + d.getFullYear() );
	}

	return retVal;

}



