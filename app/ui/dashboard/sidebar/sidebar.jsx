import MenuLink from "./menuLink/menuLink";
import Image from 'next/image'; // Add this import
import styles from "./sidebar.module.css"; // Import the CSS module for styling
import { 
  MdDashboard, 
  MdSupervisedUserCircle, 
  MdShoppingBag, 
  MdAttachMoney, 
  MdWork, 
  MdAnalytics, 
  MdPeople, 
  MdOutlineSettings, 
  MdHelpCenter, 
  MdLogout 
} from "react-icons/md"; // Import necessary icons

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard", // Main Dashboard page
        path: "/dashboard",
        icon: <MdDashboard />,
        subMenu: [
          {
            title: "Account Status Listings", // Account status listings
            path: "/dashboard/account-status",
            icon: <MdSupervisedUserCircle />,
          },
          {
            title: "Report", // Our report
            path: "/dashboard/our-report",
            icon: <MdAnalytics />,
          },
        ],
      },
      {
        title: "Users",
        path: "/dashboard/users",
        icon: <MdSupervisedUserCircle />,
      },
    ],
  },
  // Additional sections like Products, Work, Settings can be omitted here as we are focusing on Dashboard pages
];

const Sidebar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image className={styles.userImage} src="/noavatar.png" alt="User Avatar" width="50" height="50" />
        <div className={styles.userDetail}>
          <span className={styles.username}>John Joe</span>
          <span className={styles.userTitle}>Administrator</span>
        </div>
      </div>

      <ul className={styles.list}>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {/* Map through the list and return MenuLink component for each item */}
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar; // Export Sidebar component
