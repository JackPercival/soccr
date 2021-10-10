import { Route, Switch } from "react-router-dom";
import Header from "../Header/header";
import Footer from "../Footer/footer";
import ExplorePage from "../Explore/explore";


function RestOfApp() {

    return (
        <>
            <Header />
            <Switch>
                <Route path="/explore">
                    <ExplorePage />
                </Route>
            </Switch>
            <Footer />
        </>
    )
}

export default RestOfApp;
