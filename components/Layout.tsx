import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import { useState } from 'react'
import { TrashModal } from './TrashModal'
import { Task } from '@prisma/client'

const Header = styled.header`
  background: var(--color-secondary-100);
  padding: 8px 0;
  margin: 0 0 2rem;
`

const Brand = styled.h1`
  display: flex;
  color: var(--color-black-200);
  font-size: x-large;
  margin-right: auto;

  a {
    background: var(--color-secondary-200);
    border-radius: 6px;
    padding: 0.5rem 1rem;

    &:focus {
      outline-color: var(--color-brand);
    }
  }
`

const Trash = styled.button`
  background: var(--color-secondary-100);
  color: var(--color-black-200);
  font-size: x-large;
  border-color: transparent;
  a {
    background: var(--color-secondary-200);
    border-radius: 6px;
    padding: 0.5rem 1rem;

    &:focus {
      outline-color: var(--color-brand);
    }
    &: hover {
      cursor: pointer;
    }
  }
`

const Main = styled.main`
  display: grid;
  gap: 2rem;
`
const NavContainer = styled.div`
  display: flex;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
`

const Container = styled.div`
  display: grid;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
`

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isShown, setIsShown] = useState<boolean>(false)
  const [goTrash, setGoTrash] = useState<Task[]>([])
  const toggle = () => setIsShown(!isShown)
  const content = <React.Fragment>Trash</React.Fragment>

  return (
    <div>
      <Header>
        <NavContainer>
          <Brand>
            <Link href='/'>
              <a>🍑 PeachyTask</a>
            </Link>
          </Brand>

          <Trash onClick={toggle}>
            <a>Trash({goTrash.length + 1})</a>
          </Trash>

          <TrashModal
            headerText='Trash'
            isShown={isShown}
            hide={toggle}
            modalContent={content}
            setGoTrash={setGoTrash}
            goTrash={goTrash}
          />
        </NavContainer>
      </Header>

      <main>
        <Container>
          <Main>{children}</Main>
        </Container>
      </main>
    </div>
  )
}

export default Layout
