
const PostCard = ({p}) => {

    console.log(p)
  return (
    <div
    className="border p-10 transition-all duration-314 hover:cursor-pointer hover:shadow-2xl"
  >
    <h2 className="text-2xl font-bold">{p.name}</h2>
    <p>{p.email}</p>
    <p>
      {`Ring til ${p.phone}`}
    </p>
  </div>
  )
}

export default PostCard