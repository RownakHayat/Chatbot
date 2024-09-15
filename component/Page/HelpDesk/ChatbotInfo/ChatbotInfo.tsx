// import FileShow from '@/components/common/FileShow/FileShow'
// import RefreshButton from '@/components/common/RefreshButton/RefreshButton'
// import { useChatBotSetting } from '@/components/common/hooks/chatBotSetting'
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
// import { Card, CardContent } from '@/components/ui/card'
// import { siteConfig } from '@/config/site'
// import { useUserProfileShowQuery } from '@/store/features/UserManagement/UserProfile'
// import { useGetConversationFilesQuery, useGetConversationLinksQuery } from '@/store/features/helpDesk'
// import Image from 'next/image'

// const ChatbotInfo = () => {
//   const { user_id } = useChatBotSetting();
//   const { data: files } = useGetConversationFilesQuery({ id: user_id }, {
//     skip: user_id == null
//   });
//   const { data: links } = useGetConversationLinksQuery({ id: user_id }, {
//     skip: user_id == null
//   });

//   const fileExtension = (path: string) => {
//     const type = path?.split('.').pop()
//     if (type == "png" || type == "jpg" || type == "jpeg") {
//       return true
//     }
//     return false
//   };
//   const { data: employeeInfo } = useUserProfileShowQuery({
//     id: user_id,
//   }, {
//     skip: user_id == null
//   }
//   )

//   return (
//     <div className='h-full w-full relative flex text-center'>
//       <Accordion type="single" collapsible className="bg-[#F5F3F4] -ml-8 mx-2" >
//         <AccordionItem value="item-1">
//           <AccordionTrigger className='text-nowrap text-sm w-full bg-[#F5F3F4]'>General Information</AccordionTrigger>
//           <AccordionContent>
//             <Card className='bg-[#EBECF0] shadow w-full'>
//               <CardContent className='flex justify-start'>
//                 <div className="pt-4">
//                   <div className="flex text-left">
//                     <div className="relative w-1/2 h-1/2">
//                       <Image
//                         className="rounded-3xl"
//                         priority={true}
//                         src={employeeInfo?.data?.profile_image_path ? `${siteConfig?.envConfig[`${process.env.APP_ENV}`]?.IMAGE_URL}${employeeInfo?.data?.profile_image_path}` : "/assets/images/big-screenlogo.png"}
//                         alt="Logo"
//                         style={{ width: '80%', height: '80%' }}
//                         width={100}
//                         height={100}
//                       />
//                     </div>
//                     <div className="">
//                       <h2 className=' text-nowrap text-[#5D586C]  font-sans'>{employeeInfo?.data?.user_profile_name}</h2>
//                       <span className='text-xs text-[#A5A2AD] text-nowrap font-sans'>{employeeInfo?.data?.designation?.designation_name}</span>
//                       <p className='text-[#5D586C] text-xs text-nowrap'>{employeeInfo?.data?.user?.office?.office_name}</p>
//                     </div>
//                   </div>
//                   <div className="space-y-3 text-left mt-3">
//                     <div className="">
//                       <label className='text-xs text-[#A5A2AD] font-sans'>Email</label>
//                       <p className='text-[#5D586C]'>{employeeInfo?.data?.user_profile_email}</p>
//                     </div>
//                     <div className="">
//                       <label className='text-xs text-[#A5A2AD] font-sans'>Designation</label>
//                       <p className='text-[#5D586C]'>{employeeInfo?.data?.designation?.designation_name}</p>
//                     </div>
//                     <div className="">
//                       <label className='text-xs text-[#A5A2AD] font-sans'>Status</label>
//                       <p className='text-[#5D586C] flex items-center  text-xs gap-2'> <span className={`text-[#2F3349] ${employeeInfo?.data?.is_active == "1" ? 'bg-[#28C76F]' : 'bg-red-700'} outline w-1 h-1 rounded-full`}></span>{employeeInfo?.data?.is_active == "1" ? 'Active User' : 'InActive User'}</p>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           </AccordionContent>
//         </AccordionItem>
//         <AccordionItem value="item-2">
//           <AccordionTrigger className='text-nowrap text-sm w-full bg-[#F5F3F4]'>Shared Files</AccordionTrigger>
//           <AccordionContent>
//             <Card className='bg-[#EBECF0] shadow w-full'>
//               <CardContent className='max-h-[500px] overflow-y-scroll custom-scrollbar'>
//                 {files?.data &&
//                   files?.data?.map((file: any, idx: any) => (
//                     <div key={idx}>
//                       {fileExtension(file?.attach_file_path) ?
//                         <Image
//                           className="rounded-3xl my-2"
//                           src={file?.attach_file_path ? `${siteConfig?.envConfig[`${process.env.APP_ENV}`]?.IMAGE_URL}${file?.attach_file_path}` : "/assets/images/big-screenlogo.png"}
//                           alt="Conversation Image"
//                           width="200"
//                           height="200"
//                         />
//                         : <FileShow path={file?.attach_file_path} name={idx + 1} />}
//                     </div>
//                   ))
//                 }

//               </CardContent>
//             </Card>
//           </AccordionContent>
//         </AccordionItem>
//         <AccordionItem value="item-3">
//           <AccordionTrigger className='text-nowrap text-sm w-full bg-[#F5F3F4]'>Shared Links</AccordionTrigger>
//           <AccordionContent>
//             <Card className='bg-[#EBECF0] shadow w-full'>
//               <CardContent className='p-2'>
//                 <div className="py-3">
//                   {
//                     links?.data && links?.data?.map((link: any, idx: number) => (
//                       <div key={idx} className='mb-2'>
//                         <a className='text-primary !underline' href={link?.link} target='_blank'>{link?.link}</a>
//                       </div>
//                     ))
//                   }
//                 </div>
//               </CardContent>
//             </Card>
//           </AccordionContent>
//         </AccordionItem>
//       </Accordion>
//       <p className='absolute bottom-0 right-4'><RefreshButton /></p>
//     </div>
//   )
// }

// export default ChatbotInfo