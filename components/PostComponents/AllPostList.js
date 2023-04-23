import { List } from "antd";


const AllPostList=({posts,handleEdit,handleDelete})=>{

    return (
        <List 
            itemLayout="horizontal"
            dataSource={posts}
            bordered
            renderItem={(item) => (
                <List.Item

                    actions={[<a onClick={() => handleEdit(item)}>edit</a>, <a onClick={() => handleDelete(item._id)}>delete</a>]}
                >
                <h4>{item.title}</h4>
                </List.Item>
            )}
        />
    );
}

export default AllPostList;