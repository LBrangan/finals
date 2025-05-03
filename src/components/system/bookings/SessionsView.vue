<script setup>
import { ref, computed, onMounted } from 'vue'
import { useSession } from '@/composables/useSession'
import { useToast } from 'vue-toastification'
import SessionsReschedule from './SessionsReschedule.vue'
import SessionCancel from './SessionCancel.vue'

const toast = useToast()
const { sessions, fetchSessions, updateSession, deleteSession } = useSession()

const tab = ref(null)
const showReschedule = ref(false)
const selectedSession = ref(null)
const showCancel = ref(false)
const sessionToCancel = ref(null)

const upcomingSessions = computed(() => {
  const now = new Date()
  return sessions.value.filter((session) => new Date(session.available_date) >= now)
})

const pastSessions = computed(() => {
  const now = new Date()
  return sessions.value.filter((session) => new Date(session.available_date) < now)
})

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const openReschedule = (session) => {
  selectedSession.value = session
  showReschedule.value = true
}

const handleReschedule = async (updatedSession) => {
  try {
    await updateSession(updatedSession.id, {
      available_date: updatedSession.date,
      available_time: updatedSession.time,
    })
    await fetchSessions()
    showReschedule.value = false
    toast.success('Session rescheduled successfully!')
  } catch (err) {
    console.error('Reschedule error:', err)
    toast.error('Failed to reschedule session')
  }
}

const handleCancelSession = async (sessionId) => {
  try {
    await deleteSession(sessionId)
    await fetchSessions()
    showCancel.value = false
    toast.success('Session cancelled successfully!')
  } catch (err) {
    console.error('Cancel error:', err)
    toast.error('Failed to cancel session')
  }
}

onMounted(() => {
  fetchSessions()
})
</script>

<template>
  <SessionsReschedule
    v-if="selectedSession"
    :session="selectedSession"
    :show="showReschedule"
    @update:show="showReschedule = $event"
    @reschedule="handleReschedule"
  />

  <SessionCancel
    :show="showCancel"
    :session-id="sessionToCancel"
    @update:show="showCancel = $event"
    @cancel="handleCancelSession"
  />

  <v-container fluid class="pa-6 sessions-background">
    <v-card class="mx-auto session-card-container" max-width="1200">
      <v-card-title class="text-h4 font-weight-bold text-center py-6">
        My Sessions
        <div class="text-subtitle-1 mt-2 text-grey">Manage your tutoring sessions</div>
      </v-card-title>

      <v-tabs v-model="tab" centered color="amber-darken-2">
        <v-tab value="upcoming" class="text-subtitle-1">Upcoming Sessions</v-tab>
        <v-tab value="past" class="text-subtitle-1">Past Sessions</v-tab>
      </v-tabs>

      <v-window v-model="tab">
        <!-- Upcoming Sessions -->
        <v-window-item value="upcoming">
          <v-container v-if="upcomingSessions.length > 0">
            <v-row>
              <v-col v-for="session in upcomingSessions" :key="session.id" cols="12" md="6">
                <v-card class="ma-2 session-card" elevation="2">
                  <v-card-title class="text-h6 amber lighten-4 py-3">{{
                    session.subject
                  }}</v-card-title>
                  <v-card-text class="pt-4">
                    <v-row no-gutters>
                      <v-col cols="12">
                        <div class="d-flex align-center mb-2">
                          <v-icon color="amber-darken-2" class="mr-2">mdi-calendar</v-icon>
                          <strong>Date:</strong>&nbsp;{{ formatDate(session.date) }}
                        </div>
                        <div class="d-flex align-center mb-2">
                          <v-icon color="amber-darken-2" class="mr-2">mdi-clock-outline</v-icon>
                          <strong>Time:</strong>&nbsp;{{ session.time }}
                        </div>
                        <div class="d-flex align-center mb-2">
                          <v-icon color="amber-darken-2" class="mr-2">mdi-map-marker</v-icon>
                          <strong>Location:</strong>&nbsp;{{ session.location }}
                        </div>
                        <div class="d-flex align-center">
                          <v-icon color="amber-darken-2" class="mr-2">mdi-account</v-icon>
                          <strong>Tutor:</strong>&nbsp;{{ session.tutor }}
                        </div>
                        <div class="d-flex mt-4">
                          <v-spacer></v-spacer>
                          <v-btn
                            color="amber"
                            variant="outlined"
                            class="mr-2"
                            @click="openReschedule(session)"
                          >
                            <v-icon left>mdi-calendar-clock</v-icon>
                            Reschedule
                          </v-btn>
                          <v-btn
                            color="error"
                            variant="outlined"
                            @click="openCancelDialog(session.id)"
                          >
                            <v-icon left>mdi-cancel</v-icon>
                            Cancel
                          </v-btn>
                        </div>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
          <v-container v-else>
            <p class="text-center text-body-1 pa-6">No upcoming sessions scheduled</p>
          </v-container>
        </v-window-item>

        <!-- Past Sessions -->
        <v-window-item value="past">
          <v-container v-if="pastSessions.length > 0">
            <v-row>
              <v-col v-for="session in pastSessions" :key="session.id" cols="12" md="6">
                <v-card class="ma-2 session-card" elevation="2">
                  <v-card-title class="text-h6">{{ session.subject }}</v-card-title>
                  <v-card-text>
                    <div><strong>Date:</strong> {{ formatDate(session.date) }}</div>
                    <div><strong>Time:</strong> {{ session.time }}</div>
                    <div><strong>Location:</strong> {{ session.location }}</div>
                    <div><strong>Tutor:</strong> {{ session.tutor }}</div>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
          <v-container v-else>
            <p class="text-center text-body-1 pa-4">No past sessions found</p>
          </v-container>
        </v-window-item>
      </v-window>
    </v-card>
  </v-container>
</template>

<style scoped>
.sessions-background {
  background: linear-gradient(135deg, #ffd54f 0%, #ffecb3 100%);
  min-height: 100vh;
}

.session-card-container {
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
}

.session-card {
  transition: all 0.3s ease;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.9);
}

.session-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.v-btn {
  text-transform: none;
  font-weight: 500;
}
</style>
