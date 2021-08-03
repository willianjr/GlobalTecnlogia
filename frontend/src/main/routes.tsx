import React, { useEffect, useState } from 'react';
import {BrowserRouter,Switch,Route, RouteComponentProps, Redirect, useLocation, useHistory} from 'react-router-dom'

import routes from '../common/configs/routes'
import auth from '../main/services/auth'


const PrivateRoute = ({ component: Component,isLogado, level, ...rest }:any) => {
	const {nivel} = auth.getUser()
	return(
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
)}

export const Routes = (props:any) => {

	let location = useLocation()
	let history = useHistory()
	useEffect(() => {
			if(!auth.isAuthenticated()) {
				history.push('/login')
			}
 	},[location])

	return(

				<Switch>
					{routes.map((route,index) => {
						return(
							route.auth ? (
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

