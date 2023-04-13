<template>
 <div class="container my-5" align="center">
  <v-card class="justify-center addCard" width="350px">
    <div class="heading container">
      <div class="row">
        <div class="col">
          <p class="h3 fw-bold">Add User</p>
        </div>
      </div>
    </div>

    <div class="container mt-3">
    
      <div class="row">
        <div class="col-md-12">
          <form @submit.prevent="submitCreate" class="form-section">
            <div class="form-inner">
              <div class="my-3">
          <img
            :src="contact.photo"
            alt="user image"
            class="user-img"
            :class="{ 'd-none': !contact.photo }"
          />
        </div>
            <div class="mb-2">
              <input
                required
                v-model.trim="contact.name"
                type="text"
                class="form-control"
                placeholder="Name"
              />
            </div>

            <div class="mb-2 text-start">
             <span class="font-15">Select Gender</span> 
              <div class="d-flex">
                <div class="form-check">
                  <input
                    type="radio"
                    v-model="contact.gender"
                    value="male"
                    id="maleRadio"
                  />
                  <label class="form-check-label ml-2" for="maleRadio">
                    Male
                  </label>
                  &nbsp;&nbsp;&nbsp;
                  <input
                    type="radio"
                    v-model="contact.gender"
                    value="female"
                    id="femaleRadio"
                  />
                  <label class="form-check-label ml-2" for="femaleRadio">
                    Female
                  </label>
                </div>
              </div>
            </div>

            <div class="mb-2" align="start">
              <div class="font-15">Select Skills</div>
              <div class="ml-6" v-for="(skill, index) in skills" :key="index">
                <input
                  v-model="contact.skills"
                  class="form-check-input"
                  type="checkbox"
                  :id="skill.text"
                  :value="skill.text"
                />
                <label class="form-check-label ml-2" :for="skill.text">
                  {{ skill.text }}
                </label>
              </div>
            </div>

            <div class="mb-2">
              <input
                required
                v-model.trim="contact.mobile"
                type="text"
                class="form-control"
                placeholder="Mobile Number"
                @input="checkMobileValidity"
              />
              <div v-if="!mobileValid" class="text-danger">
                Please enter a valid 10-digit mobile number
              </div>
            </div>

            <div class="mb-2">
              <input
                required
                v-model.trim="contact.photo"
                type="url"
                class="form-control"
                placeholder="Image URL"
              />
            </div>

            <div class="mb-2">
              <input
                required
                v-model.trim="contact.country"
                type="text"
                class="form-control"
                placeholder="Country Name"
              />
            </div>

            <div class="my-2">
              <input
                type="submit"
                class="btn btn-blue-theme"
                value="Submit"
                :disabled="!isValidForm"
              />
            </div>
          </div>
          </form>
        </div>
      </div>
    </div>
  </v-card>
  </div>
</template>

<script>
import { ContactService } from "@/services/ContactService";
export default {
  name: "AddDetails",

  data() {
    return {
       
      contact: {
        name: "",
        photo: "",
        country: "",
        mobile: "",
        gender: "",
        skills: [],
      },
      errors: {},
      mobileValid: false,
    };
  },

  methods: {
    async submitCreate() {
      this.errors = {};

      // Validate name
      if (!this.contact.name) {
        this.errors.name = "Name is required.";
      }

      // Validate mobile number
      const mobileRegex = /^[0-9]{10}$/;
      if (!mobileRegex.test(this.contact.mobile)) {
        this.errors.mobile = "Mobile number must be a 10-digit number.";
      }

      // Validate photo URL
      const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
      if (!urlRegex.test(this.contact.photo)) {
        this.errors.photo = "Please enter a valid URL.";
      }

      // Check if any errors
      if (Object.keys(this.errors).length > 0) {
        return;
      }

      try {
        let response = await ContactService.createContact(this.contact);
        console.log(response);
        if (response) {
          return this.$router.push("/");
        } else {
          return this.$router.push("/add");
        }
      } catch (error) {
        console.log(error);
      }
    },
    checkMobileValidity() {
      this.mobileValid = /^\d{10}$/.test(this.contact.mobile);
    },
  },

  computed: {
    isValidForm() {
      return (
        this.contact.name.trim() &&
        this.contact.gender &&
        this.contact.skills.length > 0 &&
        this.contact.mobile &&
        this.contact.photo.trim() &&
        this.contact.country.trim()
      );
    },
  },
};
</script>
<style>
.btn-blue-theme
{
    font-weight: 900 !important;
    border: 2px solid #0F0F57 !important;
    color: #0F0F57 !important;
    width: 100%;
    /* margin-top: 28px; */
    display: flex;
    align-items: center;
}
.heading{
  background: #6DA536;
    color: #ffffff;
    padding: 40px 0px;
    text-align: center;
    font-size: 40px;
    font-weight: bold;
}
.form-section input[type="text"].form-control, .form-section input[type="url"].form-control,.form-section input[type="number"].form-control,  .form-section .form-select
  {
    height: 40px;
    background-color: #F1F1F1;
    color: #000000;
    font-weight: 500;
  }
  .form-section .form-inner
  {
    padding: 20px 15px;
  }


  /* responsive css */
@media only screen and (max-width: 1400px){

}
@media only screen and (max-width: 992px){

}
@media only screen and (max-width: 680px){

}
</style>
