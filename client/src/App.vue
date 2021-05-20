<template>
  <div>
    <template>
      <div class="m-8 mx-72 flex flex-row-reverse">
        <div class="">
          <v-btn
            elevation="1"
            x-large
            class="focus:outline-none"
            @click="downloadAllArchive()"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 mr-3"
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
        <div class="mr-8">
          <v-btn elevation="1" x-large class="focus:outline-none"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Обновить архив</v-btn
          >
        </div>
      </div>
    </template>
    <template>
      <v-card class="mx-72" tile>
        <v-list dense>
          <v-list-item-group>
            <v-list-item v-for="(item, i) in getDirectory" :key="i">
              <v-list-item-icon v-if="dataType(item.type)" class="mr-3">
                <svg
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
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  />
                </svg>
              </v-list-item-icon>
              <v-list-item-icon v-if="!dataType(item.type)" class="mr-3">
                <svg
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
                    d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  /></svg
              ></v-list-item-icon>
              <v-list-item-content
                @click="requestDirectoryList(item.path, item.type, item.name)"
              >
                <v-list-item-title
                  v-text="item.name"
                ></v-list-item-title></v-list-item-content
              ><v-btn
                elevation="1"
                icon
                class="focus:outline-none"
                v-if="dataType(item.type)"
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
import { get, getfile } from "./api";
export default {
  data() {
    return {
      directory_list: null,
    };
  },
  beforeMount() {
    this.requestDirectoryList("archive", "directory", "name");
  },
  computed: {
    getDirectory() {
      return this.directory_list;
    },
  },
  methods: {
    async downloadAllArchive() {
      await get("allArchive")
    },
    dataType(type) {
      if (type === "directory") return true;
    },
    async requestDirectoryList(path, type, name) {
      if (this.dataType(type)) {
        this.directory_list = await get(path);
      } else {
       await getfile(path, name);
      }
    },
  },
};
</script>
