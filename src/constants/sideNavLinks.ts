import Routes from './routePaths';
import {
  MdBarChart,
  MdGroups,
  MdLocationCity,
  MdGroup,
  MdMoreHoriz,
  MdMultipleStop,
} from "react-icons/md";

const sideNavLinks = [
    {
        label: 'Dashboard',
        to: Routes.CIRCLE_DASHBOARD,
        icon: MdBarChart
    },
    {
        label: 'Customers',
        to: Routes.CIRCLE_CUSTOMERS,
        icon: MdGroup
    },
    {
        label: 'Cities',
        to: Routes.CIRCLE_CITIES,
        icon: MdLocationCity
    },
    {
        label: 'Members',
        to: Routes.CIRCLE_MEMBERS,
        icon: MdGroups
    },
    {
        label: 'Transactions',
        to: Routes.CIRCLE_TRANSACTIONS,
        icon: MdMultipleStop
    },
    {
        label: 'Others',
        to: Routes.CIRCLE_OTHERS,
        icon: MdMoreHoriz
    },
];

export default sideNavLinks;