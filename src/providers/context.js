import { createContext } from 'react'

const GithubContext = createContext({
  loading: false,
  user: {},
  repositories: [],
  starred: [],
  forked: [],
})

export { GithubContext }
