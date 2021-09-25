import Link from "next/link";
import Head from "next/head";
import styled from "styled-components";

const NavMenu = styled.nav`
  height: 60px;
  left: 0;
  top: 0;
  right: 0;
  background: darkblue;
  display: flex;
  justify-content: space-around;
  align-items: center;
`
const NavItem = styled.a`
  color: white;
  text-decoration: none;
`
const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 1440px;
`
const InnerWrapper = styled.div`
  margin: 0 15px;
  padding: 0;
`

export function Layout({children, title = 'Next test App'}) {
    return (
        <>
            <Head>
                <title>{title} | Next test App</title>
                <meta name="keywords" content="next, javascript, nextjs, react"/>
                <meta name="description" content="this is my first Next app"/>
                <meta charSet="utf-8"/>
            </Head>
            <NavMenu>
                <Link href={'/'}><NavItem>Home</NavItem></Link>
                <Link href={'/posts/new'}><NavItem>Create new post</NavItem></Link>
            </NavMenu>
            <main>
                <Wrapper>
                    <InnerWrapper>
                        {children}
                    </InnerWrapper>
                </Wrapper>
            </main>
        </>
    )
}