import React, { Suspense, useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation, NavigateFunction, Location, useRoutes, Navigate } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './routes';
// import ProtectedRoute from './components/ProtectedRoute';

import Swal from 'sweetalert2';

import API from './common/API';

function App(): JSX.Element {

  const navigate: NavigateFunction = useNavigate();
  const location: Location = useLocation();

  const [user, setUser] = useState(null);
  const authentificated = user != null;

  // useEffect(() => {
  //   console.log(authentificated)
  //   if (location.pathname !== '/login') {
  //     checkToken();
  //   }
  // }, [ location ]);

  const checkToken = async () => {
    try {
      const ret = await API.post('/token/check');
    } catch(err) {
      Swal.fire({
        title: '로그인 세션이 만료되었습니다.',
        icon: 'error',
        backdrop: `rgba(166, 166, 166, 0.9)`,
        confirmButtonText: '확인',
        didClose: () => {
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('isLogin');
          navigate('/login');
        }
      })
    }
  }
  
  const privateRoute = useRoutes(privateRoutes.map(route => ({
    path: route.path,
    element: (
      <ProtectedRoute
        authentificated={ authentificated }
      >
        { route.component }
      </ProtectedRoute>
    )
  })));
  const publicRoute = useRoutes(publicRoutes.map(route => ({
    path: route.path,
    element: route.component
  })));

  return (
    <div className="app">
      <Suspense fallback={ <p>Loading...</p> }>
        { publicRoute }
        { privateRoute }
      </Suspense>
    </div>
  );
}

function ProtectedRoute({ authentificated, children }: { authentificated: boolean, children: any }) {
  if (!authentificated) {
    return <Navigate to="/login" />
  }

  return children;
}

export default App;
