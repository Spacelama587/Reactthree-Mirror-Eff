import { render } from 'react-dom'
import React, { Suspense } from 'react'
import { Canvas } from 'react-three-fiber'
import { useProgress, Html } from '@react-three/drei'
import { HashRouter as Router, Switch, Route, NavLink, Redirect } from 'react-router-dom'

import Scene1 from './Scene1'

import "./base.css"

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <span style={{ color: '#FFFFFF' }}>{progress} % loaded</span>
    </Html>
  )
}

function App(props) {
  const { scene = 1 } = props
  return (
    <Canvas concurrent shadowMap camera={{ position: [0, 0, 5], fov: 70 }}>
      <color attach="background" args={['#000']} />
      <Suspense fallback={<Loader />}>
        {scene === 1 && <Scene1 />}
      
      </Suspense>
      <ambientLight intensity={0.4} />
    </Canvas>
  )
}

function Body() {
  return (
    <Router>
      <main>
        <div className="frame">
          <div className="frame__title-wrap">
            <h1 className="frame__title">Awesome Doctor</h1>
            <p className="frame__tagline">Hero Page Header demo</p>
          </div>
         
          <div className="frame__demos">
            <NavLink to="/panna" activeClassName="frame__demo--current" className="frame__demo">
            Book Appointment
            </NavLink>
          
          </div>
        </div>
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Redirect to="/panna" />
            </Route>
            <Route exact path="/panna">
              <App scene={1} />
            </Route>
          
            
          </Switch>
        </div>
      </main>
    </Router>
  )
}

render(<Body />, document.querySelector('#root'))
