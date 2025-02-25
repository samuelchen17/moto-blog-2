import { _get } from "@/api/axiosClient";
import { IPostResponse, IPostWithAuthor, IProfileData } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { Label } from "@/components/ui/label";
import SearchItem from "@/components/searchComponent/SearchItem";
import {
  SkeletonProfilePage,
  SkeletonSearchItem,
} from "@/components/SkeletonComponents";

const ProfilePage = () => {
  const { userId } = useParams<{ userId: string }>();
  const [profileData, setProfileData] = useState<IProfileData>();
  const [showMoreLoading, setShowMoreLoading] = useState<boolean>(false);
  const [postData, setPostData] = useState<IPostWithAuthor[]>([]);
  const [showMore, setShowMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await _get<IProfileData>(`/profile/${userId}`);
        const data = res.data;

        setProfileData(data);
        setLoading(false);
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

        setPostData(data.posts);
        setShowMore(data.posts.length === 9);
      } catch (err) {
        console.error("Error:", err);
      }
    };

    fetchPosts();
  }, [profileData]);

  const handleShowMore = async () => {
    const startIndex = postData.length.toString();
    setShowMoreLoading(true);
    try {
      const res = await _get<IPostResponse>(
        `/post/getposts?startIndex=${startIndex}`
      );

      const data = res.data;

      setPostData((prev) => [...prev, ...data.posts]);
      if (data.posts.length < 9) {
        setShowMore(false);
      }
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setShowMoreLoading(false);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto my-12 px-4 min-h-[80vh] space-y-24">
      {/* profile section */}
      <div>
        <h2 className="text-2xl mb-6 capitalize space-y-2">
          <span>Profile</span>
          <hr />
        </h2>

        {loading || !profileData ? (
          <SkeletonProfilePage />
        ) : (
          <div className="flex flex-col md:flex-row">
            {/* display picture */}
            <div className="max-h-80 max-w-80 rounded-full object-cover mx-auto md:mx-0">
              <img
                className="rounded-full object-cover aspect-square"
                src={profileData.profilePicture}
              />
            </div>

            {/* information */}
            <div className="flex flex-col space-y-5 pt-4 md:ml-12 md:pt-0 max-w-xl">
              <div>
                <Label>Name</Label>
                <p className="">{profileData.username}</p>
              </div>

              <div>
                <Label>Joined</Label>
                <div>
                  {format(new Date(profileData.createdAt), "dd MMM yyyy")}
                </div>
              </div>

              <div className="max-w-lg">
                <Label>Bio</Label>
                {profileData.bio ? (
                  <p>{profileData.bio}</p>
                ) : (
                  <p>No bio to display</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* recent posts section */}
      <div>
        <h2 className="text-2xl mb-6 capitalize space-y-2">
          <span>Recent posts</span>
          <hr />
        </h2>
        {profileData?.isAdmin ? (
          postData ? (
            postData.length > 0 ? (
              postData.map((post) => <SearchItem key={post._id} post={post} />)
            ) : (
              <div>User has not posted yet</div>
            )
          ) : (
            <SkeletonSearchItem />
          )
        ) : (
          <div>User does not have permission to post</div>
        )}

        {showMore && (
          <button
            onClick={handleShowMore}
            className="self-center w-full text-red-500 py-6"
            disabled={showMoreLoading}
          >
            {showMoreLoading ? "Loading..." : "Show more"}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
