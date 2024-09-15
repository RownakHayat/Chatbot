/* eslint-disable @next/next/no-img-element */
/* eslint-disable tailwindcss/classnames-order */
"use client"

import { useAppDispatch } from "@/store/useReduxStore"
import useAuthStore from "@/store/zustand/auth"
import useLayoutStore from "@/store/zustand/layout"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Menu, Sidebar as Sidebars } from "react-pro-sidebar"

import { Icons } from "@/components/icons"
import { useUserRolePermissionListQuery } from "@/store/features/SecurityManagement/CreateRole"
import { addUserPermissions } from "@/store/features/auth"
import { useEffect, useMemo, useState } from "react"
import ListItem from "../sidebar/ListItem"
import SubListItem from "../sidebar/SubListItem"

type Props = {}

const CollapseSidebar = (props: Props) => {
  const { collapse } = useLayoutStore((state: any) => state)

  const { setUser, user } = useAuthStore((state: any) => state)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { data: rolePermissionList } = useUserRolePermissionListQuery();
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  const handleSubMenuClick = (path: string) => {
    setOpenSubMenu(path === openSubMenu ? null : path);
  };

  const permissionList = useMemo(() => {
    const allRoles = rolePermissionList?.data;
    const permissions: any = [];
    allRoles?.map((role: any) => {
      role?.module?.map((module: any) => {
        if (!permissions?.includes(module.name)) {
          permissions.push(module.name);
        }
        if (module.sub_module) {
          module?.sub_module?.map((subModule: any) => {
            if (!permissions.includes(subModule.name)) {
              permissions.push(subModule.name);
            }
            if (subModule.permission) {
              subModule?.permission?.map((subModulePermission: any) => {
                if (!permissions.includes(subModulePermission.name)) {
                  permissions.push(subModulePermission.name);
                }
              });
            }
          });
        }
      });
    });
    return permissions;
  }, [rolePermissionList]);

  useEffect(() => {
    dispatch(addUserPermissions(permissionList));
  }, [permissionList]);

  return (
    <>
      <div className="flex h-[80px] items-center justify-center border-b">
        <Link href={"/admin"}>
          <Image
            priority={true}
            src="/assets/images/collaps-logo.png"
            alt="Logo"
            width="100"
            height="70"
            className="mb-5"
          />
        </Link>
      </div>
      <div className="mt-6 relative h-full overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 scrollbar-track-transparent">
        <Sidebars
          width={`${collapse ? "300" : "20"}`}
          style={{ height: "calc(100vh - 250px)" }}
        >
          <Menu
            style={{
              marginLeft: ".5rem",
              marginRight: ".5rem",
            }}
          >
            {permissionList?.includes("dashboard") && (
              <ListItem
                dataSource={{
                  name: "Dashboard",
                  path: "/admin",
                  // color: "#7367F0",
                  icon: <Icons.securityUser className="text-white " />,

                }}
              />
            )}
            {permissionList?.includes("configuration") && (
              <SubListItem
                dataSource={{
                  name: "Configuration",
                  icon: <Icons.configurationIcon className="text-white " />,
                  // color: "#fff",
                  path: "/admin/configuration",
                  child: [
                    {
                      name: "User Type",
                      path: "/admin/configuration/user-type",
                      key: "user_type",
                    },
                    {
                      name: "Wing/Section",
                      path: "/admin/configuration/wing",
                      key: "wing_section",
                    },
                    {
                      name: "Designation",
                      path: "/admin/configuration/designation",
                      key: "designation",
                    },
                    {
                      name: "Division",
                      path: "/admin/configuration/division",
                      key: "division",
                    },
                    {
                      name: "District",
                      path: "/admin/configuration/district",
                      key: "district",
                    },
                    {
                      name: "Upazila",
                      path: "/admin/configuration/upazila",
                      key: "upazila",
                    },
                    {
                      name: "Cluster",
                      path: "/admin/configuration/cluster",
                      key: "cluster",
                    },
                    {
                      name: "Industrial Sector",
                      path: "/admin/configuration/industrial-sector",
                      key: "industrial_sector",
                    },
                    {
                      name: "Occupation Type",
                      path: "/admin/configuration/occupation-type",
                      key: "occupation_type",
                    },
                    {
                      name: "Gender",
                      path: "/admin/configuration/gender",
                      key: "gender",
                    },
                    {
                      name: "Budget Item",
                      path: "/admin/configuration/budget-item",
                      key: "budget_item",
                    },
                    {
                      name: "Financial Year",
                      path: "/admin/configuration/financial-year",
                      key: "financial_year",
                    },
                    {
                      name: "Payment Type",
                      path: "/admin/configuration/financial-year",
                      key: "payment_type",
                    },
                    {
                      name: "Organizer",
                      path: "/admin/configuration/event-form-setup",
                      key: "organizer",
                    },
                    {
                      name: "Activities",
                      path: "/admin/configuration/activities",
                      key: "activities",
                    },
                    {
                      name: "Chat Tropics",
                      path: "/admin/configuration/chat-tropics",
                      key: "chat_tropics",
                    },
                  ]?.filter((module: any) =>
                    permissionList?.includes(module.key)
                  ),
                }}
              />
            )}
            {permissionList?.includes("user_management") && (
              <SubListItem
                dataSource={{
                  name: "User Management",
                  icon: <Icons.logIcon className="text-black " />,
                  color: "",
                  path: "/admin/user-management",
                  child: [
                    {
                      name: "Role",
                      path: "/admin/user-management/roles",
                      key: "role",
                    },
                    {
                      name: "Users",
                      path: "/admin/user-management/users",
                      key: "users",
                    },
                    {
                      name: "Staff Users",
                      path: "/admin/user-management/staff-users",
                      key: "staff_users",
                    },
                  ]?.filter((module: any) =>
                    permissionList?.includes(module.key)
                  ),
                }}
              />
            )}
            {permissionList?.includes("event_management") && (
              <SubListItem
                dataSource={{
                  name: "Event Management",
                  icon: <Icons.configurationIcon className="text-white " />,
                  // color: "#fff",
                  path: "/admin/event-management",
                  child: [
                    {
                      name: "New Program",
                      path: "/admin/event-management/new-program",
                      key: "new_program",
                    },
                    {
                      name: "New Event",
                      path: "/admin/event-management/new-event",
                      key: "new_event",
                    },
                    {
                      name: "Budget Spent",
                      path: "/admin/event-management/budget-spent",
                      key: "budget_spent",
                    },
                    {
                      name: "Attendance",
                      path: "/admin/event-management/attendance",
                      key: "attendance",
                    },
                    {
                      name: "Fair Sales",
                      path: "/admin/event-management/fair-sales",
                      key: "fair_sales",
                    },
                  ]?.filter((module: any) =>
                    permissionList?.includes(module.key)
                  ),
                }}
              />
            )}
            <SubListItem
              dataSource={{
                name: "Events",
                icon: <Icons.archive className="text-white " />,
                // color: "#fff",
                path: "/admin/events",
                child: [
                  {
                    name: "New Event Apply",
                    path: "/admin/events/new-event-apply",
                    key: "",
                  },
                  {
                    name: "Attendance",
                    path: "/admin/events/attendance",
                    key: "",
                  },
                  {
                    name: "Fair Sales",
                    path: "/admin/events/fair-sales",
                    key: "",
                  },
                ],
              }}
            />
            {permissionList?.includes("payment_management") && (
              <SubListItem
                dataSource={{
                  name: "Payment Management",
                  icon: <Icons.logIcon className="text-black " />,
                  color: "",
                  path: "/admin/payment-management",
                  child: [
                    {
                      name: "Applied User",
                      path: "/admin/payment-management/applied-user",
                      key: "applied_user",
                    },
                  ]?.filter((module: any) =>
                    permissionList?.includes(module.key)
                  ),
                }}
              />
            )}
            <ListItem
              dataSource={{
                name: "Payment",
                path: "/admin/payment",
                // color: "#7367F0",
                icon: <Icons.securityUser className="text-white " />,
              }}
            />
            {permissionList?.includes("portal_management") && (
              <SubListItem
                dataSource={{
                  name: "Portal Management",
                  icon: <Icons.logIcon className="text-black " />,
                  color: "",
                  path: "/admin/portal-management",
                  child: [
                    {
                      name: "Slider",
                      path: "/admin/portal-management/slider",
                      key: "slider",
                    },
                    {
                      name: "Notice",
                      path: "/admin/portal-management/notice",
                      key: "notice",
                    },
                    {
                      name: "News",
                      path: "/admin/portal-management/news",
                      key: "news",
                    },
                  ]?.filter((module: any) =>
                    permissionList?.includes(module.key)
                  ),
                }}
              />
            )}
            <ListItem
              dataSource={{
                name: "Survey",
                path: "/admin/survey",
                // color: "#7367F0",
                icon: <Icons.securityUser className="text-white " />,
              }}
            />
            <ListItem
              dataSource={{
                name: "Feedback",
                path: "/admin/feedback",
                // color: "#7367F0",
                icon: <Icons.securityUser className="text-white " />,
              }}
            />
          </Menu>
        </Sidebars>

      </div>
    </>
  )
}

export default CollapseSidebar
