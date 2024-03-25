<template>
    <Fieldset legend="-" class="p-shadow-4 p-mb-4">
      <template v-if="contatos.length">
        <DataTable :value="contatos" dataKey="id">
          <Column field="nome" header="Nome" style="width: 20%"></Column>
          <Column field="email" header="E-mail" style="width: 20%"></Column>
          <Column field="telefone" header="Telefone" style="width: 20%"></Column>
          <Column field="whatsapp" header="Whatsapp" style="width: 20%">
            <template #body="slotProps">
              {{ slotProps.data.whatsapp === 0 ? 'Não' : 'Sim' }}
            </template>
          </Column>
          <Column header="Ações">
            <template #body="rowData">
              <Button icon="pi pi-pencil" class="mr-2 p-button-info" @click="editContato(rowData)" />
              <Button icon="pi pi-trash" class="p-button-danger" @click="deleteContato(rowData)" />
            </template>
          </Column>
        </DataTable>
      </template>
      <template v-else>
        Nenhum contato encontrado.
      </template>
    </Fieldset>
    <ContactUpdate
      :dialog="dialog"
      :form="contactInfo"
      @closeEditContact="dialog = false"
      @editContract="getAllContacts()"
    />
    <ContactDelete
      :dialog="dialogDelete"
      :form="contactInfo"
      @closeEditContact="dialogDelete = false"
      @editContract="getAllContacts()"
    />
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import axios from 'axios'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'
import ContactUpdate from '../ContactUpdate/ContactUpdate.vue'
import ContactDelete from '../ContactDelete/ContactDelete.vue'
import Fieldset from 'primevue/fieldset'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'

export default defineComponent({
  components: {
    DataTable,
    Column,
    InputText,
    InputNumber,
    Button,
    ContactUpdate,
    ContactDelete,
    Fieldset,
    Toast
  },
  setup() {
    const toast = useToast()
    const state = reactive({
      contatos: [],
      dialog: false,
      dialogDelete: false,
      contactInfo: {}
    })
    async function getAllContacts () {
      try {
        const result = await axios.get('http://127.0.0.1:8000/api/contatos')
        if (Array.isArray(result.data.contatos) && result.data.contatos.length > 0) {
          state.contatos = result.data.contatos
        }
        state.dialog = false
        state.dialogDelete = false
      } catch (error) {
        toast.add({ severity: 'error', summary: error.response.status, detail: 'Erro ao listar contatos', life: 3000 })
      }
    }
    function editContato (form) {
      state.dialog = true
      state.contactInfo = { ...form.data }
    }
    function deleteContato (form) {
      state.dialogDelete = true
      state.contactInfo = { ...form.data }
    }
    onMounted(async () => {
      await getAllContacts()
    })
    return {
      ...toRefs(state),
      getAllContacts,
      editContato,
      deleteContato
    }
  }
})
</script>

