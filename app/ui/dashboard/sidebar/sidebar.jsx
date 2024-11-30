import MenuLink from "./menuLink/menuLink";
import Image from 'next/image';
import styles from "./sidebar.module.css";
import { 
  MdDashboard, 
  MdSupervisedUserCircle, 
  MdAnalytics, 
  MdBubbleChart, 
  MdReport, 
  MdTrendingUp 
} from "react-icons/md"; // Import necessary icons

const menuItems = [
  {
    title: "Pages",
    list: [    
      {
        title: "Reports",
        path: "/dashboard/reports",
        icon: <MdReport />,
      },
      {
        title: "Bubble Map: Fraud Bank",
        path: "/dashboard/fraud-bank",
        icon: <MdBubbleChart />,
      },
    ],
  },
];

const Sidebar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.user}>
        <Image
          className={styles.userImage}
          src="/noavatar.png"
          alt="User Avatar"
          width="50"
          height="50"
        />
        <div className={styles.userDetail}>
          <span className={styles.username}>FinDefender</span>
          <span className={styles.userTitle}>Administrator</span>
        </div>
      </div>
      <ul className={styles.list}>
        {menuItems.map((cat) => (
          <li key={cat.title}>
            <span className={styles.cat}>{cat.title}</span>
            {cat.list.map((item) => (
              <MenuLink item={item} key={item.title} />
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
