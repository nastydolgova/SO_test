<template>
  <div style="padding-left: 20px">
    <v-checkbox
      :id="`${item.id}`"
      :name="item.name"
      :input-value="item.checked"
      :indeterminate="checkChecked()"
      :label="item.name"
      @change="handleChange(item)"
    />
    <template v-if="item.children != null">
      <EntityView
        v-for="value in item.children"
        :key="value.id"
        :item="value"
        v-on="$listeners"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import { Rule } from "../models/Rule"

@Component
export default class EntityView extends Vue {
  @Prop()
  item: any;

  indeterminate = false

  @Watch('item')
  checkChecked():boolean {
    if (this.item.children) {
      let results: any[] = [];
      this.item.children.forEach((child: Rule) => {
        results.push(child.checked);
      });
      if ( results.every((res: boolean) => res == true) || results.every((res: boolean) => res == false) ) {
        return false
      } else {
        return true
      }
    } else {
      return false
    }
  }

		@Emit("handleChange")
		handleChange(item: Rule): Rule {
      item.checked = !item.checked;
      return item
		} 

}
</script>
<style scoped lang="scss"></style>
