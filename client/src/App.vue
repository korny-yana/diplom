<template>
  <div>
    <template>
      <div @click="getArchive()" class="mr-72 my-8 flex flex-row-reverse">
        <v-btn elevation="1" x-large
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
            />
          </svg>
          Скачать архив</v-btn
        >
      </div>
    </template>

    <template>
      <v-card class=" mx-72" tile>
        <v-list dense>
          <v-list-item-group v-model="selectedItem" color="primary">
            <v-list-item v-for="(item, i) in getDirectory" :key="i">
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content @click="getDirectoryJSONMap(item.name)">
                <v-list-item-title
                  v-text="item.name"
                ></v-list-item-title> </v-list-item-content
              ><v-btn elevation="1" icon
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  /></svg
              ></v-btn>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </template>
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
