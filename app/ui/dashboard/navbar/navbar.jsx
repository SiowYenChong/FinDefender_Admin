"use client"; // This directive ensures the component is treated as a client component in Next.js

import { usePathname } from 'next/navigation'; // Import usePathname from next/navigation
import styles from './navbar.module.css'; // Import the CSS module for styling
import { MdNotifications, MdOutlineChat, MdPublic, MdSearch } from "react-icons/md"; // Import icons

const Navbar = () => {
  const pathname = usePathname(); // Get the current pathname using usePathname()

  return (
    <div className={styles.container}>
      {/* Display the last part of the pathname */}
      <div className={styles.title}>{pathname.split("/").pop()}</div>
      <div className={styles.menu}>
        <div className={styles.search}>
          <MdSearch/>
          <input type="text" placeholder="Search..." className={styles.input}/>
        </div>
        <div className={styles.icons}>
            <MdNotifications size={20} /> 
        </div>
      </div>
    </div>
  );
};

export default Navbar;
