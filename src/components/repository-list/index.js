import * as S from './styled'
import RepositoryItem from '../repository-item/index'

const RepositoryList = ({ repos }) => {
  return (
      <S.WrapperList>
        {repos.map(({id, name, html_url, full_name, forks_count, stargazers_count}) => (
          <RepositoryItem
            key={id}
            name={name}
            linkToRepo={html_url}
            fullName={full_name}
            forksCount={forks_count}
            stargazersCount={stargazers_count}
          />
        ))}
      </S.WrapperList>
  )
}

export default RepositoryList
