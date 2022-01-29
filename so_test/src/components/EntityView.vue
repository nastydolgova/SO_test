<template>
  <div style="padding-left: 10px">
    <input type="checkbox" :id="item.id" :name="item.name" :checked="checkChecked()">
         {{ item.name }}
    <template v-if="item.Children != null">
      <EntityView v-for="value in item.Children" :key="value.id" :item="value"/>
       <!-- v-on="$listeners" -->
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class EntityView extends Vue {
  @Prop()
  item: any;

  checkChecked(){
    if(this.item.Children){
      this.item.Children.forEach((child: any) => {
          if (child.checked != this.item.checked)
          return false
          // добавить indeterminate
          // добавить условие что если в массиве у всех дочерних равны между собой но не равны родителю - родитель меняется
          // добавить модель
          // добавить оформление
        }
      )
    } else {
      return this.item.checked
    }
  }
}
</script>
<style scoped lang="scss"></style>
