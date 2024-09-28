<template>
  <div class="questionnaire">
    <iframe class="google-form"
            src="https://docs.google.com/forms/d/e/1FAIpQLSfVcapSZ1QhnLuvr413OEtmC3ESQGiXYYEWih1dECvKgUnoYg/viewform?embedded=true"
    >Loading…
    </iframe>
  </div>
</template>

<script>
export default {
  name: 'Questionnaire'
}
</script>

<style scoped>
.questionnaire {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
}
.google-form {
  width: 100%;
  height: 100vh;
  border: none;
  margin-top: 20px;
}
</style>
