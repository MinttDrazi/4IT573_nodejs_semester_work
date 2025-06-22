import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Gamepad, Home, List } from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import { Button } from "./ui/button";
import { logout } from "@/apis/logout";
import { useAuth } from "@/hooks/useAuth";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "My library",
    url: "/library",
    icon: Gamepad,
  },
  {
    title: "Wishlist",
    url: "/wishlist",
    icon: List,
  },
];

function AppSidebar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  async function logoutOnClick() {
    await logout();
    console.log("clicked to logout");
    navigate("/");
  }

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>GameDatabase</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          {user ? (
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Button onClick={logoutOnClick}>
                  <span>logout</span>
                </Button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ) : (
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <NavLink to="/login">
                  <span>Login</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
