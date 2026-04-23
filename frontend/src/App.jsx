import AppRouter from "./AppRouter";
import "./feature/shared/style.scss";
import { AuthProvider } from "./feature/auth/auth.context";
import { PostContextProvider } from "./feature/post/post.context";
import { TroggleFollowProvider } from "./feature/FollowUnfollow/toggleFollow.context";

const App = () => {
  return (
    <AuthProvider>
      <PostContextProvider>
        <TroggleFollowProvider>
          <AppRouter />
        </TroggleFollowProvider>
      </PostContextProvider>
    </AuthProvider>
  );
};

export default App;
