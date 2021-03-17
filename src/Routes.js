import Layout from './Layout';
import SpaceXdetails from './Components/SpaceXdeatils/SpaceXdetails';


const Routes = [
    {
        path: "/",
        component: Layout,
        exact: true
    }, {
        path: "/spacexdetails/:id",
        component: SpaceXdetails,
        exact: true
    }
];

export default Routes;