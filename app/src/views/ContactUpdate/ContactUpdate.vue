<template>
  <Dialog v-model:visible="dialog" modal :closable="false" header="Editar Contato" :style="{ width: '25rem' }">
    <span class="p-text-secondary block mb-5">Atualize as informações do contato.</span>
    <div class="flex align-items-center gap-3 mb-3">
      <label for="username" class="font-semibold w-6rem">Nome</label>
      <InputText v-model="form.nome" placeholder="Nome" type="text" class="w-21rem" />
    </div>
    <div class="flex align-items-center gap-3 mb-5">
      <label for="email" class="font-semibold w-6rem">E-mail</label>
      <InputText v-model="form.email" placeholder="E-mail" type="text" class="w-21rem" />
    </div>
    <div class="flex align-items-center gap-3 mb-5">
      <label for="email" class="font-semibold w-6rem">Celular</label>
      <InputMask v-model="form.telefone" mask="(99)-99999-9999" placeholder="Celular" type="text" class="w-21rem" />
    </div>
    <div class="flex align-items-center gap-3 mb-5">
      <label for="email" class="font-semibold w-6rem">Whatsapp</label>
      <ToggleButton v-model="form.whatsapp" onLabel="Sim" offLabel="Não" onIcon="pi pi-check" offIcon="pi pi-times"
        class="w-6rem" aria-label="Confirmation" />
    </div>
    <div class="flex justify-content-end gap-2">
      <Button type="button" @click="$emit('closeEditContact')" label="Cancelar" severity="secondary"></Button>
      <Button :disabled="validateSaveButton" class="mr-2 p-button-info" type="button" @click="updateContact(form)" label="Save"></Button>
    </div>
  </Dialog>
  <Toast />
</template>

<script>
import { computed, defineComponent } from 'vue'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import InputMask from 'primevue/inputmask'
import Button from 'primevue/button'
import ToggleButton from 'primevue/togglebutton'
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
    InputText,
    InputMask,
    Button,
    ToggleButton,
    InputMask,
    Toast
  },
  setup(props, { emit }) {
    const toast = useToast()
    async function updateContact(form) {
      try {
        await axios.put(`update_contato/${form.id}`, form)
        emit('editContract')
        toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Contato editado!', life: 3000 })
      } catch (error) {
        toast.add({ severity: 'error', summary: error.response.status, detail: 'Erro ao editar contato', life: 3000 })
      }
    }
    const validateSaveButton = computed(() => {
      for (const key in props.form) {
        if (props.form.hasOwnProperty(key) && props.form[key] === '') {
          return true
        }
      }
      return false
    })
    return {
      updateContact,
      validateSaveButton
    }
  }
})
</script>
