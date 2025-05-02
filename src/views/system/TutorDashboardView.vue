<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '@/utils/supabase'
import { useAuthUserStore } from '@/stores/authUser'

const authStore = useAuthUserStore()
const sessions = ref([])
const stats = ref({
  totalSessions: 0,
  upcomingSessions: 0,
  completedSessions: 0,
  averageRating: 0,
})

// Fetch tutor's sessions
const fetchSessions = async () => {
  try {
    const { data, error } = await supabase
      .from('schedules')
      .select(
        `
        *,
        profiles:profiles_id (*),
        subjects:subjects_id (*)
      `,
      )
      .eq('profiles_id', authStore.userData.id)
      .order('available_date', { ascending: true })

    if (error) throw error
    sessions.value = data
    updateStats()
  } catch (error) {
    console.error('Error fetching sessions:', error)
  }
}

// Calculate dashboard stats
const updateStats = () => {
  stats.value = {
    totalSessions: sessions.value.length,
    upcomingSessions: sessions.value.filter((s) => s.status === 'upcoming').length,
    completedSessions: sessions.value.filter((s) => s.status === 'completed').length,
    averageRating: 4.5, // You'll need to implement the actual rating system
  }
}

onMounted(() => {
  fetchSessions()
})
</script>

<template>
  <v-container fluid>
    <!-- Stats Cards -->
    <v-row>
      <v-col cols="12" sm="6" md="3">
        <v-card class="stat-card">
          <v-card-text>
            <div class="text-overline mb-1">Total Sessions</div>
            <div class="text-h4 mb-2">{{ stats.totalSessions }}</div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card class="stat-card">
          <v-card-text>
            <div class="text-overline mb-1">Upcoming</div>
            <div class="text-h4 mb-2">{{ stats.upcomingSessions }}</div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card class="stat-card">
          <v-card-text>
            <div class="text-overline mb-1">Completed</div>
            <div class="text-h4 mb-2">{{ stats.completedSessions }}</div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <v-card class="stat-card">
          <v-card-text>
            <div class="text-overline mb-1">Rating</div>
            <div class="text-h4 mb-2">{{ stats.averageRating }}/5</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Upcoming Sessions -->
    <v-row class="mt-4">
      <v-col cols="12">
        <v-card>
          <v-card-title class="d-flex align-center">
            <v-icon start color="amber" class="mr-2">mdi-calendar-clock</v-icon>
            Upcoming Sessions
          </v-card-title>
          <v-card-text>
            <v-table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Subject</th>
                  <th>Student</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="session in sessions" :key="session.id">
                  <td>{{ session.available_date }}</td>
                  <td>{{ session.available_time }}</td>
                  <td>{{ session.subjects.subject_name }}</td>
                  <td>{{ session.profiles.firstname }} {{ session.profiles.lastname }}</td>
                  <td>
                    <v-chip :color="session.status === 'upcoming' ? 'success' : 'grey'">
                      {{ session.status }}
                    </v-chip>
                  </td>
                  <td>
                    <v-btn icon="mdi-pencil" variant="text" density="compact"></v-btn>
                    <v-btn icon="mdi-delete" variant="text" density="compact" color="error"></v-btn>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.stat-card {
  background: linear-gradient(135deg, #ffd54f20 0%, #ffecb320 100%);
  border-radius: 12px;
}

.v-card-text {
  padding: 20px;
}

.text-h4 {
  color: #2c3e50;
  font-weight: 600;
}

.text-overline {
  color: #546e7a;
}
</style>
