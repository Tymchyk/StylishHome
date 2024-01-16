import { Preview } from "./components/Preview";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { ItemsByType } from "./components/ItemsByType";
import { ItemsById } from "./components/ItemById";
import { MyCard } from "./components/MyCard";
import { MyOrders } from "./components/MyOrders";
import { RoomScene } from "./components/RoomScene";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/preview',
    element: <Preview />
  },
  {
    path: '/items',
    element: <FetchData />
  },
  {
    path: '/items/:name',
    element: <ItemsByType />
  },
  {
    path: '/item/:value',
    element: <ItemsById />
  },
  {
    path: '/mycard',
    element: <MyCard />
  },
  {
    path: '/orders',
    element: <MyOrders />
  },
  {
    path: '/room',
    element: <RoomScene />
  }
];

export default AppRoutes;
