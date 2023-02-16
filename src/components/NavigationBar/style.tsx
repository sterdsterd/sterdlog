import styled from "styled-components"

const NavContainer = styled.div`
  position: -webkit-sticky;
  position: sticky;
  width: 100%;
  top: 0;
  z-index: 100;
  display: grid;
  background-color: rgba(255, 255, 255, 0.5);
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  -webkit-backdrop-filter: saturate(180%) blur(10px);
  backdrop-filter: saturate(180%) blur(10px);
`

const DesktopNav = styled.nav`
  width: 100%;
  max-width: 1140px;
  height: 60px;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 50;
  margin: 0 auto;
`

const MobileNav = styled.nav`
  width: 100%;
  height: 60px;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 50;
`

const Logo = styled.div`
  display: flex;
  align-items: center;
  transition: 0.2s all;
  &:hover {
    opacity: 0.75;
  }
`

const DesktopMenu = styled.div`
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: all 0.2s;
  overflow: hidden;
`

const MobileMenu = styled.div`
  display: flex;
  flex-direction: column;
  text-decoration: none;
  transition: all 0.2s;
  overflow: hidden;
`

const DesktopMenuItem = styled.div`
  color: black;
  padding: 4px 12px;
  transition: all 200ms;
  font-weight: 600;

  &:hover {
    color: #2563e1;
  }
`

const MobileMenuItem = styled.div`
  color: black;
  padding: 8px 20px;
  transition: all 200ms;
  font-weight: 600;

  &:hover {
    color: #2563e1;
  }
`

const ScrollIndicator = styled.div`
  background-color: #2563e1;
  height: 1px;
  width: 0;
  left: 0;
  z-index: 80;
  box-shadow: 0px 1px 4px rgba(37, 99, 225, 0.2);
  margin-bottom: -1px;
`

const IconButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: none;
  background-color: transparent;
  transition: all 0.2s;
  padding-top: 3px;
  padding-left: 0;
  padding-right: 0;
  padding-bottom: 0;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`

export {
  NavContainer,
  DesktopNav,
  MobileNav,
  Logo,
  DesktopMenu,
  MobileMenu,
  DesktopMenuItem,
  MobileMenuItem,
  ScrollIndicator,
  IconButton,
}
