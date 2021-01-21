<template>
  <b-modal
    ref="edit_spell_modal"
    size="lg"
    modal-class="b-modal"
    :spell="computeSpell"
  >
    <template #modal-header="{ close }">
      <div
        id="spell_show_edit_modal"
        class="h1 modal-title font-display font-weight-bold"
      >
        <div class="line-height-100">
          {{ spell.name }}#{{ spell.id }}
        </div>
      </div>
      <button
        type="button"
        class="close"
        data-dismiss="modal"
        aria-label="Close"
        @click="close()"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </template>

    <template #default>
      <form
        id="update-spell"
        ref="update-spell"
        @submit="updateSpell"
      >
        <div class="form-group">
          <label
            for="spell_name"
            class="font-weight-bold col-form-label"
          >Nom&nbsp;:</label>
          <input
            id="spell_name"
            v-model="spell.name"
            type="text"
            class="form-control"
            name="spell_name"
            placeholder="(256 caractères max.)"
          >
        </div>
        <div class="form-group">
          <label
            for="spell_description"
            class="font-weight-bold col-form-label"
          >Description&nbsp;:</label>
          <textarea
            id="spell_description"
            v-model="spell.description"
            class="form-control"
            name="spell_description"
            placeholder="(2048 caractères max.)"
          />
        </div>
        <div class="form-check form-check-inline">
          <input
            id="spell_ritual"
            v-model="spell.is_ritual"
            type="checkbox"
            class="form-check-input"
            name="spell_ritual"
          >
          <label
            for="spell_ritual"
            class="font-weight-bold col-form-label"
          >Rituel ?&nbsp;</label>
        </div>
        <div class="form-group">
          <label
            for="spell_level"
            class="font-weight-bold col-form-label"
          >Niveau&nbsp;:</label>
          <input
            id="spell_level"
            v-model="spell.level"
            type="number"
            class="form-control"
            name="spell_level"
            min="0"
            max="100"
            step="1"
            placeholder="(Nombre entier de 0 à 100)"
          >
        </div>
        <div class="form-group">
          <label
            for="spell_schools"
            class="font-weight-bold col-form-label"
          >École(s)&nbsp;:</label>
          <select
            id="spell_schools"
            v-model="spell.spell_school_ids_value"
            class="form-control"
            name="spell_schools"
            multiple
          >
            <option
              v-for="(school, index) in all_schools"
              :key="index"
              :value="'school_' + school.id"
            >
              {{ school.name }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label
            for="spell_charge"
            class="font-weight-bold col-form-label"
          >Charge&nbsp;:</label>
          <input
            id="spell_charge"
            v-model="spell.charge"
            type="number"
            class="form-control"
            name="spell_charge"
            min="0"
            max="100"
            step="1"
            placeholder="(Nombre entier de 0 à 100)"
          >
        </div>
        <div class="form-group">
          <label
            for="spell_ingredients"
            class="font-weight-bold col-form-label"
          >Ingrédient(s)&nbsp;:</label>
          <select
            id="spell_ingredients"
            v-model="spell.spell_ingredient_ids_value"
            class="form-control"
            name="spell_ingredients"
            multiple
          >
            <option
              v-for="(ingredient,index) in all_ingredients"
              :key="index"
              :value="'ingredient_' + ingredient.id"
            >
              {{ ingredient.name }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label
            for="spell_cost"
            class="font-weight-bold col-form-label"
          >Coût&nbsp;:</label>
          <input
            id="spell_cost"
            v-model="spell.cost"
            type="text"
            class="form-control"
            name="spell_cost"
            placeholder="(32 caractères max.)"
          >
        </div>
        <div class="form-group">
          <label
            for="spell_variables"
            class="font-weight-bold col-form-label"
          >Variable(s)&nbsp;:</label>
          <select
            id="spell_variables"
            v-model="spell.spell_variable_ids_value"
            class="form-control"
            name="spell_variables"
            multiple
          >
            <option
              v-for="(variable,index) in all_variables"
              :key="index"
              :value="'variable_' + variable.id"
            >
              {{ variable.description }}
            </option>
          </select>
        </div>
      </form>
    </template>
        
    <template #modal-footer="{ close }">
      <button
        type="button"
        class="btn btn-danger"
        data-dismiss="modal"
        @click="close()"
      >
        Fermer
      </button>
      <!-- <input type="button" class="btn btn-success" value="Enregistrer comme nouveau" @click="cloneSpell()"> -->
      <input
        type="submit"
        class="btn btn-primary"
        value="Enregistrer"
        form="update-spell"
      >
    </template>
  </b-modal>
</template>

<script>
// API
import { RepositoryFactory } from "@/api/repositories";
const Spells = RepositoryFactory.get('spells');
const Schools = RepositoryFactory.get('schools');
const Variables = RepositoryFactory.get('variables');
const Ingredients = RepositoryFactory.get('ingredients');

export default {
  name: 'EditSpellCard',
  props: {
    spell: {
      type: Object,
      required: true,
      id: Number,
      name: String,
      description: String,
      is_ritual: Boolean,
      schools: Array,
      variables: Array,
      ingredients: Array,
    },
  },
  data() {
    return {
      all_schools: [],
      all_variables: [],
      all_ingredients: [],
    };
  },
  computed: {
    computeSpell() {
      let output = this.spell;
      output.spell_school_ids = [];
      output.spell_variable_ids = [];
      output.spell_ingredient_ids = [];
      output.spell_school_ids_value = [];
      output.spell_variable_ids_value = [];
      output.spell_ingredient_ids_value = [];

      output.schools.forEach(element => {
        output.spell_school_ids.push(element['id']);
      });
      output.variables.forEach(element => {
        output.spell_variable_ids.push(element['id']);
      });
      output.ingredients.forEach(element => {
        output.spell_ingredient_ids.push(element['id']);
      });

      output.spell_school_ids.forEach(element => {
        output.spell_school_ids_value.push("school_" + element);
      });
      output.spell_variable_ids.forEach(element => {
        output.spell_variable_ids_value.push("variable_" + element);
      });
      output.spell_ingredient_ids.forEach(element => {
        output.spell_ingredient_ids_value.push("ingredient_" + element);
      });

      return output;
    }
  },
  watch: {
    computeSpell: {
      deep: true,
      handler() {
        this.$refs["edit_spell_modal"].show();
      }
    }
  },
  created() {
    // Gets all relevant info for multiple selects
    let fetchSchools = Schools.getAll();
    let fetchVariables = Variables.getAll();
    let fetchIngredients = Ingredients.getAll();

    Promise.all([fetchSchools, fetchVariables, fetchIngredients])
      .then(v => {
        this.all_schools = v[0].data;
        this.all_variables = v[1].data;
        this.all_ingredients = v[2].data;
      })
      .catch(err => {
        console.log(err);
      });
  },
  mounted() {
    this.$refs["edit_spell_modal"].show();
    this.$root.$on('bv::modal::hide', () => {
      this.$emit('editSpell', {});
    });
  },
  methods: {
    cloneSpell() {
    },
    updateSpell(e) {
      e.preventDefault();

      let schoolsData = Object.values(this.spell.spell_school_ids_value).map(v => {
        return parseInt(v.slice(7)); 
      });
      let variablesData = Object.values(this.spell.spell_variable_ids_value).map(v => {
        return parseInt(v.slice(9)); 
      });
      let ingredientsData = Object.values(this.spell.spell_ingredient_ids_value).map(v => {
        return parseInt(v.slice(11)); 
      });

      let data = {
        name: this.spell.name,
        description: this.spell.description,
        is_ritual: !!+this.spell.is_ritual,
        level: parseInt(this.spell.level),
        cost: this.spell.cost,
        charge: parseInt(this.spell.charge),
        schools: schoolsData,
        variables: variablesData,
        ingredients: ingredientsData,
      };

      Spells.updateOne(this.spell.id, data)
        .then(v => {
          this.$emit('updateSpell', v.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
  }
};
</script>

<style lang="scss" scoped>
    textarea, select {
        min-height: 10rem;
        max-height: 20rem;
    }
</style>