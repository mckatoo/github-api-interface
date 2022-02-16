import React, { useCallback, useState } from 'react'
import api from '../services/api'
import { GithubContext } from './context'

const GithubProvider = ({ children }) => {
  const [githubState, setGithubState] = useState({
    hasUser: false,
    loading: false,
    user: {},
    repositories: [],
    starred: [],
    forked: [],
  })

  const getUser = async (username) => {
    setGithubState((prevState) => ({
      ...prevState,
      loading: !prevState.loading,
    }))

    const user = (await api.get(`users/${username}`)).data
    setGithubState((prevState) => ({
      ...prevState,
      hasUser: true,
      user,
      loading: !prevState.loading,
    }))
  }

  const getUserReposForked = async (username) => {
    const { data } = await api.get(`users/${username}/repos`)
    const forked = data.filter((repo) => repo.forks_count > 0)
    setGithubState((prevState) => ({
      ...prevState,
      forked,
    }))
  }

  const getUserRepos = async (username) => {
    const repositories = (await api.get(`users/${username}/repos`)).data
    setGithubState((prevState) => ({
      ...prevState,
      repositories,
    }))
  }

  const getUserStarred = async (username) => {
    const { data } = await api.get(`users/${username}/starred`)
    const starred = data.filter(
      (repo) => repo.full_name.split('/')[0] === username,
    )
    setGithubState((prevState) => ({
      ...prevState,
      starred,
    }))
  }

  const contextValue = {
    githubState,
    getUser: useCallback((username) => getUser(username), []),
    getUserRepos: useCallback((username) => getUserRepos(username), []),
    getUserStarred: useCallback((username) => getUserStarred(username), []),
    getUserReposForked: useCallback(
      (username) => getUserReposForked(username),
      [],
    ),
  }

  return (
    <GithubContext.Provider value={contextValue}>
      {children}
    </GithubContext.Provider>
  )
}

export default GithubProvider
