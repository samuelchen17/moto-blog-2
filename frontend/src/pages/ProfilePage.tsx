import { _get } from "@/api/axiosClient";
import { IProfileData } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

  return <div>{profileData?.bio}</div>;
};

export default ProfilePage;
