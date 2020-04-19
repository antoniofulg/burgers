import globalComponents from "./globalComponents";
import globalDirectives from "./globalDirectives";
import SidebarPlugin from "../components/SidebarPlugin/index"
import NotificationPlugin from "../components/NotificationPlugin/index"

//Assets import
import "../../static/vendor/nucleo/css/nucleo.css";
import "../../sass/app.scss";

export default {
  install(Vue) {
    Vue.use(globalComponents);
    Vue.use(globalDirectives);
    Vue.use(SidebarPlugin);
    Vue.use(NotificationPlugin);
  }
};
