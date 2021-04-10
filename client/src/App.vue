<template>
  <div>
    <ul class="list-none">
      <li>Parent directory</li>
    </ul>
    <ul
      v-for="(item, idx) in getDirectory"
      :key="idx"
      @click="getDirectoryJSONMap(item.name)"
      class="list-none"
    >
      <li>
        <hr />
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import directory from "../../api/src/directory-map.json";

export default {
  data() {
    return {
      directory_list: Object.values(directory.children),
    };
  },
  computed: {
    getDirectory() {
      return this.directory_list;
    },
  },
  methods: {
    getDirectoryJSONMap(name) {
      const dir = Object.values(this.directory_list).find(
        (item) => item.name === name
      );
      this.directory_list = dir.children;
    },
  },
};
</script>
