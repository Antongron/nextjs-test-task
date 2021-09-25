import Link from "next/link";
import {Layout} from "../components/layout";
import axios from "axios";
import {useEffect, useState} from "react";
import {MyPost} from "../interfaces/post";
import styled from "styled-components";
export const api = axios.create({
    baseURL: `https://simple-blog-api.crew.red/posts`
})
const PostsList = styled.div`
    margin: 20px;
`
const Post = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 0;
`

interface PostsPageProps {
    posts: MyPost[]
}

export default function Index({posts: serverPosts}: PostsPageProps) {
    const [posts, setPosts] = useState(serverPosts)

    useEffect(() => {
        async function load() {
            const response = await api.get('/').then(res => res.data);
            const res = await response;
            setPosts(res)
        }
        if(!serverPosts) {
            load()
        }

    },[])

    if(!posts) {
        return (
            <Layout>
                <p>Loading data...</p>
            </Layout>
        )
    }

    return (

        <Layout title={'Posts page'}>
            <PostsList>
                <h1>This is our new blog!</h1>
                {posts.map(post => (
                    <Post key={post.id}>
                        <Link href={`/posts/[id]`} as={`/posts/${post.id}`}>
                            <a>{post.title}</a>
                        </Link>
                    </Post>
                ))}
            </PostsList>
        </Layout>
    )
}

Index.getInitialProps = async  () => {

    const response = await api.get('/').then(res => res.data);
    const posts = await response;

    return {
        posts
    }
}