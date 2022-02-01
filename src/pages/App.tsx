import * as React from 'react';
import './App.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Todo } from './todo';
import PreviewComponent from './DragLayerProps';
import { AuthProvider } from './authContext';
import SignIn from './SignIn';
import { Home } from './Home';
import PrivateRoute from './privateRoute';

function isTouchDevice() {
  const result = window.navigator.userAgent.match(/(iPhone|iPad|iPod|Android)/i);
  return result;
}

export default function App(): React.ReactElement {
  return (
    <DndProvider backend={isTouchDevice() ? TouchBackend : HTML5Backend}>
      {isTouchDevice() ? <PreviewComponent /> : null}
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/todo" element={<PrivateRoute />}>
              <Route path="/todo" element={<Todo />} />
            </Route>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </DndProvider>
  );
}
