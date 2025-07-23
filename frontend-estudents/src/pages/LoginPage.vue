<template>
  <div class="login-page">
    <div class="login-container row full-height">
      <!-- Coluna da Imagem -->
      <div class="col-6 flex flex-center bg-grey-2">
        <img
          src="../assets/undraw_math_ldpv.svg"
          alt="Login illustration"
          class="login-image"
        />
      </div>

      <!-- Coluna do Formulário -->
      <div class="col-6 flex flex-center">
        <q-card class="login-card q-pa-lg shadow-2">
          <q-card-section>
            <div class="text-h5 text-center text-primary">Entrar no Estudents</div>
          </q-card-section>

          <q-card-section>
            <q-input v-model="email" label="Email" type="email" dense />
            <q-input
              v-model="password"
              label="Senha"
              type="password"
              class="q-mt-md"
              dense
            />

            <q-btn
              label="Entrar"
              color="primary"
              @click="handleLogin"
              class="q-mt-lg full-width"
              unelevated
            />

            <div class="q-mt-sm text-center">
              <q-btn
                flat
                label="Esqueci minha senha"
                color="primary"
                size="sm"
                @click="handlePasswordReset"
              />
            </div>

            <div class="q-mt-md text-center">
              <q-btn
                outline
                color="secondary"
                label="Criar Conta"
                @click="showRegister = true"
                size="sm"
              />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Modal de Cadastro -->
    <q-dialog v-model="showRegister" persistent>
      <q-card class="q-pa-md" style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Criar nova conta</div>
        </q-card-section>

        <q-card-section>
          <q-input
            v-model="newEmail"
            label="Email"
            type="email"
            dense
            autofocus
          />
          <q-input
            v-model="newPassword"
            label="Senha"
            type="password"
            dense
            class="q-mt-md"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="negative" @click="showRegister = false" />
          <q-btn label="Cadastrar" color="primary" @click="handleRegister" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Notify } from 'quasar'
import useAuthUser from '../composables/useAuthUser'
import { supabase } from 'src/boot/supabase'

const router = useRouter()
const { user } = useAuthUser()

// Login
const email = ref('')
const password = ref('')

// Cadastro
const newEmail = ref('')
const newPassword = ref('')
const showRegister = ref(false)

const handleLogin = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })

  if (error) {
    Notify.create({
      type: 'negative',
      message: 'Erro no login: ' + error.message
    })
  } else {
    user.value = data.user
    void router.push('/app/alunos')
  }
}

const handleRegister = async () => {
  if (!newEmail.value || !newPassword.value) {
    Notify.create({ type: 'warning', message: 'Preencha todos os campos' })
    return
  }

  const { error } = await supabase.auth.signUp({
    email: newEmail.value,
    password: newPassword.value
  })

  if (error) {
    Notify.create({ type: 'negative', message: 'Erro no cadastro: ' + error.message })
  } else {
    Notify.create({ type: 'positive', message: 'Cadastro realizado! Verifique seu e-mail' })
    showRegister.value = false
  }
}

const handlePasswordReset = async () => {
  if (!email.value) {
    Notify.create({ type: 'warning', message: 'Informe seu email para resetar a senha' })
    return
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email.value)
  if (error) {
    Notify.create({ type: 'negative', message: 'Erro ao enviar e-mail: ' + error.message })
  } else {
    Notify.create({ type: 'positive', message: 'Email de recuperação enviado' })
  }
}
</script>

<style scoped>
.login-page {
  background: #f5f5f5;
}

.login-container {
  min-height: 100vh;
}

.login-image {
  width: 80%;
  max-width: 400px;
  animation: float 6s ease-in-out infinite;
}

.login-card {
  width: 100%;
  max-width: 350px;
  border-radius: 16px;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-10px);
  }
}
</style>
