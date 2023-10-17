import useCurrentUser from '@/hooks/useCurrentUser';
import React from 'react'
import { NextPageContext } from 'next'
import {signOut} from 'next-auth/react'
import { getSession } from 'next-auth/react'


export async function getServerSideProps(context: NextPageContext) {
    const session = await getSession(context);

    if(!session) {
        return {
            redirect: {
                destination: '/auth',
                permanent: false
            }
        }
    }
    return {
        props: {}
    }
}


interface AccountMenuProps {
    visible?:boolean
}

const AccountMenu : React.FC<AccountMenuProps> = ({visible}) => {
    const {data : user} = useCurrentUser();
    if(!visible){
        return null;
      }
  return (
    <div className='bg-black w-56 absolute top-14 right-0  py-5 flex-col border-2 border-gray-800 flex'>
        <div className='flex flex-col gap-3'>
            <div className='px-3 group/item flex flex-row gap-3 items-center w-full'>
                <img src="/images/default-blue.png" alt="profile" className='w-10 h-10 rounded-full'/>
                <p className='text-white text-sm group-hover/item:underline'>{user?.name}</p>
            </div>
            <hr className='bg-gray-600 border-0 h-px my-4'/>
            <div onClick={()=>signOut()} className='px-3 text-center text-white text-sm hover:underline'>
                Sign out of Netflix
            </div>
        </div>
    </div>
  )
}

export default AccountMenu