// import React from 'react'

import { Routes, Route } from 'react-router-dom'
import AdminLayout from '../../layouts/AdminLayout'
import UserManagement from '../../pages/adminPages/managementPages/UserManagement'
import EditSubCategory from '../../components/adminComponents/CategorySubCategory/AddEditSubCategory/EditSubCategory.jsx'
import AddSubCategory  from '../../components/adminComponents/CategorySubCategory/AddEditSubCategory/AddSubCategory.jsx'
function RouteAdmin() {


  return (
    <Routes>
      <Route element={<AdminLayout/>}>
        <Route path='usermanagement' element={<UserManagement/>}/>
           
      {/* <Route path='/userdetails' element={<UserDetails/>}/>
      <Route path='/signIn'element={<SignInForm/>}/> */}
       <Route path='editsubcategory' element={<EditSubCategory/>}/>
       <Route path='addsubcategory' element={<AddSubCategory/>}/>
      </Route>
    </Routes>

  )
}

export default RouteAdmin