import React from 'react'
import {Redirect, Route, Switch} from 'react-router'
import {push} from 'react-router-redux'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {defaultPath} from "../../configurations/routes"
import './App.scss'
import HeaderImage from './images/header.jpg'

export class App extends React.Component {
    render() {
        const {routes} = this.props;

        return (
            <div className="App">
                <header className="App-header">
                    <img src={HeaderImage} className="App-header-image" alt="MI 3"/>
                </header>
                <section className="App-contents">
                    <Switch>
                        {routes.map((route, i) => (
                            <Route
                                exact
                                key={`route-item-${i}`}
                                path={route.path}
                                component={route.component}
                            />
                        ))}
                        <Redirect exact from="/" to={defaultPath}/>
                    </Switch>
                </section>
            </div>
        );
    }
}

App.defaultProps = {
    routes: [],
    navigate: () => {
    },
};

App.propTypes = {
    routes: PropTypes.arrayOf(PropTypes.shape({
        path: PropTypes.string,
        component: PropTypes.oneOfType([
            PropTypes.func,
            PropTypes.object
        ]),
        menu: PropTypes.string,
        navigate: PropTypes.func,
    })),
    navigate: PropTypes.func,
    error: PropTypes.string,
    currentLocation: PropTypes.shape({
        pathname: PropTypes.string
    }),
};

function mapStateToProps(state) {
    return {
        routes: state.app.routes,
        error: state.app.error,
        currentLocation: state.router.location
    }
}

function mapDispatchToProps(dispatch) {
    return {
        navigate: route => dispatch(push(route))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
