import React, { useState, useEffect } from 'react'
import Form from '../components/Wall/Form/Form'
import Cookies from 'universal-cookie'
import axios from 'axios'
import { makeStyles,ThemeProvider, createTheme } from '@material-ui/core/styles';


const Wall = () => {
    const [posts,setPosts] =useState([])
    const [comments, setComments] = useState([])
    const id = "61143545c461c127d87fdd25";
    const pid= "6114d99a67535f1cd48eaa50";
    const [loaded, setLoaded] = useState(false);
    const [rerender, setRerender] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8000/api/post')
        .then(res => {
            console.log(res.data)
            setPosts(res.data.filter(response => response.channel === "Sawwah"))
            setLoaded(true)
            setRerender(false)
        })
    }, [rerender])


    const createPost = (post) => {
        axios.post('http://localhost:8000/api/post/'+id, post)
        .then(res => {setPosts([...posts,res.data])})
        .then(console.log("Im in posts"))
        .then(setRerender(true))
    }

    const createComment = (comment) => {
        axios.post('http://localhost:8000/api/comment/'+id+'/'+pid,comment)
        .then(res=>{setComments([...comments,res.data])})
        .then(console.log("Im in comments"))
        .then(setRerender(true))
    }
    return (
        <div>
            <Form kind="post" type="Sawwah" wallFormAction={createPost}></Form>
            {loaded && posts.map((item,idx) => { 
                return <div><p key={idx}>{item.text}</p>
                {item.comments.map((comment,index) => {
                    return <p key={index}>{comment.text}</p>
                })}
                <Form kind="comment" type="Sawwah" wallFormAction={createComment}></Form></div>
            })}
        </div>
    )
}

export default Wall
