<template>
  <div class="flex align-content-center justify-content-center flex-wrap">
  <Fieldset style="width: 40rem;" legend="Salvar contato">
      <div class="w-full flex flex-column align-items-center justify-content-center gap-3 py-5">
          <div class="flex flex-wrap justify-content-center align-items-center gap-2">
              <InputGroup>
                <InputGroupAddon>
                    <i class="pi pi-user"></i>
                </InputGroupAddon>
                <InputText v-model="form.nome" placeholder="Nome" type="text" class="w-21rem" />
            </InputGroup>
          </div>
          <div class="flex flex-wrap justify-content-center align-items-center gap-2">
            <InputGroup>
                <InputGroupAddon>
                    <i class="pi pi-id-card"></i>
                </InputGroupAddon>
                <InputText v-model="form.email"  placeholder="E-mail" type="text" class="w-21rem" />
            </InputGroup>
          </div>
          <div class="flex flex-wrap justify-content-center align-items-center gap-2">
            <InputGroup>
                <InputGroupAddon>
                    <i class="pi pi-phone"></i>
                </InputGroupAddon>
                <InputMask v-model="form.telefone" mask="(99)99999-9999" placeholder="Celular" type="text" class="w-21rem" />
            </InputGroup>
            </div>
          <div class="flex flex-wrap justify-content-center align-items-center gap-2">
            <label class="w-12rem">Whatsapp</label>
            <ToggleButton v-model="form.whatsapp" onLabel="Sim" offLabel="Não" onIcon="pi pi-check" offIcon="pi pi-times" class="w-6rem" aria-label="Confirmation" />
          </div>
          <Button :disabled="validateSaveButton" @click="saveContact(form)" label="Salvar contato" icon="pi pi-user" class="w-15rem mx-auto p-button-info"></Button>
        </div>
      </Fieldset>
      <Toast />
    </div>
</template>

<script>
import { computed, defineComponent, onMounted, reactive, toRefs, watch } from 'vue'
import axios from '../../axios-config'
import InputText from 'primevue/inputtext'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import InputNumber from 'primevue/inputnumber'
import Button from 'primevue/button'
import ToggleButton from 'primevue/togglebutton'
import Fieldset from 'primevue/fieldset'
import InputMask from 'primevue/inputmask'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'


export default defineComponent({
  components: {
    InputText,
    InputNumber,
    Button,
    ToggleButton,
    Fieldset,
    InputGroup,
    InputGroupAddon,
    InputMask,
    Toast
  },
  setup() {
    const toast = useToast()
    const state = reactive({
      form: {
        nome: '',
        email: '',
        telefone: '',
        whatsapp: false
      }
    })
    async function saveContact (form) {
      try {
        await axios.post('create_contato', form)
        state.form = {}
        toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Contato salvo!', life: 3000 })
      } catch (error) {
        toast.add({ severity: 'error', summary: error.response.status, detail: 'Erro ao salvar contato', life: 3000 })
      }
    }
    const validateSaveButton = computed(() => {
      for (const key in state.form) {
        if (state.form.hasOwnProperty(key) && state.form[key] === '') {
          return true
        }
      }
      return false
    })
    onMounted(async () => {
    })
    return {
      ...toRefs(state),
      saveContact,
      validateSaveButton
    }
  }
})
</script>

