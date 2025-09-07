import React from 'react'
import { dummyUserData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'; 
import { MapPin, UserPlus } from 'lucide-react';
import { MessageCircle, Plus } from 'lucide-react';

const UserCard = ({ user }) => { 
    
    const currentUser = dummyUserData;
    const navigate = useNavigate(); 

    const handleFollow = async () => {

    }

    const handleConnectionRequest = async () => {

    }

    return (
        <div className='p-4 pt-6 flex flex-col justify-between w-72 shadow border border-gray-200 rounded-md'> 
            <div className='text-center cursor-pointer' onClick={() => navigate(`/profile/${user._id}`)}>
                <img src={ user.profile_picture } alt={user.full_name} className='rounded-full w-16 h-16 object-cover shadow-md mx-auto'/>
                <p className='mt-4 font-semibold'>{ user.full_name }</p>
                {user.username && <p className='text-gray-500 font-light text-sm'>@{ user.username }</p>}
                {user.bio && <p className='text-gray-600 mt-2 text-center text-sm px-4'>{ user.bio}</p>}
            </div>
            <div className='flex items-center justify-center gap-2 mt-4 text-xs text-gray-600'>
                <div className='flex items-center gap-1 border border-gray-300 rounded-full px-3 py-1'>
                    <MapPin className='w-4 h-4'/> {user.location}
                </div>

                <div className='flex items-center gap-1 border border-gray-300 rounded-full px-3 py-1'>
                    <span>{user.followers.length}</span> Followers
                </div>
            </div>

            <div className='mt-4 flex gap-2'>
                {/* Follow button */}
                <button onClick={handleFollow} disabled={currentUser?.following.includes(user._id)} 
                className="w-full py-2 rounded-md flex justify-center items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 
                hover:from-indigo-600 hover:to-purple-700 active:scale-95 transition text-white cursor-pointer">
                    <UserPlus className='w-4 h-4' /> {currentUser?.following.includes(user._id) ? 'Following' : 'Follow'}
                </button>
                {/* Connection Request Button / Message Button */}
                <button onClick={handleConnectionRequest} className='flex items-center justify-center w-16 border text-slate-500 group rounded-md cursor-pointer active:scale-95 transition'>
                    {
                        currentUser?.connections.includes(user._id) 
                        ? <MessageCircle className='w-5 h-5 group-hover:scale-105 transition' />
                        : <Plus className='w-5 h-5 group-hover:scale-105 transition' />
                    }
                </button>
            </div>
        </div>
    )
}

export default UserCard;