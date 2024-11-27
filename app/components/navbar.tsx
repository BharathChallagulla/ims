import FactoryIcon from "@mui/icons-material/Factory";
import { Box, Typography } from "@mui/material";
import Link from "next/link";

const Navbar = () => {
  const menuItems = [
    { name: "Dashboard", link: "/" },
    { name: "Products", link: "/products" },
    { name: "Orders", link: "/orders" },
  ];
  return (
    <div className="bg-black">
      <div>
        <FactoryIcon className="bg-white m-2" />
        <span className="text-white font-semibold text-lg">
          Inventory Management System
        </span>
      </div>

      <Box className="flex items-center text-center bg-gray-700 h-auto">
        {menuItems.map((item) => {
          return (
            <Typography className="min-w-100 p-2 text-xs text-white hover:text-bold hover:bg-gray-600">
              <Link href={item.link} key={item.name}>
                {item.name}
              </Link>
            </Typography>
          );
        })}
      </Box>
    </div>
  );
};

export default Navbar;
