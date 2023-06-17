import { List,Input } from "antd";
import { useState } from "react";


const AllPostList=({posts,handleEdit,handleDelete})=>{

    //state
    const [keyword,setKeyword]=useState('');

    return (
        <>
        <Input placeholder="Search" onChange={(e)=>{setKeyword(e.target.value.toLowerCase())}} />
        <List 
            itemLayout="horizontal"
            dataSource={posts.filter((post)=>{return post.title.toLowerCase().includes(keyword)})}
            bordered
            renderItem={(item) => (
                <List.Item

                    actions={[<a onClick={() => handleEdit(item)}>edit</a>, <a onClick={() => handleDelete(item._id)}>delete</a>]}
                >
                <h4>{item.title}</h4>
                </List.Item>
            )}
        />
        </>
    );
}

export default AllPostList;