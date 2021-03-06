<template>
  <div>
    <vue-header>
      <vue-history slot='left'></vue-history>
      {{$t('help')}}
    </vue-header>
    <main class='page single' style='overflow-y: auto'>
      <p>The PMRA eDossier Builder allows Submitters to prepare electronic Submissions to any participating Regulatory Authority. The eDossier Builder Submissions are based on the OECD Global Harmonised Submission Transport Standard (GHSTS). eDossier Builder allows Submitters to manage tombstone data using the ‘Manage Application Data’ section (Legal Entities, Substances, Products, etc.). The Application Data is then used within the ‘Manage Dossiers’ section to build, validate, and package Submissions.</p>
      <br>
      <p>Each field within the eDossier Builder is described in the GHSTS Format Specification (http://www.oecd.org/chemicalsafety/submission-transport-standard/ghsts-downloads-description.htm).</p>
      <br>
      <p>Simple business rules have also been integrated into the eDossier Builder’s screens to help ensure that Submitters are properly completing the data entry fields. The eDossier Builder also allows Submitters to ‘validate’ the Submission at any time, allowing the Submitter to check whether or not a Submission has been properly completed.</p>
      <br>
      <p>Once Submissions are entered and validated, the Submitter creates the Submission package. The package will be saved in the following path: </p>
      <br>
      <div style='margin-left: 30px;'>
        <p>Windows</p>
        <p>[INSTALL-FOLDER]\projects</p>
        <small>e.g. C:\Users\[YOUR-USER-NAME]\AppData\Local\
        programs\edossier_builder\projects</small>
      </div>
      <br>
      <p>This packaged Submission file can then be sent to the participating Regulatory Authority using their required transport channel.</p>
      <br>
      <p>If you have any questions on the PMRA eDossier Builder, you may reach us at ePRS-Innovation-SERP@hc-sc.gc.ca</p>
      <br>
      <h2>1.5 - Release Notes</h2>
      <h3>Build {{version}}</h3>
      <p>Please note the following restrictions for Release 1.5:</p>
      <ol>
        <li>A Product can only be used in one “Open” Dossier.  You must “Close” the Dossier for the referenced Product in order to make that Product available to other Dossiers.</li>
        <li>A Submission can only be deleted if the Status is “In Progress”</li>
        <li>The Submission workflow can only move in one direction: “In Progress” –> “Packaged” -> “Sent”.  The User cannot move backwards in the Submission Workflow.</li>
        <li>A Dossier can only be “Closed” when ALL Submissions within it are in the status of “Sent”.</li>
      </ol>
    </main>
  </div>
</template>

<script>
import Button from '@/components/button/button.vue';
import Header from '@/components/header/header.vue';
import History from '@/components/history/history.vue';
import Input from '@/components/input/input.vue';
import packageFile from '../../../../package.json';

export default {
  name: 'Help',
  data() {
    return {
      version: packageFile.version
    };
  },
  computed: {
    path: {
      get() {
        return this.$store.projectUrl;
      },
      set(value) {
        this.$store.dispatch('app/updateProjectUrl', value);
      }
    }
  },
  components: {
    'vue-button': Button,
    'vue-header': Header,
    'vue-history': History,
    'vue-input': Input
  }
};
</script>

<style>
.page {
  padding: 30px 20px;
}

.page.single {
  overflow-y: auto;
}

.page.single ol {
  list-style-position: inside;
}
</style>
