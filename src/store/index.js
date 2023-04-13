import { createStore } from 'vuex'
import {ContactService} from "@/services/ContactService";

export default createStore({
  state: {
    userContactInfo: {}
  },
  getters: {
    getUserContactDetails(state) {
			return state.userContactInfo
		},
  },
  mutations: {
    SET_CONTACT_INFO: (state, contactInfo) => {
			state.userContactInfo = contactInfo
		},
  },
  actions: {
    setContactDetails({ commit }, userContactInfo) {
      commit('SET_CONTACT_INFO', userContactInfo)
    },
   
    async updateContactDetails(data){
      let value = data.state.userContactInfo
       try{
            let response =await ContactService.updateContact(value, value.id);
            if(response){
                return 
            }
            else{
                return 
            }
        }
        catch(error){
            console.log(error);
        }

    }
  },
  modules: {
  }
})
