<script setup>
import { useRouter } from 'vue-router'

// Data
const tutors = [
  {
    id: 1,
    name: 'Maria Sanchez',
    year: '3rd Year',
    field: 'Computer Science',
    rating: 4.8,
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
    subjects: ['Programming', 'Data Structures', 'Algorithms'],
  },
  {
    id: 2,
    name: 'John Davis',
    year: '4th Year',
    field: 'Computer Engineering',
    rating: 4.9,
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    subjects: ['Computer Architecture', 'Digital Logic', 'Microprocessors'],
  },
  {
    id: 3,
    name: 'Sarah Wilson',
    year: '3rd Year',
    field: 'Software Engineering',
    rating: 4.7,
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
    subjects: ['Web Development', 'Database Systems', 'Software Design'],
  },
]

// Composition API: Reactive Variables
const router = useRouter()

// Methods
const selectTutor = (tutor) => {
  router.push({ name: 'Booking', query: { tutorId: tutor.id } })
}
</script>

<template>
  <v-app>
    <v-container class="tutor-container" fluid>
      <v-row justify="center" class="mt-5">
        <v-col cols="12" md="10">
          <h2 class="text-h4 mb-4 text-center font-weight-bold">Available Tutors</h2>
          <v-row class="scroll-container">
            <v-col
              v-for="tutor in tutors"
              :key="tutor.id"
              cols="12"
              md="4"
              class="d-flex justify-center"
            >
              <v-card class="tutor-card" elevation="2" max-width="300px">
                <v-img :src="tutor.image" height="200" cover></v-img>
                <v-card-title>{{ tutor.name }}</v-card-title>
                <v-card-subtitle>{{ tutor.field }} - {{ tutor.year }}</v-card-subtitle>
                <v-card-text>
                  <v-rating
                    :model-value="tutor.rating"
                    color="amber"
                    density="compact"
                    half-increments
                    readonly
                    size="small"
                  ></v-rating>
                  <div class="mt-2">
                    <v-chip
                      v-for="subject in tutor.subjects"
                      :key="subject"
                      class="mr-1 mb-1"
                      size="small"
                      color="green-darken-4"
                    >
                      {{ subject }}
                    </v-chip>
                  </div>
                </v-card-text>
                <v-card-actions>
                  <RouterLink to="/bookings">
                    <v-btn color="green" @click="selectTutor(tutor)" full-width> Book Now </v-btn>
                  </RouterLink>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<style scoped>
.register-container {
  background: linear-gradient(135deg, #ffd54f20 0%, #ffecb320 100%);
  min-height: 100vh;
  padding: 24px;
}

.scroll-container {
  overflow-x: auto;
}

.tutor-card {
  cursor: pointer;
  transition: transform 0.2s;
}

.tutor-card:hover {
  transform: scale(1.02);
}

.v-col {
  display: flex;
  justify-content: center;
  padding: 0 10px;
}

.v-card {
  margin-bottom: 15px;
}

.v-btn {
  font-weight: bold;
}
</style>
