<template>
  <nav class="navbar navbar-expand-sm fixed-top navbar-dark bg-dark">
    <router-link
      :to="'/'"
      class="navbar-brand font-display font-weight-700"
    >
      Auracle
    </router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbar"
      aria-controls="navbar"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon" />
    </button>
    <div
      id="navbar"
      class="collapse navbar-collapse"
    >
      <ul
        v-if="links.length != 0"
        class="navbar-nav mr-auto"
      >
        <li
          v-for="(link, index) in links"
          :key="index"
          class="nav-item"
        >
          <router-link
            :to="link.url"
            class="nav-link"
          >
            {{ link.text }}
          </router-link>
        </li>
      </ul>
      <div
        v-if="user"
        class="navbar-nav"
      >
        <router-link
          :to="'/profil'"
          class="nav-link"
        >
          {{ user.name }}
        </router-link>
        <div
          class="nav-link"
          @click="logoutUser()"
        >
          Deconnexion
        </div>
      </div>
      <div
        v-else
        class="navbar-nav"
      >
        <router-link
          :to="'/connexion'"
          class="nav-link"
        >
          Connexion
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>

export default {
  name: 'Navbar',
  data() {
    return {
      links: [
        {
          text: 'Sortilèges',
          url: '/sorts',
        },
        {
          text: 'Écoles',
          url: '/ecoles',
        },
        {
          text: 'Chronologie',
          url: '/ages',
        }
      ]
    };
  },
  computed: {
    user() {
      return this.$store.getters.getUserProfile;
    }
  },
  methods: {
    logoutUser() {
      this.$store.dispatch('user_logout');
      this.$router.push('/');
    }
  }
};

</script>

<style lang="scss"></style>
