import FileShow from '@/components/common/FileShow/FileShow';
import { useChatBotSetting } from '@/components/common/hooks/chatBotSetting';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { siteConfig } from '@/config/site';
import { useAuthUserQuery } from '@/store/features/UserManagement/User';
import { useUserProfileShowQuery } from '@/store/features/UserManagement/UserProfile';
import Image from 'next/image';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import MessageLoder from '../MessageLoder/MessageLoder';
import moment from 'moment';
import FileShowWithName from '@/components/common/FileShow/FileShowWithName';
import { useGetConversationQuery } from '@/store/features/helpDesk';

const Messages = () => {
    const { user_id } = useChatBotSetting();
    const { data: userInfo, refetch } = useAuthUserQuery();
    const { data: employeeInfo } = useUserProfileShowQuery({
        id: user_id,
    }, {
        skip: user_id == null
    });

    const [params, setParams] = useState({ page: 1, limit: 10, sortBy: "", orderBy: "DESC" });
    const { data: conversations, refetch: refetchMessage, isLoading } = useGetConversationQuery(
        { ...params, id: user_id },
        { skip: user_id === null, refetchOnMountOrArgChange: true }
    );
    
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const fileExtension = useCallback((path: string) => {
        const type = path?.split('.').pop()
        return type === "png" || type === "jpg" || type === "jpeg";
    }, []);


    useEffect(() => {
        scrollToBottom();
    }, [params, user_id]);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    };

    useEffect(() => {
        if (user_id !== null) {
            const intervalId = setInterval(() => {
                refetchMessage();
                scrollToBottom();
            }, 5000);
            return () => clearInterval(intervalId);
        }
    }, []);

    const handleScroll = () => {
        const scrollContainer = scrollContainerRef.current;
        if (scrollContainer) {
            if ((scrollContainer.scrollTop === 0) && conversations?.pagination?.total >= params?.limit) {
                setParams(prevParams => ({
                    ...prevParams,
                    limit: prevParams.limit + 10,
                }));
            }
        }
    };

    const convertUrlsToLinks = (text:any) => {
        const urlPattern = /(https?:\/\/[^\s]+)/g;
        return text.replace(urlPattern, (url:any) => {
            return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-500 underline">${url}</a>`;
        });
    };

    let content: any = ""

    if (isLoading) {
        content = <MessageLoder length={8} />
    } else {
        content = conversations?.data && conversations?.data?.slice().reverse().map((mess: any, idx: number) => {
            const messageWithLinks = convertUrlsToLinks(mess?.message || "");
            return (
                <div key={idx} className='mb-4 mt-3'>
                    <div className="grid grid-cols-12">
                        <div className={`col-span-12 md:col-span-12 ${mess?.sender_profile_id === employeeInfo?.data?.id ? 'float-start' : 'float-right'}`}>
                            <div className={` ${mess?.sender_profile_id === employeeInfo?.data?.id ? '' : 'flex justify-end'}`}>
                                <div className="flex items-center gap-4 font-sans mb-2">
                                    {mess?.sender_profile_id === employeeInfo?.data?.id && (
                                        <Image
                                            className="rounded-3xl"
                                            priority={true}
                                            src={employeeInfo?.data?.profile_image_path ? `${siteConfig?.envConfig[`${process.env.APP_ENV}`]?.IMAGE_URL}${employeeInfo?.data?.profile_image_path}` : "/assets/images/big-screenlogo.png"}
                                            alt="Logo"
                                            width="30"
                                            height="30"
                                        />
                                    )}
                                    {mess?.sender_profile_id === employeeInfo?.data?.id && (
                                        <h5 className="text-md text-[#5D586C] text-nowrap">{employeeInfo?.data?.user_profile_name}</h5>
                                    )}
                                    {mess?.sender_profile_id === employeeInfo?.data?.id && (
                                        <p className="flex items-center text-sm gap-1">
                                            <span><Icons.clock className="text-[#4B465C] w-4" /></span>
                                            <span className="text-[#5D586C] font-light ">{moment(mess?.created_at).fromNow()}</span>
                                        </p>
                                    )}
                                </div>
                               
                                    <div className={`${mess?.sender_profile_id === employeeInfo?.data?.id ? 'bg-white' : 'bg-headerbg'}   block p-2  w-fit rounded-bl-2xl rounded-tr-2xl rounded-br-2xl`}>
                                        {mess?.conversation_attachments?.length > 0 && mess?.conversation_attachments?.map((conv: any, conIdx: number) => (
                                            <div key={conIdx} className='block w-full '>
                                                {fileExtension(conv?.attach_file_path) ? (
                                                    <Image
                                                        className="rounded-3xl my-2"
                                                        src={conv?.attach_file_path ? `${siteConfig?.envConfig[`${process.env.APP_ENV}`]?.IMAGE_URL}${conv?.attach_file_path}` : "/assets/images/big-screenlogo.png"}
                                                        alt="Conversation Image"
                                                        width="200"
                                                        height="200"
                                                    />
                                                ) : (
                                                    // <FileShow path={conv?.attach_file_path} name={idx + 1} />
                                                    <FileShowWithName path={conv?.attach_file_path} />
                                                )}
                                            </div>
                                        ))}
                                        {/* {mess?.message !== "" && ( <p className="text-wrap text-[#5D586C]">{mess?.message}</p>  )} */}
                                        {mess?.message !== "" && (<p className="text-wrap text-[#5D586C]" dangerouslySetInnerHTML={{ __html: messageWithLinks }}></p>)}
                                    </div>
                               
                            </div>
                        </div>
                        <div className="col-span-6"></div>
                    </div>
                </div>
            )
        })
    }

    return (
        <div className="mb-0 overflow-y-scroll scrollbar h-[72vh] custom-scrollbar message_scroll" ref={scrollContainerRef} onScroll={handleScroll}>
            <InfiniteScroll
                pageStart={0}
                loadMore={() => { }}
                hasMore={true || false}
            >
                <ScrollArea>
                    {content}
                    <div ref={messagesEndRef}></div>
                </ScrollArea>
                {/* {user_id && (
                    <Button
                        onClick={() => {
                            refetchMessage()
                        }}
                        className="absolute right-1 px-3 bottom-20 bg-transparent border border-primary text-primary hover:text-white focus:outline-none"
                    >
                        <Icons.down className="" />
                    </Button>
                )} */}
            </InfiniteScroll>
        </div>
    );
};

export default Messages;
