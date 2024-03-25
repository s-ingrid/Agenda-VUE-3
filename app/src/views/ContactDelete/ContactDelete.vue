<template>
  <Dialog v-model:visible="dialog" :closable="false" modal header="Deletar Contato" :style="{ width: '25rem' }">
    <p class="m-0">
      Tem certeza que deseja remover o contato?
    </p>
    <div class="flex mt-5 justify-content-end gap-2">
      <Button type="button" @click="deleteContact(form)" label="Sim"></Button>
      <Button type="button" @click="$emit('closeEditContact')" label="Não" severity="secondary"></Button>
    </div>
  </Dialog>
</template>

<script>
import { defineComponent } from 'vue'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import axios from '../../axios-config'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'

export default defineComponent({
  props: {
    form: {
      type: Object,
      default: function () {
        return {}
      }
    },
    dialog: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Dialog,
    Button,
    Toast
  },
  setup(props, { emit }) {
    const toast = useToast()
    async function deleteContact(form) {
      try {
        await axios.delete(`delete_contato/${form.id}`)
        emit('editContract')
        toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Contato removido!', life: 3000 })
      } catch (error) {
        toast.add({ severity: 'error', summary: error.response.status, detail: 'Erro ao remover contato', life: 3000 })
      }
    }

    return {
      deleteContact
    }
  }
})
</script>
