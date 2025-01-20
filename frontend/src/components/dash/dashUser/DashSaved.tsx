import { _get } from "@/api/axiosClient";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { IGetUser } from "@/types";
import { useEffect, useState } from "react";

const DashSaved = () => {
  const { currentUser } = useAppSelector(
    (state: RootState) => state.persisted.user
  );

  const [savedList, setSavedList] = useState();
  // useEffect to get users saved list

  useEffect(() => {
    if (currentUser) {
      const fetchSavedList = async () => {
        try {
          const res = await _get(`/saved-posts/${currentUser.user.id}`);
          const data = res.data;

          console.log(data);
        } catch (err) {
          console.error(err);
        }
      };

      fetchSavedList();
    }
  }, [currentUser]);

  return <div>hello</div>;
};

export default DashSaved;
