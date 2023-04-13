<template>
  <div class="container my-5" align="center">
    <v-card class="justify-center addCard" width="350px">
      <div class="heading container">
      <div class="row">
        <div class="col">
          <p class="h3 fw-bold">View User</p>
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
     <div class="container mt-3" v-if="!loading && isDone()">
        <div class="row">
            <div class="col-md-12 my-2 align-item-center" align="center">
                 <img :src="contact.photo" alt="user img" class="user-img" />
            </div>
            <div class="col-md-12">
                 <ul class="list-group">
                  <li class="list-group-item">Name: <span class="fw-bold">{{contact.name}}</span></li>
                  <li class="list-group-item">Phone: <span class="fw-bold">{{contact.mobile}}</span></li>
                   <li class="list-group-item">Gender: <span class="fw-bold">{{contact.gender}}</span></li>
                   <li class="list-group-item">Skills: <span class="fw-bold">
                    <span v-for="skill in contact.skills" :key="skill">
                      {{ skill }}
                    </span>
                  </span></li>
                  <li class="list-group-item">Country Name: <span class="fw-bold">{{contact.country}}</span></li>
                </ul>
            </div>
        </div>
        <div>
          <router-link to="/" class="btn btn-blue-theme my-4">Back</router-link>
        </div>
    </div>
  </v-card>
  </div>
</template>

<script>
import {ContactService} from "@/services/ContactService";
import Loader from "../components/Loader";
export default {
  name: 'ViewDetails',
  components: {
   Loader
   },

 data: function() {
  return{
    skills: [{ text: "Vue Js" }, { text: "React Js" },{ text: "Node Js" },{ text: "Laravel" }],
    contactId: this.$route.params.contactId,
    loading: false,
    contact: {},
 
  }
 },
 created: async function() {
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
  isDone: function() {
    return Object.keys(this.contact).length > 0;
  }
}
}
</script>