<template>
<div class="container my-5" align="center">
    <v-card class="justify-center addCard" width="350px">
        <div class="heading container">
      <div class="row">
        <div class="col">
          <p class="h3 fw-bold">Edit User</p>
          
        </div>
      </div>
    </div>
    <div class="container mt-3">
        <div class="row">
            <div class="col-md-12">
               <form @submit.prevent="updateSubmit()" class="form-section">
                    <div class="mb-2">
                        <input required v-model="getUserContactDetails.name" type="text" class="form-control" placeholder="Name">
                    </div>
                    <div class="mb-2 " align="start"><span class="font-15">Select Gender</span>
                        <div class="d-flex">
                            <div class="form-check">
                                <input type="radio" v-model="getUserContactDetails.gender" value="male">&nbsp; Male
                                &nbsp;&nbsp;&nbsp;
                                <input type="radio" v-model="getUserContactDetails.gender" value="female">&nbsp; Female    
                            </div>
                        </div>
                    </div>
                    
                     <div class="mb-2" align="start">
                        <div class="font-15">Select Your Skills</div>
                        <div class="ml-6" v-for="(skill, index) in  getUserContactDetails.skills" :key="index">
                            <input v-model="getUserContactDetails.skill" class="form-check-input" type="checkbox" :id="skill" :value="skill">
                            <label class="form-check-label ml-2" for="flexCheckDefault">
                                {{skill}}
                            </label>
                        </div>
                    </div>
                
                    <div class="mb-2">
                        <input required v-model="getUserContactDetails.photo" type="text" class="form-control" placeholder="Image">
                    </div>
                    <div class="mb-2">
                        <input required v-model="getUserContactDetails.mobile" type="number" class="form-control" placeholder="Phone">
                    </div>
                     <div class="mb-2">
                        <input required v-model="getUserContactDetails.country" type="text" class="form-control" placeholder="Country Name">
                    </div>
                    <div class="mb-2">
                        <input required type="submit" class="btn btn-blue-theme my-4" value="Update">
                    </div>
               </form>
            </div>
            <!-- <div class="col-md-4">
                <img :src="getUserContactDetails.photo" alt="user image" class="user-img">
            </div> -->
        </div>
    </div>
    </v-card>
</div>
</template>

<script>
import {ContactService} from "@/services/ContactService";
import {  mapGetters } from "vuex";
export default {
  name: 'EditDetails',
  data: function(){
    return{
    skills: [{ text: "Vue Js" }, { text: "React Js" },{ text: "Node Js" },{ text: "Laravel" },{ text: "PHP" }],
    contactId: this.$route.params.contactId,
    loading: false,
    errorMessage: null
  }
 },
 computed: {
    ...mapGetters(["getUserContactDetails"]),
  },
 created :async function() {
    try{
        this.loading = true;
        let response = await ContactService.getContact(this.contactId);
        this.contact = response.data;
        this.loading = false;

    }
    catch(error){
        this.errorMessage = error;
        this.loading = false;

    }
 },
 methods: {
    updateSubmit: async function() {
        console.log('getUserContactDetails', this.getUserContactDetails)
        this.$store.dispatch("updateContactDetails", this.getUserContactDetails)
        .then(() => {
          this.$router.push("/");
        })
        .catch(() => {
          console.log("login error occurred");
        })
        .finally(() => {
          this.loading = false;
        });


       
    }
 }
}
</script>
<style>
.font-15{
    font-size: 16px;
    font-weight: 700;
    color: #0F0F57;
}
</style>