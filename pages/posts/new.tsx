import {Layout} from "../../components/layout";
import React, {useState} from "react";
import styled from "styled-components";
import {api} from "../index";

const CreateArea = styled.form`
  position: relative;
  width: 480px;
  margin: 30px auto 20px auto;
  background: #fff;
  padding: 15px;
  border-radius: 7px;
  box-shadow: 0 1px 5px rgb(138, 137, 137);
`
const InputArea = styled.input`
  width: 100%;
  border: none;
  padding: 4px;
  outline: none;
  font-size: 1.2em;
  font-family: inherit;
  resize: none;
`
const CreateBtn = styled.button`
  position: absolute;
  right: 18px;
  bottom: -18px;
  background: darkblue;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 72px;
  height: 36px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  outline: none;
`

export default function NewPost() {
    const [post, setPost] = useState({
        title: '',
        body: '',
    });
    const [createdPost, setCreatedPost] = useState({
        title: '',
        body: '',
        id: ''
    });

    function handleChange(event: React.FormEvent<HTMLInputElement>) {
        const {name, value} = event.currentTarget;

        setPost((prevPostValue) => {
            return {
                ...prevPostValue,
                [name]: value
            };
        });
        console.log(post);
    }

    async function createPost() {
        const response = await api.post('/', post).then(res => res.data);
        const postRespBody = await response;
        setCreatedPost(postRespBody);
        setPost({
            title: '',
            body: '',
        })
    }

    return (
        <Layout>
            <CreateArea onSubmit={e => e.preventDefault()}>
                <InputArea
                    name='title'
                    onChange={handleChange}
                    value={post.title}
                    placeholder='Title'
                />
                <InputArea
                    name='body'
                    onChange={handleChange}
                    value={post.body}
                    placeholder='Posts body'
                />
                <CreateBtn onClick={createPost}>
                    Create post
                </CreateBtn>
            </CreateArea>

            <div key={createdPost.id}>
                <h1>{createdPost.title}</h1>
                <p>{createdPost.body}</p>
            </div>
        </Layout>
    )
}