import { useContext } from "react";
import { GithubContext } from '../providers/context';

const useGithub = () => {
  const { githubState, getUser, getUserRepos, getUserStarred, getUserReposForked } = useContext(
    GithubContext
  );

  return { githubState, getUser, getUserRepos, getUserStarred, getUserReposForked };
};

export default useGithub;
