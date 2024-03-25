<template>
    <div>
        <Menubar style="background-color: #0ea5e9;" :model="items">
          <template #start>
             <img
              src="../../assets/logo.png"
              style="width: 5rem;"
              class="mr-2"
             />
          </template>
          <template #item="{ item, props }">
            <!-- {{ item }} -->
            <router-link v-slot="{ href, navigate }" :to="item.to" custom>
              <a :href="href" v-bind="props.action" @click="navigate">
                  <span :class="item.icon" />
                  <span class="ml-2">{{ item.label }}</span>
              </a>
            </router-link>
          </template>
        </Menubar>
    </div>
</template>

<script>
import { defineComponent, reactive, toRefs } from 'vue'
import Menubar from 'primevue/menubar'

export default defineComponent({
  components: {
    Menubar
  },
  setup() {
    const state = reactive({
      items: [
        {
          label: 'Início',
          icon: 'pi pi-home',
          to: '/'
        },
        {
          label: 'Criar Contato',
          icon: 'pi pi-user',
          to: '/criarContato'
        }
      ]
    })

    return {
      ...toRefs(state)
    }
  }
})
</script>