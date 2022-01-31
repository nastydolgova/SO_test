<template>
  <v-container>
    <v-row class="text-h3">
      <v-col>
        Vuetify treeview
      </v-col>
      <v-col>
        Самописный
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-treeview
          v-model="selection"
          :items="rules" 
          selectable 
          return-object 
          open-all 
          selected-color="red" 
        />
      </v-col>
      <v-col>
        <EntityView 
          v-for="item in rules" 
          :key="item.id" 
          :item="item" 
          @handleChange="handleChange"
        />

      <!-- @changeChecked="changeChecked" -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import EntityView from "../components/EntityView.vue";
import { Rule } from "../models/Rule"

@Component({
  components: {
    EntityView,
  },
})
export default class Home extends Vue {

  selection: any[] = []
  arr: Rule[] = []

  rules: Rule[] = [
    {
      id: 1,
      parentId: null,
      name: "Редактирование профиля",
      checked: false,
      children: [
        {
          id: 11,
          parentId: 1,
          name: "Изменение профиля",
          checked: false,
          children: [
            {
              id: 111,
              parentId: 11,
              name: "Удаление",
              checked: false,
              children: null,
            },
            {
              id: 112,
              parentId: 11,
              name: "Добавление",
              checked: true,
              children: null,
            },
          ],
        },
        {
          id: 12,
          parentId: 1,
          name: "Редактирование имени",
          checked: false,
          children: null,
        },
      ],
    },
    {
      id: 2,
      parentId: null,
      name: "Управление сущностью",
      checked: false,
      children: [
        {
          id: 21,
          parentId: 2,
          name: "Удаление сущности",
          checked: false,
          children: null,
        },
        {
          id: 22,
          parentId: 2,
          name: "Добавление сущности",
          checked: true,
          children: null,
        },
      ],
    },
    {
      id: 3,
      parentId: null,
      name: "Режим админа",
      checked: false,
      children: []
    }
  ];

  mounted(): void{
    this.pushItems(this.rules)
  }

  @Watch('rules')
  pushItems(el: Rule[]): void {
    el.forEach((item: Rule) => {
      if (item.checked == true) {
        this.arr.push(item)
      }
      if (item.children != null) {
        this.pushItems(item.children)
      }
    })
    this.selection = this.arr.filter((item: any) => item.checked == true)
  }

  handleChange(item: Rule): void{
    let currentItem: any;
    if (item.parentId == null) {
      currentItem = this.rules.find(el => el.id == item.id)
      currentItem.checked != currentItem.checked
      this.checkChildren(currentItem)
    } else {
      this.rules.forEach((el) => {      
        if (el.children != null) 
          this.findElem(item, el.children)
      })
    }
  }

  findElem(item: Rule, arr: Rule[]): void {
    let currentItem: any;
    if (item && arr[0] && item.parentId == arr[0].parentId){
      currentItem = arr.find((el: any) => el.id == item.id)
      currentItem.checked != currentItem.checked
      this.checkChildren(currentItem)
      this.checkParent(item, this.rules)
    } else {
      arr.forEach((el: any) => {
        if (el.children != null) {
        this.findElem(item, el.children)
        }
      })
    }
  }

  checkChildren(item: Rule): void{
    if(item.children != null){
      item.children.map((el: any) => { 
        el.checked = item.checked
        if(el.children != null) {
          this.checkChildren(el)
        }
      })
    }
  }

  checkParent(item: Rule, arr: Rule[]): void{
    let parentItem = arr.find((el: any) => el.id == item.parentId)
    if (!parentItem) {
      arr.forEach((el: any) => { 
        if (el.children != null){
          this.checkParent(item, el.children)
        }
      })
    }
    if(parentItem && parentItem.children != null){
      parentItem.children.every((el) => el.checked == true) ? parentItem.checked = true : parentItem.checked = false
    }
  }
}
</script>
