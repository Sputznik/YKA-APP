<template>
  <AppUI :showFooter="false" appbarClasses="text-center" title="Login">
    <template v-slot:appbody>
      <form @submit="onSubmit" class="mx-auto py-4">
        <div v-if="loginData.form_page == 1">
          <input
            type="text"
            v-model.trim="loginData.email_address"
            placeholder="Enter Your Email Address"
          />
        </div>
        <div v-if="loginData.form_page == 2">
          <input
            type="text"
            v-model.trim="loginData.input_otp"
            placeholder="Enter OTP"
          />
        </div>
        <div
          v-if="loginData.error_msg"
          class="border p-2 border-dark-red text-dark-red text-xs mb-4"
        >
          {{ loginData.error_msg }}
        </div>
        <div class="form-buttons">
          <button
            :disabled="loginData.processing"
            :class="{ 'cursor-not-allowed': loginData.processing }"
            class="btn bg-dawn-pink"
            v-html="buttonText"
          ></button>
          <span class="ml-2 text-xs" v-if="loginData.form_page == 2">or</span>
          <span
            class="ml-2 text-xs text-gray underline cursor-pointer"
            v-if="loginData.form_page == 2"
            @click="loginData.form_page = 1"
            >Go Back</span
          >
        </div>
      </form>
      <p class="text-xs text-mid-gray">
        Signing in with email is a new, secure, OTP-based login system. If
        you've previously used social media to login to YKA, simply use the
        email ID associated with your social media account you use to login to
        YKA. For any queries or issues, write to us at
        <a class="font-bold underline" href="mailto:info@youthkiawaaz.com"
          >info@youthkiawaaz.com</a
        >.
      </p>
    </template>
  </AppUI>
</template>
<script>
import { useStore } from "vuex";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

// Helpers
import API from "@/api";

// Templates
import AppUI from "@/components/app-ui/AppUI.vue";

export default {
  name: "Login",
  components: {
    AppUI,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const loginData = ref({
      sent_otp: "",
      input_otp: "",
      email_address: "",
      form_page: 1,
      error_msg: "",
      processing: false,
    });

    const buttonText = computed(() => {
      if (loginData.value.processing) return "Processing...";
      return loginData.value.form_page === 1 ? "Send OTP" : "Verify";
    });

    const nextPage = () => {
      loginData.value.form_page = 2;
      loginData.value.processing = false;
    };

    const generateOTP = () => {
      const digits = "0123456789";
      let OTP = "";
      for (let i = 0; i < 6; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
      }
      return OTP;
    };

    const validateEmail = () => {
      const validRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

      if (
        loginData.value.email_address &&
        loginData.value.email_address.match(validRegex)
      )
        return true;

      loginData.value.error_msg =
        "Please type your email ID above instead of copying it to avoid error.";

      return false;
    };

    const sendEmailOTP = () => {
      // RETURN IF EMAIL IS INVALID
      if (!validateEmail()) return;

      // CLEAR ERROR MESSAGE
      loginData.value.error_msg = "";

      loginData.value.sent_otp = generateOTP();

      loginData.value.processing = true;

      API.requestVerifyMail({
        email_address: btoa(loginData.value.email_address),
        email_otp: btoa(loginData.value.sent_otp),
      }).then(
        () => nextPage(),
        (error) => handleError(error)
      );
    };

    const handleError = (error) => {
      loginData.value.processing = false;

      store.commit("setProcessing", false);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        loginData.value.error_msg = error.response.data.message;
      } else {
        loginData.value.error_msg = "Unidentified error:" + error;
      }
    };

    const verifyOTP = () => {
      if (
        !loginData.value.input_otp ||
        loginData.value.input_otp !== loginData.value.sent_otp
      ) {
        loginData.value.error_msg = "Invalid OTP";
        return;
      }

      // CLEAR ERROR MESSAGE
      loginData.value.error_msg = "";

      loginData.value.processing = true;

      API.requestAuthenticateEmailAddress({
        email_address: btoa(loginData.value.email_address),
      }).then(
        (response) => afterAuthentication(response),
        (error) => handleError(error)
      );
    };

    const afterAuthentication = (response) => {
      loginData.value.processing = false;

      if (response.data && response.data.password && response.data.username) {
        // SAVE TO LOCAL STORAGE
        store.commit("saveAccountSettings", response.data);

        // REDIRECT TO HOMEPAGE
        router.push({
          name: "Home",
          replace: true,
        });

        return;
      }
    };

    const onSubmit = (ev) => {
      ev.preventDefault();

      // RETURN IF ALREADY PROCESSING
      if (loginData.value.processing) return false;

      if (loginData.value.form_page == 1) {
        sendEmailOTP();

        return;
      }
      verifyOTP();
    };

    return { loginData, buttonText, onSubmit };
  },
};
</script>
<style scoped>
.btn {
  @apply border py-2 px-8 text-sm rounded;
}
input[type="text"] {
  @apply border border-light-gray w-full p-2 mb-4;
}

@media (max-width: 374px) {
  .btn {
    @apply px-6;
  }
  .form-buttons {
    @apply flex justify-between items-center;
  }
}
</style>
