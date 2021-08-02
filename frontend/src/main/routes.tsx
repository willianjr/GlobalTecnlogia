import React from 'react';
import {BrowserRouter,Switch,Route, RouteComponentProps, Redirect} from 'react-router-dom'

import routes from '../common/configs/routes'
import auth from '../main/services/auth'

const {nivel} = auth.getUser()

const PrivateRoute = ({ component: Component,isLogado, level, ...rest }:any) => (
  <Route
    {...rest}
    render={props =>
      	(isLogado && nivel > level) ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/Login", state: { from: props.location } }} />
      )
    }
  />
);

export const Routes = (props:any) => {
	return(
				<Switch>
					{routes.map((route,index) => {
						return(
							route.auth || route.level ? (
								<PrivateRoute
									key={index}
									path={route.path}
									exact={route.exact}
									level={route.level||0}
									isLogado={props.isLogado}
									component={route.component} />
							):(
								<Route
									key={index}
									path={route.path}
									exact={route.exact}
									render={(props: RouteComponentProps<any>)=>(
										<route.component
												name={route.name}
												{...props}
												{...route.props}
										/>
									)}
							/>
							)

						)
					})}
				</Switch>
	)
}

