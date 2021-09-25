import { useState, useEffect} from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import {NextPageContext} from "next";
import {Layout} from "../../components/layout";
import {MyPost} from "../../interfaces/post";
import {api} from "../index";

interface PostPageProps {
    post: MyPost
}

export default function Post({ post: serverPost }: PostPageProps) {
    const [post, setPost] = useState(serverPost);
    const router = useRouter();

    useEffect(() => {
        async function load() {
            const response = await api.get(`${router.query.id}`).then(res => res.data);
            const data = await response;
            setPost(data)
        }

        if (!serverPost) {
            load()
        }
    }, []);

    if (!post) {
        return (
            <Layout>
                <p>Loading...</p>
            </Layout>
        )
    }

    return (
        <Layout>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            <Link href={'/'}><a>Back to all posts</a></Link>
        </Layout>
    )
}

interface PostNextPageContext extends NextPageContext {
    query: {
        id: string
    }
}

Post.getInitialProps = async  ({ query, req }: PostNextPageContext) => {
    if (!req) {
        return {post: null}
    }

    const response = await api.get(`/${query.id}`).then(res => res.data);
    const post = await response;

    return {
        post
    }
}