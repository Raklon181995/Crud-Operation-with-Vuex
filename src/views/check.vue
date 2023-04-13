<template>
  <div>
    <div class="container mt-3">
      <div class="row">
        <div class="col">
          <p class="h3 text-danger fw-bold">Add User</p>
        </div>
      </div>
    </div>

    <div class="container mt-3">
      <div class="row">
        <div class="col-md-4">
          <form @submit.prevent="submitCreate">
            <div class="mb-2">
              <input
                required
                v-model.trim="contact.name"
                type="text"
                class="form-control"
                placeholder="Name"
              />
            </div>

            <div class="mb-2">
              Select Gender
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

            <div class="mb-2">
              <div>Select Skills</div>
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
                type="tel"
                class="form-control"
                placeholder="Mobile Number"
                pattern="[0-9]+"
                inputmode="numeric"
              />
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

            <div class="mb-2">
              <input
                type="submit"
                class="btn btn-success"
                value="Create"
                :disabled="!isValidForm"
              />
            </div>
          </form>
        </div>

        <div class="col-md-4">
          <img
            :src="contact.photo"
            alt="user image"
            class="user-img"
            :class="{ 'd-none': !contact.photo }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ContactService } from "@/services/ContactService";
export default {
  name: "AddDetails",

  data() {
    return {
      skills: [{ text: "Vue Js" }, { text: "React Js" }],
      contact: {
        name: "",
        photo: "",
        country: "",
        mobile: "",
        gender: "",
        skills: [],
      },
      errors: {},
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
