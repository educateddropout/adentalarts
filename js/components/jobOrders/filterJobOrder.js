Vue.component('filterJobOrder', {
	props: ['technicianTypes', 'statusTypes', 'technicianLib'],
	template: `
    
        <div>

		<div class="w3-row ">
            <button class="button" :class="{'is-link': isShowFilters}" @click="toggleShowFilters"><i class="fas fa-filter"></i> &nbsp Filter Records</button>
        </div>

        <div class="w3-row " v-show="isShowFilters">
            
            <div class="w3-col l9 w3-leftbar w3-border-blue  w3-pale-blue">
                
                <div class="w3-row w3-border-bottom w3-border-blue">
                    <div class="w3-row w3-margin ">
                        <div class="w3-third" v-for="t in technicianLib">
                            <div class="w3-row">
                                <div class="w3-col l3">
                                    <input class="w3-check pointer" type="checkbox" :id="t.technician_name" :value="t.technician_id" v-model="technicianTypes.value" >
                                </div>
                                <div class="w3-col l9">
                                    <label class="pointer" :for="t.technician_name">{{t.technician_name}}</label>&nbsp&nbsp
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>

                <div class="w3-row w3-border-bottom w3-border-blue">
                    <div class="w3-row w3-margin">
                        <div class="w3-third" v-for="s in statusLib">
                            <div class="w3-row">
                                <div class="w3-col l3">
                                    <input class="w3-check pointer" type="checkbox" :id="s.description" :value="s.value" v-model="statusTypes.value" >
                                </div>
                                <div class="w3-col l9">
                                    <label class="pointer" :for="s.description">{{s.description}}</label>&nbsp&nbsp
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            

            </div>

        </div>

        </div>

	`,
    data() {

        return {

            isShowFilters : false,
            statusLib : statusLib(),

        }

    },

    methods : {


        toggleShowFilters(){

            if(this.isShowFilters == true) this.isShowFilters = false;
            else this.isShowFilters = true;

        }

    }


});