"use client"

import Link from 'next/link'; // Import Link from next/link
import styles from './menuLink.module.css'; // Import CSS module for styling
import { usePathname } from 'next/navigation'; // Import usePathname from next/navigation to get current path

const MenuLink = ({ item }) => {
  const pathname = usePathname(); // Get the current pathname
  console.log(pathname); // Log the current pathname for debugging

  return (
    <Link href={item.path} className={`${styles.container} ${pathname === item.path && styles.active}`}>
      {item.icon}
      {item.title}
    </Link>
  );
};

export default MenuLink; // Export the MenuLink component
