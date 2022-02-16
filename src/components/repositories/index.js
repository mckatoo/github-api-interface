import React, { useEffect, useState } from 'react'
import useGithub from '../../hooks/github-hooks'
import * as S from './styled'
import RepositoryList from '../repository-list'

const RepositoriesContainer = () => {
  const { githubState, getUserRepos, getUserStarred, getUserReposForked } = useGithub()
  const [hasUserForSearchrepos, setHasUserForSearchrepos] = useState(false)

  useEffect(() => {
    if (githubState.user.login) {
      getUserRepos(githubState.user.login)
      getUserStarred(githubState.user.login)
      getUserReposForked(githubState.user.login)
    }
    setHasUserForSearchrepos(githubState.repositories)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [githubState.user.login])

  return (
    <>
      {hasUserForSearchrepos ? (
        <S.WrapperTabs
          selectedTabClassName="is-selected"
          selectedTabPanelClassName="is-selected"
        >
          
          <S.WrapperTabList>
            <S.WrapperTab>Repositories</S.WrapperTab>
            <S.WrapperTab>Starred</S.WrapperTab>
            <S.WrapperTab>Forked</S.WrapperTab>
          </S.WrapperTabList>
          
          <S.WrapperTabPanel>
            <RepositoryList repos={githubState.repositories} />
          </S.WrapperTabPanel>

          <S.WrapperTabPanel>
            <RepositoryList repos={githubState.starred} />
          </S.WrapperTabPanel>

          <S.WrapperTabPanel>
            <RepositoryList repos={githubState.forked} />
          </S.WrapperTabPanel>
          
        </S.WrapperTabs>
      ) : (
        <></>
      )}
    </>
  )
}

export default RepositoriesContainer
