Vue.component('headerNav', {
	props: ['pageCounter'],
	template: `
		
		<div class=" ">
		    <nav class="navbar is-fixed-top w3-border-bottom w3-border-blue w3-card" role="navigation" aria-label="main navigation">
				<div class="navbar-brand">
					<a class="navbar-item brand-text" href="dashboard.html">
						<img src="../assets/images/ad_logo.png" width="150px" />
					</a>

					<a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navAdInventory">
						<span aria-hidden="true"></span>
						<span aria-hidden="true"></span>
						<span aria-hidden="true"></span>
					</a>
				</div>

				<div id="navAdInventory" class="navbar-menu">
					<div class="navbar-start">
						<a class="navbar-item font-label">
					        Dental Arts
					    </a>
					</div>

					<div class="navbar-end">
						<div class="navbar-item">

							<p>Hi! {{userData.userFullName}}</p> &nbsp &nbsp
							<div class="navbar-item has-dropdown is-hoverable">
				            	<a class="navbar-link" :class="{'is-active' : pageCounter == 5}">
			                        <span class="has-text-link"><i class="fas fa-cog"></i></span> &nbsp
			                    </a>

			                    <div class="navbar-dropdown">
			                        <a class="navbar-item" href="change-password.html">
			                            <i class="fas fa-key"></i> &nbsp Change Password
			                        </a>
			                    </div>
			                </div>
							<div class="buttons" >
								<a class="button is-light" @click="signOut">
									<i class="fas fa-sign-out-alt"></i> &nbsp Sign Out
								</a>
							</div>
						</div>
					</div>
				</div>
			</nav>
			<div class="modal" :class="{'is-active' : closeAuthenticationMessage != ''}">

				<div class="modal-background" @click="closeAuthenticationError"></div>
				<div class="modal-content box has-text-danger">
					{{closeAuthenticationMessage}}
				</div>
				<button class="modal-close is-large" aria-label="close" @click="closeAuthenticationError"></button>
			</div>
		</div>
		
		

	`,

	data(){

		return {
			pendingPatientInfo : 0,
			userData : {
				userId : -1,
				userName : "",
				userFullName : "",
				userType : -1,
				regionCode : -1,
				allowedAccess : 0
			},
			closeAuthenticationMessage : "",

		}

	},
	created(){

		this.authentication();
		//this.isIdle(); 

	},

	methods : {

		isIdle() {

            var self = this;

            let idleCountdown;
            window.onload = resetTimer;
            window.onmousemove = resetTimer;
            window.onmousedown = resetTimer;  // catches touchscreen presses as well      
            window.ontouchstart = resetTimer; // catches touchscreen swipes as well 
            window.onclick = resetTimer;      // catches touchpad clicks as well
            window.onkeypress = resetTimer;   
            window.addEventListener('scroll', resetTimer, true);

            function logOutUser() {

                self.logoutSession();

            }

            function resetTimer() {
                clearTimeout(idleCountdown);
                idleCountdown = setTimeout(logOutUser, 1800000);  // time is in milliseconds 1000 == 1 second

            }
        },

        logoutSession(){
            var self = this;
            
            axios.get('../php/api/logout.php')
			.then(function (response){

				self.showAuthenticationErrorMessage("It seems your not doing anything for 30 minutes. Sorry you will be log out!");

			})
			.catch(function (error) {
				alert(error);
			});

        },

		toggleNavbarMobile(){

			if(this.showNavbarMobile == true) this.showNavbarMobile = false;
			else this.showNavbarMobile = true;
			
		},

		signOut(){

			axios.get('../php/api/logout.php')
			.then(function (response){

				window.location.replace("../index.html");

			})
			.catch(function (error) {
				alert(error);
			});

		},

		authentication(){
			var self = this;

			

			axios.get('../php/api/userAuthentication.php')
			.then(function (response){
				
				if(response.data.allowedAccess == 0){
					self.showAuthenticationErrorMessage("You're not allowed to access this system");
				} else {

					let userData = {
						userId : response.data.id,
						userName : response.data.username,
						userType : response.data.userType,
						userFullName : response.data.name,
						allowedAccess : response.data.allowedAccess
					};

					self.userData = userData;
					self.$emit("copy-user-data", self.userData);
				}
				


			})
			.catch(function (error) {
				self.showAuthenticationErrorMessage("Network Error. Cannot connect to server.");
				console.log(error);
			});

		},

		showAuthenticationErrorMessage(errorMessage){
			this.closeAuthenticationMessage = errorMessage;
		},

		closeAuthenticationError(){
			this.closeAuthenticationMessage = "";
			window.location.replace("../index.html");
		}

	}


});