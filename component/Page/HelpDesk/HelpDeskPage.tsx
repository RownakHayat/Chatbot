"use client"
import { useAuthUserQuery } from '@/store/features/UserManagement/User'
import { useUserProfileShowQuery } from '@/store/features/UserManagement/UserProfile'
import React, { useEffect } from 'react'
import ChatbotSidebar from './ChatbotSidebar/ChatbotSidebar'
import Chats from './Chats/Chats'



const HelpDeskPage = () => {

  const { data: user } = useAuthUserQuery()
  const { data: employeeInfo } = useUserProfileShowQuery({
    id: user?.data?.id,
  }, {
    skip: user?.data?.id == undefined
  }
  )

  const shouldShowAlert =
    employeeInfo?.data?.user_profile_nid == null ||
    employeeInfo?.data?.profile_image_path == null ||
    employeeInfo?.data?.office_id_image_path == null ||
    employeeInfo?.data?.profile_image_path_back == null ||
    employeeInfo?.data?.profile_signature == null;

  return (
    <>
      {
        user?.data?.user_role_id != 1 && shouldShowAlert ? (
          <div> </div>
        ) : (<div className="grid grid-cols-12 gap-2 sm:gap-2 max-h-full min-h-fit">
          <div className="sm:grid-cols-12 md:col-span-3 lg:col-span-3">
            <ChatbotSidebar />
          </div>
          <div className="sm:col-12 md:col-span-9 lg:col-span-9 ">
            <Chats />
          </div>
        </div>)
      }
    </>
  )
}

export default HelpDeskPage