import styled from "styled-components"

const NavContainer = styled.div`
  position: -webkit-sticky;
  position: sticky;
  width: 100%;
  height: 60px;
  top: 0;
  z-index: 100;
  display: grid;
  @media screen and (min-width: 768px) {
    background-color: var(--navbar-light);
    -webkit-backdrop-filter: saturate(180%) blur(10px);
    backdrop-filter: saturate(180%) blur(10px);
    border-bottom: 1px solid var(--border-light);

    @media (prefers-color-scheme: dark) {
      background-color: var(--navbar-dark);
      border-bottom: 1px solid var(--border-dark);
    }
  }
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
  padding: 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 50;
  background-color: var(--navbar-light);
  -webkit-backdrop-filter: saturate(180%) blur(10px);
  backdrop-filter: saturate(180%) blur(10px);
  border-bottom: 1px solid var(--border-light);

  @media (prefers-color-scheme: dark) {
    background-color: var(--navbar-dark);
    border-bottom: 1px solid var(--border-dark);
  }
`

const Logo = styled.div`
  display: flex;
  align-items: center;
  transition: 0.2s all;
  &:hover {
    opacity: 0.75;
  }

  @media (prefers-color-scheme: dark) {
    svg {
      filter: invert(100%) sepia(100%) saturate(1%) hue-rotate(308deg)
        brightness(106%) contrast(101%);
    }
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
  width: 100%;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  transition: all 0.2s;
  overflow: hidden;
`

const MobileSearch = styled.div`
  display: flex;
  flex-direction: column;
  transition: all 0.2s;
  overflow: hidden;
`

const DesktopMenuItem = styled.div`
  color: var(--text-light);
  padding: 4px 12px;
  transition: all 200ms;
  font-weight: 600;

  &:hover {
    color: var(--color-primary);
  }

  @media (prefers-color-scheme: dark) {
    color: var(--text-dark);
  }
`

const MobileMenuItem = styled.div`
  color: var(--text-light);
  padding: 0.5rem;
  transition: all 200ms;
  font-weight: 600;

  &:hover {
    color: var(--color-primary);
  }

  @media (prefers-color-scheme: dark) {
    color: var(--text-dark);
  }
`

const ScrollIndicator = styled.div`
  background-color: var(--color-primary);
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
    background-color: var(--hover-shade-light);
    @media (prefers-color-scheme: dark) {
      background-color: var(--hover-shade-dark);
    }
  }

  @media (prefers-color-scheme: dark) {
    svg {
      filter: invert(100%) sepia(100%) saturate(1%) hue-rotate(308deg)
        brightness(106%) contrast(101%);
    }
  }
`

export {
  NavContainer,
  DesktopNav,
  MobileNav,
  Logo,
  DesktopMenu,
  MobileMenu,
  MobileSearch,
  DesktopMenuItem,
  MobileMenuItem,
  ScrollIndicator,
  IconButton,
}
