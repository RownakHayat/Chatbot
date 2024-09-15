
import { useUserRolePermissionListQuery } from "@/store/features/SecurityManagement/CreateRole";
import { usePathname } from "next/navigation";


const CheckPermission = ({ children, subMod, permission }: any) => {
    const { data: rolePermissionList } = useUserRolePermissionListQuery();
    // const router = useRouter()
    const router = usePathname()
    let moduleName = ''
    const path = router.split('/')[2]
    if (path == 'configuration') {
        moduleName = 'configuration'
    }
    const havePermission = rolePermissionList?.data[0]?.module.
        find((module: any) => module?.name == moduleName)?.
        sub_module?.find((submodule: any) => submodule?.name == subMod)?.
        permission?.find((per: any) => per.name == permission ? true : false)
    return (
        <>
            {havePermission && children}
        </>
    )
}

export default CheckPermission;