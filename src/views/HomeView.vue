<template>
<div>
  <div class="container mt-3">
    <div class="row">
      <div class="col d-flex justify-space-between">
        <p class="h3 text-success fw-bold">User List</p>
        <router-link to="/user/add" class=" btn btn-blue-theme1 btn-sm">
          <i class="fa fa-plus-circle pt-2"></i> Add User</router-link>
      </div>
    </div>
</div>

<div v-if="loading">
  <div class="container">
    <div class="row">
      <div class="col">
        <Loader />
      </div>
    </div>
  </div>
</div>

<div v-if="!loading && errorMessage">
  <div class="container">
    <div class="row">
      <div class="col">
       <p class="h3 text-danger fw-bold">{{errorMessage}}</p>
      </div>
    </div>
  </div>
</div>

  <div class="container mt-3" v-if="contacts.length > 0">
    <div class="row">
      <div class="col-md-6 mb-2" v-for="contact of contacts" :key="contact">
        <div class="card my-2 list-group-item shadow-lg border-success">
          <div class="card-body">
            <div class="row">
              <div class="col-sm-4 my-2" align="center">
                <img :src="contact.photo" alt="user img" class="user-img" />
              </div>
              <div class="col-sm-6 px-0">
                <ul class="list-group">
                  <li class="list-group-item">Name: <span class="fw-bold">{{contact.name}}</span></li>
                  <li class="list-group-item">Gender: <span class="fw-bold">{{contact.gender}}</span></li>
                 
                  <li class="list-group-item">Skills: <span class="fw-bold">
                    <span v-for="skill in contact.skills" :key="skill">
                      {{ skill }}
                    </span>
                  </span></li>
                   <li class="list-group-item">Country Name: <span class="fw-bold">{{contact.country}}</span></li>
                  <li class="list-group-item">Phone: <span class="fw-bold">{{contact.mobile}}</span></li>
                </ul>
              </div>
              <div class="col-sm-1">
                <router-link :to="`/view/${contact.id}`" class="btn btn-success my-2 mx-2">
                  <i class="fa fa-eye"></i>
                </router-link>
                <!-- <router-link :to="`/edit/${contact.id}`" class="btn btn-info my-2 mx-2">
                  <i class="fa fa-pen"></i>
                </router-link> -->
                <span @click="handelEdit(contact)" class="btn btn-info my-2 mx-2">
                  <i class="fa fa-pen"></i>
                </span>
                <button class="btn btn-danger my-2 mx-2" @click="deleteDetails(contact.id)">
                  <i class="fa fa-trash"></i>
                </button>
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h6 class="modal-title" id="exampleModalLabel">Are you Sure  Whats to delete ?</h6>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button class="btn btn-danger my-2" @click="deleteDetails(contact.id)">
                         <i class="fa fa-trash pr-2"></i>Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
  </div>
</template>
<script>
import {ContactService} from "@/services/ContactService";
import Loader from "../components/Loader";
import Footer from "../components/Footer";
export default{
  name: 'HomeView',
    components: {
    Loader,
    Footer
   },
  data : function() {
    return{
    
      loading : false,
      contacts:[],
      errorMessage: null
    }
  },
  created : async function(){
    try{
      this.loading = true;
      let response = await ContactService.getAllContacts();
      
      this.contacts = response.data;
      console.log(this.contacts);
      this.loading = false;
    }
    catch(error){
      this.errorMessage = error;
      this.loading = false;
    }
  },
  methods: {
    handelEdit(data) {
      console.log(data)
      this.$router.push(`/edit/${data.id}`);
      this.$store.dispatch("setContactDetails", data)
    },
    deleteDetails: async function(contactId){
      
      try{
        alert("Are you sure What to delete ?");
        this.loading = true;
        let response = await ContactService.deleteContact(contactId);
        if(response){
          let response = await ContactService.getAllContacts();
          this.contacts = response.data;
          this.loading = false;
        }

      }
      catch(error){
          this.errorMessage = error;
          this.loading = false;
      }

    }
  }

}
</script>
<style>
.btn-blue-theme1{
    border: 2px solid #0F0F57 !important;
    color: #0F0F57 !important;
}
.text-success{
  color: #6DA536 !important;

}
  /* responsive css */
  @media only screen and (max-width: 1400px){

}
@media only screen and (max-width: 992px){

}
@media only screen and (max-width: 680px){

}
</style>
