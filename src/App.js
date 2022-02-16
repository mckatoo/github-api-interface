import React from 'react'
import { Layout, NoSearch, Profile, RepositoriesContainer } from './components'
import useGithub from './hooks/github-hooks'

const App = () => {
  const { githubState } = useGithub()
  return (
    <Layout>
      {githubState.hasUser ? (
        <>
          {githubState.loading ? (
            <p>Loading</p>
          ) : (
            <>
              <Profile />
              <RepositoriesContainer />
            </>
          )}
        </>
      ) : (
        <NoSearch />
      )}
    </Layout>
  )
}

export default App
