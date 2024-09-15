import Search from '@/components/common/Search/Search';
import SearchChange from '@/components/common/Search/SearchChange';
import { useChatBotSetting } from '@/components/common/hooks/chatBotSetting';
import { useFormSetting } from '@/components/common/hooks/useFormSetting';
import { Icons } from '@/components/icons';
import { ScrollArea } from '@/components/ui/scroll-area';
import { siteConfig } from '@/config/site';
import { useAuthUserQuery } from '@/store/features/UserManagement/User';
import { useConversationUserQuery } from '@/store/features/helpDesk';
import moment from 'moment';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

const ChatbotSidebar = () => {
    
    const { changeUserId } = useChatBotSetting()
    const { data: userInfo } = useAuthUserQuery();
    const [params, setParams] = useState({ page: 1, limit: 10, sortyBy: "", orderBy: "DESC", searchData:"" });
    const { data: convUser, refetch } = useConversationUserQuery(params, { refetchOnMountOrArgChange: true });

    const handleScroll = () => {
        const container = document.querySelector('.chat_user_scroll');
        if (!container) return;

        const { scrollTop, scrollHeight, clientHeight } = container;
        const atBottom = scrollTop + clientHeight === scrollHeight;

        if (atBottom && convUser?.pagination?.total <= params?.limit) {
            setParams(prevParams => ({
                ...prevParams,
                page: prevParams.limit + 10,
            }));
        }
    };

    useEffect(() => {
        const container = document.querySelector('.chat_user_scroll');
        if (container) {
            container.addEventListener('scroll', handleScroll);
            return () => {
                container.removeEventListener('scroll', handleScroll);
            };
        }
    }, []);


    const selectUser = (user: number) => {
        changeUserId(user)
        refetch();
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            refetch();
        }, 5000);
        return () => clearInterval(intervalId);
    }, []);

    const handleSearchChange = (searchText: any) => {
        setParams(prevParams => ({
            ...prevParams,
            searchData: searchText,
            page: 1 
        }));
    };

    return (
        <div className="bg-white rounded shadow p-0.5 mb-0 overflow-y-scroll max-h-[83vh] custom-scrollbar chat_user_scroll">
            <InfiniteScroll
                pageStart={0}
                loadMore={() => { }}
                hasMore={convUser?.pagination?.current_page <= convUser?.pagination?.last_page}
            >
                <div className="bg-[#F5F3Fa]">
                    <div className="px-1 py-1 rounded">
                        {/* <Search /> */}
                        <SearchChange onSearchChange={handleSearchChange} />
                    </div>
                    <ScrollArea className="w-full rounded">
                        <div className="py-2 px-2 divide-y-2 divide-blue-200">
                            {convUser?.data && convUser?.data?.map((convUser: any, idx: number) => (
                                <div className={`hover:bg-[#EBE8F9] p-4 rounded cursor-pointer ${convUser?.last_conversation?.seen_status === 0 && userInfo?.data?.user_profile_id !== convUser?.last_conversation?.sender_profile_id && 'bg-[#EBE8F9] font-bold'}`} key={idx} onClick={() => selectUser(convUser?.id)}>
                                    <div className="flex justify-between items-center gap-3">
                                        <div className="flex gap-2 items-center">
                                            <div className="">
                                                <Image
                                                    className='rounded-3xl'
                                                    priority={true}
                                                    src={convUser?.profile_image_path ? `${siteConfig?.envConfig[`${process.env.APP_ENV}`]?.IMAGE_URL}${convUser?.profile_image_path}` : "/assets/images/big-screenlogo.png"}
                                                    alt="Logo"
                                                    width="50"
                                                    height="50"
                                                />
                                            </div>
                                            <div className="flex items-center">
                                                <div className="">
                                                    <h1 className={`text-sm text-nowrap font-bold text-[#5D586C] ${convUser?.last_conversation?.seen_status === 0 && userInfo?.data?.user_profile_id !== convUser?.last_conversation?.sender_profile_id && 'font-bold'}`}>{convUser?.user_profile_name}</h1>
                                                    <p className='text-xs text-[#A5A2AD]'>{convUser?.cell_phone_no}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="">
                                            {
                                                convUser?.last_conversation?.created_at != null && <p className='text-xs text-nowrap -mt-4'><span >
                                                    {/* <Icons.clock className='w-4 text-[#5D586C]' /> */}
                                                </span> {moment(convUser?.last_conversation?.created_at).fromNow()}</p>
                                            }
                                        </div>
                                    </div>
                                    <div className='mt-2'>
                                        <p className={`text-xs text-[#5D586C] ${convUser?.last_conversation?.seen_status === 0 && userInfo?.data?.user_profile_id !== convUser?.last_conversation?.sender_profile_id && 'font-bold'}`}>{convUser?.last_conversation && convUser?.last_conversation?.message}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </div>
            </InfiniteScroll>
        </div>
    );
};

export default ChatbotSidebar;
