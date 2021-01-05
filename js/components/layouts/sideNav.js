Vue.component('sideNav', {
	props: ['pageCounter','userData'],
	template: `
		
		<div class="sidenav w3-card has-background-white">
            <aside class="menu is-hidden-mobile">
                <div class="w3-row w3-container">
                    <p class="menu-label">
                        General
                    </p>
                    <ul class="menu-list">
                        <li><a :class="{'is-active' : pageCounter == 1}" href="dashboard.html"> <i class="fas fa-chart-line"></i> &nbsp Dashboard</a></li>
                        <li><a :class="{'is-active' : pageCounter == 2}" href="job-orders.html"><i class="fas fa-sign-language" ></i> &nbsp Job Orders</a></li>
                        
                        <li>
                            <a :class="{'is-active' : pageCounter == 51}"><i class="fas fa-archive"></i> &nbsp Reports</a>
                            <ul>
                                <li><a :class="{'is-active' : pageCounter == 51}" href="sales-summary.html"><i class="fas fa-dollar-sign"></i> &nbsp Sales <br>&nbsp&nbsp&nbsp&nbsp Summary</a></li>
                            </ul>
                        </li>
                    </ul>
                    <p class="menu-label">
                        Administration
                    </p>
                    <ul class="menu-list">
                        <li>
                            <a :class="{'is-active' : pageCounter == 41 || pageCounter == 42 || pageCounter == 43}"><i class="fas fa-cogs"></i> &nbsp Manage</a>
                            <ul>
                                <li><a  :class="{'is-active' : pageCounter == 41}" href="manage-clients.html"> <i class="fas fa-user-md"></i> &nbsp Clients</a></li>
                                <li><a  :class="{'is-active' : pageCounter == 42}" href="manage-particulars.html"> <i class="fas fa-tooth"></i> &nbsp Particulars</a></li>
                                <li><a  :class="{'is-active' : pageCounter == 43}" href="manage-technicians.html"> <i class="fas fa-tools"></i> &nbsp Technicians</a></li>
                                
                                <br><br>
                            </ul>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>

	`,


});