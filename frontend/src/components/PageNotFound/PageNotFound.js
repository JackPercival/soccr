import { Redirect } from 'react-router-dom';

function PageNotFound() {
    return <Redirect to="/explore" />;
}

export default PageNotFound;
