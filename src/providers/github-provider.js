import React, { createContext, useCallback, useState } from 'react'
import api from '../services/api'

export const GithubContext = createContext({
  loading: false,
  user: {},
  repositories: [],
  starred: [],
})

const GithubProvider = ({ children }) => {
  const [githubState, setGithubState] = useState({
    hasUser: false,
    loading: false,
    user: {},
    repositories: [],
    starred: [],
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

  const getUserRepos = async (username) => {
    const repositories = (await api.get(`users/${username}/repos`)).data
    setGithubState((prevState) => ({
      ...prevState,
      repositories,
    }))
  }

  const getUserStarred = async (username) => {
    const starred = (await api.get(`users/${username}/starred`)).data
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
  }

  return (
    <GithubContext.Provider value={contextValue}>
      {children}
    </GithubContext.Provider>
  )
}

export default GithubProvider
