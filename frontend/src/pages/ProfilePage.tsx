import { _get } from "@/api/axiosClient";
import { Separator } from "@/components/ui/separator";
import { IPostResponse, IProfileData } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { Label } from "@/components/ui/label";

const ProfilePage = () => {
  const { userId } = useParams<{ userId: string }>();
  const [profileData, setProfileData] = useState<IProfileData>();
  const [postData, setPostData] = useState<IPostResponse>();

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

  // fetch posts if profile belongs to admin
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await _get<IPostResponse>(
          `/post/getposts?createdBy=${userId}`
        );
        const data = res.data;

        setPostData(data);
      } catch (err) {
        console.error("Error:", err);
      }
    };

    fetchPosts();
  }, [profileData]);

  console.log(postData);

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

          <div className="flex flex-col space-y-5">
            <div>
              <Label>Name</Label>
              <p>{profileData.username}</p>
            </div>

            <div>
              <Label>Bio</Label>
              {profileData.bio ? (
                <p>{profileData.bio}</p>
              ) : (
                <p>No bio to display</p>
              )}
            </div>
            <div>
              <Label>Joined</Label>{" "}
              <div>
                {format(new Date(profileData.createdAt), "dd MMM yyyy")}
              </div>
            </div>
          </div>
        </div>

        <h2>Recent Posts</h2>
        <Separator />
        {profileData.isAdmin ? (
          postData ? (
            <div>
              <span>display user posts here</span>
              if user is admin but no posts, show something here also,
            </div>
          ) : (
            <div>Skeleton here</div>
          )
        ) : (
          <div>User is not have permission to post</div>
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
