Vue.component('dentalInfo', {
	props: ['teethObject', 'jobOrderId', 'jobOrderStatus'],
	template: `
    
        <div>
            <div class="w3-row w3-container box" style="overflow-y: scroll">
                <br>
                <button class="button is-warning" @click="toggleUpdating" :disabled="jobOrderStatus == 'C'">
                    <span v-if="!updating"> <i class="fas fa-unlock-alt"></i> &nbsp Enable Updating </span>
                    <span v-else=""> <i class="fas fa-lock"></i> &nbsp Disable Updating </span>
                </button>
                <button class="button is-success" @click="updateDentalRecord" :disabled="!updating">
                    &nbsp<i class="fas fa-save"></i>&nbsp Save Dental Record
                </button>
                <hr>
                <div class="w3-cell-row" >
                    <div class="w3-container w3-cell w3-cell-top">
                        <br>
                        <strong>
                            <div class="w3-row">
                                <p class="w3-center">TOP</p>
                            </div>
                            <div class="w3-row">
                                <span>RIGHT</span>
                                <span class="w3-right">LEFT</span>
                            </div>
                        </strong>
                        <br>
                        <div class="w3-cell-row">
                            <div class="w3-cell w3-border-right w3-border-bottom">
                                <dental-record
                                    :teeth-label = "upperRightTeethLabel"
                                    :teeth-status = "teethObject.upperRightTeeth"
                                    :tooth-status-lib = "toothStatusLib"
                                    :is-upper = "true"
                                    :updating = "updating"
                                >
                                </dental-record>
                            </div>
                            <div class="w3-cell w3-border-left w3-border-bottom w3-padding-left">
                                <dental-record
                                    :teeth-label = "upperLeftTeethLabel"
                                    :teeth-status = "teethObject.upperLeftTeeth"
                                    :tooth-status-lib = "toothStatusLib"
                                    :is-upper = "true"
                                    :updating = "updating"
                                >
                                </dental-record>
                            </div>
                        </div>

                        <div class="w3-cell-row">
                            <div class="w3-cell w3-border-right w3-border-top w3-padding-right">
                                <dental-record
                                    :teeth-label = "lowerRightTeethLabel"
                                    :teeth-status = "teethObject.lowerRightTeeth"
                                    :tooth-status-lib = "toothStatusLib"
                                    :updating = "updating"
                                >
                                </dental-record>
                            </div>
                           <div class="w3-cell w3-border-left w3-border-top w3-padding-left">
                                <dental-record
                                    :teeth-label = "lowerLeftTeethLabel"
                                    :teeth-status = "teethObject.lowerLeftTeeth"
                                    :tooth-status-lib = "toothStatusLib"
                                    :updating = "updating"
                                >
                                </dental-record>
                            </div>
                        </div>
                        <br>
                        <strong>
                            <div class="w3-row">
                                <span>RIGHT</span>
                                <span class="w3-right">LEFT</span>
                            </div>
                            <div class="w3-row">
                                <p class="w3-center">BOTTOM</p>
                            </div>
                        </strong>
                    </div>
                </div>
            </div>

            <div class="modal" :class="{'is-active' : isOpenMessage}">
                <div class="modal-background" @click="closeMessage"></div>
                <div class="modal-card">
                
                    <section class="modal-card-body">
                        <span class="" v-show="messageCtr == 0">Updating Dental Record. Please wait! . . . &nbsp<i class="fas fa-spinner fa-pulse"></i></span>
                        <span class="has-text-success" v-show="messageCtr == 1">Successfully updated dental record. &nbsp<i class="fas fa-glass-cheers"></i></span>
                        <span class="has-text-danger" v-show="messageCtr == -1">Error saving. Please contact your system administrator.</span>
                    </section>

                </div>
            </div>
        </div>

	`,
    data() {

        return {


            updating : false,
            upperRightTeethLabel : ["18","17","16","15","14","13","12","11"],
            upperLeftTeethLabel : ["21","22","23","24","25","26","27","28"],
            lowerRightTeethLabel : ["48","47","46","45","44","43","42","41"],
            lowerLeftTeethLabel : ["31","32","33","34","35","36","37","38"],
            toothStatusLib : [
                { "code" : 1, "description" : "A"},
                { "code" : 2, "description" : "AP"},
                { "code" : 3, "description" : "CA"},
                { "code" : 4, "description" : "CD"},
                { "code" : 5, "description" : "CO"},
                { "code" : 6, "description" : "CP"},
                { "code" : 7, "description" : "CT"},
                { "code" : 8, "description" : "FL"},
            ],
            dentalRecordDate : {
                "value" : "" , "error" : ""
            },

            messageCtr : 0,
            isOpenMessage : false

        }

    },

    methods : {

        toggleUpdating(){
            if(this.
                updating) this.updating = false;
            else this.updating = true;
        },

        openMessage(){
            this.isOpenMessage = true;
        },

        closeMessage(){
            if(this.messageCtr != 0) this.isOpenMessage = false;
        },


        updateDentalRecord(){

            let self = this;

            let upperRightTeeth = combineTeethData(this.teethObject.upperRightTeeth);
            let upperLeftTeeth = combineTeethData(this.teethObject.upperLeftTeeth);
            let lowerRightTeeth = combineTeethData(this.teethObject.lowerRightTeeth);
            let lowerLeftTeeth = combineTeethData(this.teethObject.lowerLeftTeeth);

            


                //this.saveSuccessModal = true;
                //this.saveSuccessLoading = true;
                //this.saveSuccessMessage = "Updating dental record data. Please wait...";

            this.openMessage();
            this.messageCtr = 0;
            this.toggleUpdating();

            axios.post( '../php/api/updateDentalRecord.php',{
                id : this.jobOrderId,
                upper_right_teeth : upperRightTeeth,
                upper_left_teeth : upperLeftTeeth,
                lower_right_teeth : lowerRightTeeth,
                lower_left_teeth : lowerLeftTeeth

            }).then(function(response){
                console.log(response.data);

                if(response.data.status == "SUCCESS"){
                    self.messageCtr = 1;

                } else {
                    self.messageCtr = -1;
                }

            })
            .catch(function(error){
                console.log(error);
            });


        }

    }


});

