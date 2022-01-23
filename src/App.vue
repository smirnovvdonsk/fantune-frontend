<template>
  <div>
    <FanTune
      :query="query"
      :result="result"
      :searching="searching"
      :notFound="notFound"
      :connected="connected"
      :online="online"
      @changeInputParams="onInput"
    />

    <footer
      class="
        navbar navbar-expand navbar-dark
        bg-dark
        text-light
        shadow
        d-flex
        flex-column flex-xl-row
        justify-content-between
        px-3
      "
    >
      <div v-show="connected">
        {{ visitorsInfo }}
      </div>
    </footer>
  </div>
</template>

<script>
import OPTIONS from "./options";

import { FanTune } from "@smirnovvdonsk/fantune-vue";

import { FanQuery } from "@smirnovvdonsk/fantune-vue";
import Connection from "./models/connection.js";

import favicon from "./assets/favicon.svg";

export default {
  data() {
    return {
      query: new FanQuery(),
      result: {},
      searching: false,
      notFound: false,
      connection: {},
      connected: false, // факт подключения к серверу
      online: false, // серверу доступны базы данных
      numberOfClients: null, // Количество клиентов, подключенных к серверу на этой странице
      onInputTimer: null,
    };
  },
  computed: {
    favicon() {
      return favicon;
    },
    visitorsInfo() {
      return `Эту страницу сейчас смотр${this.numberOfClients > 1 ? "ят" : "ит"}
          ${this.numberOfClients > 0 ? this.numberOfClients : ""}
          ${this.numberOfClients > 0 ? "человек" : "никто"}${
        this.numberOfClients >= 2 && this.numberOfClients <= 4 ? "а" : ""
      }`;
    },
  },
  methods: {
    setFavicon(href) {
      let favicon = document.head.querySelector("link[rel~='icon']");
      if (!favicon) {
        favicon = document.createElement("link");
        favicon.rel = "icon";
        document.head.appendChild(favicon);
      }
      favicon.href = href;
    },
    setTitle(title) {
      let titleElement = document.head.querySelector("title");
      if (!titleElement) {
        titleElement = document.createElement("title");
        document.head.appendChild(titleElement);
      }
      titleElement.innerHTML = title;
    },
    wsInit() {
      this.connection = new Connection(OPTIONS.ROOT, this.wsHandler);
      document.addEventListener("connected", (event) => {
        this.connected = true;
        this.queryIsOnline();
      });
      document.addEventListener("online", (event) => {
        this.online = true;
        this.onInput();
      });
      document.addEventListener("disconnected", (event) => {
        this.connected = false;
        this.result = {};
        this.numberOfClients = null;
      });
      document.addEventListener("offline", (event) => {
        this.online = false;
        this.result = {};
      });
      this.queryIsOnline();
      setInterval(() => this.queryIsOnline(), 600000);
    },
    wsHandler(message) {
      let data = message;
      try {
        data = JSON.parse(message);
      } catch {}
      if (data.event === "online") {
        if (data.content) {
          document.dispatchEvent(new CustomEvent("online"));
        } else {
          document.dispatchEvent(new CustomEvent("offline"));
        }
      }
      if (data.event === "numberOfClients") {
        if (data.content) {
          this.numberOfClients = data.content;
        } else {
          this.numberOfClients = null;
        }
      }
      if (data.event === "vent") {
        let newResult = data.content;
        // Запрос пришёл от сервера обратно, чтобы мы проверили, что это ответ именно на наш запрос.
        let query = data.query;
        let fail = () => {
          this.result = {};
          this.searching = false;
          this.notFound = true;
          this.onInput();
        };
        if (newResult && query) {
          try {
            if (JSON.stringify(this.query.export) === JSON.stringify(query)) {
              if (JSON.stringify(this.result) !== JSON.stringify(newResult)) {
                this.result = newResult;
              }
              this.notFound = this.searching = false;
            } else {
              console.info(
                "Очередной ответ сервера проигнорирован как устаревший"
              );
            }
          } catch {
            fail();
          }
        } else {
          fail();
        }
      }
    },
    queryIsOnline() {
      if (this.connected) this.connection.send({ event: "online" });
    },
    queryVent() {
      if (this.connected) {
        this.connection.send({ event: "vent", content: this.query.export });
      }
    },
    onInput() {
      if (this.onInputTimer) {
        clearTimeout(this.onInputTimer);
        this.onInputTimer = null;
      }
      this.searching = true;
      this.notFound = false;
      this.result = {};
      this.onInputTimer = setTimeout(() => {
        this.queryVent();
      }, 100);
    },
  },
  mounted() {
    this.setTitle(OPTIONS.TITLE);
    this.setFavicon(favicon);
    setTimeout(() => this.wsInit(), 500);
  },
  components: {
    FanTune,
  },
};
</script>
