import { createContext, useState } from "react";

export const TroggleFollowContext = createContext();

export function TroggleFollowProvider({ children }) {
  const [follow, setFollow] = useState([]);
  const [unfollow, setUnFollow] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <TroggleFollowContext.Provider
      value={{ follow, setFollow, unfollow, setUnFollow, loading, setLoading }}
    >
      {children}
    </TroggleFollowContext.Provider>
  );
}
