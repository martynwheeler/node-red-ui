<template>
  <b-navbar
    toggleable="md"
    type="dark"
    variant="dark"
    class="bd-navbar"
  >
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <b-navbar-brand>{{ brand }}</b-navbar-brand>

    <b-collapse
      id="nav_collapse"
      is-nav
    >
      <b-navbar-nav>
        <b-nav-item
          :to="{ name: 'index' }"
          exact
        >
          Home
        </b-nav-item>
        <!--- Only show base if no rooms assigned -->
        <b-nav-item v-if="!hasRooms"
          :to="{ name: 'rooms_overview' }"
        >
          Rooms
        </b-nav-item>
        <b-nav-item v-for="room in roomList" :key="roomList.name" :to="{ name: 'room', params: { roomId: room.id }}">{{ room.name }}</b-nav-item>
        <b-nav-item
          :to="{ name: 'scheduler' }"
        >
          Scheduler
        </b-nav-item>
        <!--
        <b-nav-item
          :to="{ name: 'admin' }"
        >
          Admin panel
        </b-nav-item>
        -->
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
module.exports = {
    name: 'HeaderMenu',
    data() {
      return {
        brand: 'Wheeler House',
      };
    },
    computed: {
        hasRooms() {
            return this.$store.getters['rooms/nRooms'] > 0;
        },
        roomList() {
            return this.$store.getters['rooms/getAllRooms'];
        },
    },
};
</script>

<!-- <style scoped lang="scss">
  /* Mostly stolen from the bootstrap docs */

  @import '~bootstrap/scss/_functions';
  @import '~bootstrap/scss/_variables';
  @import '~bootstrap/scss/mixins/_breakpoints';

  .bd-navbar {
    min-height: 4rem;
    box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .05), inset 0 -1px 0 rgba(0, 0, 0, .1);

    @include media-breakpoint-down(md) {
      padding-right: .5rem;
      padding-left: .5rem;

      .navbar-nav-scroll {
        max-width: 100%;
        height: 2.5rem;
        margin-top: .25rem;
        overflow: hidden;
        font-size: .875rem;

        .navbar-nav {
          padding-bottom: 2rem;
          overflow-x: auto;
          white-space: nowrap;
          -webkit-overflow-scrolling: touch;
        }
      }
    }

    @include media-breakpoint-up(md) {
      @supports (position: sticky) {
        position: sticky;
        top: 0;
        // Tumblr iframe buttons have z-index of 99 and are positioned on the right side of the bar.
        z-index: 99;
      }
    }
  }
</style> -->
