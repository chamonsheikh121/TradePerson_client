import { Link } from 'react-router-dom';
import ProfileCompletion from './ProfileCompletion'
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../../../Authentication/AuthProvider';
const ProfileHeader = ({profile}) => {

    const { user } = useContext(AuthContext);

    const [progress, setProgress] = useState(0);
    console.log(progress);

    useEffect(() => {
        console.log(user);
        const requiredFields = [
            profile.experience,
            profile.galleryImages?.length > 0,
            profile.selectedTrade,
            profile.skills?.length > 0,
            profile.profile?.email,
            profile.profile?.firstName && profile.user?.lastName,
            profile.profile?.phone,
            profile.profile?.profilePicture,
        ];

        const completedFields = requiredFields.filter(Boolean).length;
        const progressPercentage = (completedFields / requiredFields.length) * 100;

        setProgress(progressPercentage);
    }, [profile]);




    return (
        <div className="flex p-10 flex-col lg:flex-row shadow-md rounded-md  bg-white items-center gap-10">

            <ProfileCompletion h={52} w={52} heading={'Profile update'} progress={progress} />

            <div className="flex-1 space-y-4">
                <div>
                    <h5 className="text-2xl font-semibold">{user?.firstName} {user?.lastName}</h5>

                </div>
                <div>
                    <h6 className="font-semibold text-gray-500">Bio</h6>
                    <p>{user?.bio}</p>
                </div>

                <div>
                    <Link to={'/trades/profile'}>
                        <button
                            type="submit"
                            className="px-10 py-3 text-white bg-green-500 hover:bg-green-600 rounded-lg shadow-md transition-all duration-200"
                        >
                            View as public
                        </button>
                    </Link>
                </div>

            </div>
        </div>

    );
};

export default ProfileHeader;