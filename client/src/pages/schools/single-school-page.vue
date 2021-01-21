<template>
  <div
    id="spell-container"
    class="container-fluid p-4"
  >
    <h1 class="display-3 font-display mb-3">
      {{ school.name }}
    </h1>
    <p>{{ school.description }}</p>
    <spell-list :school_id="id" />
  </div>
</template>

<script>
// API
import { RepositoryFactory } from "@/api/repositories";
const Schools = RepositoryFactory.get('schools');

import SpellsList from "@/components/spells/spells-list";

export default {
  name: 'SingleSchoolPage',
  metaInfo() {
    return {
      titleTemplate: `%s - ${this.school.name}`,
    };
  },
  components: {
    'spell-list': SpellsList,
  },
  data() {
    return {
      id: this.$route.params.id,
      school: {},
      errors: {
        loading: "",
      }
    };
  },
  created() {
    Schools.getOne(this.id)
      .then(v => {
        this.school = v.data;
      })
      .catch(err => {
        console.log(err);
      });
  },
};
</script>

<style lang="scss" scoped>

</style>