import { useHistory } from 'react-router-dom';

function PageNotFound() {
    const history = useHistory();
    history.push('/explore')

    return (
        <></>
    )
}

export default PageNotFound;
