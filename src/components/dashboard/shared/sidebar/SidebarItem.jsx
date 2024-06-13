import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const SidebarItem = ({ details, expanded }) => {
  const { link, label, icon } = details;
  const defaultCSS =
    "relative group flex items-center px-3 py-3.5 my-1 font-medium rounded-md cursor-pointer transition-all duration-500";
  return (
    <NavLink
      to={link}
      className={({ isActive }) =>
        isActive
          ? `bg-gradient-to-r from-indigo-200 to-indigo-100 text-indigo-800 ${defaultCSS}`
          : `hover:bg-indigo-500 text-gray-500 dark:text-white ${defaultCSS}`
      }
    >
      {icon}
      <span
        className={`overflow-hidden transition-all duration-500 ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {label}
      </span>
      {!expanded && (
        <div className="absolute z-50 left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
          {label}
        </div>
      )}
    </NavLink>
  );
};

SidebarItem.propTypes = {
  details: PropTypes.object.isRequired,
  expanded: PropTypes.bool.isRequired,
};

export default SidebarItem;
