<template>
  <div class="home">
    <EntityView v-for="item in rules" :key="item.id" :item="item" />
     <!-- @changeChecked="changeChecked" -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import EntityView from "../components/EntityView.vue";

@Component({
  components: {
    EntityView,
  },
})
export default class Home extends Vue {
  rules: any[] = [
    {
      id: 1,
      parentId: null,
      name: "Редактирование профиля",
      checked: true,
      Children: [
        {
          id: 11,
          parentId: 1,
          name: "Изменение профиля",
          checked: true,
          Children: [
            {
              id: 121,
              parentId: 11,
              name: "Удаление",
              checked: false,
              Children: null,
            },
            {
              id: 122,
              parentId: 11,
              name: "Добавление",
              checked: true,
              Children: null,
            },
          ],
        },
        {
          id: 12,
          parentId: 1,
          name: "Редактирование имени",
          checked: false,
          Children: null,
        },
      ],
    },
    {
      id: 2,
      parentId: null,
      name: "Управление сущностью",
      checked: true,
      Children: [
        {
          id: 21,
          parentId: 2,
          name: "Удаление сущности",
          checked: true,
          Children: null,
        },
        {
          id: 22,
          parentId: 2,
          name: "Добавление сущности",
          checked: true,
          Children: null,
        },
      ],
    },
    {
      id: 3,
      parentId: null,
      name: "Режим админа",
      checked: true,
    },
  ];
}
</script>
