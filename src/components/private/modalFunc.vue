<template>
    <!-- <mdb-btn color="primary" @click.native="modal = true">Launch demo modal</mdb-btn> -->
<mdb-modal v-if="modalFunc" @close="modalFunc = false" style="z-index:9999">
  <mdb-modal-header>
    <mdb-modal-title>Modal title</mdb-modal-title>
  </mdb-modal-header>
  <mdb-modal-body>...</mdb-modal-body>
  <mdb-modal-footer>
    <mdb-btn color="secondary" @click.native="modalFunc = false">Close</mdb-btn>
    <!-- <mdb-btn color="primary">Save changes</mdb-btn> -->
  </mdb-modal-footer>
</mdb-modal>
</template>

<script>
import modalFunc from '@/components/private/modalFunc';
import {mapState, mapMutations} from 'vuex'
import {  mdbBtn, mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter } from 'mdbvue';

export default {
  name: 'signup',
  components: {
    mdbBtn, mdbModal, mdbModalHeader, mdbModalTitle, mdbModalBody, mdbModalFooter, modalFunc
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState([
        'modalFunc'
    ]),
   
 },
}
</script>
<style scoped>
</style>
