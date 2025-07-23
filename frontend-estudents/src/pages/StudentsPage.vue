// DashboardPage.vue
<template>
  <q-page class="q-pa-md">
    <q-card class="q-mb-md">
      <q-card-section>
        <div class="text-h6">Gerar atividade com IA</div>
        <q-input v-model="tema" label="Tema da atividade" />
        <q-btn label="Gerar" @click="gerarAtividade" color="primary" class="q-mt-sm" />
      </q-card-section>
    </q-card>

    <q-card v-if="atividade" class="bg-grey-1">
      <q-card-section>
        <div class="text-subtitle1">Atividade Gerada:</div>
        <p>{{ atividade }}</p>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Notify } from 'quasar'

const tema = ref('')
const atividade = ref('')

const gerarAtividade = async () => {
  if (!tema.value) {
    Notify.create({ type: 'warning', message: 'Informe um tema.' })
    return
  }

  try {
    const resposta = await fetch('http://localhost:3333/ia/gerar-atividade', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tema: tema.value })
    })

    const data = await resposta.json()
    atividade.value = data.resultado
  } catch  {
    Notify.create({ type: 'negative', message: 'Erro ao gerar atividade.' })
  }
}
</script>
