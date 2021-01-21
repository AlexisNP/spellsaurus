<template>
  <b-modal
    ref="add_spell_modal"
    size="lg"
    modal-class="b-modal"
  >
    <template #modal-header="{ close }">
      <div
        id="spell_show_edit_modal"
        class="h1 modal-title font-display font-weight-bold"
      >
        <div class="line-height-100">
          <span v-if="!spell.name">Nouveau sort</span>
          <span v-if="spell.name">{{ spell.name }}</span>
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
        id="add-spell"
        @submit="addSpell"
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
            v-model="spell.schools"
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
            v-model="spell.ingredients"
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
            v-model="spell.variables"
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
        class="btn btn-secondary"
        data-dismiss="modal"
        @click="close()"
      >
        Fermer
      </button>
      <input
        type="submit"
        class="btn btn-primary"
        value="Enregistrer"
        form="add-spell"
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
  'name': 'AddSpellCard',
  data() {
    return {
      spell: {
        type: Object,
        name: "",
        description: "",
        is_ritual: false,
        level: 0,
        cost: "0",
        charge: 0,
        schools: [],
        variables: [],
        ingredients: [],
      },
      all_schools: [],
      all_variables: [],
      all_ingredients: [],
    };
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
    this.$refs["add_spell_modal"].show();
    this.$root.$on('bv::modal::hide', () => {
      this.$emit('cancelAdd');
    });
  },
  methods: {
    addSpell(e) {
      e.preventDefault();

      let schoolsData = Object.values(this.spell.schools).map(v => {
        return parseInt(v.slice(7)); 
      });
      let variablesData = Object.values(this.spell.variables).map(v => {
        return parseInt(v.slice(9)); 
      });
      let ingredientsData = Object.values(this.spell.ingredients).map(v => {
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

      Spells.addOne(data)
        .then(v => {
          this.$emit('addSpell', v.data);
          this.$refs["add_spell_modal"].hide();
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
    textarea, select {
        min-height: 10rem;
        max-height: 20rem;
    }
</style>