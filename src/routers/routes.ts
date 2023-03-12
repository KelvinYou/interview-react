import * as ROUTES from "./../constants/routes";

import Detail from "../pages/Detail";
import MobileForm from "../pages/MobileForm";
import NameIC from "../pages/NameIC";
import OTPForm from "../pages/OTPForm";
import Home from "../pages/Home";
import EvenArray from "../pages/EvenArray";
import ToDos from "../pages/ToDos";
import TodoDetails from "../pages/ToDoDetails";

interface RouteType {
  path: string;
  component: any;
  name: string;
  protected: boolean;
}

const routes: RouteType[] = [
  {
    path: ROUTES.HOME,
    component: Home,
    name: "Home Screen",
    protected: false,
  },
  {
    path: ROUTES.MOBILE_FORM,
    component: MobileForm,
    name: "MobileForm Screen",
    protected: false,
  },
  {
    path: ROUTES.OTP_FORM,
    component: OTPForm,
    name: "OTPForm Screen",
    protected: false,
  },
  {
    path: ROUTES.NAME_IC,
    component: NameIC,
    name: "NameIC Screen",
    protected: false,
  },
  {
    path: ROUTES.DETAIL,
    component: Detail,
    name: "Detail Screen",
    protected: false,
  },
  {
    path: ROUTES.EVEN_ARRAY,
    component: EvenArray,
    name: "EvenArray Screen",
    protected: false,
  },
  {
    path: ROUTES.TODOS,
    component: ToDos,
    name: "ToDos Screen",
    protected: false,
  },
  {
    path: ROUTES.TODO_DETAILS_PATH,
    component: TodoDetails,
    name: "ToDo Details",
    protected: false,
  },
];

export default routes;