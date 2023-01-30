import { Navigate, Route, Routes } from 'react-router-dom'

import { Categorize } from './Categorize'
// import { Discussions } from './Discussions';

export const TransactionRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Categorize />} />
      {/* <Route path=":discussionId" element={<Discussion />} /> */}
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  )
}
