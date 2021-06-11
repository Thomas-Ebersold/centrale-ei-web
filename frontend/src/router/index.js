import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Counter from "../views/Counter.vue";
import Users from "../views/Users.vue";
import WaitingLine from "../views/WaitingLine.vue";
import Movie_Description from "../views/Movie_Description.vue";
import Noter from "../views/Noter.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/noter",
    name: "Noter",
    component: Noter,
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
  },
  {
    path: "/waitingline",
    name: "WaitingLine",
    component: WaitingLine,
  },
  {
    path: "/movie/:id",
    name: "movie_description",
    component: Movie_Description,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
