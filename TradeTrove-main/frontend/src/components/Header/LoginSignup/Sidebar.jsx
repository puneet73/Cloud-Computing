import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons/lib';
import LSForm from './LSForm.jsx';

const Nav = styled.div`
  background: #15171c;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #15171c;
  width:500px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  right: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`;

const SidebarWrap = styled.div`
  width: 100%;
`;

const Sidebar = (props) => {
  const {user, updateUser} = props;

  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
            <button className="mr-5 hover:text-white" onClick={showSidebar}>
            <h3 className="mr-1 hover:text-white text-lg">&#9776; Login/Signup</h3>
            </button>
        <SidebarNav sidebar={sidebar}>
              <button className="mr-2 hover:bg-red-700 align" onClick={showSidebar}>
              <br></br>
              <br></br>
              <h3 className="mr-2 hover:text-white">&times;</h3>
              </button>
            <LSForm 
            user={user} 
            updateUser={updateUser}/>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
