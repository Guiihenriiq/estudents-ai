<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Drawer Lateral -->
    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <q-list>
        <q-item-label header class="text-primary text-bold text-h6 q-pa-sm">
          <q-icon name="school" class="q-mr-sm" />
          Estudents
        </q-item-label>

        <q-separator />

        <q-item clickable v-ripple to="/app/alunos" exact>
          <q-item-section avatar>
            <q-icon name="people" />
          </q-item-section>
          <q-item-section>Alunos</q-item-section>
        </q-item>

        <!-- Adicione outras páginas se quiser -->
      </q-list>

      <div class="absolute-bottom q-pa-sm">
        <q-btn
          label="Sair"
          icon="logout"
          color="negative"
          flat
          class="full-width"
          @click="logout"
        />
      </div>
    </q-drawer>

    <!-- Cabeçalho -->
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn flat dense round icon="menu" @click="leftDrawerOpen = !leftDrawerOpen" />
        <q-toolbar-title>Estudents</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <!-- Conteúdo -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from 'boot/supabase'

const router = useRouter()
const leftDrawerOpen = ref(true)

const logout = async () => {
  await supabase.auth.signOut()
  await router.push('/login')
}
</script>
