import { MdSearch } from "react-icons/md";
import styles from "./search.module.css"; // Assuming you're using CSS modules
import { usePathname, useSearchParams } from "next/navigation"; // Next.js 13 navigation hooks

const Search = ({ placeholder }) => {
  const searchParams = useSearchParams(); // Get search parameters from URL
  const pathname = usePathname(); // Get current pathname

  console.log(searchParams); // Log search params for debugging
  console.log(pathname); // Log pathname for debugging

  return (
    <div className={styles.container}>
      <MdSearch className={styles.icon} />
      <input 
        type="text" 
        placeholder={placeholder} 
        className={styles.input} 
      />
    </div>
  );
};

export default Search;
