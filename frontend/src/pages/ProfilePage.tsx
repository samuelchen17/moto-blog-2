import { _get } from "@/api/axiosClient";
import { Separator } from "@/components/ui/separator";
import { IProfileData } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";

const ProfilePage = () => {
  const { userId } = useParams<{ userId: string }>();
  const [profileData, setProfileData] = useState<IProfileData>();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await _get<IProfileData>(`/profile/${userId}`);
        const data = res.data;

        setProfileData(data);
      } catch (err) {
        console.error("Error:", err);
      }
    };

    fetchProfile();
  }, []);

  if (profileData) {
    return (
      <div className="max-w-screen-xl mx-auto my-24 px-4">
        <h1>Profile Page</h1>
        <Separator />
        <div className="flex">
          <div>
            <img
              className="h-72 w-72 bg-gray-500 rounded-full object-cover"
              src={profileData.profilePicture}
            />
          </div>

          <div>
            <span>name: {profileData.username}</span>
            <p>bio: </p>
            {profileData.bio ? (
              <p>{profileData.bio}</p>
            ) : (
              <p>No bio to display</p>
            )}

            <span>
              Joined: {format(new Date(profileData.createdAt), "dd MMM yyyy")}
            </span>
          </div>
        </div>

        {profileData.isAdmin && (
          <div>
            <h2>Recent Posts</h2>
            <span>display user posts here</span>
            if user is admin but no posts, show something here also,
          </div>
        )}
      </div>
    );
  } else {
    <div>
      <span>Skeleton for this page</span>
    </div>;
  }
};

export default ProfilePage;
