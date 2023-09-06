import React from 'react'
import {Routes,Route} from "react-router-dom"
import { Home } from '../Pages/Home'
import { ChatUI } from '../Pages/ChatUI'
import { Feedback } from '../Pages/Feedback'

export function AllRoutes() {
    

    return (
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/chat' element={<ChatUI />}></Route>
            <Route path='/feedback' element={<Feedback />}></Route>
        </Routes>
    )
}
